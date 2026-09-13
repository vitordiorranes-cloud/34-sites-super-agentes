import React, { useState } from "react";
import { Compass } from "lucide-react";
import { SpainMap } from "./SpainMap";
import { CityAnalysisModal } from "./CityAnalysisModal";

interface DestinationsSectionProps {
  onCtaClick?: () => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({ onCtaClick }) => {
  const [selectedCityId, setSelectedCityId] = useState<string>("barcelona");
  const [modalCityId, setModalCityId] = useState<string | null>(null);

  const handleOpenAnalysis = (cityId: string) => {
    setSelectedCityId(cityId);
    setModalCityId(cityId);
  };

  return (
    <section
      id="destinos-da-travessia"
      className="py-12 sm:py-16 bg-[#F4EFE6] border-y border-[#E4DDCF] relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 border border-red-300 text-[#A31E22] text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5 text-[#A31E22]" />
            <span>Rotas Reais & Geografia Estratégica</span>
          </div>

          <h2 className="font-serif-brand text-2xl sm:text-4xl font-extrabold text-[#13213F] mb-3">
            O Mapa da sua Mudança:{" "}
            <span className="text-[#A31E22]">Qual cidade combina com seu plano?</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#5A554E] max-w-2xl mx-auto leading-relaxed">
            Navegue pelo mapa interativo da Espanha e selecione qualquer cidade para abrir a{" "}
            <strong className="text-[#13213F]">análise didática completa</strong> com custo de vida detalhado, faixas de aluguel por bairro, mercado de trabalho e recomendações do Esquadrão COD-E.
          </p>
        </div>

        {/* MAPA DINÂMICO INTERATIVO COM ANÁLISE COMPLETA */}
        <SpainMap
          hoveredCityId={selectedCityId}
          onCitySelect={(cityId) => setSelectedCityId(cityId)}
          onOpenAnalysis={(cityId) => handleOpenAnalysis(cityId)}
        />
      </div>

      {/* MODAL DIDÁTICO COM TODOS OS TEMAS (Custo, Moradia, Trabalho, Turismo, Estratégia) */}
      <CityAnalysisModal
        cityId={modalCityId}
        onClose={() => setModalCityId(null)}
        onSelectCity={(newCityId) => {
          setSelectedCityId(newCityId);
          setModalCityId(newCityId);
        }}
        onCtaClick={onCtaClick}
      />
    </section>
  );
};
