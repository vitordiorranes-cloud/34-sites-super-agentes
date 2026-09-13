import React, { useState } from "react";
import { Navigation, MapPin, Sparkles, Euro, Sun, ChevronRight, Compass } from "lucide-react";
import { MAP_CITIES } from "../data/destinations";

interface SpainMapProps {
  hoveredCityId?: string | null;
  onCitySelect?: (id: string) => void;
  onOpenAnalysis?: (id: string) => void;
}

export const SpainMap: React.FC<SpainMapProps> = ({
  hoveredCityId,
  onCitySelect,
  onOpenAnalysis,
}) => {
  const [internalCityId, setInternalCityId] = useState<string>("barcelona");

  const currentId = hoveredCityId || internalCityId || "barcelona";
  const activeCity = MAP_CITIES.find((c) => c.id === currentId) || MAP_CITIES[0];

  const handleSelectCity = (id: string) => {
    setInternalCityId(id);
    if (onCitySelect) onCitySelect(id);
  };

  const handleTriggerAnalysis = () => {
    if (onOpenAnalysis) {
      onOpenAnalysis(activeCity.id);
    }
  };

  return (
    <div className="bg-[#111A2E] border border-slate-700/80 rounded-3xl p-4 sm:p-7 shadow-2xl text-white mb-4 overflow-hidden relative">
      {/* Grade sutil de fundo militar/tático */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Cabeçalho do Mapa */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 relative z-10 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#A31E22]/20 border border-[#A31E22]/40 text-[#FCA5A5] text-[11px] font-mono uppercase tracking-wider mb-1">
            <Navigation className="w-3 h-3 text-amber-300" />
            <span>Mapa Dinâmico da Espanha</span>
          </div>
          <h3 className="font-serif-brand text-xl sm:text-2xl font-bold text-white">
            Passe o mouse ou toque nos pontos para ver as cidades em destaque
          </h3>
          <p className="text-xs text-slate-400">
            Descubra as características geográficas, custo de moradia e infraestrutura em cada ponto do território espanhol.
          </p>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-300 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] ring-2 ring-amber-400" />
            <strong className="text-amber-200">Tríade Principal</strong> (BCN · MAD · VLC)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 ring-1 ring-cyan-200" />
            <span>Polos Estratégicos</span>
          </span>
        </div>
      </div>

      {/* Grid Principal: Mapa Interativo à Esquerda + Card Resumo à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        {/* Lado Esquerdo: Container do Mapa com SVG Geográfico e Camada HTML de Marcadores */}
        <div className="lg:col-span-7 bg-[#0A101E] rounded-2xl p-3 sm:p-5 border border-slate-800 relative shadow-inner">
          <div className="relative w-full aspect-[500/380] max-w-lg mx-auto select-none">
            {/* SVG Base do Mapa */}
            <svg
              viewBox="0 0 500 380"
              className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="spainLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E2B47" />
                  <stop offset="60%" stopColor="#172238" />
                  <stop offset="100%" stopColor="#121A2C" />
                </linearGradient>

                <linearGradient id="portugalLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0E1626" />
                  <stop offset="100%" stopColor="#0A101D" />
                </linearGradient>

                <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Linhas de grade sutis de coordenadas */}
              <circle cx="250" cy="190" r="170" fill="none" stroke="#22324F" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.35" />
              <circle cx="250" cy="190" r="110" fill="none" stroke="#22324F" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.35" />

              {/* Silhueta de Portugal (para contexto da Península Ibérica) */}
              <path
                d="M 52 75 
                   L 80 77 
                   L 88 115 
                   L 95 160 
                   L 98 220 
                   L 90 270 
                   L 85 305 
                   L 55 315 
                   L 35 305 
                   L 32 230 
                   L 38 150 
                   L 45 95 Z"
                fill="url(#portugalLandGradient)"
                stroke="#1E2B44"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <text x="60" y="195" fill="#324463" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold" letterSpacing="1.5">
                PORTUGAL
              </text>

              {/* Silhueta Realista da Espanha Continental */}
              <path
                d={`M 52 75
                    C 58 60, 68 45, 80 40
                    C 110 38, 140 42, 175 44
                    C 210 46, 240 50, 265 58
                    C 290 64, 330 72, 380 78
                    C 410 82, 425 86, 436 92
                    C 438 102, 425 120, 415 135
                    C 400 160, 390 185, 375 208
                    C 365 225, 360 245, 368 268
                    C 370 282, 355 298, 338 308
                    C 320 318, 295 335, 275 344
                    C 250 354, 220 362, 195 362
                    C 175 362, 160 366, 150 360
                    C 140 354, 130 342, 115 330
                    L 85 305
                    L 90 270
                    L 98 220
                    L 95 160
                    L 88 115
                    L 80 77
                    Z`}
                fill="url(#spainLandGradient)"
                stroke="#374F75"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Divisões Regionais / Comunidades Autônomas Estratégicas */}
              {/* Catalunha */}
              <path d="M 436 92 C 395 100, 375 140, 368 185" fill="none" stroke="#223657" strokeWidth="1" strokeDasharray="2 3" />
              {/* Comunidade Valenciana */}
              <path d="M 368 185 C 345 220, 340 260, 338 308" fill="none" stroke="#223657" strokeWidth="1" strokeDasharray="2 3" />
              {/* Andaluzia */}
              <path d="M 85 305 C 130 290, 210 280, 275 344" fill="none" stroke="#223657" strokeWidth="1" strokeDasharray="2 3" />
              {/* Madri (Centro do poder) */}
              <ellipse cx="240" cy="186" rx="28" ry="24" fill="none" stroke="#2C4066" strokeWidth="0.8" strokeDasharray="2 3" />
              {/* Galícia */}
              <path d="M 80 40 C 95 70, 88 115, 80 77" fill="none" stroke="#223657" strokeWidth="1" strokeDasharray="2 3" />
              {/* País Basco */}
              <path d="M 240 50 C 255 75, 280 85, 290 64" fill="none" stroke="#223657" strokeWidth="1" strokeDasharray="2 3" />

              {/* Malha de Trens de Alta Velocidade (AVE) conectando Madrid a toda Espanha */}
              {/* Madrid -> Zaragoza -> Barcelona */}
              <path d="M 240 186 Q 285 155 325 129 T 410 133" fill="none" stroke="#EAB308" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
              {/* Madrid -> Valencia -> Alicante */}
              <path d="M 240 186 Q 300 200 355 216 T 340 254" fill="none" stroke="#EAB308" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
              {/* Madrid -> Sevilha / Málaga / Granada */}
              <path d="M 240 186 Q 185 240 135 300" fill="none" stroke="#EAB308" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
              <path d="M 185 245 Q 190 285 195 319" fill="none" stroke="#EAB308" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />
              <path d="M 195 270 Q 215 295 235 308" fill="none" stroke="#EAB308" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />
              {/* Madrid -> Bilbao / Norte */}
              <path d="M 240 186 Q 250 120 260 60" fill="none" stroke="#EAB308" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />
              {/* Madrid -> Galícia */}
              <path d="M 240 186 Q 150 130 65 76" fill="none" stroke="#EAB308" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />

              {/* Ilhas Baleares (Mallorca, Menorca, Ibiza) */}
              <g transform="translate(425, 210)">
                {/* Mallorca */}
                <ellipse cx="10" cy="5" rx="17" ry="12" fill="url(#spainLandGradient)" stroke="#374F75" strokeWidth="1.4" />
                {/* Menorca */}
                <ellipse cx="38" cy="-8" rx="9" ry="6" fill="url(#spainLandGradient)" stroke="#374F75" strokeWidth="1.2" />
                {/* Ibiza & Formentera */}
                <ellipse cx="-22" cy="22" rx="8" ry="6" fill="url(#spainLandGradient)" stroke="#374F75" strokeWidth="1.2" />
                <ellipse cx="-20" cy="33" rx="4" ry="2.5" fill="url(#spainLandGradient)" stroke="#374F75" strokeWidth="1" />
                <text x="10" y="32" fill="#4B638A" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                  Baleares
                </text>
              </g>

              {/* Box Ilhas Canárias (Inset Oficial no Canto Inferior Esquerdo) */}
              <g transform="translate(15, 290)">
                <rect x="0" y="0" width="80" height="46" rx="6" fill="#090E1A" stroke="#22334E" strokeWidth="1" />
                <ellipse cx="30" cy="23" rx="9" ry="6" fill="#1C2B47" stroke="#364E76" strokeWidth="1" />
                <ellipse cx="54" cy="22" rx="9" ry="7" fill="#1C2B47" stroke="#364E76" strokeWidth="1" />
                <ellipse cx="70" cy="14" rx="4" ry="2.5" fill="#1C2B47" stroke="#364E76" strokeWidth="0.8" />
                <ellipse cx="12" cy="26" rx="3.5" ry="2.5" fill="#1C2B47" stroke="#364E76" strokeWidth="0.8" />
                <text x="40" y="39" fill="#5A79A8" fontSize="7.5" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold" letterSpacing="1">
                  CANÁRIAS
                </text>
              </g>

              {/* Rótulos de Mares e Oceanos */}
              <text x="240" y="28" fill="#3D547A" fontSize="9" fontFamily="sans-serif" textAnchor="middle" letterSpacing="2" fontWeight="600">
                MAR CANTÁBRICO
              </text>
              <text x="435" y="160" fill="#3D547A" fontSize="9" fontFamily="sans-serif" textAnchor="middle" letterSpacing="2" fontWeight="600">
                MAR MEDITERRÂNEO
              </text>
              <text x="45" y="45" fill="#3D547A" fontSize="8.5" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1.5" fontWeight="600">
                ATLÂNTICO
              </text>
            </svg>

            {/* CAMADA HTML DOS MARCADORES INTERATIVOS: 100% precisa, responsiva e clicável */}
            <div className="absolute inset-0 pointer-events-none">
              {MAP_CITIES.map((city) => {
                const isSelected = city.id === currentId;
                const isPrimary = city.isPrimary;

                return (
                  <div
                    key={city.id}
                    style={{ left: `${city.coords.x}%`, top: `${city.coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group z-20"
                    onMouseEnter={() => handleSelectCity(city.id)}
                    onClick={() => {
                      handleSelectCity(city.id);
                      if (onOpenAnalysis) onOpenAnalysis(city.id);
                    }}
                    title={`Clique para ver a análise completa de ${city.name}`}
                  >
                    {/* Efeito Halo Pulsante quando ativa */}
                    {isSelected && (
                      <span className="absolute -inset-3 rounded-full bg-[#DC2626]/40 animate-ping pointer-events-none" />
                    )}

                    {/* Marcador do Ponto */}
                    <div
                      className={`relative flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "w-8 h-8 rounded-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] ring-4 ring-amber-400 text-white shadow-[0_0_25px_rgba(220,38,38,0.9)] scale-110 z-30"
                          : isPrimary
                          ? "w-6 h-6 rounded-full bg-[#A31E22] ring-2 ring-amber-300 text-white shadow-md hover:scale-125 z-25"
                          : "w-4.5 h-4.5 rounded-full bg-cyan-400 ring-2 ring-slate-950 text-slate-950 shadow-sm hover:scale-125 z-20"
                      }`}
                    >
                      {isPrimary || isSelected ? (
                        <MapPin className={`${isSelected ? "w-4.5 h-4.5 text-amber-200" : "w-3.5 h-3.5 text-white"}`} />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                      )}
                    </div>

                    {/* Tooltip com Nome da Cidade */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-200 pointer-events-none ${
                        isSelected
                          ? "top-9 px-2.5 py-1 rounded-lg bg-slate-950/95 border border-amber-400/90 text-amber-200 text-xs font-black shadow-xl z-40 scale-100 opacity-100"
                          : isPrimary
                          ? "top-7 px-1.5 py-0.5 rounded bg-black/80 text-slate-200 text-[10px] font-bold opacity-85 group-hover:opacity-100 group-hover:text-white"
                          : "top-6 px-1.5 py-0.5 rounded bg-black/70 text-slate-300 text-[9px] font-semibold opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {city.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              Clique em qualquer ponto do mapa para abrir a análise didática detalhada
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
              Rede de Alta Velocidade (AVE) inclusa
            </span>
          </div>
        </div>

        {/* Lado Direito: Card Resumo Interativo da Cidade Selecionada com Abertura Direta da Análise */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#17233D] to-[#0F172A] border-2 border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl relative flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-semibold">
                <MapPin className="w-3 h-3 text-amber-400" />
                {activeCity.region}
              </span>

              {activeCity.isPrimary ? (
                <span className="px-2 py-0.5 rounded-full bg-[#A31E22] text-white text-[10px] font-mono uppercase font-bold tracking-wider">
                  Tríade Principal
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono">
                  Polo Estratégico
                </span>
              )}
            </div>

            <h4 className="font-serif-brand text-2xl sm:text-3xl font-bold text-white mb-1">
              {activeCity.name}
            </h4>
            <span className="text-xs font-semibold text-cyan-300 block mb-3">
              {activeCity.badge}
            </span>

            {/* Foto e Descrição */}
            <div className="relative h-40 sm:h-44 rounded-xl overflow-hidden mb-3.5 border border-slate-700 shadow-md group">
              <img
                src={activeCity.photoUrl}
                alt={`Foto da cidade de ${activeCity.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <p className="text-xs font-medium text-slate-200 line-clamp-2">
                  {activeCity.lifestyle}
                </p>
              </div>
            </div>

            {/* Mini Indicadores */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-semibold mb-0.5">
                  <Euro className="w-3 h-3 text-emerald-400" />
                  Aluguel Médio (2Q)
                </div>
                <div className="text-xs sm:text-sm font-bold text-emerald-300 font-mono">
                  {activeCity.rentEstimate}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-semibold mb-0.5">
                  <Sun className="w-3 h-3 text-amber-400" />
                  Destaque Principal
                </div>
                <div className="text-xs sm:text-sm font-bold text-amber-200 truncate">
                  {activeCity.badge.split("&")[0] || "Excelente"}
                </div>
              </div>
            </div>
          </div>

          {/* BOTÃO PRINCIPAL: Ver Análise Didática Completa (Abre o Card Didático) */}
          <button
            onClick={handleTriggerAnalysis}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#A31E22] hover:from-[#EF4444] hover:to-[#DC2626] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer btn-pulse-urgency"
          >
            <span>VER ANÁLISE DIDÁTICA COMPLETA DE {activeCity.name.toUpperCase()}</span>
            <ChevronRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </div>

      {/* Botões Rápidos e Diretos de Todas as Cidades Abaixo do Mapa */}
      <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          Selecione a cidade:
        </span>
        {MAP_CITIES.map((city) => (
          <button
            key={city.id}
            onClick={() => handleSelectCity(city.id)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              city.id === currentId
                ? "bg-amber-400 text-slate-950 font-black shadow-md scale-105 ring-2 ring-amber-300/60"
                : city.isPrimary
                ? "bg-[#A31E22]/30 text-amber-200 hover:bg-[#A31E22]/50 border border-[#A31E22]/50"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
};
