import { Agent, AgentMascot } from "../types";

export const AGENTS_DATA: Agent[] = [
  {
    id: "capitao",
    number: "01",
    name: "O CAPITÃO",
    initial: "C",
    role: "Por onde começar · estratégia e ordem da travessia",
    isCommander: true,
    enemy: "Começar pela etapa errada",
    resolves:
      "O cérebro do esquadrão, e o único que enxerga o tabuleiro inteiro. Ele lê o seu caso de ponta a ponta — idade, profissão, formação, reserva, família, urgência — e monta o seu plano de travessia em ordem: o que se faz agora, o que se faz depois, e o que você pode simplesmente parar de se preocupar por enquanto. Depois ele aciona os outros seis. Manda o ESTRATEGISTA encontrar a sua via, o DESPACHANTE abrir a pasta certa, o FINANCEIRO fechar a conta. Você não precisa saber com qual agente falar — o CAPITÃO sabe.",
    relieves:
      "Tira das suas costas a paralisia do primeiro passo e a confusão de quem tem dez dúvidas ao mesmo tempo.",
    quote:
      "Tenho 34 anos, sou enfermeira, sem cidadania, R$ 20 mil guardados e uma filha de 7. Por onde eu começo?",
    costAlone:
      "Sozinho, esse é o erro mais caro da travessia: começar pela etapa errada — e descobrir isso um ano e várias taxas depois."
  },
  {
    id: "estrategista",
    number: "02",
    name: "O ESTRATEGISTA",
    initial: "E",
    role: "Qual visto é o seu · a porta certa pro seu perfil",
    isCommander: false,
    enemy: "Tentar forçar a porta de outra pessoa",
    resolves:
      "Existe uma porta pra cada perfil, e uma que abre mais fácil que as outras. Ele cruza a sua situação com as vias disponíveis e devolve as que realmente se aplicam a você, em ordem de probabilidade, com o que falta pra cada uma e o que te desqualifica em cada uma — incluindo o critério que quase ninguém olha na hora de escolher: o que cada porta significa pro seu tempo do lado de lá.",
    relieves:
      "Tira das suas costas a ilusão de conselhos genéricos de fórum e a tentativa de forçar visto de turista sem amparo legal.",
    quote:
      "Trabalho remoto pra uma empresa brasileira. Isso me serve como base de pedido, ou eu preciso de outra via?",
    costAlone:
      "Sozinho: tentar forçar a porta de outra pessoa — o erro mais comum e o mais caro da internet brasileira."
  },
  {
    id: "despachante",
    number: "03",
    name: "O DESPACHANTE",
    initial: "D",
    role: "Sua papelada, na ordem certa · documentos e prazos",
    isCommander: false,
    enemy: "Documento vencido e semanas de garimpo",
    resolves:
      "Apostila de Haia, tradução juramentada, antecedentes criminais, certidões, diploma e histórico, passaporte, seguro-saúde e seguro viagem, procuração pra quem fica, documentos das crianças e do pet. Ele monta a sua lista pela via escolhida e te diz o que fazer primeiro — porque documento tem prazo, um depende do outro, e papel vencido derruba processo que levou meses pra montar. Tudo o que se resolve com o pé ainda no Brasil passa por ele.",
    relieves:
      "Tira das suas costas o desespero de comparecer ao consulado e ser recusado por uma certidão emitida fora do prazo legal.",
    quote:
      "Meu diploma precisa de apostila? E o atestado de antecedentes, vale por quanto tempo?",
    costAlone:
      "Sozinho: semanas de garimpo e o risco de refazer tradução juramentada que já custou caro uma vez."
  },
  {
    id: "financeiro",
    number: "04",
    name: "O FINANCEIRO",
    initial: "F",
    role: "Quanto custa de verdade · em euro e em real",
    isCommander: false,
    enemy: "Descobrir a conta real quando o dinheiro já acabou",
    resolves:
      "A conta da travessia inteira, cenário por cenário — sozinho, casal, com filho. Comprovação de meios exigida pela via escolhida, custo dos documentos, passagens, os três primeiros meses do outro lado (que é onde a maioria quebra), fiança e depósito do aluguel, câmbio e remessa, reserva de emergência. E a conta que ninguém faz na hora de sonhar: o custo de voltar, se der errado.",
    relieves:
      "Tira das suas costas a surpresa com cauções de moradia, taxas alfandegárias e perdas severas em operações de câmbio impulsivas.",
    quote:
      "Quanto eu preciso ter na conta pra isso não virar tragédia no terceiro mês?",
    costAlone:
      "Sozinho: descobrir a conta real quando o dinheiro já acabou — do outro lado do oceano, que é o pior lugar do mundo pra fazer essa descoberta."
  },
  {
    id: "bussola",
    number: "05",
    name: "A BÚSSOLA",
    initial: "B",
    role: "Onde morar · a cidade, o bairro e o muro do aluguel",
    isCommander: false,
    enemy: "Escolher a cidade pela foto e assinar contrato que vai querer desfazer",
    resolves:
      "Ela cruza o seu perfil — profissão, orçamento, família, clima, ritmo — com as cidades reais da Espanha, e vai até o bairro. Custo de vida comparado, perfil de cada zona, onde os brasileiros já estão e onde compensa não estar. E a parte que ninguém conta: alugar sem holerite espanhol e sem fiador é o gargalo de verdade de quem chega. Ela te mostra quais portais usar, como funcionam fiança e depósito, o que um proprietário espanhol pede de um recém-chegado, e as saídas legítimas de quem ainda não tem contrato — temporada, coliving, aluguel de quarto, aval bancário.",
    relieves:
      "Tira das suas costas o erro clássico de alugar à distância em bairros barulhentos, sem transporte ou longe de boas escolas públicas.",
    quote:
      "Barcelona ou Valência pra quem tem filho pequeno e não vai ter contrato de trabalho no começo?",
    costAlone:
      "Sozinho: escolher a cidade pela foto e assinar um contrato de um ano que você vai passar doze meses querendo desfazer."
  },
  {
    id: "joselito",
    number: "06",
    name: "JOSELITO",
    initial: "J",
    role: "O Seu Amigão da Espanha · Dicas de Ouro, Roteiros & Costumes Reais",
    isCommander: false,
    enemy: "Viver como turista perdido e pagar caro em tudo",
    resolves:
      "O Joselito é aquele amigão gente boa que já mora na Espanha há anos e te recebe com um abraço e um café con leche na mão. Ele te dá as melhores dicas de ouro que não estão em guia nenhum: roteiros secretos de fim de semana, onde comer tapas autênticas pagando pouco, os costumes e gírias locais pra você não passar vergonha, por que o comércio fecha na siesta e como usar o 'Menú del Día' pra economizar centenas de euros por mês. Com ele, você se sente em casa desde o primeiro dia.",
    relieves:
      "Tira das suas costas a solidão e a sensação de ser um estrangeiro deslocado, te transformando num verdadeiro local.",
    quote:
      "Ô parceiro! Onde você vai jantar às sete da tarde? Vem cá que vou te mostrar o roteiro de verdade e os melhores lugares da cidade!",
    costAlone:
      "Sozinho: morar meses numa cidade incrível sem viver a cultura de verdade e caindo em armadilhas de turista."
  },
  {
    id: "comissario",
    number: "07",
    name: "O COMISSÁRIO DE BORDO",
    initial: "CB",
    role: "Do embarque ao pouso · a semana do voo e a imigração",
    isCommander: false,
    enemy: "Improvisar na fila mais importante da sua vida",
    resolves:
      "Ele te pega na semana mais ansiosa da travessia e não solta até você pisar do outro lado. Checklist impresso vs celular, franquia e peso de bagagem, o que levar na mala de mão de mudança (e nunca despachar), conferência final dos seguros obrigatórios e como se portar com tranquilidade na cabine de imigração respondendo com a verdade técnica.",
    relieves:
      "Tira das suas costas o pânico da véspera do voo e a insegurança na cabine de controle de passaportes.",
    quote:
      "O que eu levo na bagagem de mão e como respondo com segurança se me chamarem na imigração?",
    costAlone:
      "Sozinho: improvisar na fila mais importante da sua vida, depois de meses planejando tudo o resto."
  }
];

