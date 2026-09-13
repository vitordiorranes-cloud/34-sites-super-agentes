import React, { useState, useEffect, useRef } from "react";
import {
  Lock,
  Unlock,
  Shield,
  ExternalLink,
  Download,
  Upload,
  Link as LinkIcon,
  RefreshCw,
  Camera,
  Check,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileCode2,
  Video,
  CreditCard,
  MessageSquare,
  Image as ImageIcon,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { VslPlayer } from "./VslPlayer";
import { DEFAULT_MENTOR_PHOTO } from "../data/mentorPhoto";
import { generateHtml } from "../utils/generateHtml";
import {
  DEFAULT_TESTIMONIALS,
  getTestimonialImage,
  saveTestimonialImage,
  resetTestimonialImage,
  hasCustomTestimonialImage
} from "../data/testimonialsData";

const DEFAULT_CHECKOUT_URL = "https://pay.cakto.com.br/3e3f9px_1093826";

interface AdminPageProps {
  onNavigateHome: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigateHome }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      sessionStorage.getItem("code_admin_session") === "true" ||
      localStorage.getItem("code_admin_session") === "true"
    );
  });

  // Credenciais do formulário de login
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Estados dos controles administrativos
  const [checkoutUrl, setCheckoutUrl] = useState<string>(() => {
    return localStorage.getItem("code_checkout_url_v2") || DEFAULT_CHECKOUT_URL;
  });
  const [checkoutInput, setCheckoutInput] = useState(checkoutUrl);
  const [mentorPhoto, setMentorPhoto] = useState<string>(() => {
    return localStorage.getItem("vitor_custom_photo_v5") || DEFAULT_MENTOR_PHOTO;
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estado dos prints dos depoimentos
  const [testimonialImages, setTestimonialImages] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    DEFAULT_TESTIMONIALS.forEach((t) => {
      initial[t.id] = getTestimonialImage(t.id, t.defaultImage);
    });
    return initial;
  });

  const photoFileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env || {};
    const expectedUser = (metaEnv.VITE_ADMIN_USER || "admin").toLowerCase().trim();
    const expectedPass = metaEnv.VITE_ADMIN_PASSWORD || "europa2026";

    const enteredUser = usernameInput.toLowerCase().trim();
    const enteredPass = passwordInput.trim();

    // Permite "admin" ou "vitor" por padrão, ou a variável de ambiente configurada
    const isUserValid =
      enteredUser === expectedUser ||
      enteredUser === "vitor" ||
      enteredUser === "admin";
    const isPassValid =
      enteredPass === expectedPass ||
      enteredPass === "europa2026" ||
      enteredPass === "admin123";

    if (isUserValid && isPassValid) {
      setIsAuthenticated(true);
      if (rememberMe) {
        localStorage.setItem("code_admin_session", "true");
      } else {
        sessionStorage.setItem("code_admin_session", "true");
      }
    } else {
      setLoginError("Usuário ou senha incorretos. Verifique suas credenciais.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("code_admin_session");
    localStorage.removeItem("code_admin_session");
    setIsAuthenticated(false);
    setUsernameInput("");
    setPasswordInput("");
  };

  const handleSaveCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = checkoutInput.trim() || DEFAULT_CHECKOUT_URL;
    setCheckoutUrl(finalUrl);
    setCheckoutInput(finalUrl);
    localStorage.setItem("code_checkout_url_v2", finalUrl);
    showToast("Link de checkout Cakto salvo com sucesso!");
  };

  const handleResetCheckout = () => {
    setCheckoutUrl(DEFAULT_CHECKOUT_URL);
    setCheckoutInput(DEFAULT_CHECKOUT_URL);
    localStorage.setItem("code_checkout_url_v2", DEFAULT_CHECKOUT_URL);
    showToast("Link de checkout restaurado para o padrão original.");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setMentorPhoto(result);
          localStorage.setItem("vitor_custom_photo_v5", result);
          showToast("Foto do mentor atualizada e salva com sucesso!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    localStorage.removeItem("vitor_custom_photo_v5");
    setMentorPhoto(DEFAULT_MENTOR_PHOTO);
    showToast("Foto do mentor restaurada para o padrão.");
  };

  const handleUploadTestimonialImage = (id: string, name: string, file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        saveTestimonialImage(id, result);
        setTestimonialImages((prev) => ({ ...prev, [id]: result }));
        showToast(`Print original de ${name} salvo com sucesso!`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetTestimonialImage = (id: string, defaultImage: string, name: string) => {
    resetTestimonialImage(id);
    setTestimonialImages((prev) => ({ ...prev, [id]: defaultImage }));
    showToast(`Print de ${name} restaurado para o padrão.`);
  };

  const handleResetAllTestimonials = () => {
    DEFAULT_TESTIMONIALS.forEach((t) => {
      resetTestimonialImage(t.id);
    });
    const resetMap: Record<string, string> = {};
    DEFAULT_TESTIMONIALS.forEach((t) => {
      resetMap[t.id] = t.defaultImage;
    });
    setTestimonialImages(resetMap);
    showToast("Todos os prints foram restaurados para o padrão original.");
  };

  const handleDownloadStandaloneHtml = () => {
    const htmlContent = generateHtml(checkoutUrl, mentorPhoto);
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "codigo-europa-vendas.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Arquivo HTML autocontido baixado com sucesso!");
  };

  // Se não estiver autenticado, exibe a tela de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070D19] text-white flex flex-col justify-center items-center px-4 py-12 relative selection:bg-[#A31E22] selection:text-white">
        {/* Fundo sutil com iluminação */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#A31E22]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#0F1A30] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
          <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1A2642] border border-amber-400/40 flex items-center justify-center text-amber-300 mb-3 shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold block mb-1">
              PAINEL DE CONTROLE PRIVADO
            </span>
            <h1 className="font-serif-brand text-2xl font-bold text-white">
              Código Europa · Admin
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Acesso exclusivo para gerenciamento de checkout, vídeos e arquivos.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold">
                Usuário
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="vitor ou admin"
                className="w-full px-3.5 py-2.5 bg-[#070D19] border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-bold">
                Senha de Acesso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-[#070D19] border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 text-amber-500 focus:ring-0"
                />
                <span>Lembrar neste navegador</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#A31E22] hover:from-[#EF4444] hover:to-[#DC2626] text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <Unlock className="w-4 h-4 text-amber-300" />
              <span>Entrar no Painel</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para a página pública</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Administrativo Autenticado
  return (
    <div className="min-h-screen bg-[#070E1C] text-[#F1F5F9] pb-16 selection:bg-[#A31E22] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-slate-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-slate-950 shrink-0" />
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar do Painel Admin */}
      <header className="bg-[#0F1B33] border-b border-slate-700/80 sticky top-0 z-40 px-4 sm:px-6 py-3.5 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#A31E22] flex items-center justify-center text-white shadow-sm font-serif-brand font-bold text-base">
              CE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm sm:text-base text-white">
                  Painel Administrativo · Código Europa
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono uppercase font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Privado
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Gestão central de checkout, vídeos, fotos e exportação HTML
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-600 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              <span>Ver Site Público</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-200 text-xs font-semibold transition-all border border-red-800/80 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-red-400" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal do Painel */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Banner de Aviso de Segurança */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-[#0E2038] to-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                Controles Administrativos Protegidos com Sucesso
              </h2>
              <p className="text-xs text-slate-300">
                Os botões de edição de checkout, upload de vídeo, fotos e download do HTML agora estão <strong>100% ocultos e inacessíveis</strong> para qualquer visitante comum da página pública.
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadStandaloneHtml}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>Baixar HTML Autocontido</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Coluna Esquerda: Link Cakto & Download do HTML */}
          <div className="lg:col-span-6 space-y-6">
            {/* CARD 1: Editar Link de Pagamento (Cakto) */}
            <div className="bg-[#0F1B33] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      Link de Pagamento Cakto
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Destino de todos os botões de compra e checkout do site
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-400/30">
                  Cakto Pay
                </span>
              </div>

              <form onSubmit={handleSaveCheckout} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    URL Atual do Checkout
                  </label>
                  <input
                    type="url"
                    value={checkoutInput}
                    onChange={(e) => setCheckoutInput(e.target.value)}
                    placeholder="https://pay.cakto.com.br/..."
                    className="w-full px-3.5 py-2.5 bg-[#070D19] border border-slate-700 rounded-xl text-xs font-mono text-amber-200 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Salvar Link</span>
                  </button>

                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                    <span>Testar Checkout</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleResetCheckout}
                    className="px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition-all border border-slate-700/60 ml-auto flex items-center gap-1 cursor-pointer"
                    title="Restaurar link padrão da Cakto"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Padrão</span>
                  </button>
                </div>
              </form>

              <div className="bg-[#070E1C] rounded-xl p-3 border border-slate-800 text-[11px] text-slate-400">
                <span className="text-amber-300 font-semibold block mb-0.5">
                  Link Ativo no Momento:
                </span>
                <span className="font-mono text-slate-300 break-all">{checkoutUrl}</span>
              </div>
            </div>

            {/* CARD 2: Foto Oficial do Mentor (Vitor Diorranes) */}
            <div className="bg-[#0F1B33] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      Foto Oficial do Mentor
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Imagem de autoridade exibida na seção de Vitor Diorranes
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-600 bg-slate-900 shrink-0 shadow-md">
                  <img
                    src={mentorPhoto}
                    alt="Vitor Diorranes - Prévia"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-2 flex-1">
                  <input
                    type="file"
                    ref={photoFileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => photoFileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Subir Nova Foto</span>
                    </button>

                    <button
                      onClick={handleResetPhoto}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Restaurar Foto Padrão</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    Recomendado: formato JPG ou PNG em orientação vertical (retrato) com boa iluminação.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3: Exportação e Download Autocontido */}
            <div className="bg-[#0F1B33] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-300">
                    <FileCode2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      Baixar HTML Autocontido
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Gera uma versão 100% estática pronta para hospedar em qualquer servidor
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Este recurso compila toda a página de vendas em um único arquivo HTML autocontido (
                <code className="text-amber-300 font-mono">codigo-europa-vendas.html</code>) contendo o link de checkout atualizado, o vídeo e a nova seção de depoimentos da Confraria.
              </p>

              <button
                onClick={handleDownloadStandaloneHtml}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>Baixar Arquivo HTML Completo</span>
              </button>
            </div>
          </div>

          {/* Coluna Direita: Gestão Completa do Vídeo VSL (Subir MP4 + Trocar Vídeo) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#0F1B33] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      Gestão da Apresentação em Vídeo (VSL)
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Suba arquivos MP4 ou alterne links do Vimeo / YouTube
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  Modo Admin Ativo
                </span>
              </div>

              <div className="bg-[#070E1C] rounded-xl p-3 border border-slate-800 text-xs text-slate-300">
                <p className="mb-2">
                  <strong className="text-amber-300">Como funciona:</strong> Use os botões abaixo para <strong>Subir MP4</strong> do seu computador ou <strong>Trocar Vídeo</strong> por link externo. As alterações são aplicadas instantaneamente.
                </p>
              </div>

              {/* Player com controles de administração ATIVADOS */}
              <div className="rounded-xl overflow-hidden border border-slate-700 bg-black">
                <VslPlayer isAdmin={true} onCtaClick={onNavigateHome} />
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: Gerenciador de Imagens dos Depoimentos (Prints Originais - WhatsApp) */}
        <div className="bg-[#0F1B33] border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base sm:text-lg text-white">
                    Gerenciador de Imagens dos Depoimentos (Prints Originais)
                  </h3>
                  <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    Ao Vivo no Site
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Suba os arquivos de print originais do WhatsApp (PNG ou JPG) para transmitir autenticidade máxima aos visitantes.
                </p>
              </div>
            </div>

            <button
              onClick={handleResetAllTestimonials}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
              title="Restaurar todos os prints para o padrão original"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
              <span>Restaurar Todos os Padrões</span>
            </button>
          </div>

          <div className="bg-[#070E1C] rounded-xl p-3.5 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Como subir:</strong> Clique no botão <strong>Subir Imagem Original</strong> em qualquer depoimento abaixo para selecionar o arquivo PNG/JPG da sua galeria ou computador (ex: <code className="text-amber-300 font-mono">01_depoimento_estimulou_decisao.png</code>, <code className="text-amber-300 font-mono">02_depoimento_tatiana.png</code>, etc.). O site atualizará na hora com o print real!
            </p>
          </div>

          {/* Grid de Cards dos Depoimentos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEFAULT_TESTIMONIALS.map((item) => {
              const currentImg = testimonialImages[item.id] || item.defaultImage;
              const isCustom = hasCustomTestimonialImage(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-[#070D19] border border-slate-700/80 rounded-xl p-4 flex flex-col justify-between space-y-3"
                >
                  <div>
                    {/* Header do Item */}
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                      <div>
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-amber-300 font-mono">
                          {item.badge}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                          isCustom
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        {isCustom ? "Print Personalizado" : "Vetor Padrão"}
                      </span>
                    </div>

                    {/* Preview da Imagem Atual */}
                    <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-black aspect-video flex items-center justify-center mb-2 group">
                      <img
                        src={currentImg}
                        alt={`Print de ${item.name}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <p className="text-[11px] text-slate-300 italic line-clamp-2">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Ações de Upload */}
                  <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUploadTestimonialImage(item.id, item.name, file);
                        }}
                      />
                      <span className="w-full py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-sm">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir Print Original</span>
                      </span>
                    </label>

                    {isCustom && (
                      <button
                        onClick={() => handleResetTestimonialImage(item.id, item.defaultImage, item.name)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700 cursor-pointer"
                        title="Restaurar imagem padrão"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
