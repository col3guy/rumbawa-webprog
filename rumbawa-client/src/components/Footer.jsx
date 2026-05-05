import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#3A2316] text-white py-6 flex flex-col items-center justify-center">
      
      {/* Main text */}
      <div className="text-sm sm:text-base opacity-90 mb-2">
        &copy; 2026 All rights reserved
      </div>

      {/* Subtle tagline */}
      <div className="text-xs sm:text-sm text-white/70">
        Built with React & Tailwind CSS
      </div>

    </footer>
  );
};

export default Footer;