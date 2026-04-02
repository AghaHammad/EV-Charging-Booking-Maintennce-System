import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, CreditCard, Activity, Cloud } from 'lucide-react';
import SignUpForm from '../Components/Auth/SignUpForm';
import { getCurrentYearValue } from '../utils/common/helper';

export default function SignUp() {
  return (
    <div className="min-h-screen bg-[#050b14] text-white font-sans selection:bg-cyan-500/30 flex flex-col relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full"></div>
      </div>

      <header className="px-8 lg:px-24 py-10 flex justify-between items-center z-10 w-full max-w-[1920px] mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight">VoltCharge</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <Link to="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Help Center</Link>
          <Link to="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Pricing</Link>
          <Link 
            to="/signin" 
            className="px-6 py-2.5 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-all"
          >
            Log In
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10">
        <div className="w-full max-w-[620px]">
          
          <div className="bg-[#0b131c]/50 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 lg:p-14 shadow-2xl relative overflow-hidden flex flex-col items-center">
            
            <div className="text-center mb-10">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight">Create Account</h1>
              <p className="text-slate-500 text-sm">Join the world's most intelligent EV charging SaaS network.</p>
            </div>

            <SignUpForm />

            <p className="mt-8 text-slate-500 text-sm">
              Already have an account? <Link to="/signin" className="text-cyan-500 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl opacity-40">
          <p className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
          <Cloud className="w-5 h-5" />
           Secure Cloud
         </p>
          <p className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            <CreditCard className="w-5 h-5" />
            Instant Payouts
          </p>
          <p className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            <Activity className="w-5 h-5" />
            Live Analytics
          </p>
        </div>
      </main>

      <footer className="py-12 text-center text-[10px] font-bold text-slate-700 uppercase tracking-widest z-10">
       <p> © {getCurrentYearValue()} VoltCharge Ecosystem • Built for the Future of Energy</p>
      </footer>
    </div>
  );
}
