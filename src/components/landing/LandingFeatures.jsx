import React from "react";
import { Calendar, Wrench, BarChart3 } from "lucide-react";
import { LANDING_FEATURES } from "../../data/constants";

const LandingFeatures = () => {
  const getIcon = (i) => {
    switch (i) {
      case 0: return <Calendar className="w-6 h-6 text-cyan-400" />;
      case 1: return <Wrench className="w-6 h-6 text-cyan-400" />;
      case 2: return <BarChart3 className="w-6 h-6 text-cyan-400" />;
      default: return null;
    }
  };

  return (
    <section id="features" className="section-container relative">
      <div className="max-w-7xl mx-auto text-center mb-24">
        <h2 className="text-3xl lg:text-4xl font-medium mb-6">Advanced Charging Ecosystem</h2>
        <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed font-medium">
          Everything you need to monitor, manage, and scale your electric vehicle charging network globally.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {LANDING_FEATURES.map((feature, i) => (
          <div key={i} className="glass-card group">
            <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-black transition-all">
              {getIcon(i)}
            </div>
            <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LandingFeatures;
