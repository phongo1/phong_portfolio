import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

const ProjectModal = ({ project, isOpen, onClose }) => {
  const scrollerRef = useRef(null);
  const itemNodesRef = useRef([]);
  const scrollRafRef = useRef(null);
  const activeIndexRef = useRef(null);
  const copyCountRef = useRef(1);
  const scrollEndTimeoutRef = useRef(null);
  const snapEndTimeoutRef = useRef(null);
  const isSnappingRef = useRef(false);
  const dragStateRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    isDragging: false,
    hasPointer: false,
    skipDrag: false,
  });
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isWheeling, setIsWheeling] = useState(false);

  const photoSet = project?.photos ?? [];
  const copyCount = photoSet.length > 1 ? 5 : 1;
  const carouselPhotos = useMemo(() => {
    if (!photoSet.length) return [];
    return Array.from({ length: copyCount }, (_, copyIndex) =>
      photoSet.map((photo, index) => ({
        src: photo,
        key: `${copyIndex}-${index}`,
        index,
        copyIndex,
      }))
    ).flat();
  }, [photoSet, copyCount]);

  const hintTimerRef = useRef(null);
  const [showDragHint, setShowDragHint] = useState(false);

  useEffect(() => {
    copyCountRef.current = copyCount;
  }, [copyCount]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current);
        scrollEndTimeoutRef.current = null;
      }
      if (snapEndTimeoutRef.current) {
        clearTimeout(snapEndTimeoutRef.current);
        snapEndTimeoutRef.current = null;
      }
      if (hintTimerRef.current) {
        clearTimeout(hintTimerRef.current);
        hintTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleScroll = () => {
      onClose();
    };

    const scrollOptions = { passive: true };
    window.addEventListener("scroll", handleScroll, scrollOptions);

    // cleanup function to remove the event listener
    return () => window.removeEventListener("scroll", handleScroll, scrollOptions);
  }, [isOpen, onClose]);

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const hintShownRef = useRef(false);
  const prevActiveRef = useRef(null);

  const cancelPendingHint = useCallback(() => {
    if (hintTimerRef.current) {
      clearTimeout(hintTimerRef.current);
      hintTimerRef.current = null;
      hintShownRef.current = true;
    }
  }, []);

  const getClosestNode = () => {
    const container = scrollerRef.current;
    if (!container) return null;
    const nodes = itemNodesRef.current;
    if (!nodes.length) return null;

    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    nodes.forEach((node) => {
      const nodeCenter = node.offsetLeft + node.offsetWidth / 2;
      const distance = Math.abs(center - nodeCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = node;
      }
    });

    return closest;
  };

  const updateActive = () => {
    const closest = getClosestNode();
    if (!closest) return;
    const nextIndex = closest?.dataset.photoIndex;
    const parsedIndex = nextIndex !== undefined ? Number(nextIndex) : null;
    if (parsedIndex !== null && !Number.isNaN(parsedIndex) && parsedIndex !== activeIndexRef.current) {
      activeIndexRef.current = parsedIndex;
      setActiveIndex(parsedIndex);
    }
  };

  const normalizeScrollPosition = () => {
    const container = scrollerRef.current;
    const copies = copyCountRef.current;
    if (!container || copies <= 1) return;
    const copyWidth = container.scrollWidth / copies;
    if (!copyWidth) return;

    const middleIndex = Math.floor(copies / 2);
    const lowerBound = copyWidth * (middleIndex - 0.5);
    const upperBound = copyWidth * (middleIndex + 0.5);

    while (container.scrollLeft < lowerBound) {
      container.scrollLeft += copyWidth;
    }
    while (container.scrollLeft > upperBound) {
      container.scrollLeft -= copyWidth;
    }
  };

  const smoothSnapToClosest = () => {
    if (isSnappingRef.current) return;
    const closest = getClosestNode();
    if (!closest) return;
    isSnappingRef.current = true;
    closest.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    if (snapEndTimeoutRef.current) {
      clearTimeout(snapEndTimeoutRef.current);
    }
    snapEndTimeoutRef.current = setTimeout(() => {
      isSnappingRef.current = false;
    }, 240);
  };

  const handleGalleryScroll = () => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      const container = scrollerRef.current;
      if (!container) {
        scrollRafRef.current = null;
        return;
      }

      updateActive();
      scrollRafRef.current = null;
    });

    if (isSnappingRef.current) return;
    if (scrollEndTimeoutRef.current) {
      clearTimeout(scrollEndTimeoutRef.current);
    }
    scrollEndTimeoutRef.current = setTimeout(() => {
      if (!dragStateRef.current.isDragging) {
        normalizeScrollPosition();
        updateActive();
        smoothSnapToClosest();
      }
      setIsWheeling(false);
    }, 160);
  };

  const handleGalleryWheel = useCallback((event) => {
    if (!scrollerRef.current) return;
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 0.01) return;
    if (event.cancelable) event.preventDefault();
    setIsWheeling(true);
    scrollerRef.current.scrollLeft += delta * 0.5;
    cancelPendingHint();
  }, [cancelPendingHint]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const container = scrollerRef.current;
    if (!container) return undefined;

    const handleWheel = (event) => handleGalleryWheel(event);
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleGalleryWheel, isOpen]);

  useEffect(() => {
    if (!isOpen || !carouselPhotos.length) {
      setShowDragHint(false);
      hintShownRef.current = false;
      prevActiveRef.current = null;
      if (hintTimerRef.current) {
        clearTimeout(hintTimerRef.current);
        hintTimerRef.current = null;
      }
      return;
    }

    setShowDragHint(false);
    hintShownRef.current = false;
    prevActiveRef.current = activeIndexRef.current;

    if (hintTimerRef.current) {
      clearTimeout(hintTimerRef.current);
      hintTimerRef.current = null;
    }

    hintTimerRef.current = setTimeout(() => {
      if (!hintShownRef.current) {
        prevActiveRef.current = activeIndexRef.current;
        setShowDragHint(true);
        hintShownRef.current = true;
      }
      hintTimerRef.current = null;
    }, 2000);
  }, [isOpen, carouselPhotos.length]);

  useEffect(() => {
    if (!showDragHint) {
      prevActiveRef.current = activeIndex;
      return;
    }

    if (
      prevActiveRef.current !== null &&
      activeIndex !== null &&
      activeIndex !== prevActiveRef.current
    ) {
      setShowDragHint(false);
    }

    prevActiveRef.current = activeIndex;
  }, [activeIndex, showDragHint]);

  const handlePointerDown = (event) => {
    if (!scrollerRef.current) return;
    if (event.pointerType === "touch") return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const clickableNode = event.target.closest("[data-photo-clickable]");
    const isPhotoClick = Boolean(clickableNode);
    const photoIndexAttr = clickableNode?.dataset.photoIndex;
    const photoIndex = photoIndexAttr !== undefined && photoIndexAttr !== null ? Number(photoIndexAttr) : null;
    const isActivePhoto = photoIndex !== null && photoIndex === activeIndexRef.current;
    cancelPendingHint();

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: scrollerRef.current.scrollLeft,
      isDragging: false,
      hasPointer: true,
      skipDrag: isPhotoClick && !isActivePhoto,
    };

    if (!isPhotoClick || isActivePhoto) {
      scrollerRef.current.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (event) => {
    const container = scrollerRef.current;
    const state = dragStateRef.current;
    if (!container || !state.hasPointer || state.pointerId !== event.pointerId) return;
    if (state.skipDrag) return;

    const deltaX = event.clientX - state.startX;
    const deltaY = event.clientY - state.startY;
    const dragThreshold = 6;
    const dragSpeed = 0.9;

    if (!state.isDragging) {
      if (Math.abs(deltaX) < dragThreshold && Math.abs(deltaY) < dragThreshold) return;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        state.hasPointer = false;
        try {
          container.releasePointerCapture(event.pointerId);
        } catch (error) {
          // Ignore release errors for non-captured pointers.
        }
        return;
      }

      state.isDragging = true;
      setIsDragging(true);
    }

    event.preventDefault();
    container.scrollLeft = state.startScrollLeft - deltaX * dragSpeed;
  };

  const handlePointerEnd = (event) => {
    const container = scrollerRef.current;
    const state = dragStateRef.current;
    if (!state.hasPointer || state.pointerId !== event.pointerId) return;

    state.hasPointer = false;
    state.isDragging = false;
    setIsDragging(false);

    if (state.skipDrag) {
      return;
    }

    if (container) {
      try {
        container.releasePointerCapture(event.pointerId);
      } catch (error) {
        // Ignore release errors for non-captured pointers.
      }
    }

    normalizeScrollPosition();
    updateActive();
    smoothSnapToClosest();
  };

  const handlePhotoClick = useCallback((photoKey, photoIndex) => {
    if (
      photoIndex === activeIndexRef.current ||
      !photoKey ||
      dragStateRef.current.isDragging ||
      isWheeling
    ) {
      return;
    }
    cancelPendingHint();
    const target = itemNodesRef.current.find((node) => node.dataset.photoKey === photoKey);
    if (!target || isSnappingRef.current) return;

    isSnappingRef.current = true;
    target.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });

    if (snapEndTimeoutRef.current) {
      clearTimeout(snapEndTimeoutRef.current);
    }
    snapEndTimeoutRef.current = setTimeout(() => {
      isSnappingRef.current = false;
      normalizeScrollPosition();
      updateActive();
    }, 260);
  }, [cancelPendingHint, isWheeling]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const container = scrollerRef.current;
    if (!container || !carouselPhotos.length) return undefined;

    const initialize = () => {
      itemNodesRef.current = Array.from(container.querySelectorAll("[data-photo-key]"));
      const middleCopyIndex = Math.floor(copyCountRef.current / 2);
      const initialKey = `${middleCopyIndex}-0`;
      const initialNode = container.querySelector(`[data-photo-key="${initialKey}"]`);

      if (initialNode) {
        initialNode.scrollIntoView({ inline: "center", block: "nearest" });
        setActiveIndex(0);
      } else if (itemNodesRef.current[0]) {
        const fallbackIndex = itemNodesRef.current[0].dataset.photoIndex;
        const parsedIndex = fallbackIndex !== undefined ? Number(fallbackIndex) : null;
        setActiveIndex(parsedIndex);
      }

      updateActive();
    };

    const rafId = requestAnimationFrame(initialize);
    const handleResize = () => updateActive();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [carouselPhotos.length, isOpen, project?.name]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="project-modal relative w-[92%] max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0f111a] px-6 py-6 text-white shadow-md sm:w-full sm:px-10 sm:py-9 max-h-[85vh]"
        onClick={handleContentClick} // Prevents modal close when clicking on the content
      >
        <style>{`
          .project-carousel {
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
            touch-action: pan-x;
          }
          .project-carousel::-webkit-scrollbar {
            width: 0;
            height: 0;
            display: none;
          }
        `}</style>
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-semibold tracking-wide text-white sm:text-2xl">
            {project.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:text-white"
          >
            <IoClose className="h-4 w-4" />
          </button>
        </div>
        <div className="relative my-4 sm:my-6">
          <div
            ref={scrollerRef}
            onScroll={handleGalleryScroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            className={`project-carousel flex gap-0.5 sm:gap-1 overflow-x-auto px-4 sm:px-6 py-4 sm:py-6 select-none ${
              isDragging || isWheeling ? "snap-none" : "snap-x snap-mandatory"
            } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          >
            {carouselPhotos.map((photo) => {
              const isActive = photo.index === activeIndex;
              return (
                <div
                  key={photo.key}
                  data-photo-key={photo.key}
                  data-photo-index={photo.index}
                  onClick={() => handlePhotoClick(photo.key, photo.index)}
                  className={`group snap-center flex-none w-[17rem] sm:w-[23rem] md:w-[27rem] ${
                    isWheeling ? "transition-none" : "transition-[opacity,transform] duration-300 ease-out"
                  } ${isActive ? "opacity-100 scale-[1.05]" : "opacity-35 scale-[0.86]"} cursor-pointer`}
                >
                  <div
                    className="h-[12rem] sm:h-[14rem] md:h-[16rem] overflow-hidden rounded-2xl flex items-center justify-center border border-transparent transition-all duration-200 group-hover:border-white group-hover:shadow-[0_0_0_2px_rgba(255,255,255,0.7)]"
                    data-photo-clickable
                    data-photo-index={photo.index}
                  >
                    <img
                      src={photo.src}
                      alt={`Project image ${photo.index + 1}`}
                      className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-[1.04]"
                      draggable="false"
                      loading={photo.copyIndex === Math.floor(copyCount / 2) && photo.index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      onDragStart={(event) => event.preventDefault()}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pointer-events-none absolute left-1/2 top-[-1rem] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div
              className={`flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/80 animate-pulse shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition-all duration-500 ease-out ${showDragHint ? "opacity-100 scale-100" : "opacity-0 scale-96 invisible"}`}
            >
              <span
                aria-hidden="true"
                className="inline-flex h-4 items-center justify-center text-base leading-none -translate-y-[1px]"
              >
                {'\u27F7'}
              </span>
              <span className="leading-none">drag or click</span>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0f111a] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0f111a] to-transparent" />
        </div>

        <ul className="list-disc pl-5 py-2 text-white/80">
          {project.bullets.map((point, index) => (
            <li key={index}>
              {point}
            </li>
          ))}
        </ul>
        <div className="flex gap-3">
          {project.link === null ? (
            <span className="inline-block bg-[#4d52ff] text-white p-2 mt-2 rounded hover:cursor-not-allowed">
              Private Repo
            </span>
          ) : (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#4d52ff] text-white p-2 mt-2 rounded hover:cursor-pointer hover:text-white"
            >
              Link
            </a>
          )}
          {project.website ? <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#4d52ff] text-white p-2 mt-2 rounded hover:cursor-pointer hover:text-white"
          >
            Website
          </a> : null}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;





