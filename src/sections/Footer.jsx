// Footer section
import React from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";


const socials = [
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/abhinikesh-k-223a08336/" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/Abhinikesh" },
  { Icon: FaXTwitter, label: "X", href: "https://x.com/Abhinikesh_" },
  { Icon: SiLeetcode, label: "LeetCode", href: "https://leetcode.com/your-username/" },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(133, 76, 12, 0.9)) drop-shadow(0 0 18px rgba(101, 112, 103, 0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black">
      {/* prishthbhoomi neon glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,204,0.35),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,185,129,0.30),transparent_70%)]" />

      {/* main footer samagri */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} // Start faded & lowered
        whileInView={{ opacity: 1, y: 0 }} // Animate when scrolled into view
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6"
      >
        {/* naam / brand */}
        <div className="w-full">
          <h1
            className="font-bangers font-semibold leading-none text-white text-center select-none"
            style={{
              fontSize: "clamp(3rem, 5vw, 14rem)", // Responsive scaling
              letterSpacing: "0.02em",
              lineHeight: 0.9,
              paddingLeft: "3vw",
              paddingRight: "3vw",
              whiteSpace: "nowrap",
              textShadow: "0 2px 18px rgba(0,0,0,0.45)",
            }}
          >
            Abhinikesh kumar
          </h1>
        </div>

        {/* line */}
        <div className="h-[3px] w-24 md:w-32 rounded-full bg-gradient-to-r from-[#0D58CC] via-cyan-300 to-emerald-400" />

        {/* social link */}
        <div className="flex gap-5 text-2xl md:text-3xl">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label} // Accessible label
              target="_blank"
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-gray-300 transition-colors duration-200"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon /> {/* Icon for each social */}
            </motion.a>
          ))}
        </div>

        {/* copyright */}
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Abhinikesh. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;