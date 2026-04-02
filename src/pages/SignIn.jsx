import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Zap } from 'lucide-react';
import GoogleIcon from "../assets/Icons/GoogleIcon";
import SignInImg from "../assets/Images/signin.jpg"
import { getUser, setSession } from '../utils/Auth';
import { getCurrentYearValue } from '../utils/common/helper';

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(p => { const n = { ...p }; delete n[name]; return n; });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!form.email || !form.password) {
      setErrors({ 
        email: !form.email ? 'Email is required' : '',
        password: !form.password ? 'Password is required' : ''
      });
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
       const user = getUser();
       if (user && user.email === form.email && user.password === form.password) {
         if (user.role === 'owner') {
           setErrors({ auth: 'The Station Owner Dashboard is currently under development. Please sign in as a Client.' });
           setIsSubmitting(false);
         } else {
           setSession(user.email);
           navigate('/client');
         }
       } else {
         setErrors({ auth: 'Invalid credentials. Please try again.' });
         setIsSubmitting(false);
       }
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-[#050b14] text-white font-sans flex flex-col lg:flex-row">
      
      <div className="hidden lg:flex flex-col flex-1 p-12 relative overflow-hidden bg-[#070d16]">
       
        <div className="flex items-center gap-2 mb-20">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-medium tracking-tight whitespace-nowrap">
            VoltCharge
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full">
          <div className="relative mb-12 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur opacity-75 rounded-[2.5rem]"></div>
            <div className="relative bg-[#0d1520] border border-white/10 rounded-[2.5rem] p-2 overflow-hidden shadow-2xl">
              <img 
                src={SignInImg}
                alt="Genesis GV60" 
                className="w-full h-[450px] object-cover rounded-[1.8rem]"
              />
              <div className="absolute bottom-6 left-6 bg-cyan-500/90 backdrop-blur-sm p-2 rounded-xl border border-white/20">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-medium leading-[1.1] mb-6 tracking-tight">
            Powering the <span className="text-cyan-400">Next <br /> Era</span> of Mobility.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed font-normal opacity-80 max-w-md">
            Join thousands of businesses managing their EV fleet and charging infrastructure with our next-gen platform.
          </p>
        </div>

        <div className="flex gap-16 pt-12 border-t border-white/5 mt-auto">
          <div>
            <span className="text-3xl font-medium mb-1">500k+</span>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">Active Stations</p>
          </div>
          <div className="h-12 w-px bg-white/5"></div>
          <div>
            <span className="text-3xl font-medium mb-1">12M</span>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">Charges Monthly</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-8 lg:p-24 pb-12 relative bg-[#050b14]">
        <div className="max-w-md w-full mx-auto flex-1 flex flex-col">
          <div className="mb-10 lg:hidden text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-medium tracking-tight whitespace-nowrap">
                VoltCharge
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-medium mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-xs text-slate-500 font-normal mb-10 opacity-70 italic">Please enter your details to access your dashboard.</p>

            <button className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl py-4 hover:bg-white/10 transition-all mb-8 group">
              <GoogleIcon />
              <span className="font-medium text-sm text-slate-200">Continue with Google</span>
            </button>

            <div className="relative flex items-center mb-8">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="px-4 text-[10px] text-slate-600 uppercase tracking-[0.2em] font-medium bg-[#050b14]">Or login with email</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                <input 
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="agha@company.com"
                  className="w-full bg-[#0d1520] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700"
                />
              </div>

              <div className="space-y-2 relative">
                <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                <div className="relative">
                  <input 
                    type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-[#0d1520] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors">
                    {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded bg-white/5 border-white/10 text-cyan-500 focus:ring-0" />
                  <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">Remember me</span>
                </label>
                <Link to="#" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">Forgot password?</Link>
              </div>

              {errors.auth && <p className="text-rose-500 text-xs text-center">{errors.auth}</p>}

              <button 
                type="submit" disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold py-4 rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-cyan-500/10 active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? 'Verifying...' : 'Sign In to Dashboard'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account? <Link to="/signup" className="text-cyan-400 font-semibold hover:underline">Get Started</Link>
            </p>
          </div>

          <footer className="mt-12 text-center text-[9px] text-slate-600 font-medium uppercase tracking-[0.2em] whitespace-nowrap">
            <p>PRIVACY POLICY TERMS OF SERVICES {getCurrentYearValue()} EV CHARGING INC.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}