import React from "react";
import { CheckCircle2 } from "lucide-react";

const LandingPricing = () => {
  return (
    <section id="pricing" className="section-container bg-[#070d16]">
      <div className="max-w-7xl mx-auto text-center mb-24">
        <h2 className="text-3xl lg:text-4xl font-medium mb-6">Flexible Plans</h2>
        <p className="text-slate-400 font-medium">Scale your EV infrastructure from one station to thousands.</p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 relative">
        <div className="glass-card flex flex-col justify-between hover:border-white/10">
          <div>
            <h3 className="text-xl font-medium mb-2">Starter</h3>
            <p className="text-slate-500 text-sm mb-8">For small independent hosts</p>
            <div className="text-4xl font-medium mb-8">$49<span className="text-base font-normal text-slate-500">/mo</span></div>
            <ul className="space-y-4 mb-10">
              {[
                "Up to 5 charging points",
                "Standard scheduling",
                "Basic analytics",
                "First-level tech support"
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-400 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <button className="w-full py-4 border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-all">START FREE TRIAL</button>
        </div>

        <div className="bg-[#0d1520] border-2 border-cyan-500 rounded-3xl p-10 flex flex-col justify-between relative shadow-2xl shadow-cyan-500/10">
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-cyan-500 text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase">POPULAR</div>
          <div>
            <h3 className="text-xl font-medium mb-2">Professional</h3>
            <p className="text-slate-500 text-sm mb-8">For growing fleet networks</p>
            <div className="text-4xl font-medium mb-8">$199<span className="text-base font-normal text-slate-500">/mo</span></div>
            <ul className="space-y-4 mb-10">
              {[
                "Up to 50 charging points",
                "Advanced maintenance",
                "Predictive diagnostics",
                "Custom mobile app branding"
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-400 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <button className="w-full py-4 bg-cyan-500 text-black rounded-2xl font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">GO PROFESSIONAL</button>
        </div>

        <div className="glass-card flex flex-col justify-between hover:border-white/10">
          <div>
            <h3 className="text-xl font-medium mb-2">Enterprise</h3>
            <p className="text-slate-500 text-sm mb-8">For global infrastructure</p>
            <div className="text-4xl font-medium mb-8">Custom</div>
            <ul className="space-y-4 mb-10">
              {[
                "Unlimited points",
                "Multi-region support",
                "Dedicated account manager",
                "Custom API integrations"
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-400 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <button className="w-full py-4 border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-all">CONTACT SALES</button>
        </div>
      </div>
    </section>
  );
};

export default LandingPricing;
