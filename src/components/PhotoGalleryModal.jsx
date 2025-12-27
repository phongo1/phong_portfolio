import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

const PAGE_SIZE = 6;

const PhotoGalleryModal = ({ isOpen, onClose, photos = [], title = "Photo Gallery", isLoading = false }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const scrollRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

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
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
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
    if (!isOpen) setActivePhoto(null);
  }, [isOpen]);

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

  const handlePhotoClick = (photoKey) => {
    if (!isTouch) return;
    setActivePhoto((prev) => (prev === photoKey ? null : photoKey));
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
      transition={{ duration: 0.12, ease: "easeOut" }}
      style={{ willChange: "opacity" }}
    >
      <motion.div
        className="w-full max-w-5xl min-h-[32rem] max-h-[85vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0f111a] shadow-md flex flex-col"
        onClick={handleContentClick}
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0 },
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
        style={{ willChange: "opacity" }}
      >
        <div className="flex-shrink-0 border-b border-white/10 px-6 pt-6 pb-4 sm:px-8 sm:pt-8">
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
            Photos from my camera roll that I like
          </p>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 min-h-0 overflow-y-auto px-6 pt-4 pb-6 sm:px-8 sm:pt-6 sm:pb-8"
        >
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3" aria-busy="true">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`gallery-skeleton-${index}`}
                  className="h-40 rounded-2xl border border-white/10 bg-white/5 animate-pulse sm:h-52"
                />
              ))}
            </div>
          ) : photos.length === 0 ? (
            <p className="text-sm text-white/60">
              No photos to display.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {photos.slice(0, visibleCount).map((photo) => {
              const photoKey = `${photo.src}-${photo.alt}`;
              const isActive = isTouch && activePhoto === photoKey;
              const hoverOpacity = isTouch ? "" : "group-hover:opacity-100";
              const hoverTranslate = isTouch ? "" : "group-hover:translate-y-0";
              const hoverScale = isTouch ? "" : "group-hover:scale-105";
              const activeOpacity = isActive ? "opacity-100" : "opacity-0";
              const activeTranslate = isActive ? "translate-y-0" : "translate-y-2";
              const pointerClass = isTouch ? "cursor-pointer" : "";

              return (
                <div
                  key={photoKey}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${pointerClass}`}
                  onClick={() => handlePhotoClick(photoKey)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className={`h-40 w-full object-cover transition duration-300 ease-out ${hoverScale} sm:h-52`}
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
              );
            })}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhotoGalleryModal;
