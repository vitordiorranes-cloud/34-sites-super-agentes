import React, { useState } from "react";
import { Lock } from "lucide-react";

interface AgentAvatarProps {
  agentId: string;
  className?: string;
  size?: number;
  isLocked?: boolean;
}

const AGENT_IMAGE_MAP: Record<string, string> = {
  capitao: "/assets/agents/capitao.jpg",
  estrategista: "/assets/agents/estrategista.jpg",
  despachante: "/assets/agents/despachante.jpg",
  financeiro: "/assets/agents/financeiro.jpg",
  bussola: "/assets/agents/bussola.jpg",
  joselito: "/assets/agents/joselito.jpg",
  comissario: "/assets/agents/comissario.jpg",
  agente34: "/assets/agents/agente34.jpg",
  dommanuel: "/assets/agents/dom_manuel.jpg",
  primeiros30dias: "/assets/agents/primeiros30.jpg",
};

const AGENT_BORDER_COLORS: Record<string, string> = {
  capitao: "border-red-500 shadow-red-500/30",
  estrategista: "border-amber-400 shadow-amber-400/30",
  despachante: "border-rose-500 shadow-rose-500/30",
  financeiro: "border-emerald-500 shadow-emerald-500/30",
  bussola: "border-sky-400 shadow-sky-400/30",
  joselito: "border-yellow-400 shadow-yellow-400/30",
  comissario: "border-blue-400 shadow-blue-400/30",
  agente34: "border-purple-400 shadow-purple-400/30",
  dommanuel: "border-rose-400 shadow-rose-400/30",
  primeiros30dias: "border-orange-400 shadow-orange-400/30",
};

export const AgentAvatar: React.FC<AgentAvatarProps> = ({
  agentId,
  className = "",
  size = 120,
  isLocked = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const imageSrc = AGENT_IMAGE_MAP[agentId] || "/assets/agents/capitao.jpg";
  const borderStyle = AGENT_BORDER_COLORS[agentId] || "border-amber-400 shadow-amber-400/20";

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className={`w-full h-full rounded-2xl overflow-hidden border-2 ${borderStyle} bg-slate-900 shadow-lg relative transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`}
      >
        {!imageError ? (
          <img
            src={imageSrc}
            alt={`Super Agente ${agentId}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-white font-bold font-mono text-xl">
            {agentId.slice(0, 2).toUpperCase()}
          </div>
        )}

        {/* Badge Elegante com Cadeado Dourado para Elementos Surpresa */}
        {isLocked && (
          <div className="absolute bottom-1.5 right-1.5 z-10 flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 px-1.5 py-0.5 rounded-md shadow-md border border-amber-200 font-mono font-extrabold text-[9px]">
            <Lock className="w-2.5 h-2.5 stroke-[2.5]" />
            <span>EXCLUSIVO</span>
          </div>
        )}
      </div>
    </div>
  );
};
