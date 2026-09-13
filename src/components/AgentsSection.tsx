import React, { useState } from "react";
import { Sparkles, Zap, Shield, CircleHelp, ChevronRight, Lock, ArrowRight } from "lucide-react";
import { AGENTS_DATA, SECRET_AGENTS_DATA, MASCOTS_CONFIG } from "../data/agents";
import { AgentAvatar } from "./AgentAvatar";
import { Agent } from "../types";

interface AgentsSectionProps {
  onCtaClick?: () => void;
}

export const AgentsSection: React.FC<AgentsSectionProps> = ({ onCtaClick }) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>("capitao");
  const [modalAgent, setModalAgent] = useState<Agent | null>(null);
  const [secretModalAgent, setSecretModalAgent] = useState<Agent | null>(null);

  const activeAgent = AGENTS_DATA.find((a) => a.id === selectedAgentId) || AGENTS_DATA[0];

  const mascot = MASCOTS_CONFIG[activeAgent.id] || {
    mascotName: activeAgent.name,
    badgeColor: "bg-slate-700 text-slate-200 border-slate-600",
    accentHex: "#F59E0B",
    cardBg: "from-[#131D33] to-[#0F172A]",
    borderColor: "border-slate-700",
    glowColor: "",
    superpower: activeAgent.role,
    personality: activeAgent.resolves,
  };

  return (
    <section
      id="esquadrao-agentes"
      className="py-12 sm:py-16 bg-[#0B1222] text-[#F7F3EC] relative overflow-hidden border-b border-slate-800"
    >
      {/* Luzes de Fundo Suaves */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#A31E22]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#1E3A8A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Cabeçalho Limpo com Gatilho em Destaque */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>O Esquadrão COD-E · 7 Super Agentes Oficiais</span>
          </div>

          <h2 className="font-serif-brand text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Sete agentes. Um esquadrão.{" "}
            <span className="text-[#DC2626]">Nenhuma etapa sozinho.</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed mb-3">
            <strong className="text-amber-300">Você não precisa escolher apenas um agente:</strong> ao garantir sua entrada no Código Europa, você recebe o <strong className="text-white">Esquadrão Completo (todos os 7 agentes oficiais)</strong> trabalhando integrados pela sua travessia para a Espanha.
          </p>

          {/* Destaque: ESSE PODE SER O SEU TIME AGORA com Escassez Real */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-red-500/20 to-amber-500/20 border border-amber-400/50 shadow-xl my-1">
            <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-amber-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping inline-block" />
              ESQUADRÃO COMPLETO (7 AGENTES) INCLUSO NO SEU PLANO
            </span>
            <span className="text-[11px] sm:text-xs text-slate-300 font-medium border-t sm:border-t-0 sm:border-l border-amber-400/30 pt-1 sm:pt-0 sm:pl-3">
              ⚡ Acesso imediato liberado · Vagas limitadas para a turma atual
            </span>
          </div>
        </div>

        {/* Galeria de Fotos dos 7 Super Agentes Oficiais */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3 mb-6">
          {AGENTS_DATA.map((agent) => {
            const isSelected = agent.id === selectedAgentId;
            const agMascot = MASCOTS_CONFIG[agent.id];

            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`p-2.5 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between group ${
                  isSelected
                    ? "bg-gradient-to-b from-[#1C2844] to-[#0E172A] border-amber-400 ring-2 ring-amber-400/40 shadow-xl -translate-y-1"
                    : "bg-[#111A2D]/90 border-slate-800 hover:border-slate-600 hover:bg-[#15223A]"
                }`}
              >
                <div className="flex items-center justify-between w-full text-[10px] font-mono px-1 mb-1">
                  <span className={isSelected ? "text-amber-300 font-bold" : "text-slate-400"}>
                    #{agent.number}
                  </span>
                  {agent.isCommander && (
                    <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                      Líder
                    </span>
                  )}
                </div>

                <div className="my-1 relative flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-2xl blur-md opacity-25 group-hover:opacity-60 transition-opacity"
                    style={{ backgroundColor: agMascot?.accentHex || "#F59E0B" }}
                  />
                  <AgentAvatar agentId={agent.id} size={64} />
                </div>

                <div className="mt-1 w-full">
                  <span className={`text-xs font-bold block truncate ${isSelected ? "text-white" : "text-slate-200"}`}>
                    {agent.name}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {agMascot?.superpower.split("·")[0] || agent.role.split("·")[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Ficha Tática Unificada do Agente Selecionado */}
        <div
          className={`bg-gradient-to-br ${mascot.cardBg} border-2 ${mascot.borderColor} ${mascot.glowColor} rounded-3xl p-5 sm:p-7 shadow-2xl relative transition-all duration-300 mb-10`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Coluna Esquerda: Avatar com Foto Real e Identificação */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-amber-300 font-bold">
                  AGENTE #{activeAgent.number}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${mascot.badgeColor}`}
                >
                  {mascot.mascotName}
                </span>
              </div>

              <div className="relative my-2">
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                  style={{ backgroundColor: mascot.accentHex }}
                />
                <AgentAvatar agentId={activeAgent.id} size={120} />
              </div>

              <h3 className="font-serif-brand text-2xl font-bold text-white tracking-wide mt-1">
                {activeAgent.name}
              </h3>
              <p className="text-xs font-semibold text-amber-200 mt-0.5 leading-snug">
                {activeAgent.role}
              </p>

              <button
                onClick={onCtaClick}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#A31E22] hover:from-[#EF4444] hover:to-[#DC2626] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 btn-pulse-urgency"
              >
                <span>QUERO O ESQUADRÃO COMPLETO</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
              <p className="text-[10px] sm:text-[11px] text-amber-200/90 font-medium mt-2 text-center leading-snug">
                🛡️ <strong>Os 7 Agentes inclusos:</strong> Você recebe o time completo trabalhando integrado para você.
              </p>
            </div>

            {/* Coluna Direita: O que resolve, O peso que tira e Exemplo Real */}
            <div className="lg:col-span-8 space-y-3">
              {/* O que ele resolve */}
              <div className="p-3.5 rounded-xl bg-black/35 border border-white/10">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  Como atua na sua travessia
                </span>
                <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
                  {activeAgent.resolves}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* O peso que tira das costas */}
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    O peso que tira das suas costas
                  </span>
                  <p className="text-emerald-100 text-xs leading-relaxed">
                    {activeAgent.relieves}
                  </p>
                </div>

                {/* Pergunta real respondida */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <CircleHelp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    Dúvida real respondida
                  </span>
                  <p className="text-amber-200 italic text-xs leading-relaxed">
                    “{activeAgent.quote}”
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-xs">
                <span className="text-slate-400">
                  <strong className="text-rose-400">⚠️ Risco de tentar sozinho:</strong> {activeAgent.costAlone}
                </span>
                <button
                  onClick={() => setModalAgent(activeAgent)}
                  className="shrink-0 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold border border-slate-600 cursor-pointer self-end sm:self-auto"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ÁREA DOS 3 AGENTES SECRETOS (ELEMENTOS SURPRESA COM CADEADO E FOTO VISÍVEL) */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#131A2D] to-[#0A0F1D] border-2 border-amber-500/40 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-700/70">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-300" />
                  <span>Elementos Surpresa · Força Tática Extra</span>
                </div>
                <h3 className="font-serif-brand text-xl sm:text-2xl font-bold text-white">
                  +3 Agentes Especiais: A Força Secreta de Aceleração
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                  Reforços de altíssimo valor tático, preparados para acelerar pontos estratégicos da sua mudança para a Europa.
                </p>
              </div>

              <div className="shrink-0">
                <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 border border-amber-500/40 px-3.5 py-1.5 rounded-xl inline-flex items-center gap-1.5 shadow-sm">
                  <Lock className="w-3.5 h-3.5" /> Acesso Especial Exclusivo
                </span>
              </div>
            </div>

            {/* Grid dos 3 Agentes com Foto Visível e Cadeado */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {SECRET_AGENTS_DATA.map((agent) => {
                const agMascot = MASCOTS_CONFIG[agent.id];

                return (
                  <div
                    key={agent.id}
                    onClick={() => setSecretModalAgent(agent)}
                    className="relative group rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-[#18233C]/90 to-[#0F1829]/90 border border-amber-400/40 hover:border-amber-400 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Badge de Identificação */}
                    <div className="flex items-center justify-between mb-3 text-[11px] font-mono">
                      <span className="text-amber-300 font-bold">AGENTE #{agent.number}</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold text-[10px]">
                        <Lock className="w-2.5 h-2.5" /> Elemento Surpresa
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="relative shrink-0">
                        {/* Foto 100% Nítida e Visível com o Cadeado Elegante */}
                        <AgentAvatar agentId={agent.id} size={72} isLocked={true} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif-brand text-lg font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {agent.name}
                        </h4>
                        <span className="text-xs text-amber-200/90 font-medium block leading-tight mt-0.5">
                          {agMascot?.superpower.split("·")[0]}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                      {agent.resolves}
                    </p>

                    <div className="pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-amber-300 font-medium flex items-center gap-1 group-hover:underline">
                        <span>Conhecer Habilidade Especial</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Ver Ficha</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ficha Completa do Agente Principal */}
      {modalAgent && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setModalAgent(null)}
        >
          <div
            className="bg-[#121A2D] border-2 border-slate-600 w-full max-w-lg rounded-3xl p-6 text-white relative shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalAgent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar ficha"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700">
              <div className="relative shrink-0">
                <AgentAvatar agentId={modalAgent.id} size={85} />
              </div>
              <div>
                <span className="font-mono text-xs text-amber-400 font-bold block">
                  AGENTE #{modalAgent.number}
                </span>
                <h3 className="font-serif-brand text-2xl font-bold text-white">
                  {modalAgent.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                  {modalAgent.role}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-[#19243C] border border-slate-700">
                <strong className="text-amber-300 block mb-1">Como ele atua:</strong>
                <p className="text-slate-200 leading-relaxed text-xs">{modalAgent.resolves}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#132A26] border border-emerald-900/60">
                <strong className="text-emerald-400 block mb-1">O peso que tira das suas costas:</strong>
                <p className="text-emerald-100 leading-relaxed text-xs">{modalAgent.relieves}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/40 text-xs text-amber-200 flex items-start gap-2">
                <Shield className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>
                  <strong>Time 100% Unificado:</strong> Você não precisa escolher ou contratar agentes isolados. Ao entrar no Código Europa, <strong>todos os 7 Agentes Oficiais</strong> vêm inclusos no seu acesso e trabalham juntos na sua travessia.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <strong className="text-slate-300 block mb-1">Exemplo de comando:</strong>
                <p className="italic text-amber-200 text-xs">“{modalAgent.quote}”</p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-700 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  setModalAgent(null);
                  onCtaClick?.();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#A31E22] hover:from-[#EF4444] hover:to-[#DC2626] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <span>QUERO O ESQUADRÃO COMPLETO (7 AGENTES)</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </button>
              <button
                onClick={() => setModalAgent(null)}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Revelação do Agente Especial (Elemento Surpresa) */}
      {secretModalAgent && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSecretModalAgent(null)}
        >
          <div
            className="bg-[#121A2D] border-2 border-amber-400 w-full max-w-lg rounded-3xl p-6 text-white relative shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSecretModalAgent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              ✕
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
              <Lock className="w-3 h-3" />
              <span>Elemento Surpresa · Habilidade Especial</span>
            </div>

            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700">
              <div className="relative shrink-0">
                <AgentAvatar agentId={secretModalAgent.id} size={90} isLocked={false} />
              </div>
              <div>
                <span className="font-mono text-xs text-amber-400 font-bold block">
                  AGENTE #{secretModalAgent.number}
                </span>
                <h3 className="font-serif-brand text-2xl font-bold text-white">
                  {secretModalAgent.name}
                </h3>
                <p className="text-xs text-amber-200 font-semibold">
                  {secretModalAgent.role}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-[#19243C] border border-slate-700">
                <strong className="text-amber-300 block mb-1 font-semibold">Superpoder Tático do Agente:</strong>
                <p className="text-slate-200 leading-relaxed text-xs">{secretModalAgent.resolves}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs">
                <strong className="text-amber-300 block mb-1 font-bold">Como funciona este reforço no seu plano?</strong>
                <p className="leading-relaxed text-slate-300">
                  Este agente especial é um elemento surpresa exclusivo. Ao garantir sua entrada no Código Europa, você terá a oportunidade única de ativar o acesso a este herói secreto para acelerar sua jornada com suporte de ponta a ponta.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-700 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  setSecretModalAgent(null);
                  onCtaClick?.();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <span>QUERO O ESQUADRÃO COMPLETO + SUPERAGENTES</span>
                <ChevronRight className="w-4 h-4 text-slate-950" />
              </button>
              <button
                onClick={() => setSecretModalAgent(null)}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
