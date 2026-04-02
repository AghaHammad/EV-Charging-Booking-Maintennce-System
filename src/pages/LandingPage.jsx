import React, { useState, useEffect } from "react";
import LandingNav from "../components/landingpage/LandingNav";
import LandingHero from "../components/landingpage/LandingHero";
import LandingFeatures from "../components/landingpage/LandingFeatures";
import LandingSolutions from "../components/landingpage/LandingSolutions";
import LandingTestimonials from "../components/landingpage/LandingTestimonials";
import LandingPricing from "../components/landingpage/LandingPricing";
import LandingFAQ from "../components/landingpage/LandingFAQ";
import LandingFooter from "../components/landingpage/LandingFooter";

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050b14] text-white font-sans selection:bg-cyan-500/30">
      <LandingNav 
        isScrolled={isScrolled} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      <LandingHero />
      <LandingFeatures />
      <LandingSolutions />
      <LandingTestimonials />
      <LandingPricing />
      <LandingFAQ />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;