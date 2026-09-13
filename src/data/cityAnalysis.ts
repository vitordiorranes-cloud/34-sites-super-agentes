export interface CityDetailedAnalysis {
  id: string;
  name: string;
  region: string;
  tagline: string;
  isPrimary?: boolean;
  heroPhoto: string;
  badge: string;
  quickStats: {
    rentAvg: string;
    costSingle: string;
    costFamily: string;
    sunnyDays: string;
    avgTemp: string;
    safetyScore: string;
  };
  livingCost: {
    overview: string;
    supermarket: string;
    transport: string;
    utilities: string;
    diningOut: string;
    monthlyBudgetNote: string;
  };
  housing: {
    overview: string;
    averageRents: {
      t1: string; // 1 quarto
      t2: string; // 2 quartos
      t3: string; // 3 quartos
    };
    bestNeighborhoods: Array<{ name: string; why: string }>;
    rentalRequirements: string;
    empadronamientoTip: string;
  };
  jobMarket: {
    overview: string;
    topSectors: string[];
    averageSalary: string;
    foreignFriendly: string;
    nomadRemoteFriendly: string;
  };
  tourismAndLifestyle: {
    overview: string;
    climate: string;
    leisureAndCulture: string[];
    safetyAndFamily: string;
  };
  codEStrategy: {
    whyChoose: string;
    immigrationPace: string;
    mentorGoldenTip: string;
  };
}

