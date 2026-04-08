import React from "react";
import { Users, Building2, Globe } from "lucide-react";
import { landingSolutions } from "../../data/constant";

const LandingSolutions = () => {
  const getIcon = (i) => {
    switch (i) {
      case 0: return <Users className="w-6 h-6 text-cyan-400" />;
      case 1: return <Building2 className="w-6 h-6 text-cyan-400" />;
      case 2: return <Globe className="w-6 h-6 text-cyan-400" />;
      default: return null;
    }
  };

  return (
    <section id="solutions" className="section-container border-t border-white/5 bg-[#070d16]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-medium mb-12">
            Solutions Designed for <br />
            <span className="text-cyan-400">Every Stakeholder</span>
          </h2>
          <div className="space-y-12">
            {landingSolutions.map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/10">
                  {getIcon(i)}
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                  <p className="text-slate-500 font-normal leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="bg-[#0d1520] rounded-[2.5rem] border border-white/10 p-8 shadow-2xl relative">
            <div className="flex justify-between items-center mb-10">
              <h4 className="font-medium">Network Health</h4>
              <span className="text-[10px] text-green-400 font-medium bg-green-400/10 px-2 py-1 rounded">ALL ONLINE</span>
            </div>
            <div className="space-y-6 mb-12">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500"><span>North Region</span><span>98%</span></div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-cyan-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500"><span>EMEA Nodes</span><span>92%</span></div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-blue-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500"><span>Global Latency</span><span>14ms</span></div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-purple-500"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[10px] text-slate-500 uppercase font-medium tracking-widest mb-1">Total Energy</span>
                <p className="text-xl font-medium">1.2 GWh</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[10px] text-slate-500 uppercase font-medium tracking-widest mb-1">Stations</span>
                <p className="text-xl font-medium">4,821</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingSolutions;
