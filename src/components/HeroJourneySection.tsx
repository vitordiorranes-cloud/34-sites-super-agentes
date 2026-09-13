import React, { useState, useEffect } from "react";
import { Sparkles, ChevronRight, CheckCircle2, Shield, AlertTriangle } from "lucide-react";

interface Step {
  step: number;
  kicker: string;
  title: string;
  desc: string;
  badge: string;
  heroQuote: string;
  legalNote?: string;
  highlight?: boolean;
}

const STEPS: Step[] = [
  {
    step: 1,
    kicker: "Etapa 1 · O Ponto de Partida",
    title: "A Escolha da Porta Certa",
    desc: "Mapeamento da via de residência legal qualificada (Nômade Digital, Não Lucrativa, Trabalho ou Empreendedor) que computa tempo para o Art. 22 do Código Civil Espanhol.",
    badge: "No Brasil",
    heroQuote: "Mapeamento preciso da via de residência que computa para cidadania.",
    legalNote: "O Estrategista (#02) garante que você não gaste tempo com estâncias que não contam para passaporte."
  },
  {
    step: 2,
    kicker: "Etapa 2 · O Pouso Seguro",
    title: "Fixação Legal & Documentos",
    desc: "Desembarque com documentação blindada. Emissão de NIE, empadronamento municipal na prefeitura, cartão de residência TIE e conta bancária espanhola.",
    badge: "Mês 1",
    heroQuote: "NIE, TIE, empadronamento e conta bancária em ordem cronológica.",
    legalNote: "O Despachante (#03) e Primeiros 30 Dias (#10) organizam a sequência sem perder prazos."
  },
  {
    step: 3,
    kicker: "Etapa 3 · A Contagem dos 2 Anos",
    title: "Residência Efetiva e Contínua",
    desc: "Os 24 meses de residência legal. Gestão do teto legal de ausências da Espanha para blindar a contagem contínua exigida pela lei de nacionalidade.",
    badge: "24 Meses",
    heroQuote: "Gestão do teto de ausências e renovações dentro das normas da lei.",
    legalNote: "O Esquadrão vigia o calendário para garantir que a contagem dos 2 anos nunca seja zerada."
  },
  {
    step: 4,
    kicker: "Etapa 4 · A Consagração",
    title: "Protocolo de Nacionalidade",
    desc: "Cumpridos os 2 anos de residência legal (privilégio ibero-americano do Art. 22 CC), você protocola o pedido no Ministério da Justiça da Espanha.",
    badge: "Art. 22 CC",
    heroQuote: "Exames oficiais DELE A2, teste CCSE e pasta documental blindada.",
    legalNote: "El Profesor Dom Manuel (#09) valida a base jurídica do protocolo para aprovação direta."
  },
  {
    step: 5,
    kicker: "Etapa 5 · O Legado Perpétuo",
    title: "O Passaporte Europeu na Mão",
    desc: "Cidadania espanhola concedida: o passaporte vermelho na mão para você e seus filhos, com direito vitalício de viver, trabalhar e estudar em qualquer país da União Europeia.",
    badge: "União Europeia",
    heroQuote: "Passaporte europeu vitalício e hereditário para as próximas gerações.",
    legalNote: "Um marco perpétuo que transforma a realidade de 3 gerações da sua família.",
    highlight: true
  }
];

export const HeroJourneySection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = STEPS[activeStep - 1];
  const progressPercent = ((activeStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <section className="py-10 sm:py-12 bg-[#F7F3EC] border-b border-[#E4DDCF] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho Enxuto e Claro */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#A31E22] uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#A31E22]" />
            <span>A Rota da Cidadania em 5 Etapas</span>
          </div>
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#13213F]">
            Da decisão ao passaporte em <span className="text-[#A31E22]">5 etapas claras</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#6B655D] mt-1 font-sans">
            Brasileiros têm o direito histórico de solicitar nacionalidade após apenas 2 anos de residência legal (Art. 22 do Código Civil Espanhol).
          </p>
        </div>

        {/* Trilha do Herói Interativa */}
        <div className="bg-white border border-[#E4DDCF] rounded-2xl p-4 sm:p-6 shadow-xs">
          {/* Barra de Progresso */}
          <div className="relative mb-5 pt-1">
            <div className="h-2 bg-[#E4DDCF] rounded-full w-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#13213F] via-[#A31E22] to-[#DC2626] transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Seletor dos 5 Degraus */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
            {STEPS.map((s) => {
              const isCurrent = s.step === activeStep;
              const isPast = s.step < activeStep;

              return (
                <button
                  key={s.step}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveStep(s.step);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? "bg-[#13213F] text-white border-[#13213F] shadow-sm"
                      : isPast
                      ? "bg-[#F7F3EC] text-[#13213F] border-[#E4DDCF] hover:border-[#13213F]"
                      : "bg-white text-[#6B655D] border-[#E4DDCF] hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                        isCurrent
                          ? "bg-[#A31E22] text-white"
                          : isPast
                          ? "bg-[#13213F] text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {isPast ? "✓" : s.step}
                    </span>
                    <span className="font-bold opacity-80">{s.badge}</span>
                  </div>
                  <span
                    className={`text-xs font-bold font-serif-brand leading-tight truncate ${
                      isCurrent ? "text-amber-200" : "text-[#13213F]"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Card Detalhado da Etapa Ativa */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#E4DDCF] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#A31E22] text-white">
                  {current.kicker}
                </span>
                <span className="text-xs font-bold text-[#13213F] font-mono">
                  Etapa {current.step} de 5
                </span>
              </div>

              <h3 className="font-serif-brand text-lg sm:text-xl font-bold text-[#13213F]">
                {current.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                {current.desc}
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{current.heroQuote}</span>
                </div>
                {current.legalNote && (
                  <div className="text-[11px] text-[#A31E22] font-mono font-medium">
                    ⚡ {current.legalNote}
                  </div>
                )}
              </div>
            </div>

            {/* Controles de Navegação */}
            <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#E4DDCF]">
              <button
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveStep((prev) => (prev >= 5 ? 1 : prev + 1));
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#13213F] hover:bg-[#0C162B] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                <span>{activeStep === 5 ? "Reiniciar Trilha" : "Próxima Etapa"}</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
              </button>
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="px-2.5 py-2 text-xs font-mono font-bold rounded-lg border border-[#E4DDCF] text-[#6B655D] hover:text-[#13213F] bg-white cursor-pointer"
                title={isAutoPlaying ? "Pausar" : "Auto-reproduzir"}
              >
                {isAutoPlaying ? "⏸" : "▶"}
              </button>
            </div>
          </div>

          {/* Aviso Didático Rápido */}
          <div className="mt-3 p-2.5 rounded-xl bg-[#FFFBEB] border border-[#F59E0B]/40 text-[#92400E] flex items-center gap-2 text-xs">
            <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
            <div className="leading-snug">
              <strong>Art. 22.1 do Código Civil Espanhol:</strong> O tempo exigido para brasileiros é de apenas <strong>2 anos</strong> (contra 10 anos para o resto do mundo). O Esquadrão garante sua entrada pela via qualificada.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
