import { Component, useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { motion, useAnimation } from "framer-motion";
import Spline from "@splinetool/react-spline";

import { styles } from "../styles";
import { avatarFallback } from "../assets";

const checkWebGLSupport = () => {
  if (typeof document === "undefined") return false;
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
    canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }) ||
    canvas.getContext("experimental-webgl");
  if (!gl) return false;
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return true;
};

class SplineErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }

    return this.props.children;
  }
}

const Landing = ({ isLoading }) => {
  const controls = useAnimation();
  const [webglSupported, setWebglSupported] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      controls.start({ opacity: 1, transition: { duration: 1.25 } });
    }
  }, [isLoading, controls]);

  useEffect(() => {
    setWebglSupported(checkWebGLSupport());
  }, []);

  const fallbackScene = (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_90px_-15px_rgba(79,70,229,0.35)]">
      <img
        src={avatarFallback}
        alt="Phong portfolio fallback"
        className="w-full h-full object-cover"
        draggable="false"
      />
      <div className="absolute inset-x-4 bottom-4 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md px-4 py-3 shadow-[0_15px_50px_-20px_rgba(0,0,0,0.8)]">
        <p className="text-sm font-semibold">3D preview needs WebGL</p>
        <p className="text-xs text-white/75">
          Turn on hardware acceleration in Chrome (Settings &gt; System) and reload, or view this page in Safari.
        </p>
      </div>
    </div>
  );

  return (
    <section
      className={`text-white w-full h-auto pt-[11rem] flex flex-wrap ${styles.paddingX} mx-auto gap-x-16 justify-center`}
    >
      {!isLoading && (
        <motion.div
          className="pb-16 w-fit h-[25rem] flex flex-col justify-center align-center gap-2"
          initial={{ x:-250, opacity:0 }}
          animate={{ x:0, opacity:1 }}
          transition={{ type: 'spring', stiffness: 80, damping:10, duration: 1 }}
        >
          <p className="text-4xl">Hello, I'm</p>
          <span className="font-bold text-6xl bg-gradient-to-r from-[#4d52ff] to-[#cf3dfd] text-transparent bg-clip-text ">
            <Typewriter
              options={{
                strings: ["Phong"],
                autoStart: true,
                loop: true,
                delay: 320,
                cursor: "_",
              }}
            />
          </span>
          <p className="text-base">an incoming software engineer</p>
        </motion.div>
      )}

      <motion.div
        className={`w-[45rem] h-[25rem] relative overflow-visible flex align-middle justify-center md:left-28 hover:cursor-grabbing`}
        initial={{ opacity: 0 }}
        animate={controls}
      >
        {webglSupported === null && (
          <div className="w-full h-full rounded-2xl bg-gradient-to-r from-[#4d52ff]/30 to-[#cf3dfd]/20 animate-pulse" />
        )}
        {webglSupported === false && fallbackScene}
        {webglSupported === true && (
          <SplineErrorBoundary fallback={fallbackScene} onError={() => setWebglSupported(false)}>
            <Spline scene="https://prod.spline.design/QAGyEAONPrAsk4Gv/scene.splinecode" />
            <div className="absolute mx-auto bg-transparent w-60 h-80 top-[10%] shadow-[0_20px_90px_-15px_rgba(79,70,229,0.5)] -z-10"></div>
          </SplineErrorBoundary>
        )}
      </motion.div>
    </section>
  );
};

export default Landing;
