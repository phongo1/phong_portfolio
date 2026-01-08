import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoClose, IoArrowBack } from "react-icons/io5";

const PAGE_SIZE = 6;

const PhotoGalleryModal = ({ isOpen, onClose, photos = [], title = "Photo Gallery", isLoading = false }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const scrollRef = useRef(null);
  const sentinelRef = useRef(null);
  const visibleCountRef = useRef(visibleCount);
  const scrollRafRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [drawerPhoto, setDrawerPhoto] = useState(null);
  const autoHideTimerRef = useRef(null);
  const modalWrapperRef = useRef(null);
  const scrollIndicatorAreaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const scrollIndicatorHeightRef = useRef(0);
  const scrollIndicatorTimerRef = useRef(null);
  const scrollLabelRef = useRef("");
  const gridRef = useRef(null);
  const firstItemRef = useRef(null);
  const rowMetricsRef = useRef({ rowHeight: 0 });
  const columnCountRef = useRef(2);
  const [scrollLabel, setScrollLabel] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const supportsObserver = typeof window !== "undefined" && "IntersectionObserver" in window;
  const drawerOpen = Boolean(drawerPhoto && !isTouch);
  const latestPhotoDate = useMemo(() => {
    let latestTimestamp = -Infinity;
    let latestDate = null;

    photos.forEach((photo) => {
      if (!photo?.date) return;
      const timestamp = Date.parse(photo.date);
      if (Number.isNaN(timestamp)) return;
      if (timestamp > latestTimestamp) {
        latestTimestamp = timestamp;
        latestDate = photo.date;
      }
    });

    return latestDate;
  }, [photos]);
  const monthFormatter = useMemo(() => new Intl.DateTimeFormat("en-US", { month: "short" }), []);
  const handleDrawerClose = () => {
    if (drawerOpen) setDrawerPhoto(null);
  };

  const getMonthYearParts = (value) => {
    if (!value) return null;
    const timestamp = Date.parse(value);
    if (Number.isNaN(timestamp)) return null;
    const date = new Date(timestamp);
    return { month: monthFormatter.format(date), year: String(date.getFullYear()) };
  };

  const updateScrollLabel = (startIndex) => {
    if (!photos.length || visibleCount <= 0) return;
    const maxIndex = Math.min(visibleCount, photos.length) - 1;
    let index = Math.min(Math.max(startIndex, 0), maxIndex);
    let parts = getMonthYearParts(photos[index]?.date);

    if (!parts) {
      for (let i = index + 1; i <= maxIndex; i += 1) {
        parts = getMonthYearParts(photos[i]?.date);
        if (parts) break;
      }
    }

    if (!parts) return;
    const key = `${parts.month}-${parts.year}`;
    if (key === scrollLabelRef.current) return;
    scrollLabelRef.current = key;
    setScrollLabel(parts);
  };

  const scheduleScrollUpdate = (activateIndicator = false) => {
    if (activateIndicator && !isTouch) {
      if (scrollIndicatorTimerRef.current) {
        clearTimeout(scrollIndicatorTimerRef.current);
      }
      setIsScrolling(true);
      scrollIndicatorTimerRef.current = setTimeout(() => {
        setIsScrolling(false);
        scrollIndicatorTimerRef.current = null;
      }, 650);
    }

    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) {
        scrollRafRef.current = null;
        return;
      }

      const { scrollTop, clientHeight, scrollHeight } = container;
      const maxScroll = Math.max(scrollHeight - clientHeight, 1);

      if (!isTouch) {
        const indicator = scrollIndicatorRef.current;
        if (indicator) {
          const indicatorHeight = scrollIndicatorHeightRef.current || indicator.offsetHeight;
          scrollIndicatorHeightRef.current = indicatorHeight;
          const travel = Math.max(clientHeight - indicatorHeight, 0);
          const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
          indicator.style.transform = `translate3d(0, ${Math.round(travel * progress)}px, 0)`;
        }

        if (visibleCount > 0) {
          const columns = columnCountRef.current;
          let index = 0;
          if (columns > 0) {
            const rowHeight = rowMetricsRef.current.rowHeight;
            if (rowHeight > 0) {
              const anchor = scrollTop + clientHeight * 0.2;
              const rowIndex = Math.max(0, Math.floor(anchor / rowHeight));
              index = rowIndex * columns;
            } else {
              index = Math.floor((scrollTop / maxScroll) * (visibleCount - 1));
            }
          }
          updateScrollLabel(index);
        }
      }

      if (!supportsObserver && !isLoading && photos.length > visibleCount) {
        if (scrollHeight - scrollTop - clientHeight < 120) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, photos.length));
        }
      }

      scrollRafRef.current = null;
    });
  };

  const handleScroll = () => {
    scheduleScrollUpdate(true);
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
      setIsScrolling(false);
      setScrollLabel(null);
      scrollLabelRef.current = "";
      if (scrollIndicatorTimerRef.current) {
        clearTimeout(scrollIndicatorTimerRef.current);
        scrollIndicatorTimerRef.current = null;
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isTouch) setDrawerPhoto(null);
  }, [isTouch]);

  useEffect(() => {
    if (!isOpen || isLoading || photos.length === 0 || scrollLabelRef.current) return;
    const initial = getMonthYearParts(photos[0]?.date);
    if (!initial) return;
    scrollLabelRef.current = `${initial.month}-${initial.year}`;
    setScrollLabel(initial);
  }, [isOpen, isLoading, photos, getMonthYearParts]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const update = () => {
      columnCountRef.current = media.matches ? 3 : 2;
    };
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    if (!isOpen || isLoading || photos.length === 0) return undefined;
    const grid = gridRef.current;
    const firstItem = firstItemRef.current;
    if (!grid || !firstItem) return undefined;

    const measure = () => {
      const rect = firstItem.getBoundingClientRect();
      const styles = window.getComputedStyle(grid);
      const rowGap = Number.parseFloat(styles.rowGap || "0") || 0;
      rowMetricsRef.current = { rowHeight: rect.height + rowGap };
    };

    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(grid);

    return () => observer.disconnect();
  }, [isOpen, isLoading, photos.length, visibleCount]);

  useEffect(() => {
    if (!scrollIndicatorRef.current) return;
    scrollIndicatorHeightRef.current = scrollIndicatorRef.current.offsetHeight;
  }, [scrollLabel, isOpen]);

  useEffect(() => {
    if (!isOpen || isLoading) return;
    scheduleScrollUpdate(false);
  }, [isOpen, isLoading, visibleCount, photos.length]);

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
    if (!isOpen || isTouch || !scrollLabel) return undefined;
    const wrapper = modalWrapperRef.current;
    const scroller = scrollRef.current;
    const area = scrollIndicatorAreaRef.current;
    if (!wrapper || !scroller || !area) return undefined;

    const update = () => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const scrollerRect = scroller.getBoundingClientRect();
      const areaWidth = area.offsetWidth;
      const gap = 10;
      const left = scrollerRect.left - wrapperRect.left - areaWidth - gap;

      area.style.top = `${Math.round(scrollerRect.top - wrapperRect.top)}px`;
      area.style.left = `${Math.round(left)}px`;
      area.style.height = `${Math.round(scrollerRect.height)}px`;
    };

    update();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }

    const observer = new ResizeObserver(update);
    observer.observe(scroller);
    observer.observe(wrapper);

    return () => observer.disconnect();
  }, [isOpen, isTouch, scrollLabel]);

  useEffect(() => {
    if (!isOpen || isLoading || photos.length <= visibleCount) return;
    if (supportsObserver) return;
    const container = scrollRef.current;
    if (!container) return;

    if (container.scrollHeight <= container.clientHeight + 8) {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, photos.length));
    }
  }, [isOpen, isLoading, photos.length, visibleCount, supportsObserver]);

  useEffect(() => {
    visibleCountRef.current = visibleCount;
  }, [visibleCount]);

  useEffect(() => {
    return () => {
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
      if (scrollIndicatorTimerRef.current) {
        clearTimeout(scrollIndicatorTimerRef.current);
        scrollIndicatorTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!supportsObserver || !isOpen || isLoading) return undefined;
    const container = scrollRef.current;
    const sentinel = sentinelRef.current;
    if (!container || !sentinel) return undefined;

    let rafId = null;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        if (visibleCountRef.current >= photos.length) return;
        if (rafId) return;

        rafId = requestAnimationFrame(() => {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, photos.length));
          rafId = null;
        });
      },
      { root: container, rootMargin: "200px 0px", threshold: 0.01 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [supportsObserver, isOpen, isLoading, photos.length]);

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
      <div ref={modalWrapperRef} className={`relative w-full max-w-5xl sm:max-w-[44rem] transition-transform duration-200 ease-out ${drawerOpen ? "sm:-translate-x-6 lg:-translate-x-8" : ""}`}>
        {!isTouch && scrollLabel ? (
          <div ref={scrollIndicatorAreaRef} className="pointer-events-none absolute left-0 top-0 h-0 w-16 sm:w-24 z-10">
            <div ref={scrollIndicatorRef} className="absolute left-0 top-0 will-change-transform">
              <div className={`transition-[opacity,transform] duration-200 ease-out ${isScrolling ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
                <div className="relative rounded-xl bg-gradient-to-b from-[#4d52ff] to-[#cf3dfd] p-[1px] shadow-lg">
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-1/2 h-3 w-2 -translate-y-1/2 translate-x-full bg-gradient-to-b from-[#4d52ff] to-[#cf3dfd]"
                    style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                  />
                  <div className="flex flex-col items-center rounded-xl bg-[#0b0d14]/90 px-4 py-2 backdrop-blur">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/80 leading-none">
                      {scrollLabel.month}
                    </span>
                    <span className="text-[0.85rem] font-medium text-white/60 leading-none">
                      {scrollLabel.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
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
              <div className="flex flex-col items-end gap-1 justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close gallery"
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:text-white"
                >
                  <IoClose className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-white/90">
                My visual diary
              </p>
              {latestPhotoDate ? (
                <span className="text-[0.7rem] font-medium tracking-wide text-transparent bg-gradient-to-r from-[#4d52ff] to-[#cf3dfd] bg-clip-text">
                  UPDATED: {latestPhotoDate}
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-hidden pt-4 pb-6 sm:pt-6 sm:pb-8">
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
                style={{ direction: "rtl" }}
              >
                <div className="w-full px-4 sm:px-6" style={{ direction: "ltr" }}>
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
                    <>
                      <div ref={gridRef} className="grid w-full max-w-[40rem] grid-cols-2 gap-4 sm:grid-cols-3">
                        {photos.slice(0, visibleCount).map((photo, index) => {
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
                              ref={index === 0 ? firstItemRef : null}
                              className={`group relative overflow-hidden rounded-2xl p-[1px] transition-colors duration-150 ${selectedBorderClass} ${pointerClass}`}
                              onClick={(event) => handlePhotoClick(event, photo, photoKey)}
                            >
                              <div className={innerCardClass}>
                                <img
                                  src={photo.src}
                                  alt={photo.alt}
                                  loading="lazy"
                                  decoding="async"
                                  className={`h-[12.5rem] w-full object-cover transition-transform duration-300 ease-out will-change-transform ${hoverScale} sm:h-[17.25rem]`}
                                />
                                {photo.date ? (
                                  <span className={`pointer-events-none absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[0.65rem] text-white/90 transition-opacity duration-300 ease-out ${activeOpacity} ${hoverOpacity}`}>
                                    {photo.date}
                                  </span>
                                ) : null}
                                {photo.description ? (
                                  <span className={`pointer-events-none absolute inset-x-3 bottom-3 rounded-md bg-black/70 px-2 py-1 text-[0.65rem] text-white/90 transition-[opacity,transform] duration-300 ease-out will-change-transform ${activeOpacity} ${activeTranslate} ${hoverOpacity} ${hoverTranslate}`}>
                                    {photo.description}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />
                    </>
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
                        <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-sm text-white/90">
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
