import React, { useState, useEffect } from "react";
import { X, CheckCheck, MessageCircle } from "lucide-react";

export interface ChatReaction {
  sender: string;
  role: string;
  text: string;
  initials?: string;
}

export const LIVE_CHAT_REACTIONS: ChatReaction[] = [
  {
    sender: "July G.",
    role: "Membro Confraria · Madri",
    text: "Live maravilhosa!!!! 👏👏👏 Muita segurança em cada etapa.",
    initials: "JG",
  },
  {
    sender: "Moisés B.",
    role: "Aluno COD-E · Valência",
    text: "Obrigado pela live e mentoria! Clareza total na rota jurídica de 2 anos.",
    initials: "MB",
  },
  {
    sender: "Rafael M.",
    role: "Comunidade Ativa · Barcelona",
    text: "Top 🚀 Já estou montando a pasta consular com os agentes!",
    initials: "RM",
  },
  {
    sender: "Darlan P.",
    role: "Membro Confraria · Sevilha",
    text: "Top demais, clareza total na documentação e certidões!",
    initials: "DP",
  },
  {
    sender: "Ednara S.",
    role: "Aluna Confraria · Alicante",
    text: "Amei tirar todas as dúvidas com o time hoje! Sensacional 🙏",
    initials: "ES",
  },
  {
    sender: "Tatiana M.",
    role: "Membro Ativo · Málaga",
    text: "Depois de tanta busca na internet, finalmente o caminho oficial e seguro.",
    initials: "TM",
  },
];

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.674-.701c.974.577 1.954.919 3.097.92h.003c3.18 0 5.767-2.586 5.768-5.766 0-1.54-.599-2.989-1.688-4.078-1.09-1.089-2.539-1.687-4.394-1.687zm8.437 5.766c-.003 4.653-3.785 8.435-8.438 8.435-1.42 0-2.812-.358-4.048-1.037l-4.502 1.18 1.202-4.388c-.748-1.28-1.144-2.747-1.143-4.249.003-4.653 3.786-8.436 8.441-8.436 2.255.001 4.375.88 5.969 2.476 1.593 1.596 2.469 3.717 2.471 5.973z" />
  </svg>
);

export const WhatsAppLiveToast: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Primeiro popup aparece após 12 segundos para não atrapalhar o primeiro contato com a página
    const initialTimer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 12000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (!isVisible || isDismissed || isHovered) return;

    // Fica visível por 5.5 segundos
    const displayTimer = setTimeout(() => {
      setIsVisible(false);

      // Intervalo muito mais natural e espaçado: espera 28 segundos antes de mostrar o próximo
      const nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % LIVE_CHAT_REACTIONS.length);
        if (!isDismissed) setIsVisible(true);
      }, 28000);

      return () => clearTimeout(nextTimer);
    }, 5500);

    return () => clearTimeout(displayTimer);
  }, [isVisible, isDismissed, isHovered, currentIndex]);

  if (isDismissed) return null;

  const current = LIVE_CHAT_REACTIONS[currentIndex];

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-40 max-w-[310px] sm:max-w-[360px] w-[calc(100vw-24px)] transition-all duration-500 transform ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
          : "translate-y-6 opacity-0 scale-95 pointer-events-none"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-[#FFFFFF] border border-[#25D366]/80 rounded-xl sm:rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.22)] overflow-hidden">
        {/* Barra de Notificação Superior estilo WhatsApp */}
        <div className="bg-[#008069] px-3 py-1.5 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 font-mono font-bold tracking-wide text-[10px] sm:text-[11px]">
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="truncate">Chat Oficial da Confraria</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[9px] text-emerald-100 font-mono">agora</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
                setIsDismissed(true);
              }}
              className="text-white/80 hover:text-white p-0.5 rounded cursor-pointer"
              title="Fechar notificação"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Conteúdo da Mensagem Compacto para Mobile */}
        <div className="p-2.5 sm:p-3 bg-[#F0F2F5] flex items-start gap-2 sm:gap-2.5">
          {/* Avatar com badge online verde */}
          <div className="relative shrink-0 mt-0.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#128C7E] to-[#075E54] flex items-center justify-center text-white font-bold text-[11px] sm:text-xs shadow-xs">
              {current.initials || current.sender.slice(0, 2)}
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#25D366] border-2 border-white" />
          </div>

          {/* Balão e Nome */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <h5 className="text-[11px] sm:text-xs font-bold text-slate-900 truncate">
                {current.sender}
              </h5>
              <span className="text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded-full font-mono bg-[#25D366]/20 text-[#075E54] font-bold shrink-0">
                Ao vivo
              </span>
            </div>

            <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono -mt-0.5 mb-1 truncate">
              {current.role}
            </div>

            {/* Balão WhatsApp Verde Claro Clássico */}
            <div className="bg-[#D9FDD3] border border-[#B2E69E] rounded-xl rounded-tl-sm p-1.5 sm:p-2 shadow-2xs">
              <p className="text-[11px] sm:text-xs text-slate-900 leading-snug font-medium">
                &ldquo;{current.text}&rdquo;
              </p>
              <div className="flex items-center justify-end gap-1 text-[8px] sm:text-[9px] text-slate-500 mt-0.5 font-mono">
                <span>agora</span>
                <CheckCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#53BDEB]" />
              </div>
            </div>
          </div>
        </div>

        {/* Barra Inferior com link discreto para a Confraria */}
        <div className="bg-white px-3 py-1 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-600">
          <span className="flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            <span>Membro ativo da Confraria</span>
          </span>
          <a
            href="#confraria-em-acao"
            className="text-[#075E54] hover:underline font-bold font-mono text-[9px] sm:text-[10px]"
          >
            Ver depoimentos ↗
          </a>
        </div>
      </div>
    </div>
  );
};
