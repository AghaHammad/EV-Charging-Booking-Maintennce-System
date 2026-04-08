import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

export const Topbar = () => {
  return (
    <header className="h-20 bg-surface border-b border-border flex items-center justify-between px-4 md:px-8 lg:px-12 fixed top-0 right-0 left-0 md:left-64 z-30 backdrop-blur-md bg-opacity-80">
      <div className="flex items-center space-x-4 md:space-x-8 lg:space-x-12">
        <h2 className="text-base md:text-lg lg:text-xl font-black text-text-primary tracking-tight">Station Editor</h2>
        <div className="relative w-40 md:w-64 lg:w-96 group hidden sm:block">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search facilities..."
            className="w-full bg-surface-light border border-border rounded-xl pl-14 pr-6 py-3 text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-brand/30 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <button className="p-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all relative group">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-brand rounded-full border-2 border-surface" />
          </button>
          <button className="p-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all">
            <Settings size={20} />
          </button>
        </div>

        <div className="h-10 w-[1px] bg-border" />

        <div className="flex items-center space-x-4 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-text-primary group-hover:text-brand transition-colors">Marcus V.</p>
            <p className="text-[9px] text-text-secondary font-bold uppercase tracking-[0.2em]">Premium Operator</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-light border border-border overflow-hidden flex items-center justify-center group-hover:border-brand/30 transition-all shadow-lg">
            <img
              src="https://picsum.photos/seed/marcus/100/100"
              alt="Profile"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
