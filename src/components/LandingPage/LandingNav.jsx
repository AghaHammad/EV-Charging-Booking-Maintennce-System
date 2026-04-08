import React from "react";
import { Zap, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { landingNavLinks } from "../../data/constant";

const LandingNav = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();

  const handleNavClick = (href) => {
    if (href.startsWith("#")) {
      const sectionId = href.replace("#", "");
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setMobileMenuOpen(false);
      return;
    }

    navigate(href);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050b14]/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
            <Zap className="text-white w-6 h-6" />
          </div>
          <button type="button" className="text-xl font-medium tracking-tight">
            VoltCharge
          </button>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {landingNavLinks.map((link) => (
            <button
              key={link.name}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors px-4 py-2"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-medium text-sm px-6 py-2.5 rounded-full transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            Get Started
          </button>
        </div>

        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a121e] border-b border-white/5 p-6 space-y-4 animate-in slide-in-from-top duration-300">
          {landingNavLinks.map((link) => (
            <button
              key={link.name}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left text-lg font-medium text-slate-300"
            >
              {link.name}
            </button>
          ))}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => navigate("/signin")}
              className="w-full text-center text-slate-300 py-2"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="w-full bg-cyan-500 text-black font-medium py-3 rounded-xl"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNav;