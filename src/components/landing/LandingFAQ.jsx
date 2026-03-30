import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { LANDING_FAQS } from "../../data/constants";

const LandingFAQ = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <section className="section-container">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-medium text-center mb-16">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {LANDING_FAQS.map((faq, i) => (
            <div key={i} className="border-b border-white/5 last:border-0 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full py-6 flex justify-between items-center text-left hover:text-cyan-400 transition-colors"
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFaq === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`transition-all duration-300 ease-in-out ${activeFaq === i ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFAQ;
