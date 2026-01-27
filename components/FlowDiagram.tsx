import React from 'react';
import { DomainType, Step } from '../types';
import { Globe, ShieldCheck, Cloud, ArrowRight } from 'lucide-react';

interface FlowDiagramProps {
  currentStep: Step;
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({ currentStep }) => {
  // Simplified logic: We have 3 fixed "Stations".
  // Promo (Left), Clean (Center), Google (Right).
  
  const getOpacity = (domain: DomainType) => {
    // If it's the active domain, full opacity.
    if (currentStep.activeDomain === domain) return 1;
    // If it's involved in a transfer (from or to), high opacity.
    if (currentStep.showDataPacket && (currentStep.showDataPacket.from === domain || currentStep.showDataPacket.to === domain)) return 0.8;
    return 0.3;
  };

  const getScale = (domain: DomainType) => {
    return currentStep.activeDomain === domain ? 'scale-105 ring-2 ring-offset-2 ring-offset-[#0f172a]' : 'scale-100';
  };

  // Determine arrow position and direction
  let arrowStart = ''; // 'left', 'center', 'right'
  let arrowEnd = '';
  let direction = 'right'; // or 'left'

  if (currentStep.showDataPacket) {
      if (currentStep.showDataPacket.from === DomainType.PROMO) arrowStart = '16%';
      if (currentStep.showDataPacket.from === DomainType.CLEAN) arrowStart = '50%';
      if (currentStep.showDataPacket.from === DomainType.GOOGLE) arrowStart = '84%';

      if (currentStep.showDataPacket.to === DomainType.PROMO) arrowEnd = '16%';
      if (currentStep.showDataPacket.to === DomainType.CLEAN) arrowEnd = '50%';
      if (currentStep.showDataPacket.to === DomainType.GOOGLE) arrowEnd = '84%';

      if (currentStep.showDataPacket.from === DomainType.GOOGLE && currentStep.showDataPacket.to === DomainType.CLEAN) direction = 'left';
      if (currentStep.showDataPacket.from === DomainType.CLEAN && currentStep.showDataPacket.to === DomainType.PROMO) direction = 'left';
  }

  return (
    <div className="w-full h-[400px] bg-surface rounded-2xl border border-white/5 relative flex flex-col justify-center items-center overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, #1e293b 100%)' }}></div>

      {/* Connecting Line (Base) */}
      <div className="absolute top-1/2 left-[16%] right-[16%] h-1 bg-white/5 -translate-y-1/2 z-0"></div>

      {/* Dynamic Arrow/Packet */}
      {currentStep.showDataPacket && (
          <div 
            className="absolute top-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-0 transition-all duration-700 ease-in-out"
            style={{
                left: direction === 'right' ? arrowStart : arrowEnd,
                right: direction === 'right' ? `calc(100% - ${arrowEnd})` : `calc(100% - ${arrowStart})`, // Math is simpler with width but this works for segments
                width: '34%', // Approximate distance between nodes
                transform: 'translateY(-50%)'
            }}
          >
            {/* Moving Particle */}
            <div className={`absolute top-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_#fbbf24] -translate-y-1/2 ${direction === 'right' ? 'animate-[flowRight_1s_infinite]' : 'animate-[flowLeft_1s_infinite]'}`}></div>
          </div>
      )}

      {/* Main Nodes Container */}
      <div className="relative w-full max-w-4xl px-8 flex justify-between items-center z-10">
        
        {/* Node 1: PROMO */}
        <div 
            className={`flex flex-col items-center gap-4 transition-all duration-500 ${getScale(DomainType.PROMO)}`}
            style={{ opacity: getOpacity(DomainType.PROMO) }}
        >
            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl transition-colors duration-500 ${currentStep.activeDomain === DomainType.PROMO ? 'bg-pink-600 shadow-pink-500/30' : 'bg-slate-700'}`}>
                <Globe size={40} className="text-white" />
            </div>
            <div className="text-center">
                <div className="font-bold text-white mb-1">Промо Сайт</div>
                <div className="text-[10px] text-pink-400 font-mono uppercase border border-pink-500/30 rounded px-1">Untrusted</div>
            </div>
        </div>

        {/* Node 2: CLEAN */}
        <div 
            className={`flex flex-col items-center gap-4 transition-all duration-500 ${getScale(DomainType.CLEAN)}`}
            style={{ opacity: getOpacity(DomainType.CLEAN) }}
        >
             <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl transition-colors duration-500 ${currentStep.activeDomain === DomainType.CLEAN ? 'bg-emerald-600 shadow-emerald-500/30' : 'bg-slate-700'}`}>
                <ShieldCheck size={40} className="text-white" />
            </div>
            <div className="text-center">
                <div className="font-bold text-white mb-1">Чистий Домен</div>
                <div className="text-[10px] text-emerald-400 font-mono uppercase border border-emerald-500/30 rounded px-1">Secure Host</div>
            </div>
        </div>

        {/* Node 3: GOOGLE */}
        <div 
            className={`flex flex-col items-center gap-4 transition-all duration-500 ${getScale(DomainType.GOOGLE)}`}
            style={{ opacity: getOpacity(DomainType.GOOGLE) }}
        >
             <div className={`w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl transition-colors duration-500 ${currentStep.activeDomain === DomainType.GOOGLE ? 'bg-blue-600 shadow-blue-500/30' : 'bg-slate-700'}`}>
                <Cloud size={40} className="text-white" />
            </div>
            <div className="text-center">
                <div className="font-bold text-white mb-1">Google API</div>
                <div className="text-[10px] text-blue-400 font-mono uppercase border border-blue-500/30 rounded px-1">OAuth Provider</div>
            </div>
        </div>

      </div>
      
      {/* Action Label Overlay */}
      {currentStep.showDataPacket && (
        <div className="absolute top-[20%] bg-black/50 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-yellow-400 font-mono text-xs flex items-center gap-2 animate-bounce">
            {currentStep.showDataPacket.label}
        </div>
      )}

      {/* Internal CSS for animation */}
      <style>{`
        @keyframes flowRight {
            0% { left: 0; opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
        }
        @keyframes flowLeft {
            0% { right: 0; opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { right: 100%; opacity: 0; }
        }
      `}</style>

    </div>
  );
};