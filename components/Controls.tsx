import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface ControlsProps {
  currentStepId: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ currentStepId, totalSteps, onNext, onPrev, onReset }) => {
  return (
    <div className="flex items-center gap-4 bg-surface p-2 rounded-xl border border-white/10 shadow-lg">
      <button 
        onClick={onReset}
        className="p-3 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
        title="Почати з початку"
      >
        <RotateCcw size={20} />
      </button>

      <div className="h-8 w-px bg-white/10 mx-2"></div>

      <button 
        onClick={onPrev}
        disabled={currentStepId === 1}
        className={`p-3 rounded-lg flex items-center gap-2 transition-all ${
            currentStepId === 1 
            ? 'opacity-50 cursor-not-allowed text-slate-500' 
            : 'hover:bg-white/5 text-white'
        }`}
      >
        <ChevronLeft size={20} />
        <span className="hidden sm:inline font-medium">Назад</span>
      </button>

      <div className="text-slate-500 text-sm font-mono min-w-[60px] text-center">
        {currentStepId} / {totalSteps}
      </div>

      <button 
        onClick={onNext}
        disabled={currentStepId === totalSteps}
        className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg ${
            currentStepId === totalSteps 
            ? 'opacity-50 cursor-not-allowed text-slate-500 bg-white/5' 
            : 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
        }`}
      >
        <span className="hidden sm:inline font-medium">Далі</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};