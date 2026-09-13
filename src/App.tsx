import React, { useState, useEffect } from "react";
import {
  Sparkles,
  CheckCircle2,
  Award,
  Linkedin,
  Instagram,
  Shield,
  ArrowRight,
  ChevronDown,
  Gift,
  Download,
  FileText
} from "lucide-react";
import { FAQ_DATA } from "./data/faq";
import { VslPlayer } from "./components/VslPlayer";
import { AgentsSection } from "./components/AgentsSection";
import { OfficialIndicators } from "./components/OfficialIndicators";
import { DestinationsSection } from "./components/DestinationsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FloatingCta } from "./components/FloatingCta";
import { WhatsAppLiveToast } from "./components/WhatsAppLiveToast";
import { AdminPage } from "./components/AdminPage";
import { DEFAULT_MENTOR_PHOTO } from "./data/mentorPhoto";

const DEFAULT_CHECKOUT_URL = "https://pay.cakto.com.br/3e3f9px_1093826";

const checkIsAdminRoute = (): boolean => {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname;
  const hash = window.location.hash;
  const search = window.location.search;
  return path.startsWith("/admin") || hash === "#admin" || search.includes("admin=1");
};

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(checkIsAdminRoute);

  const [checkoutUrl, setCheckoutUrl] = useState<string>(() => {
    return localStorage.getItem("code_checkout_url_v2") || DEFAULT_CHECKOUT_URL;
  });

  const [mentorPhoto, setMentorPhoto] = useState<string>(() => {
    return localStorage.getItem("vitor_custom_photo_v5") || DEFAULT_MENTOR_PHOTO;
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Sincronização de rotas (/admin vs /)
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(checkIsAdminRoute());
      // Re-ler configurações salvas pelo admin
      const savedUrl = localStorage.getItem("code_checkout_url_v2");
      if (savedUrl) setCheckoutUrl(savedUrl);
      const savedPhoto = localStorage.getItem("vitor_custom_photo_v5");
      if (savedPhoto) setMentorPhoto(savedPhoto);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    if (path === "/admin") {
      window.history.pushState({}, "", "/admin");
      setIsAdminRoute(true);
    } else {
      window.history.pushState({}, "", "/");
      setIsAdminRoute(false);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollOrCheckout = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    } else {
      const el = document.getElementById("secao-oferta");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Se a rota for /admin, renderiza a página administrativa protegida por login
  if (isAdminRoute) {
    return <AdminPage onNavigateHome={() => navigateTo("/")} />;
  }

  // Página pública do Código Europa (100% livre de controles administrativos)
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#1B1B18] antialiased selection:bg-[#A31E22] selection:text-[#F7F3EC]">
      {/* Top Banner Oficial da Marca (Pública - Sem botões administrativos) */}
      <div className="bg-[#0D1830] text-[#F7F3EC] text-xs py-2.5 px-4 border-b border-slate-700/50 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A31E22] animate-pulse" />
            <span className="font-semibold tracking-wide text-amber-200">
              Código Europa · Esquadrão COD-E
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
            Espanha · Residência, Inteligência & Cidadania
          </div>
        </div>
      </div>

      {/* ═══════════ 0. TARJA DO MATERIAL (PRESENTE AGENTE 34) ═══════════ */}
      <div className="ribbon bg-[#13213F] text-[#F7F3EC] py-3.5 border-b-[3px] border-[#A31E22]">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-2 sm:gap-4 flex-wrap text-center">
          <span className="inline-flex items-center gap-1.5 font-sans text-[0.68rem] font-bold tracking-[0.14em] uppercase text-amber-300 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full whitespace-nowrap">
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            <span>PRESENTE 100% GRATUITO</span>
          </span>
          <p className="font-sans text-[0.85rem] sm:text-[0.92rem] text-[#F7F3EC]/95 m-0 leading-snug">
            O <strong>Agente 34</strong> (Buscador de Empregos) liberou o guia <strong>5 Canais pra Começar na Espanha</strong>. Baixe o PDF grátis no final da página!
          </p>
        </div>
      </div>

      {/* Header & VSL Compactos */}
      <header className="relative pt-8 pb-10 sm:py-12 bg-gradient-to-b from-[#FAF7F2] to-[#F4EFE6] border-b border-[#E4DDCF] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto space-y-3 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A31E22]/10 border border-[#A31E22]/30 text-[#A31E22] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>O Esquadrão Código Europa · COD-E</span>
            </div>

            <h1 className="font-serif-brand text-3xl sm:text-5xl lg:text-6xl font-black text-[#13213F] tracking-tight leading-[1.15]">
              Não é uma viagem.<br />
              É uma mudança de vida.<br />
              <span className="text-[#A31E22]">E de geração.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#554E45] leading-relaxed max-w-2xl mx-auto pt-1">
              A escola do seu filho. A rua por onde ele volta a pé à noite sem você olhar no retrovisor com medo. O passaporte que ele carrega no bolso para 27 países da União Europeia.
            </p>

            <div className="bg-white border-l-4 border-[#A31E22] px-5 py-3.5 rounded-r-xl max-w-xl mx-auto shadow-xs border-y border-r border-[#E8E2D5] mt-2">
              <p className="font-serif-brand text-base sm:text-lg text-[#13213F] font-bold italic">
                &ldquo;Um voo dura onze horas. Essa decisão dura três gerações. Seja o herói da sua própria jornada.&rdquo;
              </p>
            </div>
          </div>

          {/* VSL Player Oficial (Sem Controles Administrativos na Visão Pública) */}
          <VslPlayer onCtaClick={handleScrollOrCheckout} />

          {/* Botão de Ação Imediata abaixo do Vídeo com Urgência e Animação */}
          <div className="text-center mt-6">
            <button
              onClick={handleScrollOrCheckout}
              data-checkout="true"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4.5 rounded-2xl bg-gradient-to-r from-[#DC2626] via-[#A31E22] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] text-white font-black text-base sm:text-xl uppercase tracking-wider shadow-[0_0_35px_rgba(220,38,38,0.85)] hover:shadow-[0_0_55px_rgba(239,68,68,1)] transform hover:scale-105 transition-all cursor-pointer border-2 border-amber-300/60 btn-pulse-urgency group"
            >
              <Shield className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>QUERO MEU TIME DE AGENTES AGORA</span>
              <ArrowRight className="w-5 h-5 text-amber-300 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <p className="text-xs text-[#6B655D] mt-2 font-medium">
              Acesso vitalício imediato · Garantia incondicional de 7 dias · Pagamento Seguro Cakto
            </p>
          </div>
        </div>
      </header>

      {/* Indicadores Oficiais do Reino da Espanha */}
      <OfficialIndicators />

      {/* Os 7 Super Agentes do Esquadrão COD-E */}
      <AgentsSection onCtaClick={handleScrollOrCheckout} />

      {/* Cidades e Destinos da Espanha */}
      <DestinationsSection onCtaClick={handleScrollOrCheckout} />

      {/* Mentor e Autoridade: Vitor Diorranes */}
      <section id="autoridade-vitor" className="py-14 sm:py-20 bg-[#0E1729] text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-slate-600 bg-slate-900 group">
                <img
                  src={mentorPhoto}
                  alt="Vitor Diorranes - Fundador do Código Europa em Barcelona"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.endsWith("/assets/vitor-diorranes.jpg")) {
                      target.src = "/assets/vitor-diorranes.jpg";
                    }
                  }}
                  className="w-full h-80 sm:h-96 object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A101D] via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#A31E22] text-white text-[10px] font-mono uppercase font-bold tracking-wider mb-1">
                    Barcelona · Espanha
                  </div>
                  <h3 className="font-serif-brand text-xl sm:text-2xl font-bold text-white">
                    Vitor Diorranes
                  </h3>
                  <p className="text-xs text-slate-300">
                    Fundador do Código Europa · Gestor Internacional
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A31E22]/20 border border-[#A31E22]/50 text-[#FCA5A5] text-xs font-mono uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>Mentor & Criador do Esquadrão COD-E</span>
              </div>
              <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-white leading-tight">
                “Eu não li sobre a Espanha na internet. Eu moro nela e treino quem decide vencer.”
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mineiro, gestor internacional, <strong>morou em 5 outros países e visitou 33</strong>, hoje vivendo em Barcelona. Carreira construída dentro de lugares de alta exigência: <strong>Cruzeiro EC, Seleção Brasileira de Futsal (CBFS) e Penalty</strong>.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Quando desembarcou na Espanha com a família, aprendeu cada etapa no próprio couro: do contrato de aluguel ao empadronamento, da homologação de diplomas aos protocolos do Ministério de Justiça. Criou o <strong>Código Europa</strong> e a <strong>Confraria Europa</strong> para transformar a imigração em uma ciência exata.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-[#17233D] border border-slate-700">
                  <span className="text-xs font-bold text-amber-300 block mb-0.5">
                    Legislação Oficial (BOE)
                  </span>
                  <span className="text-xs text-slate-300">
                    Art. 22.1 Código Civil e Real Decreto 1155/2024
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#17233D] border border-slate-700">
                  <span className="text-xs font-bold text-amber-300 block mb-0.5">
                    Confraria Europa
                  </span>
                  <span className="text-xs text-slate-300">
                    Rede ativa de brasileiros que se ajudam em solo espanhol
                  </span>
                </div>
              </div>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/vitordiorranes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold tracking-wide shadow-md transition-all cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Conectar no LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/vitordiorranes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white text-xs font-bold tracking-wide shadow-md transition-all cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Seguir no Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: Confraria Europa em Ação (Depoimentos e Prova de Comunidade Ativa) */}
      <TestimonialsSection />

      {/* Seção da Oferta (Alta Conversão & Rápida Leitura) */}
      <section id="secao-oferta" className="py-12 sm:py-16 bg-gradient-to-b from-[#FAF7F2] to-[#EAE4D7] border-b border-[#E0D7C6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#0E1729] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#A31E22] shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#A31E22]/20 rounded-full blur-3xl pointer-events-none" />

            {/* DESTAQUE MÁXIMO: O RISCO É TODO MEU */}
            <div className="bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border-2 border-amber-400/80 rounded-2xl p-5 sm:p-6 mb-6 shadow-xl relative text-center">
              <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-mono text-xs font-black uppercase tracking-wider mb-2 shadow-xs">
                <Shield className="w-4 h-4 text-slate-950" />
                <span>GARANTIA BLINDADA DE 7 DIAS</span>
              </div>
              <h3 className="font-serif-brand text-2xl sm:text-3xl font-black text-amber-300 tracking-tight uppercase mb-2">
                O RISCO É TODO MEU
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed font-medium">
                Entre agora, ative seus 7 Super Agentes, teste suas rotas e consulte o ecossistema. Se em até 7 dias você achar que o Código Europa não vale pelo menos 10 vezes o valor que pagou, <strong>eu devolvo 100% do seu dinheiro</strong> com um simples clique. Sem burocracia e sem perguntas.
              </p>
            </div>

            {/* DESTAQUE MÁXIMO: ACESSO VITALÍCIO */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-md mb-4">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>ACESSO VITALÍCIO · PAGAMENTO ÚNICO · SEM MENSALIDADES</span>
            </div>

            <div className="my-4">
              <h2 className="font-serif-brand text-2xl sm:text-4xl font-black text-white leading-tight">
                Seu time tá pronto.<br />
                <span className="text-[#DC2626]">Falta você.</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2">
                Seus 7 Super Agentes COD-E estão prontos para entrar em campo e guiar sua travessia.
              </p>
            </div>

            <div className="bg-[#142038] border border-slate-700 max-w-md mx-auto rounded-2xl p-5 mb-6 shadow-inner">
              <div className="text-xs text-slate-400 line-through mb-1 font-mono">
                De R$ 1.997,00 por:
              </div>
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="text-xl font-light text-amber-400">12x de</span>
                <span className="font-serif-brand text-4xl sm:text-5xl font-black text-white">
                  R$ 29,64
                </span>
              </div>
              <p className="text-xs text-amber-200 font-semibold">
                ou R$ 297,00 à vista no PIX ou Cartão
              </p>

              <div className="text-left text-xs space-y-2.5 mt-4 pt-4 border-t border-slate-700 text-slate-300">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-amber-400/10 border border-amber-400/30">
                  <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-amber-200">
                    ★ ACESSO VITALÍCIO: Pague uma vez e use para sempre
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Os 7 Super Agentes COD-E</strong> com inteligência oficial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Confraria Europa:</strong> Comunidade ativa de brasileiros na Espanha</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>O Risco é Todo Meu:</strong> Garantia incondicional de 7 dias</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                id="main-hero-checkout-btn"
                onClick={handleScrollOrCheckout}
                data-checkout="true"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4.5 rounded-2xl bg-gradient-to-r from-[#DC2626] via-[#A31E22] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] text-white font-black text-base sm:text-xl uppercase tracking-wider shadow-[0_0_35px_rgba(220,38,38,0.85)] hover:shadow-[0_0_55px_rgba(239,68,68,1)] transform hover:scale-105 transition-all cursor-pointer border-2 border-amber-300/60 btn-pulse-urgency group"
              >
                <Shield className="w-6 h-6 text-amber-300 group-hover:rotate-12 transition-transform" />
                <span>QUERO MEU TIME DE AGENTES AGORA</span>
                <ArrowRight className="w-6 h-6 text-amber-300 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <p className="text-xs text-slate-300 font-semibold">
                🔒 Acesso vitalício imediato · Garantia incondicional de 7 dias · Pagamento Seguro Cakto
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Compacto */}
      <section className="py-12 bg-[#FAF7F2] border-b border-[#E4DDCF]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A31E22] block mb-1">
              TIRE SUAS DÚVIDAS
            </span>
            <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#13213F]">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-2.5">
            {FAQ_DATA.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E0D7C6] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-4 font-serif-brand text-sm sm:text-base font-bold text-[#13213F] hover:text-[#A31E22] transition-colors cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${
                        isOpen ? "transform rotate-180 text-[#A31E22]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3.5 text-xs sm:text-sm text-[#5A554E] leading-relaxed border-t border-[#F2ECE1] pt-2.5">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fechamento Inspiracional & Rodapé */}
      <section className="py-14 text-center bg-[#F4EFE6]">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#13213F] mb-2">
            Daqui a dois anos você vai estar em algum lugar.
          </h2>
          <p className="font-serif-brand text-base sm:text-lg text-[#13213F] italic mb-4">
            “A sua tripulação já está pronta e treinada. Falta você assumir o comando.”
          </p>
          <div className="inline-block px-5 py-2.5 rounded-xl bg-[#A31E22]/10 border border-[#A31E22]/30 mb-6">
            <p className="text-base sm:text-lg font-black text-[#A31E22] uppercase tracking-wider">
              UM PASSO DE CORAGEM PODE MUDAR GERAÇÕES.
            </p>
          </div>
          <div>
            <button
              onClick={handleScrollOrCheckout}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#13213F] hover:bg-[#0D1830] text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer btn-pulse-urgency"
            >
              <span>QUERO MEU TIME DE AGENTES AGORA</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
          <p className="text-xs text-[#6B655D] mt-3 font-serif-brand italic">
            Vitor Diorranes · Barcelona, Espanha
          </p>
        </div>
      </section>

      {/* ═══════════ 15. A ENTREGA DO MATERIAL (PRESENTE DO AGENTE 34) ═══════════ */}
      <section className="deliver bg-[#F7F3EC] py-12 sm:py-16 border-t border-[#E4DDCF]">
        <div className="max-w-xl mx-auto px-4 text-center">
          {/* Badge de Presente */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-600/10 border border-emerald-600/30 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Gift className="w-4 h-4 text-emerald-600 animate-bounce" />
            <span>PRESENTE LIBERADO · 100% GRATUITO</span>
          </div>

          <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#13213F] mb-2 leading-tight">
            5 Canais pra Começar na Espanha
          </h2>
          <p className="text-xs sm:text-sm text-[#554E45] max-w-md mx-auto mb-6">
            Dossiê oficial de reconhecimento preparado pelo <strong>Agente 34</strong> para quem quer encontrar vagas reais na Espanha.
          </p>

          {/* Card Didático com Foto do Agente 34 */}
          <div className="bg-white border-2 border-[#13213F]/15 rounded-2xl p-5 sm:p-6 shadow-md text-left mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
              {/* Foto do Agente 34 */}
              <div className="shrink-0 text-center">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-md bg-slate-900 mx-auto">
                  <img
                    src="/assets/agents/agente34.jpg"
                    alt="Agente 34 - Buscador de Empregos"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/agents/agente34_job_1788960561179.jpg";
                    }}
                  />
                  <div className="absolute top-1 right-1 bg-amber-500 text-slate-950 p-1 rounded-md shadow">
                    <Gift className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#13213F] text-amber-300 text-[10px] font-mono font-bold tracking-wider uppercase">
                  AGENTE 34
                </div>
              </div>

              {/* Tópicos Didáticos e Diretos */}
              <div className="flex-1 space-y-2.5 text-xs sm:text-sm text-[#1B1B18]">
                <div className="font-bold text-[#13213F] text-sm sm:text-base flex items-center gap-2">
                  <span>Reconhecimento de Campo</span>
                  <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">PDF · 8 páginas</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><b>1. Portal Oficial do SEPE:</b> Como usar o canal do governo e comprovar busca ativa.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><b>2. Os 4 Maiores Portais:</b> InfoJobs, Indeed, Turijobs e JobToday na ordem certa.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><b>3. Plano de 7 Dias:</b> Sequência prática para enviar suas primeiras candidaturas.</span>
                </div>
              </div>
            </div>

            {/* Botão de Download Direto */}
            <div className="mt-5 pt-4 border-t border-[#E4DDCF]">
              <a
                className="flex items-center justify-center gap-2 w-full text-center no-underline bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-sm sm:text-base uppercase tracking-wider py-4 px-4 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5"
                href="/5-canais-codigo-europa.pdf"
                data-ebook
                download="5-canais-codigo-europa.pdf"
              >
                <Download className="w-5 h-5" />
                <span>Baixar Guia Gratuito (PDF)</span>
              </a>
              <p className="text-center text-[11px] text-[#6B655D] mt-2 font-mono">
                🎁 Presente 100% gratuito · Download imediato sem cadastro
              </p>
            </div>
          </div>

          {/* Ponte curta e objetiva para o Esquadrão COD-E */}
          <div className="bridge mt-8 pt-6 border-t border-[#E4DDCF] text-center">
            <p className="font-serif-brand text-sm sm:text-base leading-relaxed text-[#554E45] max-w-md mx-auto mb-4">
              O guia do Agente 34 mostra <b>onde procurar vagas</b>. Para estruturar seu <b>visto, documentação, custo de vida e moradia</b> com acompanhamento diário, tenha o esquadrão completo ao seu lado.
            </p>
            <button
              onClick={handleScrollOrCheckout}
              data-checkout="true"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer"
            >
              <span>Quero o Esquadrão Inteiro — R$ 297</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-[11px] text-[#6B655D] mt-2 font-mono">
              acesso imediato · 7 dias de garantia · vitalício
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 bg-[#EAE3D6] text-[11px] text-[#5A554E] border-t border-[#D9D0C1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-2">
          <p>
            <strong className="text-[#13213F]">Aviso Legal:</strong> O Código Europa (COD-E) é um programa educacional e metodológico com inteligência artificial para estratégia de travessia. Não substitui assessoria jurídica de órgãos consulares oficiais do Reino da Espanha.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-[#DBD2C3] gap-2">
            <span>© Código Europa · Todos os direitos reservados.</span>
            <span className="font-mono text-[10px]">Barcelona · Valência · Madrid</span>
          </div>
        </div>
      </footer>

      <WhatsAppLiveToast />
      <FloatingCta onCtaClick={handleScrollOrCheckout} />
    </div>
  );
}
