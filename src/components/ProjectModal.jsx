import { useEffect, useMemo, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

const ProjectModal = ({ project, isOpen, onClose }) => {
  const scrollerRef = useRef(null);
  const itemNodesRef = useRef([]);
  const scrollRafRef = useRef(null);
  const activeKeyRef = useRef(null);
  const copyCountRef = useRef(1);
  const dragStateRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    isDragging: false,
    hasPointer: false,
  });
  const scrollEndTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);
  const [activeKey, setActiveKey] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

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

  useEffect(() => {
    copyCountRef.current = copyCount;
  }, [copyCount]);

  useEffect(() => {
    activeKeyRef.current = activeKey;
  }, [activeKey]);

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
    const nextKey = closest?.dataset.photoKey ?? null;
    if (nextKey && nextKey !== activeKeyRef.current) {
      activeKeyRef.current = nextKey;
      setActiveKey(nextKey);
    }
  };

  const snapToClosest = () => {
    const closest = getClosestNode();
    if (!closest) return;
    closest.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  };

  const startScrolling = () => {
    if (isScrollingRef.current) return;
    isScrollingRef.current = true;
    setIsScrolling(true);
  };

  const stopScrolling = () => {
    if (!isScrollingRef.current) return;
    isScrollingRef.current = false;
    setIsScrolling(false);
  };

  const handleGalleryScroll = () => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      const container = scrollerRef.current;
      if (!container) {
        scrollRafRef.current = null;
        return;
      }

      const copies = copyCountRef.current;
      if (copies > 1) {
        const copyWidth = container.scrollWidth / copies;
        if (copyWidth) {
          const lowerBound = copyWidth * 0.5;
          const upperBound = copyWidth * 1.5;
          while (container.scrollLeft < lowerBound) {
            container.scrollLeft += copyWidth;
          }
          while (container.scrollLeft > upperBound) {
            container.scrollLeft -= copyWidth;
          }
        }
      }

      updateActive();
      scrollRafRef.current = null;
    });

    if (!dragStateRef.current.isDragging) {
      startScrolling();
      if (scrollEndTimeoutRef.current) clearTimeout(scrollEndTimeoutRef.current);
      scrollEndTimeoutRef.current = setTimeout(() => {
        stopScrolling();
        snapToClosest();
      }, 140);
    }
  };

  const handleGalleryWheel = (event) => {
    if (!scrollerRef.current || Math.abs(event.deltaX) < 0.01) return;
    event.preventDefault();
    scrollerRef.current.scrollLeft += event.deltaX * 0.35;
  };

  const handlePointerDown = (event) => {
    if (!scrollerRef.current) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    if (scrollEndTimeoutRef.current) {
      clearTimeout(scrollEndTimeoutRef.current);
      scrollEndTimeoutRef.current = null;
    }
    stopScrolling();

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: scrollerRef.current.scrollLeft,
      isDragging: false,
      hasPointer: true,
    };

    scrollerRef.current.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const container = scrollerRef.current;
    const state = dragStateRef.current;
    if (!container || !state.hasPointer || state.pointerId !== event.pointerId) return;

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

    if (scrollEndTimeoutRef.current) {
      clearTimeout(scrollEndTimeoutRef.current);
      scrollEndTimeoutRef.current = null;
    }

    if (container) {
      try {
        container.releasePointerCapture(event.pointerId);
      } catch (error) {
        // Ignore release errors for non-captured pointers.
      }
    }

    snapToClosest();
  };

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
        setActiveKey(initialKey);
      } else if (itemNodesRef.current[0]) {
        const fallbackKey = itemNodesRef.current[0].dataset.photoKey ?? null;
        setActiveKey(fallbackKey);
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
            touch-action: pan-y;
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
            onWheel={handleGalleryWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            className={`project-carousel flex gap-1 sm:gap-2 overflow-x-auto px-4 sm:px-6 pb-3 select-none ${
              isDragging || isScrolling ? "snap-none cursor-grabbing" : "snap-x snap-mandatory cursor-grab"
            }`}
          >
            {carouselPhotos.map((photo) => {
              const isActive = photo.key === activeKey;
              return (
                <div
                  key={photo.key}
                  data-photo-key={photo.key}
                  className={`snap-center flex-none w-[17rem] sm:w-[23rem] md:w-[27rem] transition-[opacity,transform] duration-300 ease-out ${
                    isActive ? "opacity-100 scale-[1.05]" : "opacity-35 scale-[0.86]"
                  }`}
                >
                  <div className="h-[12rem] sm:h-[14rem] md:h-[16rem] overflow-hidden rounded-2xl flex items-center justify-center">
                    <img
                      src={photo.src}
                      alt={`Project image ${photo.index + 1}`}
                      className="object-contain w-full h-full"
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
