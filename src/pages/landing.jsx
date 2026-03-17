import React, { useState, useEffect } from "react";
import {ArrowRight, PlayCircle, Wrench, BarChart3, Users, ShieldCheck, Layout, ChevronDown, Star, Twitter, Linkedin, Github, Menu, X, Zap, Calendar, Settings, PieChart, CheckCircle2, Globe, Building2} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Solutions", href: "#solutions" },
    { name: "Contact", href: "#contact" },
  ];

  const faqs = [
    {
      question: "Does the system support all charger brands?",
      answer: "Yes, our system is built on open standards and supports all major OCPP-compliant charging stations, including Tesla, ChargePoint, ABB, and more."
    },
    {
      question: "How does auto-maintenance work?",
      answer: "Our AI monitor detects anomalies in real-time. If a fault is identified, the system automatically attempts a remote reset or creates a maintenance ticket for local technicians."
    },
    {
      question: "Can I integrate this with our existing billing?",
      answer: "Absolutely. We provide a robust API and pre-built integrations for major ERP and billing systems like SAP, Oracle, and Stripe."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-white font-sans selection:bg-cyan-500/30">

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#050b14]/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-medium tracking-tight">VoltCharge</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => navigate("/signin")} className="text-sm font-medium text-slate-400 hover:text-white transition-colors px-4 py-2">
              Login
            </button>
            <button onClick={() => navigate("/signup")} className="bg-cyan-500 hover:bg-cyan-400 text-black font-medium text-sm px-6 py-2.5 rounded-full transition-all shadow-lg shadow-cyan-500/20 active:scale-95">
              Get Started
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0a121e] border-b border-white/5 p-6 space-y-4 animate-in slide-in-from-top duration-300">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="block text-lg font-medium text-slate-300" onClick={() => setMobileMenuOpen(false)}>
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
              <button onClick={() => navigate("/signin")} className="w-full text-center text-slate-300 py-2">Login</button>
              <button onClick={() => navigate("/signup")} className="w-full bg-cyan-500 text-black font-medium py-3 rounded-xl">Get Started</button>
            </div>
          </div>
        )}
      </nav>

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
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
                alt="Premium EV"
                className="relative rounded-[2rem] object-cover w-full h-[450px] border border-white/10 shadow-2xl shadow-cyan-500/5"
              />

              <div className="absolute top-10 -right-4 lg:-right-8 bg-[#0d1520]/90 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-medium tracking-widest">Peak Power</div>
                    <div className="text-lg font-medium text-white">350kW Sync</div>
                  </div>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[90%] h-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                </div>
              </div>

              <div className="absolute bottom-10 -left-4 lg:-left-8 bg-[#0d1520]/90 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-2xl">
                <div className="text-2xl font-medium text-cyan-400">99.9%</div>
                <div className="text-[10px] text-slate-400 uppercase font-medium tracking-wider">Network Uptime</div>
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
              <img
                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800"
                alt="Audi and Tesla Charging Hub"
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

      <section id="features" className="py-24 lg:py-40 px-6 relative">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <h2 className="text-3xl lg:text-4xl font-medium mb-6">Advanced Charging Ecosystem</h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Everything you need to monitor, manage, and scale your electric vehicle charging network globally.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Calendar className="w-6 h-6 text-cyan-400" />,
              title: "Smart Booking",
              desc: "AI-powered scheduling that optimizes for energy costs and reduces station congestion automatically."
            },
            {
              icon: <Wrench className="w-6 h-6 text-cyan-400" />,
              title: "Auto-Maintenance",
              desc: "Predictive diagnostics identify hardware issues before they happen, triggering automated repair tickets."
            },
            {
              icon: <BarChart3 className="w-6 h-6 text-cyan-400" />,
              title: "Real-time Analytics",
              desc: "Monitor power consumption, revenue, and usage patterns across your entire global network in real-time."
            }
          ].map((feature, i) => (
            <div key={i} className="bg-[#0d1520] border border-white/5 rounded-3xl p-10 hover:border-cyan-500/30 transition-all group">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="solutions" className="py-24 lg:py-40 bg-[#070d16] px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-medium mb-12">
              Solutions Designed for <br />
              <span className="text-cyan-400">Every Stakeholder</span>
            </h2>
            <div className="space-y-12">
              {[
                {
                  icon: <Users className="w-6 h-6 text-cyan-400" />,
                  title: "For Drivers",
                  desc: "Easy booking, transparent pricing, and instant station navigation."
                },
                {
                  icon: <Building2 className="w-6 h-6 text-cyan-400" />,
                  title: "For Station Owners",
                  desc: "Maximize ROI with automated billing and dynamic load balancing."
                },
                {
                  icon: <Globe className="w-6 h-6 text-cyan-400" />,
                  title: "For Network Admins",
                  desc: "Full fleet visibility, security controls, and global hardware management."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex-shrink-0 flex items-center justify-center border border-white/10">
                    {item.icon}
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
                <div className="text-[10px] text-green-400 font-medium bg-green-400/10 px-2 py-1 rounded">ALL ONLINE</div>
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
                  <div className="text-[10px] text-slate-500 uppercase font-medium tracking-widest mb-1">Total Energy</div>
                  <div className="text-xl font-medium">1.2 GWh</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase font-medium tracking-widest mb-1">Stations</div>
                  <div className="text-xl font-medium">4,821</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-40 px-6">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <h2 className="text-3xl lg:text-4xl font-medium mb-6">Loved by the Industry</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "This platform transformed our charging network from a maintenance nightmare into a profit center.",
              author: "Marcus Thorne",
              role: "COO, Voltaic Solutions",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
              quote: "The real-time monitoring is unmatched. We reduced downtime by 45% in the first quarter.",
              author: "Sarah Jenkins",
              role: "Fleet Director, PowerLogistics",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
            },
            {
              quote: "Finally, a charging solution that scales with our rapid expansion across the EU.",
              author: "Lukas Maeder",
              role: "Ops Manager, EcoCharge",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
            }
          ].map((t, i) => (
            <div key={i} className="bg-[#0d1520] border border-white/5 rounded-3xl p-10 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />)}
                </div>
                <p className="text-base text-slate-300 italic mb-10 leading-relaxed font-medium">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                <div>
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-xs text-slate-500 font-medium">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="py-24 lg:py-40 bg-[#070d16] px-6">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <h2 className="text-3xl lg:text-4xl font-medium mb-6">Flexible Plans</h2>
          <p className="text-slate-400 font-medium">Scale your EV infrastructure from one station to thousands.</p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 relative">
          <div className="bg-[#0d1520] border border-white/5 rounded-3xl p-10 flex flex-col justify-between hover:border-white/10 transition-all">
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

          <div className="bg-[#0d1520] border border-white/5 rounded-3xl p-10 flex flex-col justify-between hover:border-white/10 transition-all">
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

      <section className="py-24 lg:py-40 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-medium text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
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
    </div>
  );
};

export default Landing;