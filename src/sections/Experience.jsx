// React import karna
import React from "react";
// Framer Motion animations ke liye import
import { motion, useScroll, useTransform } from "framer-motion";

// experience data
const experiences = [
  {
    role: "Industrial Automation Intern",
    company: "NTPC Limited (Maharatna PSU)",
    duration: "2026",
    description:
      "Hands-on experience with industrial automation systems and network infrastructure at one of India's largest power generation companies.",
  },
  {
    role: "Full-Stack Developer — Personal Project",
    company: "Carbon Scanner",
    duration: "2026",
    description:
      "Built an AI-powered carbon footprint tracker using MERN stack and Google Vision API — scans any product and estimates its environmental impact.",
  },
{
    role: "Android Developer — Personal Project",
    company: "PlayWise",
    duration: "2026",
    description:
      "Built a sports guide Android app with live scores, tutorials, and ticket booking using Kotlin and Android Studio.",
  },


];

// experience item render karne wala component
function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  // marker size animate kare
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  // marker opacity animate kare
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  // card opacity animate kare
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  // card upar ya niche kare decide kare
  const isAbove = idx % 2 === 0;
  // desktop pe vertical animation
  const cardY = useTransform(scrollYProgress, [start, end], [isAbove ? 30 : -30, 0]);
  // mobile pe horizontal animation
  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  // desktop layout render
  if (layout === "desktop") {
    return (
      <div className="relative flex-1 flex justify-center items-center min-w-0" key={`${exp.company}-${exp.role}-${idx}`}>
        {/* timeline marker */}
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
        {/* marker ke upar/niche choti line */}
        <motion.div
          className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
          style={{ height: 40, opacity: cardOpacity }}
        />
        {/* experience card */}
        <motion.article
          className={`absolute ${isAbove ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
          style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3">{exp.company} | {exp.duration}</p>
          <p className="text-md text-gray-300 break-words">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  // mobile layout render
  return (
    <div key={`${exp.company}-${exp.role}-m-${idx}`} className="relative flex items-start">
      {/* mobile timeline marker */}
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      {/* mobile experience card */}
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
        style={{ opacity: cardOpacity, x: cardX }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className="text-lg font-semibold break-words">{exp.role}</h3>
        <p className="text-sm text-gray-400 mb-2 break-words">{exp.company} | {exp.duration}</p>
        <p className="text-sm text-gray-300 break-words">{exp.description}</p>
      </motion.article>
    </div>
  );
}

// main Experience component
const Experience = () => {
  const sceneRef = React.useRef(null); // scroll section ref
  const [isMobile, setIsMobile] = React.useState(false); // mobile state

  // window size check
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // scene height set karo
  const SCENE_HEIGHT_VH = isMobile ? 100 * experiences.length * 1.6 : 100 * experiences.length * 1.2;

  // scroll progress lo
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  // thresholds nikal do
  const numExperiences = experiences.length;
  const thresholds = React.useMemo(
    () => Array.from({ length: numExperiences }, (_, i) => (i + 1) / numExperiences),
    [numExperiences]
  );

  // timeline line animate kare
  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white">
      {/* dynamic height container */}
      <div ref={sceneRef} style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }} className="relative">
        <div className="sticky top-0 h-screen flex flex-col">
          {/* section title */}
          <div className="shrink-0 px-6 pt-8">
            <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">Experience</h2>
          </div>
          {/* timeline container */}
          <div className="flex-1 flex items-center justify-center px-6 pb-10">
            {/* desktop timeline */}
            <div className="relative w-full max-w-7xl hidden md:block">
              {/* horizontal line */}
              <div className="relative h-[6px] bg-white/15 rounded">
                <motion.div className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left" style={{ width: lineWidth }} />
              </div>
              {/* desktop items */}
              <div className="relative flex justify-between mt-0">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  );
                })}
              </div>
            </div>
            {/* mobile timeline */}
            <div className="relative w-full max-w-md md:hidden">
              {/* vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded">
                <motion.div className="absolute top-0 left-0 w-[6px] bg-white rounded origin-top" style={{ height: lineHeight }} />
              </div>
              {/* mobile items */}
              <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-m-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; // Exporting Experience component