import React from "react";
import { ArrowRight, PlayCircle, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import landingherocar from "../../assets/Images/landingherocar.jpg";
import landingherocharginghub from "../../assets/Images/landingherocharginghub.jpg";

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-[10px] uppercase tracking-widest font-medium text-cyan-400">AI-DRIVEN FLEET MANAGEMENT</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-medium leading-[1.1] mb-6">
              Power Your EV <br />
              Operations with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Smart Systems</span>
            </h1>
            <p className="text-slate-400 text-base lg:text-lg max-w-xl mb-10 leading-relaxed">
              Optimize your charging infrastructure with our all-in-one management platform. Real-time monitoring, automated maintenance, and deep analytics for fleets and providers.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button onClick={() => navigate("/signup")} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-medium rounded-full flex items-center justify-center gap-2 group transition-all shadow-xl shadow-cyan-500/20">
                Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 font-medium rounded-full flex items-center justify-center gap-2 transition-all">
                <PlayCircle className="w-5 h-5 text-cyan-400" /> Watch Demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
              <img
               src={landingherocar}
               alt="Premium EV"
               className="relative rounded-[2rem] object-cover w-full h-[450px] border border-white/10 shadow-2xl shadow-cyan-500/5"
              />
              <div className="absolute top-10 -right-4 lg:-right-8 bg-[#0d1520]/90 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-medium tracking-widest">Peak Power</span>
                    <p className="text-lg font-medium text-white">350kW Sync</p>
                  </div>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[90%] h-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                </div>
              </div>

              <div className="absolute bottom-10 -left-4 lg:-left-8 bg-[#0d1520]/90 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-2xl">
                <span className="text-2xl font-semibold text-cyan-400">99.9%</span>
                <p className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Network Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-medium text-slate-500 uppercase tracking-[0.3em] mb-12">
            TRUSTED BY GLOBAL INFRASTRUCTURE LEADERS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            {["VOLTECH", "GRIDCORE", "NEXUS_EV", "FLOWCHARGE", "AMPERA"].map((brand) => (
              <span key={brand} className="text-2xl font-black italic tracking-tighter hover:text-cyan-400 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#050b14] to-[#0a121e]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-medium leading-[1.2]">
                Optimized for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Premium Performance</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Our management system is fine-tuned for high-performance electric vehicles. From the Audi e-tron's rapid charging cycles to Tesla's advanced battery management, we ensure your infrastructure delivers peak performance for every premium brand in your fleet.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-medium text-slate-400">Audi e-tron High-Speed Sync</div>
                <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-medium text-slate-400">Tesla V3/V4 Integration</div>
                <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-medium text-slate-400">Unified Fleet Monitoring</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
              <img src={landingherocharginghub} alt="Audi Charging Hub"
              className="relative rounded-[2.5rem] object-cover w-full h-[450px] border border-white/5 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
               />
              <div className="absolute bottom-10 left-10 bg-[#050b14]/80 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-1">Fleet Management</p>
                <h4 className="text-white text-lg font-medium">Audi & Tesla Hub Sync</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingHero;
