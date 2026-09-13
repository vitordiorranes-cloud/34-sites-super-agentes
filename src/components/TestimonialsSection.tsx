import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  ZoomIn,
  X,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Lock,
  ExternalLink,
  CheckCheck,
  Sparkles,
  MessageCircle,
  Star,
} from "lucide-react";
import { DEFAULT_TESTIMONIALS, getTestimonialImage } from "../data/testimonialsData";
import { TestimonialItem } from "../types";

// Ícone oficial em vetor do WhatsApp
const WhatsAppBrandIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.674-.701c.974.577 1.954.919 3.097.92h.003c3.18 0 5.767-2.586 5.768-5.766 0-1.54-.599-2.989-1.688-4.078-1.09-1.089-2.539-1.687-4.394-1.687zm8.437 5.766c-.003 4.653-3.785 8.435-8.438 8.435-1.42 0-2.812-.358-4.048-1.037l-4.502 1.18 1.202-4.388c-.748-1.28-1.144-2.747-1.143-4.249.003-4.653 3.786-8.436 8.441-8.436 2.255.001 4.375.88 5.969 2.476 1.593 1.596 2.469 3.717 2.471 5.973z" />
  </svg>
);

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [selectedPrint, setSelectedPrint] = useState<TestimonialItem | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const trackRef = useRef<HTMLDivElement>(null);

  // Carregar imagens do localStorage caso tenham sido customizadas no admin
  useEffect(() => {
    const loadImages = () => {
      setTestimonials(
        DEFAULT_TESTIMONIALS.map((t) => ({
          ...t,
          defaultImage: getTestimonialImage(t.id, t.defaultImage),
        }))
      );
    };

    loadImages();
    window.addEventListener("storage", loadImages);
    return () => window.removeEventListener("storage", loadImages);
  }, []);

  // Rolagem suave manual
  const handleScrollStep = (direction: "left" | "right") => {
    if (trackRef.current) {
      const cardWidth = 360;
      trackRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  // Rolagem para índice específico
  const handleScrollToIndex = (index: number) => {
    if (trackRef.current) {
      const cardWidth = 360;
      trackRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  // Monitorar rolagem para atualizar bolinhas do indicador
  const onTrackScroll = () => {
    if (trackRef.current) {
      const cardWidth = 360;
      const idx = Math.round(trackRef.current.scrollLeft / cardWidth);
      setActiveIndex(Math.max(0, Math.min(idx, testimonials.length - 1)));
    }
  };

  // Esteira horizontal automática (pausa quando o mouse está por cima)
  useEffect(() => {
    if (isHovered || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      if (trackRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
        const cardWidth = 360;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          trackRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered, testimonials.length]);

  return (
    <section
      id="confraria-em-acao"
      className="py-10 sm:py-14 bg-gradient-to-b from-[#F5F8F6] via-[#EDF4EF] to-[#E6EFE9] text-slate-900 border-y border-[#D1E0D6] relative overflow-hidden"
    >
      {/* Luz ambiente suave em tons claros de esmeralda WhatsApp */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-72 bg-[#25D366]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#128C7E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* BARRA SUPERIOR DA ESTEIRA: NAVEGAÇÃO + INDICAÇÃO COMPACTA */}
        <div className="flex items-center justify-between gap-3 mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm text-[#075E54] font-bold flex items-center gap-1.5">
              <WhatsAppBrandIcon className="w-4 h-4 text-[#128C7E]" />
              Depoimentos no WhatsApp
            </span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="hidden sm:inline text-slate-500 text-xs font-medium">
              👉 Deslize para o lado para ver todos
            </span>
          </div>

          {/* Botões de Navegação da Esteira */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleScrollStep("left")}
              aria-label="Depoimento anterior"
              className="w-8 h-8 rounded-full bg-white hover:bg-[#008069] hover:text-white text-[#075E54] border border-[#B8D5C2] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScrollStep("right")}
              aria-label="Próximo depoimento"
              className="w-8 h-8 rounded-full bg-white hover:bg-[#008069] hover:text-white text-[#075E54] border border-[#B8D5C2] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ESTEIRA HORIZONTAL DE DEPOIMENTOS EM FUNDO CLARO E LIMPO */}
        <div
          className="relative group/conveyor"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Pista de rolagem horizontal */}
          <div
            ref={trackRef}
            onScroll={onTrackScroll}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((item, index) => {
              const currentImg = getTestimonialImage(item.id, item.defaultImage);
              return (
                <div
                  key={item.id}
                  className="w-[320px] sm:w-[360px] shrink-0 snap-start bg-white border-2 border-[#128C7E]/25 hover:border-[#25D366] rounded-2xl p-4 shadow-lg hover:shadow-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative"
                >
                  <div>
                    {/* Topo do Card: Etiqueta de Identificação de Depoimento WhatsApp */}
                    <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#25D366]/15 border border-[#25D366]/40 text-[#075E54] text-[10px] font-mono font-black uppercase tracking-wider">
                        <WhatsAppBrandIcon className="w-3 h-3 text-[#128C7E]" />
                        Depoimento #{index + 1}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      </div>
                    </div>

                    {/* Cabeçalho Verde Oficial do WhatsApp */}
                    <div className="bg-[#008069] -mx-4 px-4 py-2.5 flex items-center justify-between gap-2 mb-3 shadow-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Avatar com status ativo */}
                        <div
                          className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.avatarBg} p-0.5 shadow-sm flex items-center justify-center shrink-0 border-2 border-white relative`}
                        >
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#075E54] font-black text-xs font-mono">
                            {item.initials}
                          </div>
                          {/* Ponto verde de online */}
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-white" />
                        </div>

                        <div className="min-w-0 text-white">
                          <div className="flex items-center gap-1">
                            <h4 className="text-xs sm:text-sm font-bold text-white truncate leading-tight">
                              {item.name}
                            </h4>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-emerald-100 font-mono">
                            <span className="truncate">{item.location}</span>
                            <span>·</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tag Verificado */}
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-mono font-bold shrink-0">
                        <WhatsAppBrandIcon className="w-2.5 h-2.5 text-white" />
                        Verificado
                      </span>
                    </div>

                    {/* Print Original no WhatsApp (Toque para Ampliar) */}
                    <div
                      onClick={() => setSelectedPrint(item)}
                      className="relative rounded-xl overflow-hidden border border-slate-200 bg-[#EFEAE2] shadow-inner mb-3 cursor-pointer group/img transition-all hover:border-[#008069]"
                      title="Clique para examinar o print original em tamanho grande"
                    >
                      {/* Barra de Status estilo WhatsApp Claro */}
                      <div className="bg-[#F0F2F5] px-3 py-1 flex items-center justify-between text-[10px] text-slate-700 border-b border-slate-200">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#075E54] font-bold">
                          <WhatsAppBrandIcon className="w-3 h-3 text-[#128C7E]" />
                          <span>Conversa no WhatsApp</span>
                        </div>
                        <span className="text-slate-600 font-mono text-[9px] flex items-center gap-1 font-semibold">
                          <ZoomIn className="w-2.5 h-2.5 text-[#008069]" />
                          Ampliar
                        </span>
                      </div>

                      {/* Imagem Real do WhatsApp */}
                      <div className="relative bg-[#EFEAE2] flex items-center justify-center h-44 overflow-hidden">
                        <img
                          src={currentImg}
                          alt={`Print original do depoimento de ${item.name}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/img:scale-[1.03]"
                        />
                      </div>

                      {/* Overlay ao passar o mouse */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center pb-2.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008069] text-white text-xs font-bold shadow-lg">
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>Ver print completo</span>
                        </span>
                      </div>
                    </div>

                    {/* Balão de Mensagem Estilo WhatsApp Outgoing Verde Icônico (#D9FDD3) */}
                    <div className="bg-[#D9FDD3] rounded-xl rounded-tr-sm p-3 border border-[#B2E69E] shadow-xs relative mb-2">
                      <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <div className="flex items-center justify-end gap-1 text-[10px] text-slate-600 mt-1 font-mono">
                        <span>{item.time}</span>
                        {/* Double Check Azul Oficial do WhatsApp (#53BDEB) */}
                        <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
                      </div>
                    </div>
                  </div>

                  {/* Rodapé do Card */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="inline-flex items-center gap-1 text-slate-600 text-[10px] font-mono font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#128C7E]" />
                      <span>{item.badge}</span>
                    </span>
                    <button
                      onClick={() => setSelectedPrint(item)}
                      className="text-[#075E54] hover:text-[#008069] font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Abrir print</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicadores de Posição da Esteira (Dots) */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleScrollToIndex(idx)}
                aria-label={`Ir para depoimento ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeIndex === idx
                    ? "w-6 bg-[#008069]"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MODAL LIGHTBOX PARA VER O PRINT ORIGINAL EM TELA CHEIA (TEMA CLARO WHATSAPP) */}
      {selectedPrint && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
          onClick={() => setSelectedPrint(null)}
        >
          <div
            className="bg-white border-2 border-[#008069] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra Superior do Modal estilo WhatsApp Verde Clássico */}
            <div className="bg-[#008069] px-4 py-3 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white text-[#008069] flex items-center justify-center text-xs font-bold shadow-xs">
                  {selectedPrint.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight flex items-center gap-1.5">
                    <span>{selectedPrint.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                  </h4>
                  <p className="text-[10px] text-emerald-100 font-mono flex items-center gap-1">
                    <WhatsAppBrandIcon className="w-2.5 h-2.5 text-white" />
                    Print Original do WhatsApp · {selectedPrint.badge}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPrint(null)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Imagem Ampliada do Print */}
            <div className="p-3 bg-[#EFEAE2] max-h-[72vh] overflow-y-auto flex items-center justify-center">
              <img
                src={getTestimonialImage(selectedPrint.id, selectedPrint.defaultImage)}
                alt={`Print completo de ${selectedPrint.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-lg shadow-lg border border-slate-300"
              />
            </div>

            {/* Rodapé com Citação e Verificação */}
            <div className="bg-slate-50 p-3.5 border-t border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="bg-[#D9FDD3] p-2.5 rounded-lg border border-[#B2E69E]">
                <p className="italic text-slate-900 font-medium">
                  &ldquo;{selectedPrint.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-mono">
                <span className="flex items-center gap-1 text-[#075E54] font-bold">
                  <Lock className="w-3 h-3 text-[#128C7E]" />
                  Print verificado · Número de telefone protegido (Privacidade)
                </span>
                <span>{selectedPrint.time} ✓✓</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
