import React from 'react';
import { Step } from '../types';
import { ArrowRight, Shield, Globe, Lock, Cpu } from 'lucide-react';

interface StepCardProps {
  step: Step;
  totalSteps: number;
}

export const StepCard: React.FC<StepCardProps> = ({ step, totalSteps }) => {
  return (
    <div className="bg-surface/80 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-2xl h-full flex flex-col relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase bg-black/30 px-3 py-1 rounded-full border border-white/5">
                Крок {step.id} з {totalSteps}
            </span>
            {step.showDataPacket && (
                <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    <Lock size={10} />
                    <span>Захищено</span>
                </div>
            )}
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{step.title}</h2>
        
        <div className="bg-black/20 rounded-xl p-4 border border-white/5 mb-6">
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {step.description}
            </p>
        </div>

        {/* Dynamic Context Info */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
             <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex flex-col justify-center">
                <span className="text-slate-500 text-[10px] uppercase tracking-wider mb-2">Де ми зараз?</span>
                <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
                    {step.activeDomain === 'PROMO' && <><Globe size={16} className="text-pink-500"/> <span>Промо Сайт</span></>}
                    {step.activeDomain === 'CLEAN' && <><Shield size={16} className="text-emerald-500"/> <span>Чистий Домен</span></>}
                    {step.activeDomain === 'GOOGLE' && <><div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[8px]">G</div> <span>Google Cloud</span></>}
                </div>
             </div>
             
             {step.showDataPacket ? (
                 <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 flex flex-col justify-center">
                    <span className="text-primary/70 text-[10px] uppercase tracking-wider mb-2">Що передається?</span>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        <ArrowRight size={14} />
                        <span className="truncate">{step.showDataPacket.label}</span>
                    </div>
                 </div>
             ) : (
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex flex-col justify-center opacity-50">
                    <span className="text-slate-500 text-[10px] uppercase tracking-wider mb-2">Дія</span>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                        <Cpu size={14} />
                        <span>Обробка</span>
                    </div>
                 </div>
             )}
        </div>
      </div>
    </div>
  );
};