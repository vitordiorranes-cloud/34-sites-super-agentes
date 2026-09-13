import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload,
  Link as LinkIcon,
  X,
  Volume2,
  Video,
  Shield,
  ArrowRight,
  Check,
  RefreshCw,
  Play,
  VolumeX,
  Lock
} from "lucide-react";

export const DEFAULT_VSL_VIDEO = "https://player.vimeo.com/video/1225405238";
export const DEFAULT_VSL_TYPE = "embed";

interface VslPlayerProps {
  onCtaClick?: () => void;
  isAdmin?: boolean;
}

/**
 * Normaliza e formata a URL de incorporação para esconder a barra de controle
 * do Vimeo (controls=0) e impedir que o lead pause ou volte o vídeo.
 */
function buildEmbedUrl(rawUrl: string, autoPlay: boolean): string {
  let url = rawUrl.trim();

  // Normalizar link do Vimeo compartilhado padrão (ex: vimeo.com/1225405238...)
  if (url.includes("vimeo.com/") && !url.includes("player.vimeo.com")) {
    const match = url.match(/vimeo\.com\/(\d+)/);
    const videoId = match ? match[1] : url.split("vimeo.com/")[1]?.split("?")[0]?.replace(/\//g, "");
    url = `https://player.vimeo.com/video/${videoId}`;
  }

  // Se for Vimeo player
  if (url.includes("player.vimeo.com/video/")) {
    const baseUrl = url.split("?")[0];
    const params = new URLSearchParams();
    // Parâmetros obrigatórios: esconder controles completamente e desativar teclado
    params.set("controls", "0");
    params.set("title", "0");
    params.set("byline", "0");
    params.set("portrait", "0");
    params.set("sidedock", "0");
    params.set("keyboard", "0");
    params.set("pip", "0");
    params.set("dnt", "1");
    params.set("playsinline", "1");
    params.set("badge", "0");
    params.set("autopause", "0");
    params.set("app_id", "58479");

    if (autoPlay) {
      params.set("autoplay", "1");
      params.set("muted", "0");
    }

    return `${baseUrl}?${params.toString()}`;
  }

  // Se for YouTube
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("embed/")) {
      videoId = url.split("embed/")[1]?.split("?")[0];
    }

    const params = new URLSearchParams();
    params.set("controls", "0");
    params.set("disablekb", "1");
    params.set("modestbranding", "1");
    params.set("rel", "0");
    params.set("playsinline", "1");
    params.set("iv_load_policy", "3");

    if (autoPlay) {
      params.set("autoplay", "1");
      params.set("mute", "0");
    }

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }

  return url;
}