export const OVERBUMP_AGENTS_DATA: Agent[] = [
  {
    id: "agente34",
    number: "08",
    name: "AGENTE 34",
    initial: "34",
    role: "Buscador de Trabalho & Mercado Europeu · Vagas Ocultas & Carreira",
    isCommander: false,
    isExtraBump: true,
    overbumpTeaser: "Elemento Surpresa · Reforço Tático Exclusivo",
    enemy: "Distribuir currículo genérico e ficar meses sem retorno",
    resolves:
      "O agente secreto do emprego na Europa. Ele mapeia vagas que não aparecem nos portais públicos, adapta seu currículo para o padrão Europeu (Europass e ATS-friendly), otimiza seu perfil do LinkedIn para recrutadores espanhóis e te treina para entrevistas em empresas da União Europeia, seja para trabalho remoto em euro ou presencial.",
    relieves:
      "Tira das suas costas a angústia da busca de emprego e o medo de queimar reservas financeiras.",
    quote:
      "Como adapto minha experiência brasileira para ser contratado por empresas na Espanha em euro?",
    costAlone:
      "Sozinho: meses enviando currículo no formato errado sem receber nenhuma resposta de recrutadores."
  },
  {
    id: "dommanuel",
    number: "09",
    name: "EL PROFESOR DOM MANUEL",
    initial: "DM",
    role: "O Professor de Espanhol · Imersão Acelerada & Diálogo do Dia a Dia",
    isCommander: false,
    isExtraBump: true,
    overbumpTeaser: "Elemento Surpresa · Reforço Tático Exclusivo",
    enemy: "Travar na hora de falar e ser refém do 'portunhol'",
    resolves:
      "O sábio mentor de espanhol prático. Ensina desde a fonética essencial até as expressões reais usadas em repartições públicas, bancos, supermercados e aluguel de imóveis. Focado em desatar a sua língua em tempo recorde sem enrolação de gramática cansativa — o espanhol da vida real pra você se comunicar com respeito e confiança.",
    relieves:
      "Tira das suas costas a vergonha de falar errado e o constrangimento em repartições públicas.",
    quote:
      "Como falar com o funcionário da prefeitura e do banco sem travar no portunhol?",
    costAlone:
      "Sozinho: anos e milhares de reais em escolas tradicionais sem conseguir ter uma conversa natural."
  },
  {
    id: "primeiros30dias",
    number: "10",
    name: "PRIMEIROS 30 DIAS",
    initial: "30D",
    role: "Guia de Pouso & Instalação Prática · A Linha de Chegada dos 30 Dias",
    isCommander: false,
    isExtraBump: true,
    overbumpTeaser: "Elemento Surpresa · Reforço Tático Exclusivo",
    enemy: "Bater cabeça no primeiro mês e perder prazos de residência",
    resolves:
      "Seu copiloto de campo nas 4 semanas mais decisivas após o pouso. Cronograma diário de instalação: agendamento da Cita Previa de Huellas (TIE), protocolo de empadronamento municipal sem complicação, ativação de chip 5G local, abertura de conta bancária espanhola e passe de transporte integrado.",
    relieves:
      "Tira das suas costas a sensação de desamparo e o estresse de não saber qual repartição procurar primeiro.",
    quote:
      "Pousei na Espanha hoje. Qual é a sequência exata de compromissos para os primeiros 15 dias?",
    costAlone:
      "Sozinho: perder prazos legais de 30 dias após a entrada e pagar multas ou ter o cartão de residência atrasado."
  }
];