export const CITY_ANALYSES: Record<string, CityDetailedAnalysis> = {
  barcelona: {
    id: "barcelona",
    name: "Barcelona",
    region: "Catalunha · Capital do Mediterrâneo",
    tagline: "Hub tecnológico global, praias urbanas e alta oferta de empregos internacionais.",
    isPrimary: true,
    heroPhoto: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
    badge: "Metrópole Global & Tecnologia",
    quickStats: {
      rentAvg: "€ 1.400 - 1.800/mês",
      costSingle: "€ 2.100 - 2.500/mês",
      costFamily: "€ 3.200 - 4.200/mês",
      sunnyDays: "290 dias/ano",
      avgTemp: "18°C a 29°C",
      safetyScore: "8.5/10 (Excelente transporte e ruas vivas)",
    },
    livingCost: {
      overview: "Sendo a segunda maior economia da Espanha, tem custo superior à média nacional, amplamente compensado pela abundância de salários internacionais e infraestrutura urbana de primeiro mundo.",
      supermarket: "€ 280 a € 380/mês para casal em redes locais (Mercadona, Bonpreu, Lidl).",
      transport: "T-Usual (passe ilimitado mensal de metrô, ônibus e trem) por cerca de € 21,35/mês graças a subsídios do governo.",
      utilities: "Contas de luz, água, gás e fibra ótica de 600Mb giram em torno de € 130 a € 180/mês.",
      diningOut: "Menu del Día executivo completo com entrada, prato principal, sobremesa e bebida por € 12 a € 16.",
      monthlyBudgetNote: "Ideal para quem busca salários em multinacionais de tecnologia ou atua como nômade digital.",
    },
    housing: {
      overview: "Mercado dinâmico com grande oferta de apartamentos reformados. A legislação catalã exige cautela em contratos temporários versus residenciais de longa duração.",
      averageRents: {
        t1: "€ 950 - 1.300/mês",
        t2: "€ 1.400 - 1.800/mês",
        t3: "€ 1.800 - 2.400/mês",
      },
      bestNeighborhoods: [
        { name: "Poblenou / 22@", why: "Bairro tecnológico moderno, perto da praia, ciclovias e startups." },
        { name: "Eixample (Esquerra & Dreta)", why: "Arquitetura modernista icônica, ruas largas, comércio farto e estações de metrô a cada esquina." },
        { name: "Gràcia", why: "Vibe de vilarejo charmoso com praças para pedestres, restaurantes orgânicos e vida familiar tranquila." },
        { name: "Sants / Les Corts", why: "Excelente custo-benefício, próximo à estação central de trem de alta velocidade (Sants)." },
      ],
      rentalRequirements: "Geralmente 1 a 2 meses de fiança legal, comprovação de renda líquida familiar (aproximadamente 3x o valor do aluguel) ou garantia de pré-pagamento acordada.",
      empadronamientoTip: "A prefeitura de Barcelona (Ajuntament) é moderna e digitalizada; com o contrato de locação em mãos, o empadronamiento é agendado online com rapidez.",
    },
    jobMarket: {
      overview: "Considerado o maior polo de startups do sul da Europa. É a cidade que mais contrata estrangeiros sem fluência absoluta em espanhol inicial no setor de tech, atendimento e marketing.",
      topSectors: ["Tecnologia & Startups", "Turismo & Hotelaria de Luxo", "Biomedicina & Farmacêutica", "Logística Portuária & Comércio Exterior"],
      averageSalary: "€ 2.200 a € 3.800 líquidos para profissionais qualificados (salário mínimo interprofissional SMI na Espanha é de € 1.134 brutos em 14 parcelas).",
      foreignFriendly: "Muito alta. Mais de 22% da população residente é estrangeira de mais de 170 nacionalidades.",
      nomadRemoteFriendly: "Excepcional; centenas de coworkings, cafés adaptados e eventos semanais de networking.",
    },
    tourismAndLifestyle: {
      overview: "Combinação rara de metrópole vibrante com 4,5 km de praias urbanas, parques montanhosos como Montjuïc e Tibidabo e obras-primas de Gaudí.",
      climate: "Mediterrâneo temperado com invernos amenos (raramente abaixo de 8°C) e verões ensolarados e quentes.",
      leisureAndCulture: ["Praias de Bogatell e Barceloneta", "Parc de la Ciutadella e Montjuïc", "Sagrada Família e Parque Güell", "Gastronomia mediterrânea e tapas"],
      safetyAndFamily: "Excelente para famílias. Risco quase nulo de crimes violentos; a atenção nas zonas ultra turísticas restringe-se a pequenos furtos (pickpockets).",
    },
    codEStrategy: {
      whyChoose: "Melhor opção para quem precisa de recolocação rápida no mercado corporativo internacional ou quer empreender com clientes em toda a União Europeia.",
      immigrationPace: "Órgãos de extranjería costumam ter maior volume de pedidos, por isso a pasta documental estruturada pelo Esquadrão COD-E evita retrabalhos e exigências (requerimientos).",
      mentorGoldenTip: "Ao buscar imóvel, priorize bairros da Linha 1 ou Linha 4 do metrô, permitindo morar em áreas residenciais mais calmas e chegar ao centro em 15 minutos.",
    },
  },

  madrid: {
    id: "madrid",
    name: "Madrid",
    region: "Comunidad de Madrid · Centro Econômico & Capital",
    tagline: "Coração financeiro da Espanha, maiores salários do país e conexões ferroviárias e aéreas globais.",
    isPrimary: true,
    heroPhoto: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80",
    badge: "Capital & Centro de Decisões",
    quickStats: {
      rentAvg: "€ 1.300 - 1.750/mês",
      costSingle: "€ 1.950 - 2.400/mês",
      costFamily: "€ 3.000 - 4.000/mês",
      sunnyDays: "280 dias/ano",
      avgTemp: "14°C a 33°C",
      safetyScore: "9.2/10 (Uma das capitais mais seguras do mundo)",
    },
    livingCost: {
      overview: "Oferece o melhor poder de compra da Espanha: embora o aluguel seja similar a Barcelona, a média salarial é mais alta e a tributação regional da Comunidad de Madrid é uma das mais atrativas do país.",
      supermarket: "€ 260 a € 350/mês para casal nos mercados de bairro (Mercadona, Ahorramas, Dia).",
      transport: "Rede de metrô premiada mundialmente. Abono Transporte Jovem até 26 anos por € 8/mês e Abono Geral com 50-60% de desconto do governo.",
      utilities: "Luz, água, aquecimento e internet por cerca de € 140 a € 190/mês (no inverno o gás para calefacción pode aumentar ligeiramente).",
      diningOut: "Cultura riquíssima de bares; Menu del Día por € 11 a € 15 com porções fartas.",
      monthlyBudgetNote: "Excelente relação custo-retorno para quem quer crescer profissionalmente com rapidez.",
    },
    housing: {
      overview: "Madrid possui uma mancha urbana ampla e conectada por trens suburbanos (Cercanías). Quem aceita morar a 20 minutos do centro de trem encontra casas e apartamentos espaçosos por valores muito atrativos.",
      averageRents: {
        t1: "€ 900 - 1.250/mês",
        t2: "€ 1.300 - 1.750/mês",
        t3: "€ 1.700 - 2.300/mês",
      },
      bestNeighborhoods: [
        { name: "Chamberí & Retiro", why: "Bairros nobres tradicionais, elegantes, seguros e a passos do Parque do Retiro." },
        { name: "Moncloa / Argüelles", why: "Área universitária arborizada com excelente acesso a hospitais de ponta e transporte." },
        { name: "Alcobendas / San Sebastián", why: "Zona norte com condomínios fechados, colégios internacionais e sedes de grandes empresas." },
        { name: "Getafe / Leganés (Sul metropolitano)", why: "Aluguéis até 35% mais baratos, a apenas 18 minutos de trem de Puerta de Atocha." },
      ],
      rentalRequirements: "Nôminas (holerites) espanholas ou comprovação de fundos líquidos; contrato de trabalho indefinido costuma abrir portas com facilidade.",
      empadronamientoTip: "As Oficinas de Atención a la Ciudadanía de Madrid funcionam por agendamento prévio (Cita Previa) e são altamente organizadas e eficientes.",
    },
    jobMarket: {
      overview: "Sede de quase 90% das multinacionais que operam na Península Ibérica. Maior densidade de vagas de trabalho formal, consultoria, finanças, saúde e administração pública.",
      topSectors: ["Bancos & Finanças", "Consultoria & Serviços Jurídicos", "Engenharia & TI", "Saúde & Ensino Universitário"],
      averageSalary: "€ 2.400 a € 4.200 líquidos para especialistas e cargos de gestão corporativa.",
      foreignFriendly: "Muito acolhedora. O famoso ditado 'De Madrid al Cielo' reflete o espírito madrilenho: ninguém pergunta de onde você veio, você já é de Madrid.",
      nomadRemoteFriendly: "Excelente infraestrutura de telecomunicações com fibra ótica simétrica de 1Gbps em quase 100% da capital.",
    },
    tourismAndLifestyle: {
      overview: "Vida cultural ininterrupta: museus do Triângulo de Ouro (Prado, Reina Sofía, Thyssen), teatros na Gran Vía e parques gigantescos como a Casa de Campo e o Retiro.",
      climate: "Continental mediterrâneo: verões quentes e secos, outonos dourados deslumbrantes e invernos frescos com céu azul cristalino.",
      leisureAndCulture: ["Parque do Retiro e Palácio de Cristal", "Museu do Prado e Centro Reina Sofía", "Estádio Santiago Bernabéu", "Bares de tapas na Latina e Malasaña"],
      safetyAndFamily: "Segurança de nível internacional. É comum ver pessoas caminhando sozinhas com fone de ouvido de madrugada pelo centro sem qualquer incidente.",
    },
    codEStrategy: {
      whyChoose: "Melhor destino para quem quer trabalhar em grandes empresas, montar consultorias ou ter os filhos estudando nas universidades mais prestigiadas da Espanha.",
      immigrationPace: "A extranjería de Madrid possui o maior volume de processos do país, mas conta com equipes grandes. A chave é protocolar via plataforma telemática Mercurio sem falhas documentais.",
      mentorGoldenTip: "Considere viver em cidades do anel metropolitano (como Getafe, Pozuelo ou Rivas) para economizar no aluguel e desfrutar de piscinas comunitárias e garagens inclusas.",
    },
  },

  valencia: {
    id: "valencia",
    name: "Valencia",
    region: "Comunidad Valenciana · O Equilíbrio Perfeito",
    tagline: "Mais de 300 dias de sol por ano, o icônico parque linear do Turia e custo de vida acessível com praia.",
    isPrimary: true,
    heroPhoto: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Valencia-_Plaza_del_Ayuntamiento_%2825311977285%29.jpg/960px-Valencia-_Plaza_del_Ayuntamiento_%2825311977285%29.jpg",
    badge: "Equilíbrio, Sol & Qualidade de Vida",
    quickStats: {
      rentAvg: "€ 900 - 1.250/mês",
      costSingle: "€ 1.450 - 1.850/mês",
      costFamily: "€ 2.300 - 3.000/mês",
      sunnyDays: "305 dias/ano",
      avgTemp: "16°C a 30°C",
      safetyScore: "9.4/10 (Tranquilidade total para famílias)",
    },
    livingCost: {
      overview: "Terceira maior cidade da Espanha, Valência entrega qualidade de vida de metrópole com custo de vida 25% a 35% mais baixo que Madrid e Barcelona.",
      supermarket: "€ 220 a € 300/mês para casal com alimentos frescos e frutas da horta valenciana a preços muito em conta.",
      transport: "Cidade plana com ciclovias impecáveis cruzando toda a área urbana; cartão Suma que integra metrô, bonde e ônibus por preços simbólicos.",
      utilities: "Contas residenciais completas por volta de € 100 a € 145/mês.",
      diningOut: "Autêntica Paella Valenciana à beira-mar e menus completos por € 10 a € 13.",
      monthlyBudgetNote: "A queridinha número um dos brasileiros com famílias e de quem trabalha remotamente.",
    },
    housing: {
      overview: "Oferta equilibrada de apartamentos iluminados com varandas amplas. Bairros com parques e escolas a curta caminhada.",
      averageRents: {
        t1: "€ 700 - 950/mês",
        t2: "€ 900 - 1.250/mês",
        t3: "€ 1.200 - 1.650/mês",
      },
      bestNeighborhoods: [
        { name: "Ruzafa (Russafa)", why: "Bairro boêmio, gastronômico e artístico, repleto de cafés e vida diurna animada." },
        { name: "Benimaclet", why: "Tradicional e multicultural, com forte presença universitária e transporte direto ao centro e praia." },
        { name: "Campanar & Nou Campanar", why: "Bairro residencial moderno com condomínios com piscina, ideal para famílias com crianças." },
        { name: "Poblats Marítims (El Cabanyal)", why: "Antigo bairro de pescadores revitalizado, a poucos minutos a pé da praia de Malvarrosa." },
      ],
      rentalRequirements: "Processos de locação mais flexíveis que nas duas maiores capitais; proprietários locais costumam ser receptivos a acordos transparentes.",
      empadronamientoTip: "Empadronamento ágil nas juntas de distrito; essencial para matricular os filhos na escola pública em poucos dias.",
    },
    jobMarket: {
      overview: "Polo de inovação sustentável, design, logística portuária e crescente ecossistema de startups na Marina de València.",
      topSectors: ["Tecnologia & Inovação (Marina de Empresas)", "Comércio Exterior & Porto de Valência", "Turismo & Gastronomia", "Indústria Agroalimentar"],
      averageSalary: "€ 1.700 a € 2.800 líquidos em média para funções especializadas.",
      foreignFriendly: "Altamente acolhedora e calorosa com famílias latino-americanas.",
      nomadRemoteFriendly: "Classificada repetidamente como uma das melhores cidades do mundo para estrangeiros viverem pela InterNations.",
    },
    tourismAndLifestyle: {
      overview: "O Jardim do Turia — antigo leito do rio transformado em parque verde de 9 km contínuos — permite pedalar da Cidade das Artes e das Ciências até o zoológico Bioparc sem cruzar com carros.",
      climate: "Clima mediterrâneo privilegiado, com invernos muito suaves e dias claros o ano inteiro.",
      leisureAndCulture: ["Cidade das Artes e das Ciências", "Praia de Malvarrosa e Patacona", "Jardins do Turia", "Festival de Las Fallas em março"],
      safetyAndFamily: "Excelente segurança urbana; crianças brincam nas praças até tarde da noite nos meses quentes.",
    },
    codEStrategy: {
      whyChoose: "A escolha número um para quem busca sol, mar, custo sustentável e tranquilidade para os filhos sem abrir mão da infraestrutura de metrópole.",
      immigrationPace: "A oficina de extranjería de Valência costuma ter prazos mais previsíveis que as de Madrid, tornando a transição menos estressante.",
      mentorGoldenTip: "Ter uma bicicleta ou patinete elétrico substitui completamente o carro no dia a dia em Valência, gerando economia de milhares de euros por ano.",
    },
  },

  malaga: {
    id: "malaga",
    name: "Málaga & Costa del Sol",
    region: "Andaluzia · Polo Tecnológico & Mar",
    tagline: "O Vale do Silício do sul da Europa: centro de excelência em cibersegurança do Google, 320 dias de sol e mar cristalino.",
    isPrimary: false,
    heroPhoto: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=80",
    badge: "Silicon Valley Espanhol & Costa del Sol",
    quickStats: {
      rentAvg: "€ 850 - 1.200/mês",
      costSingle: "€ 1.400 - 1.800/mês",
      costFamily: "€ 2.200 - 2.900/mês",
      sunnyDays: "320 dias/ano",
      avgTemp: "18°C a 31°C",
      safetyScore: "9.3/10 (Ambiente seguro e cosmopolita)",
    },
    livingCost: {
      overview: "Crescimento econômico acelerado impulsionado pelo Málaga TechPark, mantendo um custo de vida mais razoável que o das capitais do norte.",
      supermarket: "€ 210 a € 290/mês para casal; peixes frescos e azeite andaluz de qualidade inigualável.",
      transport: "Metrô novo e moderno, ônibus municipais (EMT) e trem suburbano ligando Málaga ao aeroporto internacional e praias da Costa del Sol (Torremolinos, Fuengirola).",
      utilities: "€ 95 a € 140/mês; o clima quente reduz a necessidade de calefação na maior parte do inverno.",
      diningOut: "Espetos de sardinha na brasa nos chiringuitos de praia por € 5 a € 8; cerveja com tapa por € 2,50.",
      monthlyBudgetNote: "Perfeito para profissionais de tecnologia e telecomunicações que valorizam o mar.",
    },
    housing: {
      overview: "Mercado aquecido pela chegada contínua de engenheiros de software de toda a Europa. Cidades vizinhas conectadas por trem oferecem opções amplas.",
      averageRents: {
        t1: "€ 680 - 900/mês",
        t2: "€ 850 - 1.200/mês",
        t3: "€ 1.150 - 1.600/mês",
      },
      bestNeighborhoods: [
        { name: "Teatinos", why: "Bairro universitário moderno, com edifícios novos, piscinas e facilidade de acesso ao Málaga TechPark." },
        { name: "Soho & Centro Histórico", why: "Bairro das artes com murais urbanos, gastronomia cosmopolita e perto do porto." },
        { name: "Huelin / Carretera de Cádiz", why: "Perto da praia de San Andrés e da estação Maria Zambrano, com excelente custo-benefício." },
        { name: "Benalmádena / Torremolinos", why: "Cidades praianas vizinhas a 20 minutos de trem, com aluguéis mais brandos e vista para o mar." },
      ],
      rentalRequirements: "Contratos de longa duração (arrendamiento de vivienda habitual); demonstração de solvência financeira através de contracheques ou contrato de trabalho remoto.",
      empadronamientoTip: "Empadronamento organizado com atendimento pessoal e cordial nas OMACs espalhadas pela cidade.",
    },
    jobMarket: {
      overview: "Epicentro de investimentos tecnológicos internacionais: Google instalou ali seu principal Centro de Engenharia de Segurança Europeu, ao lado de Vodafone, Citi e Ericsson.",
      topSectors: ["Cibersegurança & TI", "Turismo Internacional & Cruzeiros", "Construção Civil & Mercado Imobiliário", "Energias Renováveis"],
      averageSalary: "€ 1.800 a € 3.200 líquidos em empresas de base tecnológica.",
      foreignFriendly: "Comunidade internacional fortíssima de britânicos, alemães, nórdicos e brasileiros.",
      nomadRemoteFriendly: "Uma das capitais de trabalho remoto mais desejadas do planeta.",
    },
    tourismAndLifestyle: {
      overview: "Cidade natal de Pablo Picasso e Antonio Banderas. Combina história romana e árabe com praias infinitas da Costa del Sol.",
      climate: "O clima mais quente e ensolarado da Europa continental.",
      leisureAndCulture: ["Museu Picasso e Centre Pompidou Málaga", "Fortaleza de Alcazaba e Castelo de Gibralfaro", "Praia de La Malagueta", "Vida noturna elegante no Muelle Uno"],
      safetyAndFamily: "Excelente; atmosfera tranquila de cidade costeira com infraestrutura de metrópole.",
    },
    codEStrategy: {
      whyChoose: "Ideal para quem busca a melhor combinação de oportunidades no mercado de tecnologia global e qualidade de vida à beira-mar com sol 10 meses por ano.",
      immigrationPace: "A extranjería de Málaga é bem acostumada a lidar com vistos de nômades digitais e profissionais qualificados (Ley de Startups).",
      mentorGoldenTip: "Se trabalhar em home office, considere morar nas paradas de trem de Cercanías em Fuengirola ou Benalmádena: você vive de frente para o mar pagando metade do aluguel de Barcelona.",
    },
  },

  sevilha: {
    id: "sevilha",
    name: "Sevilha",
    region: "Andaluzia · História, Tradição & Polo Aeroespacial",
    tagline: "Arquitetura monumental, acolhimento caloroso do povo andaluz e um forte polo industrial aeroespacial.",
    isPrimary: false,
    heroPhoto: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Plaza_de_Espa%C3%B1a_%28Sevilla%29_-_01.jpg/960px-Plaza_de_Espa%C3%B1a_%28Sevilla%29_-_01.jpg",
    badge: "Capital Cultural do Sul & Aeroespacial",
    quickStats: {
      rentAvg: "€ 750 - 1.050/mês",
      costSingle: "€ 1.250 - 1.600/mês",
      costFamily: "€ 2.000 - 2.600/mês",
      sunnyDays: "295 dias/ano",
      avgTemp: "19°C a 36°C",
      safetyScore: "9.3/10 (Ambiente acolhedor e seguro)",
    },
    livingCost: {
      overview: "Quarta maior cidade da Espanha, com custo de vida extremamente amigável e um dos aluguéis mais baratos entre as grandes capitais regionais.",
      supermarket: "€ 190 a € 270/mês para casal; hortifrúti fresco e de altíssima qualidade nos mercados locais.",
      transport: "Rede de metrô, bonde urbano (MetroCentro) e sistema de ônibus integrados; aluguel de bike pública Sevici muito difundido.",
      utilities: "€ 90 a € 135/mês (no pico do verão o ar-condicionado eleva um pouco a conta de luz).",
      diningOut: "A capital mundial da tapa: você almoça ou janta muito bem por € 8 a € 12 por pessoa.",
      monthlyBudgetNote: "Uma das melhores opções da Espanha para quem chega com reserva financeira em reais e precisa fazer o dinheiro render.",
    },
    housing: {
      overview: "Grande oferta de imóveis residenciais com pátios andaluzes frescos e tetos altos. Fácil adaptação para famílias.",
      averageRents: {
        t1: "€ 550 - 750/mês",
        t2: "€ 750 - 1.050/mês",
        t3: "€ 950 - 1.350/mês",
      },
      bestNeighborhoods: [
        { name: "Triana", why: "Bairro icônico à beira do rio Guadalquivir, com alma artística, cerâmica e gastronomia típica." },
        { name: "Nervión", why: "Bairro comercial moderno com shoppings, estações de metrô e a estação de trem de alta velocidade Santa Justa." },
        { name: "Los Remedios", why: "Área residencial nobre e organizada, perfeita para famílias que buscam tranquilidade." },
        { name: "Sevilla Este", why: "Próximo ao polo aeronáutico da Airbus, com condomínios fechados e preços super acessíveis." },
      ],
      rentalRequirements: "Proprietários locais acessíveis; com garantias básicas e contrato regular, a negociação flui de forma rápida.",
      empadronamientoTip: "Empadronamento descentralizado e muito rápido nos distritos municipais de Sevilha.",
    },
    jobMarket: {
      overview: "Além do turismo histórico pujante, abriga o parque científico Cartuja 93 e a fábrica de montagem final do avião militar Airbus A400M.",
      topSectors: ["Indústria Aeroespacial (Airbus & fornecedores)", "Turismo Histórico & Eventos", "Tecnologia no Parque Cartuja", "Energia Solar & Biotecnologia"],
      averageSalary: "€ 1.500 a € 2.600 líquidos.",
      foreignFriendly: "O sevilhano é famoso por ser um dos povos mais comunicativos e calorosos de toda a Europa.",
      nomadRemoteFriendly: "Excelente para nômades que buscam custo baixo, cultura e conexão fácil de trem de alta velocidade (AVE a 2h30 de Madrid).",
    },
    tourismAndLifestyle: {
      overview: "Plaza de España deslumbrante, a maior catedral gótica do mundo, o Real Alcázar e a mística da Feria de Abril e da Semana Santa.",
      climate: "Muito quente no verão (julho/agosto), mas ameno, ensolarado e agradabilíssimo de setembro a junho.",
      leisureAndCulture: ["Plaza de España e Parque de María Luisa", "Catedral de Sevilha e Torre Giralda", "Passeios de barco no Rio Guadalquivir", "Tabernas e flamenco tradicional em Triana"],
      safetyAndFamily: "Excelente para criar filhos em ambiente calmo e com fortes laços comunitários.",
    },
    codEStrategy: {
      whyChoose: "Custo de moradia 40% menor que Madrid com infraestrutura de grande capital e conexões rápidas por trem-bala AVE.",
      immigrationPace: "A oficina de extranjería de Sevilha é conhecida por ter prazos razoáveis para residências familiares e autorizações de trabalho.",
      mentorGoldenTip: "Evite agendar mudanças pesadas nos meses de julho e agosto devido ao calor; a partir de setembro o clima é paradisíaco e o mercado de aluguéis fica muito aquecido.",
    },
  },

  galicia: {
    id: "galicia",
    name: "Galícia (Vigo, Corunha & Santiago)",
    region: "Galícia · Natureza, Gastronomia & Custo Acessível",
    tagline: "Custo de vida até 45% mais baixo que as capitais, gastronomia de frutos do mar premiada e laços históricos profundos com brasileiros.",
    isPrimary: false,
    heroPhoto: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1200&q=80",
    badge: "Custo Acessível & Tranquilidade",
    quickStats: {
      rentAvg: "€ 600 - 850/mês",
      costSingle: "€ 1.100 - 1.450/mês",
      costFamily: "€ 1.800 - 2.400/mês",
      sunnyDays: "200 dias/ano (clima fresco e verde)",
      avgTemp: "12°C a 25°C",
      safetyScore: "9.7/10 (Uma das regiões mais seguras do continente)",
    },
    livingCost: {
      overview: "Uma das regiões com melhor poder de compra da Espanha. Comer bem e morar com espaço aqui custa uma fração do que se gasta em Madrid.",
      supermarket: "€ 190 a € 260/mês para casal; frutos do mar, carnes e laticínios galegos com preços imbatíveis.",
      transport: "Rede de trens de média distância ligando Vigo, Santiago e Corunha em 30 a 50 minutos; ônibus urbanos baratos.",
      utilities: "€ 100 a € 150/mês.",
      diningOut: "Menu del Día farto com peixe fresco ou polvo por € 9 a € 12.",
      monthlyBudgetNote: "A escolha favorita de famílias que buscam economizar muito enquanto constroem sua estabilidade na Espanha.",
    },
    housing: {
      overview: "Aluguéis surpreendentemente acessíveis: apartamentos amplos de 3 quartos com garagem e aquecimento por valores de quitinete em capitais maiores.",
      averageRents: {
        t1: "€ 450 - 620/mês",
        t2: "€ 600 - 850/mês",
        t3: "€ 750 - 1.050/mês",
      },
      bestNeighborhoods: [
        { name: "Vigo (Plaza de América / Coia)", why: "Cidade mais populosa da Galícia, polo industrial e portuário com excelente infraestrutura urbana." },
        { name: "A Coruña (Riazor / Matogrande)", why: "Cidade costeira sofisticada, sede da gigante Inditex (Zara), com orla de praias contínuas." },
        { name: "Santiago de Compostela", why: "Cidade universitária histórica, cultural e encantadora, com serviços públicos e saúde de topo." },
      ],
      rentalRequirements: "Proprietários acolhedores e exigências de garantias muito mais flexíveis que em Barcelona ou Madrid.",
      empadronamientoTip: "Empadronamento simples e com atendimento quase imediato nas prefeituras (Concellos).",
    },
    jobMarket: {
      overview: "Destaque para o grupo Inditex (Zara, Pull&Bear), a fábrica da montadora automotiva Stellantis em Vigo, indústria pesqueira global e TI.",
      topSectors: ["Moda & Varejo Global (Inditex)", "Indústria Automotiva (Stellantis)", "Pesca & Indústria Conserveira", "Biotecnologia & Saúde"],
      averageSalary: "€ 1.500 a € 2.400 líquidos.",
      foreignFriendly: "Laços culturais e linguísticos profundos com a comunidade lusófona; a língua galega é irmã do português e a adaptação é instantânea.",
      nomadRemoteFriendly: "Perfeito para quem trabalha online e quer viver perto da natureza e praias oceânicas deslumbrantes.",
    },
    tourismAndLifestyle: {
      overview: "O mítico Caminho de Santiago, as Ilhas Cíes (eleitas entre as praias mais bonitas do mundo) e paisagens verdes dignas de contos de fadas.",
      climate: "Atlântico temperado: verões amenos e agradáveis (sem o calor sufocante do sul) e invernos com chuva e temperaturas moderadas.",
      leisureAndCulture: ["Catedral de Santiago de Compostela", "Parque Nacional das Ilhas Cíes", "Torre de Hércules em A Coruña", "Rias Baixas e vinhedos de Albariño"],
      safetyAndFamily: "Índices de violência praticamente inexistentes; ambiente perfeito para infância protegida e livre.",
    },
    codEStrategy: {
      whyChoose: "Melhor relação custo-benefício da Espanha para famílias com crianças e facilidade extraordinária de comunicação graças à proximidade linguística.",
      immigrationPace: "Menor sobrecarga nas delegacias de extranjería em comparação aos grandes centros, resultando em agendamentos mais rápidos.",
      mentorGoldenTip: "A língua espanhola aliada à proximidade do galego com o português faz qualquer brasileiro se sentir em casa em questão de semanas.",
    },
  },

  bilbao: {
    id: "bilbao",
    name: "Bilbao & País Basco",
    region: "País Basco · Maior Renda & Inovação",
    tagline: "A maior média salarial da Espanha, o melhor sistema de saúde pública regional e excelência em urbanismo.",
    isPrimary: false,
    heroPhoto: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Guggenheim_Museum_Bilbao%2C_exterior.jpg/960px-Guggenheim_Museum_Bilbao%2C_exterior.jpg",
    badge: "Maior Renda Média & Saúde",
    quickStats: {
      rentAvg: "€ 950 - 1.350/mês",
      costSingle: "€ 1.650 - 2.100/mês",
      costFamily: "€ 2.600 - 3.400/mês",
      sunnyDays: "210 dias/ano",
      avgTemp: "13°C a 26°C",
      safetyScore: "9.6/10 (Polícia local Ertzaintza de alta eficiência)",
    },
    livingCost: {
      overview: "Nível de renda e desenvolvimento social comparável a países nórdicos. Serviços públicos impecáveis compensam o custo ligeiramente mais alto.",
      supermarket: "€ 250 a € 340/mês para casal; gastronomia basca é patrimônio internacional.",
      transport: "Metrô desenhado por Norman Foster, integrado com bonde e ônibus elétricos através do cartão Barik.",
      utilities: "€ 120 a € 170/mês.",
      diningOut: "Cultura lendária de Pintxos em bares tradicionais por € 2 a € 4 a unidade.",
      monthlyBudgetNote: "Excelente para engenheiros, pesquisadores e profissionais do setor industrial avançado.",
    },
    housing: {
      overview: "Imóveis de alto padrão de conservação e construções sólidas. Bairros com calçadões à beira da Ria de Bilbao.",
      averageRents: {
        t1: "€ 750 - 950/mês",
        t2: "€ 950 - 1.350/mês",
        t3: "€ 1.300 - 1.850/mês",
      },
      bestNeighborhoods: [
        { name: "Abando / Indautxu", why: "Coração nobre de Bilbao, próximo ao Museu Guggenheim e Parque Doña Casilda." },
        { name: "Deusto", why: "Bairro universitário residencial do outro lado da ria, calmo e seguro." },
        { name: "Getxo / Algorta", why: "Zona costeira elegante a 20 minutos de metrô, com praias e marinas." },
      ],
      rentalRequirements: "Exigência de demonstração de renda compatível ou garantias formais.",
      empadronamientoTip: "Serviço municipal eficiente e digitalizado no Ayuntamiento de Bilbao.",
    },
    jobMarket: {
      overview: "Coração industrial avançado da Espanha: siderurgia, energia limpa (Iberdrola tem sede aqui), automotivo e manufatura inteligente.",
      topSectors: ["Energia & Renováveis (Iberdrola)", "Engenharia Mecânica & Automação", "Finanças (BBVA)", "Biotecnologia & Saúde"],
      averageSalary: "€ 2.500 a € 4.500 líquidos para técnicos e engenheiros.",
      foreignFriendly: "Povo basco é leal, honesto e acolhedor com quem vem para trabalhar e somar.",
      nomadRemoteFriendly: "Excelente qualidade de vida com conexão rápida para quem busca clima temperado e alta gastronomia.",
    },
    tourismAndLifestyle: {
      overview: "O Museu Guggenheim transformou a cidade em ícone global de arquitetura, aliando colinas verdes e mar a poucos minutos de metrô.",
      climate: "Temperado oceânico com verões amenos e frescos e invernos sem extremos congelantes.",
      leisureAndCulture: ["Museu Guggenheim e Museu de Belas Artes", "Passeio pela Ria de Bilbao", "Casco Viejo e Sete Ruas", "Praias de surf em Sopelana e Mundaka"],
      safetyAndFamily: "Segurança de nível internacional e o serviço de saúde Osakidetza premiado em toda a Europa.",
    },
    codEStrategy: {
      whyChoose: "Para quem quer salários compatíveis com o norte europeu, solidez econômica e a melhor saúde pública do país.",
      immigrationPace: "Processos bem estruturados e com boa digitalização dos órgãos bascos.",
      mentorGoldenTip: "O castelhano é falado por 100% da população no dia a dia com perfeição; não se preocupe em aprender o euskera (língua basca) para trabalhar ou viver bem.",
    },
  },

  zaragoza: {
    id: "zaragoza",
    name: "Zaragoza",
    region: "Aragão · Hub Logístico Central da Espanha",
    tagline: "Localização estratégica a apenas 1h15 de trem-bala entre Madrid e Barcelona com custo moderado.",
    isPrimary: false,
    heroPhoto: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Basilica_del_Pilar_%28Zaragoza%2C_Aragon%29.jpg/960px-Basilica_del_Pilar_%28Zaragoza%2C_Aragon%29.jpg",
    badge: "Polo Logístico & Conexão BCN/MAD",
    quickStats: {
      rentAvg: "€ 700 - 950/mês",
      costSingle: "€ 1.200 - 1.550/mês",
      costFamily: "€ 1.950 - 2.550/mês",
      sunnyDays: "270 dias/ano",
      avgTemp: "15°C a 32°C",
      safetyScore: "9.5/10 (Cidade extremamente tranquila)",
    },
    livingCost: {
      overview: "Quinta maior cidade da Espanha, combina escala de metrópole com custo de vida 35% inferior ao de Madrid e Barcelona.",
      supermarket: "€ 200 a € 280/mês para casal.",
      transport: "Linha de bonde elétrico ultramoderna (Tranvía de Zaragoza) que atravessa a cidade de ponta a ponta.",
      utilities: "€ 95 a € 140/mês.",
      diningOut: "Tapas deliciosas no histórico bairro El Tubo por valores muito convidativos.",
      monthlyBudgetNote: "Excelente base de operações para quem precisa viajar frequentemente entre Madrid e Catalunha.",
    },
    housing: {
      overview: "Mercado residencial saudável com facilidade para alugar apartamentos novos e bem iluminados sem filas de espera.",
      averageRents: {
        t1: "€ 500 - 700/mês",
        t2: "€ 700 - 950/mês",
        t3: "€ 850 - 1.250/mês",
      },
      bestNeighborhoods: [
        { name: "Actur / GranCasa", why: "Bairro planejado moderno, servido pelo bonde elétrico, com grandes avenidas e parques." },
        { name: "Centro / Romareda", why: "Próximo aos hospitais universitários, estádio e universidades, área consolidada e nobre." },
        { name: "La Almozara", why: "À beira do Rio Ebro, perto da estação intermodal de trem de alta velocidade Delicias." },
      ],
      rentalRequirements: "Negociações tranquilas diretamente com corretores locais e sem imposições draconianas.",
      empadronamientoTip: "Empadronamento simples e ágil na prefeitura de Zaragoza.",
    },
    jobMarket: {
      overview: "Maior polo de logística e distribuição do sul da Europa (PLAZA), centro de distribuição da Inditex, Amazon e fábrica da Opel/Stellantis.",
      topSectors: ["Logística & Transporte Intermodal", "Indústria Automotiva (Stellantis)", "Comércio Eletrônico & Datacenters", "Ensino & Pesquisa"],
      averageSalary: "€ 1.700 a € 2.800 líquidos.",
      foreignFriendly: "Cidade acolhedora e com custo que favorece quem chega com a família.",
      nomadRemoteFriendly: "Perfeita para morar bem e chegar a Madrid ou Barcelona em pouco mais de uma hora de trem AVE.",
    },
    tourismAndLifestyle: {
      overview: "A imponente Basílica de Nossa Senhora do Pilar sobre as águas do Rio Ebro e o Palácio mourisco de Aljafería.",
      climate: "Mediterrâneo continental com o famoso vento Cierzo refrescando o ar.",
      leisureAndCulture: ["Basílica del Pilar e Praça do Pilar", "Palácio de la Aljafería (Patrimônio UNESCO)", "Parque Grande José Antonio Labordeta", "Passeios à margem do Rio Ebro"],
      safetyAndFamily: "Excelente; cidade plana, segura e fácil de se locomover a pé.",
    },
    codEStrategy: {
      whyChoose: "Estratégica para quem quer estar no meio do caminho entre as duas maiores potências econômicas da Espanha pagando aluguel de cidade de interior.",
      immigrationPace: "Menos saturada que Madrid, permitindo agendamentos mais céleres.",
      mentorGoldenTip: "Morar próximo à linha do Tranvía permite dispensar completamente o carro.",
    },
  },

  alicante: {
    id: "alicante",
    name: "Alicante & Costa Blanca",
    region: "Comunidade Valenciana · Praias Calmas & Sol Constante",
    tagline: "Águas cristalinas mediterrâneas, aeroporto internacional com voos low cost para toda a Europa e comunidade acolhedora.",
    isPrimary: false,
    heroPhoto: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Vista_de_Alicante%2C_Espa%C3%B1a%2C_2014-07-04%2C_DD_67-70_PAN.JPG/960px-Vista_de_Alicante%2C_Espa%C3%B1a%2C_2014-07-04%2C_DD_67-70_PAN.JPG",
    badge: "Costa Blanca & Vida Mediterrânea",
    quickStats: {
      rentAvg: "€ 750 - 1.000/mês",
      costSingle: "€ 1.300 - 1.650/mês",
      costFamily: "€ 2.050 - 2.700/mês",
      sunnyDays: "315 dias/ano",
      avgTemp: "18°C a 31°C",
      safetyScore: "9.3/10 (Cidade litorânea segura e familiar)",
    },
    livingCost: {
      overview: "Excelente relação custo-benefício para viver de frente para o mar azul turquesa com despesas mensais muito contidas.",
      supermarket: "€ 200 a € 280/mês para casal.",
      transport: "TRAM Metropolitano moderno que viaja pela costa ligando Alicante a praias como San Juan, El Campello e Benidorm.",
      utilities: "€ 85 a € 130/mês.",
      diningOut: "Pratos de arroz e frutos do mar excelentes por € 10 a € 14.",
      monthlyBudgetNote: "Muito procurada por aposentados, nômades digitais e famílias que priorizam sol e mar com economia.",
    },
    housing: {
      overview: "Opções de apartamentos com piscina comunitária a poucos minutos a pé da areia da praia.",
      averageRents: {
        t1: "€ 550 - 750/mês",
        t2: "€ 750 - 1.000/mês",
        t3: "€ 1.000 - 1.450/mês",
      },
      bestNeighborhoods: [
        { name: "Playa de San Juan", why: "Praia de areia dourada de 3 km com condomínios com quadras, piscinas e linha de bonde TRAM." },
        { name: "Cabo de las Huertas", why: "Área nobre residencial de enseadas rochosas e águas transparentes, muito exclusiva." },
        { name: "Centro Tradicional / Ensanche", why: "Vida urbana vibrante, comércio a pé e a passos da praia do Postiguet." },
      ],
      rentalRequirements: "Facilidade de locação de média e longa duração fora do pico de julho e agosto.",
      empadronamientoTip: "Empadronamento organizado e tranquilo na prefeitura de Alicante.",
    },
    jobMarket: {
      overview: "Além do forte setor de serviços turísticos, é sede da EUIPO (Agência da União Europeia para a Propriedade Intelectual) e de hubs de inovação digital como o Distrito Digital.",
      topSectors: ["Agências Europeias (EUIPO)", "Turismo & Gastronomia Internacional", "Distrito Digital & Startups", "Serviços Imobiliários"],
      averageSalary: "€ 1.500 a € 2.500 líquidos.",
      foreignFriendly: "Uma das maiores comunidades internacionais da Espanha; o inglês é falado em quase todo o comércio litorâneo.",
      nomadRemoteFriendly: "Top 3 destinos de trabalhadores remotos e famílias europeias.",
    },
    tourismAndLifestyle: {
      overview: "O histórico Castelo de Santa Bárbara vigia a baía, ladeado pela famosa Esplanada de Espanha com suas ondas de mosaico tricolor.",
      climate: "Clima semiárido mediterrâneo: chuvas escassas e mais de 3.000 horas de sol por ano.",
      leisureAndCulture: ["Castelo de Santa Bárbara", "Praia de San Juan e El Postiguet", "Excursão de barco à Ilha de Tabarca", "Esplanada de Espanha e Marina"],
      safetyAndFamily: "Excelente; praias com águas calmas e rasas, perfeitas para crianças pequenas.",
    },
    codEStrategy: {
      whyChoose: "Para viver em férias permanentes com mar quente e custo de vida moderado, mantendo conexão aérea barata com toda a Europa.",
      immigrationPace: "Oficina de extranjería acostumada a estrangeiros de alta renda e nômades digitais.",
      mentorGoldenTip: "Ao buscar aluguel, certifique-se de que o contrato seja de longa temporada (11 meses ou 5 anos) para evitar reajustes sazonais de verão.",
    },
  },

  granada: {
    id: "granada",
    name: "Granada",
    region: "Andaluzia · Charme, Universidade & Serra Nevada",
    tagline: "Cidade universitária histórica aos pés das montanhas de neve e a 40 minutos da praia, com cultura de tapas grátis.",
    isPrimary: false,
    heroPhoto: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Alhambra_evening_panorama_Mirador_San_Nicolas_sRGB-1.jpg/960px-Alhambra_evening_panorama_Mirador_San_Nicolas_sRGB-1.jpg",
    badge: "Universidade, Serra Nevada & Charme",
    quickStats: {
      rentAvg: "€ 650 - 900/mês",
      costSingle: "€ 1.150 - 1.500/mês",
      costFamily: "€ 1.850 - 2.450/mês",
      sunnyDays: "280 dias/ano",
      avgTemp: "14°C a 34°C",
      safetyScore: "9.5/10 (Ambiente acolhedor e seguro)",
    },
    livingCost: {
      overview: "Uma das cidades com menor custo de vida da Europa ocidental. Famosa pela generosidade das tapas que vêm de graça com qualquer bebida pedida.",
      supermarket: "€ 180 a € 250/mês para casal.",
      transport: "Linha de metrô leve de superfície (Metropolitano de Granada) e ônibus urbanos modernos.",
      utilities: "€ 90 a € 135/mês.",
      diningOut: "Com € 6 a € 9 em duas cervejas ou taças de vinho, você recebe duas tapas fartas que equivalem a um jantar completo.",
      monthlyBudgetNote: "A melhor escolha para estudantes, pesquisadores e quem deseja esticar ao máximo o orçamento.",
    },
    housing: {
      overview: "Grande oferta de apartamentos para alugar, com preços muito acessíveis tanto no centro histórico quanto nas áreas modernas.",
      averageRents: {
        t1: "€ 450 - 650/mês",
        t2: "€ 650 - 900/mês",
        t3: "€ 800 - 1.150/mês",
      },
      bestNeighborhoods: [
        { name: "Albayzín / Realejo", why: "Bairros históricos charmosos com ruas de pedras brancas e vistas deslumbrantes da Alhambra." },
        { name: "Zaidín / PTS", why: "Ao lado do Parque Tecnológico de Saúde (PTS), com edifícios modernos e estação de metrô." },
        { name: "Camino de Ronda", why: "Eixo comercial prático, bem conectado com transporte público e farto comércio." },
      ],
      rentalRequirements: "Muito flexíveis e sem burocracia excessiva.",
      empadronamientoTip: "Atendimento direto e descomplicado na prefeitura de Granada.",
    },
    jobMarket: {
      overview: "Polo de biotecnologia e saúde no PTS (Parque Tecnológico de la Salud), além da histórica Universidade de Granada e setor de inteligência artificial.",
      topSectors: ["Biotecnologia & Medicina (PTS)", "Inteligência Artificial & TI", "Turismo Cultural & Esqui", "Educação Universitária"],
      averageSalary: "€ 1.400 a € 2.400 líquidos.",
      foreignFriendly: "Granada recebe mais de 60.000 estudantes de todo o mundo, criando uma atmosfera jovem e cosmopolita.",
      nomadRemoteFriendly: "Excelente para quem quer conciliar trabalho online, esqui no inverno e praias no verão.",
    },
    tourismAndLifestyle: {
      overview: "A lendária fortaleza mourisca da Alhambra (o monumento mais visitado da Espanha) com o cenário de picos nevados da Sierra Nevada ao fundo.",
      climate: "Continental temperado: invernos com neve nas montanhas próximas e verões quentes e secos.",
      leisureAndCulture: ["Palácio da Alhambra e Jardins do Generalife", "Bairro do Sacromonte e casas-caverna de flamenco", "Estação de esqui de Sierra Nevada (a 30 km)", "Costa Tropical de Granada (a 40 minutos)"],
      safetyAndFamily: "Segurança de cidade do interior, com vida comunitária viva e acolhedora.",
    },
    codEStrategy: {
      whyChoose: "Custo de vida baixíssimo com charme histórico inigualável, acesso rápido a pistas de esqui e praias tropicais.",
      immigrationPace: "Trâmites em extranjería costumam ser tranquilos fora do início das aulas universitárias em setembro.",
      mentorGoldenTip: "Para famílias com foco em economia máxima sem abrir mão de cultura e universidades de prestígio, Granada é imbatível.",
    },
  },
};
