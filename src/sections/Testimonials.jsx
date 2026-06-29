// React import karo
import React from "react";

// testimonials images
import m1 from "../assets/m1.png"; // male pic
import m2 from "../assets/m2.png"; // male pic
import w1 from "../assets/w1.png"; // female pic
import w2 from "../assets/w2.png"; // female pic

// Framer Motion import
import { motion } from "framer-motion";

// motion shortcuts
const MH2 = motion.h2; // animated h2
const MDiv = motion.div; // animated div

// testimonial data
const testimonials = [
  {
    name: "Yash Sahu",
    role: "Software Engineer at HCL Technologies",
    review:
      "Gaurav is a visionary developer. His attention to detail and creativity blew us away. Our project was a massive success because of him.",
    image: m1, // image
  },
  {
    name: "Heather Forster",
    role: "UI/UX Designer at PixelWorks",
    review:
      "Working with Gaurav was an absolute pleasure. He brings design and code together like magic. Highly recommend him!",
    image: w1,
  },
  {
    name: "Amy Jacobsan",
    role: "Tech Manager at CodeEmpire",
    review:
      "From concept to execution, Gaurav handled everything flawlessly. His work ethic and innovation are unmatched.",
    image: m2,
  },
  {
    name: "Carry Smith",
    role: "CTO at Innovate Labs",
    review:
      "Gaurav transformed our outdated platform into something modern and powerful. His skills are world-class.",
    image: w2,
  },
];

// testimonials component
function Testimonials() {
  return (
    // section wrapper
    <section
      id="testimonials" // section id
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20"
      // full height
    >
      {/* title animation */}
      <MH2
        initial={{ opacity: 0, y: -50 }} // start hidden
        animate={{ opacity: 1, y: 0 }} // fade in
        transition={{ duration: 0.6 }} // duration
        className="text-4xl font-bold mb-16" // title style
      >
        What People Say
      </MH2>

      {/* testimonial grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* map testimonials */}
        {testimonials.map((testi, idx) => (
          <MDiv
            key={testi.name + idx} // unique key
            initial={{ opacity: 0, y: 50 }} // start hidden
            whileInView={{ opacity: 1, y: 0 }} // viewport mai animate
            transition={{ duration: 0.5, delay: idx * 0.2 }} // delay
            viewport={{ once: true }} // ek baar
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:-rotate-1"
            // card style
          >
            {/* person image */}
            <img
              src={testi.image} // image
              alt={testi.name} // alt
              className="w-20 h-20 rounded-full border-2 border-white/40 mb-4 object-cover"
              // gol image
              loading="lazy" // lazy load
            />

            {/* review text */}
            <p className="text-gray-200 italic mb-4">
              "{testi.review}"
            </p>

            {/* name */}
            <h3 className="text-lg font-semibold">{testi.name}</h3>

            {/* role */}
            <p className="text-sm text-gray-400">{testi.role}</p>
          </MDiv>
        ))}
      </div>
    </section>
  );
}

// Exporting the component so it can be used in App.jsx
export default Testimonials;