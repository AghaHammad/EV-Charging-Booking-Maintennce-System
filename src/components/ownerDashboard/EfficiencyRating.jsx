import React from 'react';
import { Thermometer, ShieldCheck } from 'lucide-react';
import { Card } from '../../utils/common/ui/Card';
import { motion } from 'framer-motion';

export const EfficiencyRating = () => {
  return (
    <Card title="Efficiency Rating">
      <div className="flex flex-col items-center justify-center space-y-8 py-6">
        <div className="relative w-56 h-56 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="112"
              cy="112"
              r="96"
              stroke="currentColor"
              strokeWidth="14"
              fill="transparent"
              className="text-surface-light"
            />
            <motion.circle
              cx="112"
              cy="112"
              r="96"
              stroke="currentColor"
              strokeWidth="14"
              fill="transparent"
              strokeDasharray="602.88"
              initial={{ strokeDashoffset: 602.88 }}
              animate={{ strokeDashoffset: 602.88 * (1 - 0.94) }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="text-brand"
              strokeLinecap="round"
            />
          </svg>

         
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
            <h3 className="text-6xl font-black text-text-primary tracking-tighter">A+</h3>
            <p className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Optimal</p>
          </div>

         
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
            className="absolute top-6 right-6 w-14 h-14 bg-brand rounded-2xl flex items-center justify-center shadow-2xl shadow-brand/40"
          >
            <ShieldCheck className="text-bg-dark" size={28} />
          </motion.div>
        </div>

        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-3 text-text-secondary">
            <Thermometer size={16} className="text-brand" />
            <p className="text-[10px] font-black uppercase tracking-[0.15em] leading-relaxed">
              Node is operating at <span className="text-brand">94% thermal efficiency</span>.
            </p>
          </div>
          <p className="text-[10px] text-text-secondary font-bold max-w-[240px] mx-auto opacity-50 uppercase tracking-widest">
            Performance is within optimal parameters for current load.
          </p>
        </div>
      </div>
    </Card>
  );
};