export const SECRET_AGENTS_DATA = OVERBUMP_AGENTS_DATA;

export const SPECIAL_AGENTS_DATA: Agent[] = [
  ...OVERBUMP_AGENTS_DATA,
  {
    id: "confraria",
    number: "11",
    name: "CONFRARIA EUROPA",
    initial: "CE",
    role: "Rede de Apoio & Comunidade · Brasileiros em Travessia Ativa",
    isCommander: false,
    enemy: "Solidão migratória e falta de contatos confiáveis",
    resolves:
      "A irmandade de quem já está em solo espanhol. Conectamos você a famílias e profissionais brasileiros que vivem na Espanha para compartilhar indicações de bairros, escolas para os filhos, médicos, feiras e oportunidades reais de networking e trabalho.",
    relieves:
      "Tira das suas costas a solidão e a sensação de começar do absoluto zero sem amigos por perto.",
    quote:
      "Alguém com filhos em idade escolar em Valência pode me indicar colégios públicos de boa referência no bairro?",
    costAlone:
      "Sozinho: isolamento no novo país e falta de contatos de confiança para situações do dia a dia."
  },
  {
    id: "mentoria",
    number: "12",
    name: "MENTORIA COM O DIÓRRA",
    initial: "VD",
    role: "Direção Estratégica & Visão de Jogo com Vitor Diorranes",
    isCommander: false,
    enemy: "Falta de direcionamento experiente de quem vive o jogo internacional",
    resolves:
      "A sabedoria prática de quem morou em 5 países, visitou 33, atuou em cargos de liderança internacional e vive em Barcelona. Análise estratégica do seu plano familiar e profissional com Vitor Diorranes para alinhar sua jogada com clareza e autoridade.",
    relieves:
      "Tira das suas costas o receio de estar tomando a decisão errada para a sua carreira e para os seus filhos.",
    quote:
      "Vitor, avalie o plano da minha família: renda remota, 2 filhos e meta de passaporte em 2 anos. Por onde blindamos?",
    costAlone:
      "Sozinho: cometer erros estratégicos caros que poderiam ser evitados com uma simples conversa de direcionamento."
  }
];

