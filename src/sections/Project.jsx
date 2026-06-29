
import React from "react"; 
import { motion, useScroll, AnimatePresence } from "framer-motion"; 
// motion: animation ke liye
// useScroll: scroll track kare
// AnimatePresence: mount/unmount animation

// project images import karna
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";

const MH3 = motion.h3; 
// <motion.h3> shortcut

// hook: mobile screen check
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
    // screen <= 639px hai kya
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query); // media query
    const handler = (e) => setIsMobile(e.matches); // query badle to update
    mql.addEventListener?.("change", handler) || mql.addListener(handler); 
    // listener lagao

    setIsMobile(mql.matches); // pehle value set karo
    return () =>
      mql.removeEventListener?.("change", handler) || mql.removeListener(handler); 
    // listener hatao
  }, [query]);

  return isMobile; 
};

export default function Projects() {
  const isMobile = useIsMobile(); 
  // mobile check

  // project list
  const projects = React.useMemo(
    () => [
      {
        title: "HabitBoard",
        link: "https://streak-o.vercel.app/dashboard",
        bgColor: "#3884d3",
        image: project1, // project file image
      },
      {
        title: "Climate Lens",
        link: "https://carbonscanner.vercel.app",
        bgColor: "#157d63",
        image: project2,
      },
      {
        title: "Workzarr",
        link: "https://workzarr-bj4p.vercel.app",
        bgColor: "#dc6617",
        image: project3,
      },
    ],
    [isMobile] 
    // size badle tab calc
  );

  const sceneRef = React.useRef(null); 
  // section ref

  const { scrollYProgress } = useScroll({
    target: sceneRef, 
    offset: ["start start", "end end"], 
    // progress 0-1
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length); 
  // project change breakpoints
  const [activeIndex, setActiveIndex] = React.useState(0); 
  // current project

  // scroll pe active project set karo
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = thresholds.findIndex((t) => v <= t); 
      // pehla threshold dhundo
      setActiveIndex(idx === -1 ? thresholds.length - 1 : idx); 
      // nahi to last
    });
    return () => unsubscribe(); 
    // clean kar do
  }, [scrollYProgress, thresholds]);

  const activeProject = projects[activeIndex]; 
  // chalu project

  return (
    <section
      id="projects"
      ref={sceneRef} 
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`, 
        // har project ke liye 100vh
        backgroundColor: activeProject.bgColor, 
        // background color badlega
        transition: "background-color 400ms ease",
      }}
    >
      {/* Sticky container content fixed rakhe */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        
        {/* Section title */}
        <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}>
          My Work 
        </h2>

        {/* project display */}
        <div className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "-mt-4" : ""}`}>
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              {/* title animate kare */}
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <MH3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-21 sm:left-[35%] lg:left-[-5%] sm:mb-0 font-bangers italic font-semibold ${
                      isMobile ? "-mt-25" : ""
                    }`}
                    style={{ zIndex: 5, textAlign: isMobile ? "center" : "left" }}
                  >
                    {project.title}
                  </MH3>
                )}
              </AnimatePresence>

              {/* image wrapper */}
              <div
                className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
                  isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
                } h-[62vh] sm:h-[66vh]`}
                style={{ zIndex: 10, transition: "box-shadow 250ms ease" }}
              >
                {/* project image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />
                {/* overlay readability */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    zIndex: 11,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* project button */}
        <div className={`absolute ${isMobile ? "bottom-20" : "bottom-10"}`}>
          <a
            href={activeProject?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
            aria-label={`View ${activeProject?.title}`}
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
}