import React from 'react';
import { Zap, Settings, Calendar, DollarSign, MessageSquare, HelpCircle, LogOut } from 'lucide-react';
import { SIDEBAR_LINKS, FOOTER_LINKS } from '../../data/constant';
import { cn } from '../../utils/common/Helper';

const iconMap = {
  Zap,
  Settings,
  Calendar,
  DollarSign,
  MessageSquare,
  HelpCircle,
  LogOut,
};

export const Sidebar = () => {
  const [activeTab, setActiveTab] = React.useState('stations');
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand text-bg-dark rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <Zap size={24} fill="currentColor" />
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-bg-dark/60 backdrop-blur-sm z-40"
        />
      )}

      <aside className={cn(
        "w-64 bg-surface border-r border-border flex flex-col h-screen fixed left-0 top-0 z-40 transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 flex items-center space-x-3">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
            <Zap className="text-bg-dark" size={24} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-sm font-black text-text-primary tracking-widest uppercase">VoltCharge</h1>
            <p className="text-[9px] text-text-secondary font-bold uppercase tracking-[0.2em]">Owner Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            const Icon = iconMap[link.icon];
            const isActive = activeTab === link.id;
            return (
              <div
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={cn(
                  'flex items-center space-x-4 px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer group relative',
                  isActive
                    ? 'text-brand'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-brand rounded-r-full" />
                )}
                <Icon size={20} className={cn('transition-colors', isActive ? 'text-brand' : 'group-hover:text-text-primary')} />
                <span className="text-[11px] font-black tracking-[0.15em] uppercase">{link.label}</span>
              </div>
            );
          })}
        </nav>

        <div className="px-4 py-8 border-t border-border space-y-1">
          {FOOTER_LINKS.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <div
                key={link.id}
                className="flex items-center space-x-4 px-6 py-4 rounded-xl text-text-secondary hover:text-text-primary transition-all duration-200 cursor-pointer group"
              >
                <Icon size={20} className="group-hover:text-text-primary" />
                <span className="text-[11px] font-black tracking-[0.15em] uppercase">{link.label}</span>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};
