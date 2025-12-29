import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleScroll = () => {
      onClose();
    };

    const scrollOptions = { passive: true };
    window.addEventListener("scroll", handleScroll, scrollOptions);

    // cleanup function to remove the event listener
    return () => window.removeEventListener("scroll", handleScroll, scrollOptions);
  }, [onClose]);

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  function SlickArrowRight(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SlickArrowLeft(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  };

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="project-modal relative w-[92%] max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0f111a] px-4 py-5 text-white shadow-md sm:w-full sm:px-8 sm:py-8 max-h-[85vh]"
        onClick={handleContentClick} // Prevents modal close when clicking on the content
      >
        <style>{`
          .project-modal .slick-dots li button:before {
            color: rgba(255, 255, 255, 0.5);
            opacity: 1;
          }
          .project-modal .slick-dots li.slick-active button:before {
            color: rgba(255, 255, 255, 0.9);
          }
          .project-modal .slick-prev:before,
          .project-modal .slick-next:before {
            color: rgba(255, 255, 255, 0.8);
          }
          .project-modal .slick-prev:hover:before,
          .project-modal .slick-next:hover:before {
            color: rgba(255, 255, 255, 1);
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
        <div className="slider-container my-4 flex justify-center sm:my-6">
          <Slider {...settings} className="w-full max-w-[20rem] h-42 p-0 sm:w-[30rem] sm:max-w-none sm:h-[20rem]">
            {project.photos.map((photo, index) => (
              <div
                key={index}
                className="overflow-hidden w-full h-42 flex justify-center items-center sm:w-[30rem] sm:h-[20rem]"
              >
                <img
                  src={photo}
                  alt={`Slide ${index}`}
                  className="object-contain w-full h-full"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            ))}
          </Slider>
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
