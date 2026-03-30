import React from "react";
import { Zap, Twitter, Linkedin, Github } from "lucide-react";

const LandingFooter = () => {
  return (
    <footer className="py-12 lg:py-16 px-6 bg-[#050b14] border-t border-white/5" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-medium tracking-tight">VoltCharge</span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed max-w-xs">
              The world's most advanced management platform for electric vehicle infrastructure. Powering the future of mobility.
            </p>
            <div className="flex gap-4 mt-8">
              <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all border border-white/5">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all border border-white/5">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all border border-white/5">
                <Github className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-300">Product</h5>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Mobile App</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-300">Company</h5>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Press</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-600 font-medium">
            © {new Date().getFullYear()} VoltCharge System. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-slate-600 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
