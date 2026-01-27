import React, { useState } from 'react';
import { STEPS } from './constants';
import { FlowDiagram } from './components/FlowDiagram';
import { StepCard } from './components/StepCard';
import { Controls } from './components/Controls';
import { ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = STEPS[currentStepIndex];
  const totalSteps = STEPS.length;

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-emerald-500/30">
      
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <ShieldCheck className="text-white" size={18} />
                </div>
                <h1 className="text-lg font-bold text-slate-200 tracking-tight">
                    Secure OAuth <span className="text-emerald-500">Visualizer</span>
                </h1>
            </div>
            <div className="text-xs text-slate-500 font-mono hidden md:block">
                v2.0 • CLEAN ARCHITECTURE
            </div>
          </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Top Controls Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
                 <h2 className="text-3xl font-bold text-white mb-2">Як це працює?</h2>
                 <p className="text-slate-400">
                    Покрокова візуалізація безпечної авторизації через Google для промо-сайтів.
                    Ми використовуємо проміжний "Чистий домен" для захисту даних.
                 </p>
            </div>
            <Controls 
                currentStepId={currentStep.id} 
                totalSteps={totalSteps}
                onNext={handleNext} 
                onPrev={handlePrev}
                onReset={handleReset}
            />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main Visual Stage (Top/Left) */}
            <div className="lg:col-span-12 xl:col-span-8">
                <FlowDiagram currentStep={currentStep} />
            </div>

            {/* Description Card (Right/Bottom) */}
            <div className="lg:col-span-12 xl:col-span-4 min-h-[300px]">
                <StepCard step={currentStep} totalSteps={totalSteps} />
            </div>

        </div>

      </main>
    </div>
  );
}