export const VslPlayer: React.FC<VslPlayerProps> = ({ onCtaClick, isAdmin = false }) => {
  const [videoUrl, setVideoUrl] = useState<string>(() => {
    return localStorage.getItem("cod_e_vsl_video_v5") || DEFAULT_VSL_VIDEO;
  });
  const [videoType, setVideoType] = useState<string>(() => {
    return localStorage.getItem("cod_e_vsl_type_v5") || DEFAULT_VSL_TYPE;
  });

  const [aspectRatio, setAspectRatio] = useState<"portrait" | "landscape">(() => {
    return (localStorage.getItem("cod_e_vsl_aspect_v5") as "portrait" | "landscape") || "portrait";
  });

  // Estado que rastreia se o lead já deu o play no vídeo
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (videoUrl) {
      localStorage.setItem("cod_e_vsl_video_v5", videoUrl);
    } else {
      localStorage.removeItem("cod_e_vsl_video_v5");
    }
  }, [videoUrl]);

  useEffect(() => {
    if (videoType) {
      localStorage.setItem("cod_e_vsl_type_v5", videoType);
    } else {
      localStorage.removeItem("cod_e_vsl_type_v5");
    }
  }, [videoType]);

  useEffect(() => {
    localStorage.setItem("cod_e_vsl_aspect_v5", aspectRatio);
  }, [aspectRatio]);

  const handleStartPlayback = useCallback(() => {
    setIsPlaying(true);
    // Tenta mandar comando de play e áudio via postMessage para o iframe do Vimeo
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: "play" }), "*");
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: "setVolume", value: 1 }), "*");
      } catch (e) {
        console.warn("Could not postMessage to iframe", e);
      }
    }
    if (videoRef.current) {
      videoRef.current.play().catch((err) => console.warn("Video play error:", err));
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setVideoUrl(blobUrl);
      setVideoType("upload");
      setIsPlaying(false);
    }
  };

  const handleSaveEmbed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setVideoUrl(inputUrl.trim());
    setVideoType("embed");
    setIsPlaying(false);
    setIsModalOpen(false);
    setInputUrl("");
  };

  const handleResetToDefault = () => {
    setVideoUrl(DEFAULT_VSL_VIDEO);
    setVideoType(DEFAULT_VSL_TYPE);
    setAspectRatio("portrait");
    setIsPlaying(false);
    localStorage.removeItem("cod_e_vsl_video_v5");
    localStorage.removeItem("cod_e_vsl_type_v5");
    localStorage.removeItem("cod_e_vsl_aspect_v5");
  };

  const isEmbed =
    videoType === "embed" ||
    (videoUrl &&
      videoUrl.startsWith("http") &&
      (videoUrl.includes("vimeo") ||
        videoUrl.includes("youtube") ||
        videoUrl.includes("pandavideo") ||
        videoUrl.includes("embed")));

  const isCustom = videoUrl !== DEFAULT_VSL_VIDEO || aspectRatio !== "portrait";
  const currentEmbedSrc = buildEmbedUrl(videoUrl, isPlaying);

  return (
    <div
      className={`w-full mx-auto my-3 sm:my-6 px-1 sm:px-0 transition-all duration-300 ${
        aspectRatio === "portrait"
          ? "max-w-[390px] sm:max-w-[440px]"
          : "max-w-4xl sm:max-w-[960px]"
      }`}
    >
      {/* Moldura Cinematográfica de Alto Destaque inspirada no design vertical */}
      <div className="bg-[#091122] border-2 sm:border-3 border-slate-700/90 hover:border-red-500/70 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] ring-2 ring-[#A31E22]/30 overflow-hidden transition-all duration-300">
        {/* Barra Superior Slim da Apresentação */}
        <div className="bg-[#0D1830] border-b border-slate-700/80 px-3.5 sm:px-4 py-2 flex items-center justify-between gap-2 text-white">
          <div className="flex items-center gap-1.5 text-xs truncate">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
            <span className="font-mono text-amber-300 font-bold uppercase tracking-wider text-[10px] sm:text-xs truncate">
              🔴 APRESENTAÇÃO OFICIAL · COD-E
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] sm:text-[10px] font-mono font-bold">
              <Lock className="w-2.5 h-2.5 text-emerald-400" />
              <span>Vídeo Contínuo</span>
            </span>

            {isAdmin && (
              <div className="flex items-center gap-1 pl-1.5 border-l border-slate-700">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="video/mp4,video/webm,video/ogg,video/quicktime"
                  className="hidden"
                  id="vsl-upload-input"
                />

                <button
                  onClick={() =>
                    setAspectRatio((prev) => (prev === "portrait" ? "landscape" : "portrait"))
                  }
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] font-mono font-bold transition-all border border-slate-600 cursor-pointer"
                  title="Alternar entre formato Vertical (9:16) e Horizontal (16:9)"
                >
                  {aspectRatio === "portrait" ? "9:16" : "16:9"}
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold transition-all border border-slate-600 cursor-pointer"
                  title="Alterar Link do Vídeo (Vimeo/YouTube)"
                >
                  <LinkIcon className="w-3 h-3" />
                </button>

                {isCustom && (
                  <button
                    onClick={handleResetToDefault}
                    className="p-1 rounded bg-slate-800 hover:bg-amber-900/60 text-slate-400 hover:text-amber-300 transition-colors"
                    title="Restaurar padrão original"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Container do Vídeo: Em 9:16 o vídeo preenche toda a área sem barras pretas laterais! */}
        <div
          className={`relative w-full bg-[#000000] overflow-hidden select-none ${
            aspectRatio === "portrait" ? "aspect-[9/16]" : "aspect-video"
          }`}
        >
          {videoUrl ? (
            isEmbed ? (
              <>
                {/* Iframe oficial do Vimeo sem controles para rodar limpo */}
                <iframe
                  ref={iframeRef}
                  src={currentEmbedSrc}
                  title="Vídeo de Apresentação Código Europa"
                  className="w-full h-full border-0 absolute inset-0 z-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />

                {/* CAMADA DE BLOQUEIO DE INTERAÇÃO APÓS O PLAY:
                    Quando o vídeo está rodando, esta camada transparente impede que o lead
                    clique no iframe para pausar ou tentar voltar o vídeo. O vídeo segue direto! */}
                {isPlaying && (
                  <div
                    className="absolute inset-0 z-10 bg-transparent cursor-default pointer-events-auto"
                    title="Reprodução oficial em andamento"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )}
              </>
            ) : (
              <video
                ref={videoRef}
                src={videoUrl}
                controls={false}
                autoPlay={isPlaying}
                playsInline
                className="w-full h-full object-cover absolute inset-0 z-0"
                onContextMenu={(e) => e.preventDefault()}
              />
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
              <Volume2 className="w-8 h-8 text-amber-400 mb-2" />
              <span className="text-sm font-bold text-white">Carregando apresentação...</span>
            </div>
          )}

          {/* CAPA COM SUPER BOTÃO DE PLAY CIRCULAR CORAL/LARANJA IDÊNTICO À REFERÊNCIA DO USUÁRIO */}
          {!isPlaying && (
            <div
              onClick={handleStartPlayback}
              className="absolute inset-0 z-30 bg-black/35 hover:bg-black/25 flex flex-col items-center justify-center text-center p-4 sm:p-6 cursor-pointer group transition-all"
            >
              {/* Botão de Play circular com halo translúcido no tom coral/laranja de alta conversão */}
              <div className="relative mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                {/* Halo externo translúcido */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#EA580C]/25 border border-[#F97316]/50 flex items-center justify-center backdrop-blur-xs shadow-[0_0_40px_rgba(234,88,12,0.45)] animate-pulse">
                  {/* Círculo central com gradiente coral e seta branca */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#EA580C] via-[#E11D48] to-[#EF4444] text-white flex items-center justify-center shadow-[0_0_35px_rgba(234,88,12,0.9)] border-2 border-white/60">
                    <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white text-white translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Tag com instrução para tocar e ligar o som */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-sm border border-white/20 text-white text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Toque para assistir com som</span>
              </div>
            </div>
          )}

          {/* Indicador de Status Discreto durante a Reprodução */}
          {isPlaying && (
            <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-medium shadow-lg">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>Vídeo ativo</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal para Trocar Link se Necessário (Apenas Admin) */}
      {isAdmin && isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F172A] border border-slate-700 rounded-2xl max-w-md w-full p-6 text-white relative shadow-2xl animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif-brand text-xl font-bold mb-2 text-amber-300">
              Trocar Link do Vídeo
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Cole o link do seu vídeo hospedado no Vimeo, YouTube ou link direto .mp4:
            </p>
            <form onSubmit={handleSaveEmbed} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  URL do Vídeo (Vimeo ou YouTube)
                </label>
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://vimeo.com/1225405238 ou https://youtube.com/..."
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500 font-sans"
                  autoFocus
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Salvar Vídeo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
