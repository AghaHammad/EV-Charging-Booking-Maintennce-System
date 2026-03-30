import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { saveUser } from '../../utils/auth';

export default function SignUpForm() {
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
    <>
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
                name="fullName" type="text" placeholder="Qaiser"
                value={form.fullName} onChange={handleChange}
                className={`w-full bg-[#0a1219] border ${errors.fullName ? 'border-rose-500' : 'border-white/5'} rounded-2xl pl-12 pr-6 py-4.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700`}
              />
              {errors.fullName && <p className="text-rose-500 text-[10px] uppercase font-bold tracking-wider mt-1 ml-2">{errors.fullName}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan-500 transition-colors" />
              <input 
                name="email" type="email" placeholder="qaiser@voltcharge.com"
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
    </>
  );
}
