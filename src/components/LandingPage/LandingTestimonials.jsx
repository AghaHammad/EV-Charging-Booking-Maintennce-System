import React from "react";
import { Star } from "lucide-react";
import { landingTestimonials } from "../../data/constant";

const LandingTestimonials = () => {
  return (
    <section className="section-container">
      <div className="max-w-7xl mx-auto text-center mb-24">
        <h2 className="text-3xl lg:text-4xl font-medium mb-6">Loved by the Industry</h2>
      </div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {landingTestimonials.map((t, i) => (
          <div key={i} className="glass-card flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-cyan-400 text-cyan-400" />)}
              </div>
              <p className="text-base text-slate-300 italic mb-10 leading-relaxed font-medium">"{t.quote}"</p>
            </div>
            <div className="flex items-center gap-4">
              <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover border border-white/10" />
              <div>
                <p className="font-semibold">{t.author}</p>
                <span className="text-xs text-slate-500 font-medium">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LandingTestimonials;
