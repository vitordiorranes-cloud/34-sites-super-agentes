import { TestimonialItem } from "../types";

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "06_cassio_decisao_vida_familiar",
    name: "Cássio Guimarães",
    location: "Brasil · Diagnóstico Europa",
    badge: "Família & Mudança",
    initials: "CG",
    quote: "Bacana! Me estimulou, pois acredito que é a decisão mais acertada para a fase da vida familiar.",
    defaultImage: "/assets/testimonials/06_cassio_decisao_vida_familiar.jpg",
    avatarBg: "from-blue-600 to-indigo-800",
    time: "00:21",
    category: "familia",
  },
  {
    id: "04_ednara_amei_tirar_duvidas",
    name: "Ednara",
    location: "Brasil",
    badge: "Aluna Confraria",
    initials: "ED",
    quote: "Ameiii. Muito obrigada Deu pra tirar bastante dúvidas",
    defaultImage: "/assets/testimonials/04_ednara_amei_tirar_duvidas.jpg",
    avatarBg: "from-amber-500 to-amber-700",
    time: "00:58",
    category: "familia",
  },
  {
    id: "03_aluna_portugal_fe_foco",
    name: "Aluna na Europa (Portugal)",
    location: "Portugal · Europa",
    badge: "Transição para Espanha",
    initials: "PT",
    quote: "Vamos juntos sim. Obrigada!!! Vai dar certo sim!! Tenho fé e foco nisso 🙏😊 Obrigada pelo apoio !!",
    defaultImage: "/assets/testimonials/03_aluna_portugal_fe_foco.jpg",
    avatarBg: "from-emerald-500 to-teal-800",
    time: "23:23",
    category: "transicao",
  },
  {
    id: "05_tatiana_live_oportunidade",
    name: "Tatiana",
    location: "Brasil",
    badge: "Participante da Live",
    initials: "TA",
    quote: "Estava na Live... Muito boa. Agradeço a oportunidade de tirar dúvidas.",
    defaultImage: "/assets/testimonials/05_tatiana_live_oportunidade.jpg",
    avatarBg: "from-rose-500 to-red-700",
    time: "00:23",
    category: "geral",
  },
  {
    id: "02_planejamento_estrategico_iniciante",
    name: "Aluno Confraria",
    location: "Brasil",
    badge: "Planejamento Estratégico",
    initials: "AC",
    quote: "Ajudou, com certeza. Então estamos na fase iniciante... o planejamento estratégico vai ser fundamental.",
    defaultImage: "/assets/testimonials/02_planejamento_estrategico_iniciante.jpg",
    avatarBg: "from-purple-600 to-violet-900",
    time: "18:14",
    category: "estrategia",
  },
  {
    id: "01_amigo_informacoes_audio",
    name: "Membro da Confraria",
    location: "Brasil",
    badge: "Orientações da Rota",
    initials: "MC",
    quote: "Muito obg meu amigo pelas informações 🤝",
    defaultImage: "/assets/testimonials/01_amigo_informacoes_audio.jpg",
    avatarBg: "from-sky-500 to-blue-800",
    time: "19:19",
    category: "geral",
  },
];

export const getTestimonialImage = (id: string, defaultImage: string): string => {
  if (typeof window === "undefined") return defaultImage;
  try {
    const saved = localStorage.getItem(`code_testimonial_img_${id}`);
    if (saved && saved.trim().length > 0) return saved;
  } catch (e) {
    console.warn("Could not read localStorage for testimonial", id, e);
  }
  return defaultImage;
};

export const hasCustomTestimonialImage = (id: string): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const saved = localStorage.getItem(`code_testimonial_img_${id}`);
    return !!(saved && saved.trim().length > 0);
  } catch {
    return false;
  }
};

export const saveTestimonialImage = (id: string, dataUrl: string): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`code_testimonial_img_${id}`, dataUrl);
  } catch (e) {
    console.error("Could not save testimonial image to localStorage", e);
  }
};

export const resetTestimonialImage = (id: string): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(`code_testimonial_img_${id}`);
  } catch (e) {
    console.error("Could not reset testimonial image", e);
  }
};
