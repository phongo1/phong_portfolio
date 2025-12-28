import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoClose, IoArrowBack } from "react-icons/io5";

const PAGE_SIZE = 6;

const PhotoGalleryModal = ({ isOpen, onClose, photos = [], title = "Photo Gallery", isLoading = false }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const scrollRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [drawerPhoto, setDrawerPhoto] = useState(null);
  const autoHideTimerRef = useRef(null);
  const drawerOpen = Boolean(drawerPhoto && !isTouch);
  const handleDrawerClose = () => {
    if (drawerOpen) setDrawerPhoto(null);
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    setVisibleCount(Math.min(PAGE_SIZE, photos.length));
  }, [isOpen, photos.length]);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setActivePhoto(null);
      setDrawerPhoto(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isTouch) setDrawerPhoto(null);
  }, [isTouch]);

  useEffect(() => {
    if (!isTouch || !activePhoto) return undefined;

    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
    }

    autoHideTimerRef.current = setTimeout(() => {
      setActivePhoto(null);
      autoHideTimerRef.current = null;
    }, 3000);

    return () => {
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
        autoHideTimerRef.current = null;
      }
    };
  }, [activePhoto, isTouch]);

  useEffect(() => {
    if (!isOpen || isLoading || photos.length <= visibleCount) return;
    const container = scrollRef.current;
    if (!container) return;

    if (container.scrollHeight <= container.clientHeight + 8) {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, photos.length));
    }
  }, [isOpen, isLoading, photos.length, visibleCount]);

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handlePhotoClick = (event, photo, photoKey) => {
    event.stopPropagation();
    if (isTouch) {
      setActivePhoto((prev) => (prev === photoKey ? null : photoKey));
      return;
    }

    setDrawerPhoto((prev) => (prev?.src === photo.src ? null : photo));
  };

  const handleScroll = (event) => {
    if (isLoading || photos.length <= visibleCount) return;

    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 120) {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, photos.length));
    }
  };

  return (
    <motion.div
      className={`fixed inset-0 z-[99] flex items-center justify-center bg-black/50 p-4 ${isOpen ? "" : "pointer-events-none"}`}
      onClick={isOpen ? onClose : undefined}
      role="dialog"
      aria-modal={isOpen}
      aria-hidden={!isOpen}
      aria-labelledby="photo-gallery-title"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: { opacity: 1 },
        closed: { opacity: 0 },
      }}
      transition={{ duration: 0.10, ease: "easeOut" }}
    >
      <div className={`relative w-full max-w-5xl sm:max-w-[44rem] transition-transform duration-200 ease-out ${drawerOpen ? "sm:-translate-x-6 lg:-translate-x-8" : ""}`}>
        <motion.div
          className="w-full h-[85vh] max-h-[85vh] min-h-[32rem] overflow-hidden rounded-3xl border border-white/10 bg-[#0f111a] shadow-md flex flex-col"
          onClick={handleContentClick}
          variants={{
            open: { opacity: 1 },
            closed: { opacity: 0 },
          }}
          transition={{ duration: 0.10, ease: "easeOut" }}
        >
          <div
            className="flex-shrink-0 border-b border-white/10 px-6 pt-6 pb-4 sm:px-8 sm:pt-8"
            onClick={handleDrawerClose}
          >
            <div className="mb-1 flex items-center justify-between">
              <h2 id="photo-gallery-title" className="text-lg font-semibold tracking-wide text-white sm:text-xl">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close gallery"
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:text-white"
              >
                <IoClose className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-white/90">
              My visual diary camera-roll photos
            </p>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden pl-6 pt-4 pb-6 sm:pl-8 sm:pt-6 sm:pb-8">
            <div className="relative flex h-full min-h-0">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                onClick={() => {
                  if (isTouch) {
                    setActivePhoto(null);
                  } else {
                    setDrawerPhoto(null);
                  }
                }}
                className="min-w-0 flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain sm:w-full"
              >
                <div className="w-full pr-4 sm:pr-6">
                  {isLoading ? (
                    <div className="grid w-full max-w-[40rem] grid-cols-2 gap-4 sm:grid-cols-3" aria-busy="true">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div
                          key={`gallery-skeleton-${index}`}
                          className="h-[12.5rem] rounded-2xl border border-white/10 bg-white/5 animate-pulse sm:h-[17.25rem]"
                        />
                      ))}
                    </div>
                  ) : photos.length === 0 ? (
                    <p className="text-sm text-white/60">
                      No photos to display.
                    </p>
                  ) : (
                    <div className="grid w-full max-w-[40rem] grid-cols-2 gap-4 sm:grid-cols-3">
                      {photos.slice(0, visibleCount).map((photo) => {
                        const photoKey = `${photo.src}-${photo.alt}`;
                        const isActive = isTouch && activePhoto === photoKey;
                        const isSelected = !isTouch && drawerPhoto?.src === photo.src;
                        const hoverOpacity = isTouch ? "" : "group-hover:opacity-100";
                        const hoverTranslate = isTouch ? "" : "group-hover:translate-y-0";
                        const hoverScale = isTouch ? "" : "group-hover:scale-105";
                        const activeOpacity = isActive ? "opacity-100" : "opacity-0";
                        const activeTranslate = isActive ? "translate-y-0" : "translate-y-2";
                        const pointerClass = isTouch ? "cursor-pointer" : "hover:cursor-pointer";
                        const selectedBorderClass = isSelected
                          ? "bg-gradient-to-r from-[#4d52ff] to-[#cf3dfd]"
                          : "bg-white/10";
                        const innerCardClass = "relative h-full w-full overflow-hidden rounded-[calc(1rem-1px)] bg-white/5";

                        return (
                          <div
                            key={photoKey}
                            className={`group relative overflow-hidden rounded-2xl p-[1px] transition-colors duration-150 ${selectedBorderClass} ${pointerClass}`}
                            onClick={(event) => handlePhotoClick(event, photo, photoKey)}
                          >
                            <div className={innerCardClass}>
                              <img
                                src={photo.src}
                                alt={photo.alt}
                                loading="lazy"
                                decoding="async"
                                className={`h-[12.5rem] w-full object-cover transition duration-300 ease-out ${hoverScale} sm:h-[17.25rem]`}
                              />
                              {photo.date ? (
                                <span className={`pointer-events-none absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[0.65rem] text-white/90 transition duration-300 ${activeOpacity} ${hoverOpacity}`}>
                                  {photo.date}
                                </span>
                              ) : null}
                              {photo.description ? (
                                <span className={`pointer-events-none absolute inset-x-3 bottom-3 rounded-md bg-black/70 px-2 py-1 text-[0.65rem] text-white/90 transition duration-300 ${activeOpacity} ${activeTranslate} ${hoverOpacity} ${hoverTranslate}`}>
                                  {photo.description}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {!isTouch ? (
          <div
            onClick={(event) => event.stopPropagation()}
            className={`absolute top-0 left-full ml-4 h-fit overflow-hidden transition-[opacity,transform] duration-150 ease-out ${drawerOpen ? "w-[18rem] sm:w-[22rem] lg:w-[26rem] opacity-100 translate-x-0 pointer-events-auto" : "w-[18rem] sm:w-[22rem] lg:w-[26rem] opacity-0 translate-x-2 pointer-events-none"}`}
            style={{ willChange: "opacity, transform" }}
          >
            {drawerPhoto ? (
              <div className="relative h-full px-4 flex flex-col">
                <button
                  type="button"
                  onClick={handleDrawerClose}
                  className="inline-flex items-center gap-1 bg-transparent p-0 w-16 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white transition-transform duration-150 hover:scale-105 border-0 outline-none focus:outline-none focus-visible:outline-none"
                >
                  <IoArrowBack className="h-3.5 w-3.5" />
                  Close
                </button>
                <div className="mt-3 flex items-center justify-center">
                  <div className="w-full rounded-2xl bg-gradient-to-r from-[#4d52ff] to-[#cf3dfd] p-[1px]">
                    <div className="relative w-full overflow-hidden rounded-[calc(1rem-1px)] bg-white/5">
                      <img
                        src={drawerPhoto.src}
                        alt={drawerPhoto.alt}
                        className="w-full max-h-[55vh] object-contain"
                      />
                      {drawerPhoto.date ? (
                        <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[0.65rem] text-white/90">
                          {drawerPhoto.date}
                        </span>
                      ) : null}
                      {drawerPhoto.description ? (
                        <span className="pointer-events-none absolute inset-x-3 bottom-3 rounded-md bg-black/70 px-2 py-1 text-sm text-white/90">
                          {drawerPhoto.description}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default PhotoGalleryModal;
