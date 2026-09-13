import React, { useState } from "react";
import {
  X,
  MapPin,
  Euro,
  Home,
  Briefcase,
  Sun,
  ShieldCheck,
  Compass,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Building,
  Users,
  Calendar,
  Sparkles,
  Zap,
} from "lucide-react";
import { CityDetailedAnalysis, CITY_ANALYSES } from "../data/cityAnalysis";

interface CityAnalysisModalProps {
  cityId: string | null;
  onClose: () => void;
  onSelectCity?: (cityId: string) => void;
  onCtaClick?: () => void;
}

type AnalysisTab = "custo" | "moradia" | "trabalho" | "turismo" | "estrategia";

export const CityAnalysisModal: React.FC<CityAnalysisModalProps> = ({
  cityId,
  onClose,
  onSelectCity,
  onCtaClick,
}) => {
  const [activeTab, setActiveTab] = useState<AnalysisTab>("custo");

  if (!cityId) return null;

  const cityData: CityDetailedAnalysis | undefined = CITY_ANALYSES[cityId];

  // Se não encontrar exatamente, usa o primeiro ou retorna null
  const city = cityData || CITY_ANALYSES["barcelona"];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#0F172A] border-2 border-[#A31E22]/60 w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl text-white relative my-6 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Superior com Foto e Título */}
        <div className="relative h-44 sm:h-56 w-full shrink-0 overflow-hidden bg-slate-900">
          <img
            src={city.heroPhoto}
            alt={`Foto panorâmica de ${city.name}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-black/40" />

          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
            aria-label="Fechar modal de análise"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges e Identificação no Banner */}
          <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#A31E22] text-white text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                ANÁLISE ESTRATÉGICA DIDÁTICA
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-[10px] sm:text-xs font-mono font-bold">
                {city.badge}
              </span>
              {city.isPrimary && (
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-[10px] font-mono">
                  Tríade Principal
                </span>
              )}
            </div>

            <h2 className="font-serif-brand text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{city.name}</span>
              <span className="text-xs sm:text-sm font-sans font-normal text-slate-300">
                ({city.region})
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 line-clamp-1 mt-0.5 font-medium">
              {city.tagline}
            </p>
          </div>
        </div>

        {/* Quick Stats Bar Horizontal */}
        <div className="bg-[#16213B] border-y border-slate-700/80 px-4 py-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Euro className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Aluguel Médio (2Q)</span>
              <strong className="text-emerald-300 text-xs sm:text-sm">{city.quickStats.rentAvg}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Custo Família</span>
              <strong className="text-cyan-200 text-xs sm:text-sm">{city.quickStats.costFamily}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Dias de Sol</span>
              <strong className="text-amber-200 text-xs sm:text-sm">{city.quickStats.sunnyDays}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Segurança Urbana</span>
              <strong className="text-purple-200 text-xs sm:text-sm">{city.quickStats.safetyScore.split(" ")[0]}</strong>
            </div>
          </div>
        </div>

        {/* Abas Temáticas Didáticas (Custo, Moradia, Trabalho, Turismo, Estratégia) */}
        <div className="bg-[#0B1120] px-4 pt-2.5 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("custo")}
            className={`px-3 sm:px-4 py-2 rounded-t-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 border-t-2 ${
              activeTab === "custo"
                ? "bg-[#16213B] text-amber-300 border-amber-400 shadow-sm"
                : "text-slate-400 hover:text-white border-transparent hover:bg-slate-800/40"
            }`}
          >
            <Euro className="w-3.5 h-3.5 text-emerald-400" />
            <span>1. Custo de Vida</span>
          </button>

          <button
            onClick={() => setActiveTab("moradia")}
            className={`px-3 sm:px-4 py-2 rounded-t-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 border-t-2 ${
              activeTab === "moradia"
                ? "bg-[#16213B] text-amber-300 border-amber-400 shadow-sm"
                : "text-slate-400 hover:text-white border-transparent hover:bg-slate-800/40"
            }`}
          >
            <Home className="w-3.5 h-3.5 text-cyan-400" />
            <span>2. Moradia & Bairros</span>
          </button>

          <button
            onClick={() => setActiveTab("trabalho")}
            className={`px-3 sm:px-4 py-2 rounded-t-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 border-t-2 ${
              activeTab === "trabalho"
                ? "bg-[#16213B] text-amber-300 border-amber-400 shadow-sm"
                : "text-slate-400 hover:text-white border-transparent hover:bg-slate-800/40"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>3. Trabalho & Mercado</span>
          </button>

          <button
            onClick={() => setActiveTab("turismo")}
            className={`px-3 sm:px-4 py-2 rounded-t-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 border-t-2 ${
              activeTab === "turismo"
                ? "bg-[#16213B] text-amber-300 border-amber-400 shadow-sm"
                : "text-slate-400 hover:text-white border-transparent hover:bg-slate-800/40"
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>4. Turismo & Lazer</span>
          </button>

          <button
            onClick={() => setActiveTab("estrategia")}
            className={`px-3 sm:px-4 py-2 rounded-t-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 border-t-2 ${
              activeTab === "estrategia"
                ? "bg-[#16213B] text-amber-300 border-amber-400 shadow-sm"
                : "text-slate-400 hover:text-white border-transparent hover:bg-slate-800/40"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>5. Estratégia COD-E</span>
          </button>
        </div>

        {/* Conteúdo da Aba com Rolagem Limpa */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm leading-relaxed bg-[#111A2E]/60">
          {/* ABA 1: CUSTO DE VIDA */}
          {activeTab === "custo" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-[#162442] border border-slate-700">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5 mb-1.5 font-mono uppercase">
                  <Euro className="w-4 h-4 text-emerald-400" />
                  Panorama Financeiro Geral
                </h4>
                <p className="text-slate-200 leading-relaxed">
                  {city.livingCost.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-1">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase block">
                    🛒 Supermercado & Alimentação
                  </span>
                  <p className="text-slate-300 text-xs">
                    {city.livingCost.supermarket}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-1">
                  <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase block">
                    🚇 Transporte Público Integrado
                  </span>
                  <p className="text-slate-300 text-xs">
                    {city.livingCost.transport}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-1">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase block">
                    💡 Contas (Luz, Água, Gás, Fibra)
                  </span>
                  <p className="text-slate-300 text-xs">
                    {city.livingCost.utilities}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-1">
                  <span className="text-[11px] font-mono font-bold text-purple-400 uppercase block">
                    🍽️ Restaurantes & Menu del Día
                  </span>
                  <p className="text-slate-300 text-xs">
                    {city.livingCost.diningOut}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-start gap-2.5">
                <TrendingDown className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300 text-xs block font-mono uppercase">
                    Veredito de Orçamento Mensal
                  </strong>
                  <p className="text-emerald-100 text-xs mt-0.5">
                    {city.livingCost.monthlyBudgetNote}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ABA 2: MORADIA & BAIRROS */}
          {activeTab === "moradia" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-[#162442] border border-slate-700">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5 mb-1.5 font-mono uppercase">
                  <Home className="w-4 h-4 text-cyan-400" />
                  Panorama do Mercado Imobiliário
                </h4>
                <p className="text-slate-200 leading-relaxed">
                  {city.housing.overview}
                </p>
              </div>

              {/* Faixas Médias de Aluguel por Tipologia */}
              <div>
                <span className="text-xs font-mono font-bold uppercase text-slate-300 block mb-2">
                  Faixas de Aluguel Habitual Médio (Contrato de Longa Duração):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">1 Quarto (T1)</span>
                    <strong className="text-amber-300 text-sm font-bold">{city.housing.averageRents.t1}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700 text-center ring-1 ring-amber-400/40">
                    <span className="text-[10px] text-amber-300 uppercase font-mono block font-bold">2 Quartos (T2 · Padrão)</span>
                    <strong className="text-emerald-300 text-sm font-bold">{city.housing.averageRents.t2}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">3 Quartos (T3 · Família)</span>
                    <strong className="text-cyan-300 text-sm font-bold">{city.housing.averageRents.t3}</strong>
                  </div>
                </div>
              </div>

              {/* Bairros Recomendados */}
              <div>
                <span className="text-xs font-mono font-bold uppercase text-slate-300 block mb-2">
                  Bairros Estratégicos Recomendados pelo Esquadrão:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {city.housing.bestNeighborhoods.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        <span>{b.name}</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {b.why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requisitos e Empadronamento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[11px] font-mono font-bold text-slate-300 uppercase block mb-1">
                    📋 Requisitos Comuns de Contrato:
                  </span>
                  <p className="text-slate-300 text-xs">
                    {city.housing.rentalRequirements}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/50">
                  <span className="text-[11px] font-mono font-bold text-cyan-300 uppercase block mb-1">
                    📍 Dica de Empadronamiento:
                  </span>
                  <p className="text-cyan-100 text-xs">
                    {city.housing.empadronamientoTip}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: TRABALHO & MERCADO */}
          {activeTab === "trabalho" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-[#162442] border border-slate-700">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5 mb-1.5 font-mono uppercase">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  Economia e Mercado de Trabalho
                </h4>
                <p className="text-slate-200 leading-relaxed">
                  {city.jobMarket.overview}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase text-slate-300 block mb-2">
                  Setores com Mais Contratações e Oportunidades:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {city.jobMarket.topSectors.map((sector, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs font-semibold text-slate-200">{sector}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Faixa Salarial Especializada</span>
                  <strong className="text-amber-300 text-xs sm:text-sm font-bold block mt-0.5">
                    {city.jobMarket.averageSalary}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Acolhimento a Estrangeiros</span>
                  <p className="text-slate-300 text-xs mt-0.5 leading-snug">
                    {city.jobMarket.foreignFriendly}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Nômade Digital & Home Office</span>
                  <p className="text-slate-300 text-xs mt-0.5 leading-snug">
                    {city.jobMarket.nomadRemoteFriendly}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ABA 4: TURISMO & LAZER */}
          {activeTab === "turismo" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-[#162442] border border-slate-700">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5 mb-1.5 font-mono uppercase">
                  <Sun className="w-4 h-4 text-amber-400" />
                  Estilo de Vida, Clima e Cultura
                </h4>
                <p className="text-slate-200 leading-relaxed">
                  {city.tourismAndLifestyle.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase block mb-1">
                    ☀️ Comportamento do Clima ao Longo do Ano:
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {city.tourismAndLifestyle.climate}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
                  <span className="text-[11px] font-mono font-bold text-purple-400 uppercase block mb-1">
                    🛡️ Segurança Pública e Criação dos Filhos:
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {city.tourismAndLifestyle.safetyAndFamily}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase text-slate-300 block mb-2">
                  Atrações e Lazer Obrigatório:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {city.tourismAndLifestyle.leisureAndCulture.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center gap-2 text-xs text-slate-200"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ABA 5: ESTRATÉGIA COD-E */}
          {activeTab === "estrategia" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1C2945] to-[#0F172A] border-2 border-red-500/40 shadow-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Posicionamento Tático do Esquadrão COD-E</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white mb-2">
                  Por que escolher {city.name} como porto de desembarque na Espanha?
                </h4>
                <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
                  {city.codEStrategy.whyChoose}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-cyan-300 uppercase block">
                  ⏱️ Ritmo de Trâmite em Extranjería:
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {city.codEStrategy.immigrationPace}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border-l-4 border-amber-400 p-3">
                <strong className="text-amber-300 text-xs uppercase font-mono block mb-1">
                  💡 Dica de Ouro do Mentor Vitor & Esquadrão:
                </strong>
                <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
                  &ldquo;{city.codEStrategy.mentorGoldenTip}&rdquo;
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé com Navegação entre Cidades e Botão de Ação */}
        <div className="bg-[#0B101E] border-t border-slate-800 p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Seletor rápido de outra cidade */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase shrink-0">Trocar cidade:</span>
            {Object.keys(CITY_ANALYSES).map((cId) => (
              <button
                key={cId}
                onClick={() => {
                  if (onSelectCity) onSelectCity(cId);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  cId === city.id
                    ? "bg-amber-400 text-slate-950 shadow-xs"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {CITY_ANALYSES[cId].name.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* CTA Principal de Conversão */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              Fechar
            </button>

            <button
              onClick={() => {
                onClose();
                if (onCtaClick) onCtaClick();
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#A31E22] hover:from-[#EF4444] hover:to-[#DC2626] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer btn-pulse-urgency"
            >
              <span>QUERO O ESQUADRÃO PARA ME GUIAR EM {city.name.toUpperCase()}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
