import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

import { motion, AnimatePresence, useAnimation } from "framer-motion";

const navbarAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const Navbar = ({ isLoading }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const controls = useAnimation();
  const activeRef = useRef(active);
  const contactAtBottomRef = useRef(false);
  const sectionStatsRef = useRef(new Map());
  const updateActiveRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      controls.start({ y: 0, transition: { type: 'spring', stiffness: 80, damping:10, duration: .8 } });
    }
  }, [isLoading, controls]);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const sectionIds = ["top", ...navLinks.map((link) => link.id)];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const updateActive = () => {
      if (contactAtBottomRef.current) return;
      const candidates = Array.from(sectionStatsRef.current.entries())
        .filter(([, data]) => data.isIntersecting);

      if (!candidates.length) return;

      candidates.sort((a, b) => {
        const heightDiff = b[1].visibleHeight - a[1].visibleHeight;
        if (heightDiff !== 0) return heightDiff;
        return Math.abs(a[1].top) - Math.abs(b[1].top);
      });

      const nextId = candidates[0][0];
      const nextTitle = nextId === "top"
        ? "phong"
        : navLinks.find((link) => link.id === nextId)?.title;

      if (nextTitle && nextTitle !== activeRef.current) {
        setActive(nextTitle);
      }
    };

    updateActiveRef.current = updateActive;
    sectionStatsRef.current = new Map(
      sections.map((section) => [section.id, { isIntersecting: false, visibleHeight: 0, top: 0 }])
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionStatsRef.current.set(entry.target.id, {
            isIntersecting: entry.isIntersecting,
            visibleHeight: entry.intersectionRect.height,
            top: entry.boundingClientRect.top,
          });
        });

        updateActive();
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      updateActiveRef.current = null;
    };
  }, []);

  useEffect(() => {
    const contactSentinel = document.getElementById("contact-sentinel");
    if (!contactSentinel) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        contactAtBottomRef.current = isVisible;

        if (isVisible && activeRef.current !== "Contact") {
          setActive("Contact");
        }
        if (!isVisible) {
          updateActiveRef.current?.();
        }
      },
      { threshold: 0 }
    );

    observer.observe(contactSentinel);

    return () => observer.disconnect();
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault(); // Prevent the default anchor behavior
    const section = document.getElementById(id);
    if (section) {
      const sectionTop = section.getBoundingClientRect().y;

      window.scrollTo(0, window.scrollY + sectionTop);
    }
  };

  return (
    <motion.nav
      className={`${styles.paddingX} w-full h-[4.5rem] flex items-center py-5 fixed top-0 z-20 bg-dark-purple bg-cover bg-no-repeat bg-center`}
      initial={{ y:-50 }}
      animate={controls}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="rounded-full w-[2.5rem] h-[2.5rem] object-contain mr-2"
            draggable="false"
          ></img>
          <p
            className={`${
              active === "phong" ? "text-violet-500" : "text-white"
            } text-[1.25rem] font-bold cursor-pointer `}
          >
            Phong Le
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((Link) => (
            <li key={Link.id} onClick={() => setActive(Link.title)}>
              <a
                href={`#${Link.id}`}
                onClick={(e) => handleClick(e, Link.id)}
                className={`${
                  active === Link.title ? "text-violet-500" : "text-ivory"
                } text-[20px] font-medium cursor-pointer transition duration-300 ease-in-out `}
              >
                {Link.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
            draggable="false"
          />

          <AnimatePresence>
            {toggle && (
              <motion.div
                className="absolute top-16 right-4 min-w-[140px] z-10"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={navbarAnimation}
                key="dropdown" // Important for AnimatePresence to track
              >
                {/* triangle shape for the drop down */}
                <div className="absolute right-[6px] -top-3 z-10">
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "10px solid transparent",
                      borderRight: "10px solid transparent",
                      borderBottom: "15px solid #16112b",
                    }}
                  ></div>
                </div>
                <ul className="list-none flex justify-end items-start flex-col gap-4 bg-[#16112b] p-3 pr-8 rounded-md">
                  {navLinks.map((link) => (
                    <li
                      key={link.id}
                      onClick={() => {
                        setToggle(!toggle);
                        setActive(link.title);
                      }}
                    >
                      <a
                        href={`#${link.id}`}
                        className={`${
                          active === link.title
                            ? "text-violet-500"
                            : "text-white"
                        } font-poppins font-medium cursor-pointer text-[16px]`}
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