export const ALL_AGENTS_DATA: Agent[] = [...AGENTS_DATA, ...SPECIAL_AGENTS_DATA];

export const MASCOTS_CONFIG: Record<string, AgentMascot> = {
  capitao: {
    mascotName: "O Capitão",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/40",
    accentHex: "#A31E22",
    cardBg: "from-[#1F1826] to-[#121A2D]",
    borderColor: "border-[#A31E22]",
    glowColor: "shadow-[0_0_30px_rgba(163,30,34,0.35)]",
    superpower: "Estratégia & Ordem Cronológica da Travessia",
    personality: "O cérebro do esquadrão. Lê o caso inteiro e aciona os outros seis."
  },
  estrategista: {
    mascotName: "O Estrategista",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    accentHex: "#F59E0B",
    cardBg: "from-[#13203D] to-[#0F172A]",
    borderColor: "border-amber-500/70",
    glowColor: "shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    superpower: "Qual Visto é o Seu · A Porta Certa pro Seu Perfil",
    personality: "Mapeia as vias em ordem de probabilidade matemática."
  },
  despachante: {
    mascotName: "O Despachante",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    accentHex: "#DC2626",
    cardBg: "from-[#24131A] to-[#0F172A]",
    borderColor: "border-rose-600/70",
    glowColor: "shadow-[0_0_30px_rgba(220,38,38,0.25)]",
    superpower: "Sua Papelada na Ordem Certa · Documentos & Prazos",
    personality: "Tudo o que se resolve com o pé ainda no Brasil passa por ele."
  },
  financeiro: {
    mascotName: "O Financeiro",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    accentHex: "#10B981",
    cardBg: "from-[#102422] to-[#0F172A]",
    borderColor: "border-emerald-500/70",
    glowColor: "shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    superpower: "Quanto Custa de Verdade · em Euro e em Real",
    personality: "A conta da travessia inteira, cenário por cenário, antes de gastar um centavo."
  },
  bussola: {
    mascotName: "A Bússola",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    accentHex: "#0284C7",
    cardBg: "from-[#122238] to-[#0F172A]",
    borderColor: "border-sky-400/70",
    glowColor: "shadow-[0_0_30px_rgba(2,132,199,0.25)]",
    superpower: "Onde Morar · A Cidade, o Bairro e o Muro do Aluguel",
    personality: "Cruza estilo de vida e destrava o aluguel sem holerite local."
  },
  joselito: {
    mascotName: "Joselito",
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    accentHex: "#EAB308",
    cardBg: "from-[#2A2312] to-[#0F172A]",
    borderColor: "border-yellow-500/70",
    glowColor: "shadow-[0_0_30px_rgba(234,179,8,0.25)]",
    superpower: "O Grande Amigão · Dicas de Ouro, Roteiros Secretos & Costumes",
    personality: "O amigão que já mora na Espanha, te recebe com um abraço e te ensina a viver como um local."
  },
  comissario: {
    mascotName: "O Comissário de Bordo",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    accentHex: "#3B82F6",
    cardBg: "from-[#141C30] to-[#0F172A]",
    borderColor: "border-blue-500/70",
    glowColor: "shadow-[0_0_30px_rgba(59,130,246,0.25)]",
    superpower: "Do Embarque ao Pouso · A Semana do Voo & Fila da Imigração",
    personality: "Te pega na semana mais ansiosa da travessia e não solta até você pisar lá."
  },
  agente34: {
    mascotName: "Agente 34",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    accentHex: "#8B5CF6",
    cardBg: "from-[#1E1233] to-[#0F172A]",
    borderColor: "border-purple-500/70",
    glowColor: "shadow-[0_0_30px_rgba(139,92,246,0.25)]",
    superpower: "Buscador de Trabalho & Vagas Ocultas na Europa",
    personality: "O detetive do emprego. Mapeia vagas confidenciais, currículo Europeu e LinkedIn internacional."
  },
  dommanuel: {
    mascotName: "El Profesor Dom Manuel",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    accentHex: "#E11D48",
    cardBg: "from-[#2A121A] to-[#0F172A]",
    borderColor: "border-rose-500/70",
    glowColor: "shadow-[0_0_30px_rgba(225,29,72,0.25)]",
    superpower: "O Professor de Espanhol & Diálogo do Dia a Dia",
    personality: "O sábio mentor da língua. Destrava sua conversação da vida real para você falar com respeito e fluência."
  },
  primeiros30dias: {
    mascotName: "Primeiros 30 Dias",
    badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    accentHex: "#F97316",
    cardBg: "from-[#2A180E] to-[#0F172A]",
    borderColor: "border-orange-500/70",
    glowColor: "shadow-[0_0_30px_rgba(249,115,22,0.25)]",
    superpower: "Guia de Pouso & Instalação Prática nos Primeiros 30 Dias",
    personality: "Prático e ágil: TIE, empadronamento, chip e conta bancária nos primeiros 30 dias sem bater cabeça."
  },
  confraria: {
    mascotName: "Confraria Europa",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
    accentHex: "#14B8A6",
    cardBg: "from-[#0E2625] to-[#0F172A]",
    borderColor: "border-teal-500/70",
    glowColor: "shadow-[0_0_30px_rgba(20,184,166,0.25)]",
    superpower: "Comunidade Viva & Rede de Apoio Real em Solo Espanhol",
    personality: "O coração do movimento. União de forças de brasileiros que se apoiam mutuamente."
  },
  mentoria: {
    mascotName: "Mentoria Diórra",
    badgeColor: "bg-amber-400/20 text-amber-200 border-amber-400/50",
    accentHex: "#EAB308",
    cardBg: "from-[#2A200F] to-[#0F172A]",
    borderColor: "border-amber-400/80",
    glowColor: "shadow-[0_0_30px_rgba(234,179,8,0.35)]",
    superpower: "Visão de Jogo Internacional com Vitor Diorranes",
    personality: "Liderança e visão de quem vive na Espanha e ajuda você a ser o herói da sua travessia."
  }
};
