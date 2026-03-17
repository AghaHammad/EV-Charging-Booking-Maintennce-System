import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Zap, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  ShieldCheck, 
  ArrowRight,
  ShieldAlert,
  CreditCard,
  Activity,
  Cloud
} from 'lucide-react';
import { saveUser } from '../utils/auth';

const CURRENT_YEAR = new Date().getFullYear();

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    isOwner: false,
    agreed: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(form.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!form.agreed) {
      newErrors.agreed = 'You must agree to the terms';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      saveUser({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.isOwner ? 'owner' : 'client'
      });
      navigate('/signin');
    }, 1500);
  };

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

            
            <div className="w-full max-w-[340px] bg-black/40 p-1.5 rounded-2xl flex items-center mb-10 border border-white/5">
              <button
                type="button"
                onClick={() => setForm(p => ({ ...p, isOwner: false }))}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${!form.isOwner ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
              >
                <User className="w-4 h-4" />
                Client
              </button>
              <button
                type="button"
                onClick={() => setForm(p => ({ ...p, isOwner: true }))}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${form.isOwner ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
              >
                <Zap className="w-4 h-4" />
                Station Owner
              </button>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-6">
              
              <div className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan-500 transition-colors" />
                    <input 
                      name="fullName" type="text" placeholder="John Doe"
                      value={form.fullName} onChange={handleChange}
                      className={`w-full bg-[#0a1219] border ${errors.fullName ? 'border-rose-500' : 'border-white/5'} rounded-2xl pl-12 pr-6 py-4.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700`}
                    />
                    {errors.fullName && <p className="text-rose-500 text-[10px] uppercase font-bold tracking-wider mt-1 ml-2">{errors.fullName}</p>}
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan-500 transition-colors" />
                    <input 
                      name="email" type="email" placeholder="john@company.com"
                      value={form.email} onChange={handleChange}
                      className={`w-full bg-[#0a1219] border ${errors.email ? 'border-rose-500' : 'border-white/5'} rounded-2xl pl-12 pr-6 py-4.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700`}
                    />
                    {errors.email && <p className="text-rose-500 text-[10px] uppercase font-bold tracking-wider mt-1 ml-2">{errors.email}</p>}
                  </div>
                </div>

                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan-500 transition-colors" />
                    <input 
                      name="phone" type="text" placeholder="+1 (555) 000-0000"
                      value={form.phone} onChange={handleChange}
                      className={`w-full bg-[#0a1219] border ${errors.phone ? 'border-rose-500' : 'border-white/5'} rounded-2xl pl-12 pr-6 py-4.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700`}
                    />
                    {errors.phone && <p className="text-rose-500 text-[10px] uppercase font-bold tracking-wider mt-1 ml-2">{errors.phone}</p>}
                  </div>
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan-500 transition-colors" />
                      <input 
                        name="password" type="password" placeholder="••••••••"
                        value={form.password} onChange={handleChange}
                        className={`w-full bg-[#0a1219] border ${errors.password ? 'border-rose-500' : 'border-white/5'} rounded-2xl pl-12 pr-6 py-4.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700`}
                      />
                      {errors.password && <p className="text-rose-500 text-[10px] uppercase font-bold tracking-wider mt-1 ml-2">{errors.password}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 ml-1">Confirm Password</label>
                    <div className="relative group">
                      <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan-500 transition-colors" />
                      <input 
                        name="confirmPassword" type="password" placeholder="••••••••"
                        value={form.confirmPassword} onChange={handleChange}
                        className={`w-full bg-[#0a1219] border ${errors.confirmPassword ? 'border-rose-500' : 'border-white/5'} rounded-2xl pl-12 pr-6 py-4.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700`}
                      />
                      {errors.confirmPassword && <p className="text-rose-500 text-[10px] uppercase font-bold tracking-wider mt-1 ml-2">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="pt-2">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="mt-1 relative flex items-center justify-center">
                    <input 
                      type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} 
                      className="w-5 h-5 rounded-full appearance-none bg-[#0a1219] border border-white/10 checked:bg-cyan-500 checked:border-cyan-500 transition-all cursor-pointer" 
                    />
                    {form.agreed && <ShieldCheck className="w-3 h-3 text-black absolute pointer-events-none" />}
                  </div>
                  <span className="text-xs text-slate-500 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">
                    I agree to the <Link to="#" className="text-cyan-500 hover:underline">Terms of Service</Link> and <Link to="#" className="text-cyan-500 hover:underline">Privacy Policy</Link>, including automatic payment authorization.
                  </span>
                </label>
                {errors.agreed && <p className="text-rose-500 text-[10px] uppercase font-bold tracking-wider mt-1 ml-9">{errors.agreed}</p>}
              </div>

              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold py-5 rounded-2xl text-[16px] hover:opacity-90 shadow-[0_20px_40px_-10px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating Account...' : 'Get Started'}
                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            <p className="mt-8 text-slate-500 text-sm">
              Already have an account? <Link to="/signin" className="text-cyan-500 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>

       
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl opacity-40">
          <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            <Cloud className="w-5 h-5" />
            Secure Cloud
          </div>
          <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            <CreditCard className="w-5 h-5" />
            Instant Payouts
          </div>
          <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            <Activity className="w-5 h-5" />
            Live Analytics
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-[10px] font-bold text-slate-700 uppercase tracking-widest z-10">
        © {CURRENT_YEAR} VoltCharge Ecosystem • Built for the Future of Energy
      </footer>
    </div>
  );
}
