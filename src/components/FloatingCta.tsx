import React, { useState, useEffect } from "react";
import { Shield, Sparkles, ArrowRight } from "lucide-react";

interface FloatingCtaProps {
  onCtaClick?: () => void;
}

export const FloatingCta: React.FC<FloatingCtaProps> = ({ onCtaClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside
      id="floating-cta-bar"
      aria-label="Barra flutuante de compra"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B132B]/95 backdrop-blur-md text-[#F7F3EC] border-t-2 border-[#A31E22] py-3.5 px-4 shadow-[0_-10px_35px_rgba(0,0,0,0.5)] transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#A31E22]/30 border border-[#F87171] shrink-0">
              <Shield className="w-5 h-5 text-amber-300 animate-bounce" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-brand font-bold text-xs sm:text-sm text-white flex items-center gap-1">
                  8 Super Agentes + Confraria Europa
                </span>
                <span className="hidden md:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Acesso Vitalício
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-200 font-medium">
                🛡️ Risco Zero: 7 dias de garantia incondicional · R$ 297 ou 12x
              </p>
            </div>
          </div>
          <div className="sm:hidden text-right">
            <span className="text-[10px] text-slate-300 block">12x de</span>
            <span className="text-sm font-extrabold text-amber-300">R$ 29,64</span>
          </div>
        </div>

        <div className="w-full sm:w-auto flex items-center gap-3">
          <div className="hidden lg:block text-right">
            <span className="text-xs text-slate-300 block">Sem mensalidades</span>
            <span className="text-xs font-bold text-amber-300">Acesso Vitalício</span>
          </div>
          <button
            id="floating-cta-button"
            onClick={onCtaClick}
            data-checkout="true"
            className="group relative w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#DC2626] via-[#A31E22] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] text-white rounded-xl px-6 py-3.5 text-xs sm:text-sm font-black tracking-wider uppercase shadow-[0_0_30px_rgba(220,38,38,0.8)] hover:shadow-[0_0_45px_rgba(239,68,68,1)] hover:scale-105 active:scale-95 transition-all duration-200 border border-amber-300/60 cursor-pointer btn-pulse-urgency"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span className="drop-shadow-md">QUERO MEU TIME DE AGENTES AGORA</span>
            <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </aside>
  );
};
