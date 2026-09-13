import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generatePdf() {
  const pdfDoc = await PDFDocument.create();
  
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Colors
  const navy = rgb(0.075, 0.129, 0.247); // #13213F
  const cream = rgb(0.969, 0.953, 0.925); // #F7F3EC
  const red = rgb(0.639, 0.118, 0.133); // #A31E22
  const gray = rgb(0.42, 0.396, 0.365); // #6B655D
  const ink = rgb(0.106, 0.106, 0.094); // #1B1B18
  const white = rgb(1, 1, 1);
  const gold = rgb(0.96, 0.62, 0.04);
  const line = rgb(0.894, 0.867, 0.812); // #E4DDCF

  function sanitize(str: string): string {
    return str
      .replace(/[•★]/g, '-')
      .replace(/[—–]/g, '-')
      .replace(/[“”""]/g, '"')
      .replace(/[‘’'']/g, "'");
  }

  function wrapText(text: string, maxWidth: number, font: any, size: number): string[] {
    const clean = sanitize(text);
    const paragraphs = clean.split('\n');
    const allLines: string[] = [];

    for (const para of paragraphs) {
      if (!para.trim()) {
        allLines.push('');
        continue;
      }
      const words = para.split(' ');
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const width = font.widthOfTextAtSize(testLine, size);
        if (width > maxWidth && currentLine) {
          allLines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) allLines.push(currentLine);
    }
    return allLines;
  }

  function addFooter(page: any, pageNum: number) {
    if (pageNum === 1 || pageNum === 8) return;
    const { width } = page.getSize();
    page.drawLine({
      start: { x: 50, y: 40 },
      end: { x: width - 50, y: 40 },
      thickness: 0.5,
      color: line,
    });
    page.drawText('CODIGO EUROPA', {
      x: 50,
      y: 26,
      size: 8,
      font: fontBold,
      color: navy,
    });
    page.drawText('Os 5 Primeiros Canais - Codigo Europa', {
      x: 220,
      y: 26,
      size: 8,
      font: fontRegular,
      color: gray,
    });
    page.drawText(`${pageNum}`, {
      x: width - 60,
      y: 26,
      size: 8,
      font: fontRegular,
      color: gray,
    });
  }

  // Page 1: Cover
  {
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: 0, width, height, color: navy });

    // Try embedding Agente 34 photo
    try {
      const agentImgPath = path.join(process.cwd(), 'public', 'assets', 'agents', 'agente34.jpg');
      if (fs.existsSync(agentImgPath)) {
        const agentImgBytes = fs.readFileSync(agentImgPath);
        const agentImg = await pdfDoc.embedJpg(agentImgBytes);
        // Draw image framed
        page.drawImage(agentImg, {
          x: width - 210,
          y: height - 330,
          width: 150,
          height: 150,
        });
        page.drawRectangle({
          x: width - 210,
          y: height - 330,
          width: 150,
          height: 150,
          borderColor: gold,
          borderWidth: 2,
        });
      }
    } catch (e) {
      console.error('Error embedding agent photo in cover:', e);
    }

    page.drawText('C O D I G O   E U R O P A', {
      x: 60,
      y: height - 100,
      size: 11,
      font: fontBold,
      color: gold,
    });

    page.drawText('05', {
      x: 60,
      y: height - 180,
      size: 72,
      font: fontBold,
      color: gold,
    });

    page.drawText('CANAIS PRA', {
      x: 60,
      y: height - 230,
      size: 32,
      font: fontBold,
      color: cream,
    });
    page.drawText('COMECAR', {
      x: 60,
      y: height - 270,
      size: 32,
      font: fontBold,
      color: cream,
    });
    page.drawText('NA ESPANHA', {
      x: 60,
      y: height - 310,
      size: 32,
      font: fontBold,
      color: gold,
    });

    const descLines = wrapText(
      'Os cinco primeiros enderecos que eu abriria hoje se estivesse recomecando do zero em solo espanhol - comecando pelo portal oficial do governo. Sem enrolacao, sem lista infinita: cinco portas e a ordem certa de bater nelas.',
      320,
      fontRegular,
      11
    );
    let y = height - 365;
    for (const l of descLines) {
      page.drawText(l, { x: 60, y, size: 11, font: fontRegular, color: cream });
      y -= 16;
    }

    // Badge
    page.drawRectangle({
      x: 60,
      y: height - 450,
      width: 320,
      height: 32,
      borderColor: gold,
      borderWidth: 1,
      color: navy,
    });
    page.drawText('GUIA OFICIAL - AGENTE 34: BUSCADOR DE EMPREGOS', {
      x: 75,
      y: height - 438,
      size: 8.5,
      font: fontBold,
      color: gold,
    });

    // Subtag
    page.drawText('PRESENTE EXCLUSIVO - Reconhecimento de Campo', {
      x: 60,
      y: height - 495,
      size: 11,
      font: fontBold,
      color: cream,
    });

    // Author
    page.drawLine({
      start: { x: 60, y: 150 },
      end: { x: width - 60, y: 150 },
      thickness: 1,
      color: line,
    });
    page.drawText('VITOR DIORRANES', {
      x: 60,
      y: 125,
      size: 14,
      font: fontBold,
      color: cream,
    });
    page.drawText('Estrategista de mobilidade internacional - Espanha', {
      x: 60,
      y: 105,
      size: 10,
      font: fontRegular,
      color: cream,
    });
    page.drawText('33 paises percorridos - planejamento estrategico de migracao - ponte Brasil <-> Europa', {
      x: 60,
      y: 88,
      size: 9,
      font: fontRegular,
      color: gray,
    });
    page.drawText('@vitordiorranes', {
      x: 60,
      y: 68,
      size: 10,
      font: fontBold,
      color: gold,
    });

    page.drawRectangle({ x: 0, y: 0, width, height: 12, color: red });
  }

  // Page 2: Reconhecimento
  {
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: 0, width, height, color: cream });

    page.drawText('RECONHECIMENTO - FICHA N 34', {
      x: 50,
      y: height - 60,
      size: 9,
      font: fontBold,
      color: gold,
    });

    page.drawText('Aqui esta o reconhecimento do Agente 34.', {
      x: 50,
      y: height - 90,
      size: 18,
      font: fontBold,
      color: navy,
    });

    let y = height - 130;
    const p1 = wrapText(
      'Antes de qualquer coisa: prazer. Eu sou o Agente 34 - chapeu na cabeca, sobretudo nos ombros, uma pasta de dossies debaixo do braco e um numero no cracha que nao e enfeite. O Codigo Europa mapeou 34 canais de busca de emprego na Espanha, e me coube caminhar cada um deles antes que voce precisasse. Trinta e quatro portas, trinta e quatro empurroes pra ver qual abria.',
      495,
      fontRegular,
      11
    );
    for (const l of p1) { page.drawText(l, { x: 50, y, size: 11, font: fontRegular, color: ink }); y -= 16; }

    y -= 10;
    const p2 = wrapText(
      'So que ninguem comeca uma travessia com trinta e quatro coisas pra fazer. Comeca com uma. Depois com outra. Por isso este material nao e o mapa inteiro - e o reconhecimento: as cinco primeiras portas, na ordem exata em que eu bateria nelas se pousasse na Espanha amanha de manha com a mala ainda por desfazer.',
      495,
      fontRegular,
      11
    );
    for (const l of p2) { page.drawText(l, { x: 50, y, size: 11, font: fontRegular, color: ink }); y -= 16; }

    // Recado box
    y -= 15;
    page.drawRectangle({ x: 50, y: y - 75, width: 495, height: 75, color: navy });
    page.drawText('RECADO DO AGENTE 34', { x: 65, y: y - 20, size: 9, font: fontBold, color: gold });
    const recado1 = wrapText(
      'Lista comprida da sensacao de progresso e entrega zero. Cinco canais bem trabalhados batem trinta canais abandonados no terceiro dia - sempre bateram. Comece pequeno, comece hoje, comece de verdade.',
      465,
      fontRegular,
      10
    );
    let ry = y - 36;
    for (const l of recado1) { page.drawText(l, { x: 65, y: ry, size: 10, font: fontRegular, color: cream }); ry -= 14; }

    y -= 105;
    page.drawText('Por que cinco, e por que estes cinco', { x: 50, y, size: 14, font: fontBold, color: navy });
    y -= 25;
    const p3 = wrapText(
      'Cada um desses canais cobre uma funcao diferente no seu tabuleiro. Nao sao cinco versoes da mesma coisa - sao cinco pecas que se completam:',
      495,
      fontRegular,
      11
    );
    for (const l of p3) { page.drawText(l, { x: 50, y, size: 11, font: fontRegular, color: ink }); y -= 16; }

    y -= 10;
    const bullets = [
      '- Um canal oficial, pra voce existir formalmente diante do Estado espanhol e conseguir comprovar busca ativa de emprego quando isso for exigido.',
      '- Um canal de volume, onde a maior parte das empresas espanholas realmente publica.',
      '- Um agregador, pra voce enxergar o mercado inteiro sem visitar site por site.',
      '- Um canal de entrada rapida, no setor que historicamente mais absorve quem acabou de chegar.',
      '- Um canal de velocidade, pra quando o que voce precisa e resposta em horas, nao em semanas.'
    ];

    for (const b of bullets) {
      const bLines = wrapText(b, 485, fontRegular, 10.5);
      for (const l of bLines) {
        page.drawText(l, { x: 55, y, size: 10.5, font: fontRegular, color: ink });
        y -= 16;
      }
      y -= 6;
    }

    addFooter(page, 2);
  }

  // Page 3: O Momento
  {
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: 0, width, height, color: cream });

    page.drawText('O MOMENTO', { x: 50, y: height - 60, size: 9, font: fontBold, color: gold });
    page.drawText('Voce nao esta batendo na porta errada', { x: 50, y: height - 90, size: 20, font: fontBold, color: navy });

    let y = height - 125;
    const intro = wrapText(
      'Antes de entrar nos canais, um enquadramento rapido - porque muita gente aplica achando que esta pedindo favor. Nao esta. A Espanha vive o momento mais aberto ao trabalhador estrangeiro dos ultimos anos, e os numeros nao deixam margem pra duvida.',
      495,
      fontRegular,
      11
    );
    for (const l of intro) { page.drawText(l, { x: 50, y, size: 11, font: fontRegular, color: ink }); y -= 16; }

    // 3 Metric cards
    y -= 20;
    const cardW = 155;
    const cardH = 90;
    // Card 1
    page.drawRectangle({ x: 50, y: y - cardH, width: cardW, height: cardH, color: white, borderColor: line, borderWidth: 1 });
    page.drawText('57,7%', { x: 62, y: y - 35, size: 24, font: fontBold, color: navy });
    page.drawText('de todo o emprego liquido', { x: 62, y: y - 55, size: 8.5, font: fontRegular, color: gray });
    page.drawText('criado na Uniao Europeia em', { x: 62, y: y - 68, size: 8.5, font: fontRegular, color: gray });
    page.drawText('2025 foi gerado so pela Espanha', { x: 62, y: y - 81, size: 8.5, font: fontRegular, color: gray });

    // Card 2
    page.drawRectangle({ x: 220, y: y - cardH, width: cardW, height: cardH, color: white, borderColor: line, borderWidth: 1 });
    page.drawText('605 mil', { x: 232, y: y - 35, size: 24, font: fontBold, color: navy });
    page.drawText('novos empregos liquidos', { x: 232, y: y - 55, size: 8.5, font: fontRegular, color: gray });
    page.drawText('criados na Espanha ao', { x: 232, y: y - 68, size: 8.5, font: fontRegular, color: gray });
    page.drawText('longo de 2025', { x: 232, y: y - 81, size: 8.5, font: fontRegular, color: gray });

    // Card 3
    page.drawRectangle({ x: 390, y: y - cardH, width: cardW, height: cardH, color: white, borderColor: line, borderWidth: 1 });
    page.drawText('9,9%', { x: 402, y: y - 35, size: 24, font: fontBold, color: navy });
    page.drawText('taxa de desemprego -', { x: 402, y: y - 55, size: 8.5, font: fontRegular, color: gray });
    page.drawText('o menor patamar em mais', { x: 402, y: y - 68, size: 8.5, font: fontRegular, color: gray });
    page.drawText('de uma decada', { x: 402, y: y - 81, size: 8.5, font: fontRegular, color: gray });

    y -= (cardH + 20);
    page.drawText('Fontes: Eurostat, via Infobae (mai. 2026) - INE - Encuesta de Poblacion Activa, 4 trim. 2025.', {
      x: 50,
      y,
      size: 8,
      font: fontOblique,
      color: gray,
    });

    y -= 25;
    const bodyText = wrapText(
      'Em 2025 o pais bateu recorde historico de pessoas ocupadas, e dentro desse crescimento tem um dado que fala diretamente com voce: estrangeiros foram um dos grupos que mais impulsionaram a alta. Hoje ja sao 3,6 milhoes de trabalhadores estrangeiros na Espanha - cerca de 16% de toda a forca de trabalho do pais.\n\nE a demanda nao esta concentrada num setor so: o Observatorio das Ocupacoes do SEPE aponta procura forte e simultanea em tecnologia, saude, construcao civil, logistica e hotelaria/turismo - esse ultimo, historicamente, a porta de entrada mais rapida pra quem chega recem-mudado.',
      495,
      fontRegular,
      11
    );
    for (const l of bodyText) {
      if (l === '') { y -= 8; continue; }
      page.drawText(l, { x: 50, y, size: 11, font: fontRegular, color: ink });
      y -= 16;
    }

    // Recado
    y -= 15;
    page.drawRectangle({ x: 50, y: y - 65, width: 495, height: 65, color: navy });
    page.drawText('RECADO DO AGENTE 34', { x: 65, y: y - 18, size: 9, font: fontBold, color: gold });
    const recado2 = wrapText(
      'Numero bonito nao paga aluguel. O que paga e voce ja estar cadastrado no canal certo no dia em que a vaga abre. Dado impressiona; cadastro contrata.',
      465,
      fontRegular,
      10
    );
    let ry2 = y - 34;
    for (const l of recado2) { page.drawText(l, { x: 65, y: ry2, size: 10, font: fontRegular, color: cream }); ry2 -= 14; }

    // Aviso honesto
    y -= 95;
    page.drawRectangle({ x: 50, y: y - 75, width: 495, height: 75, color: white, borderColor: line, borderWidth: 1 });
    page.drawText('UM AVISO HONESTO', { x: 65, y: y - 20, size: 9, font: fontBold, color: navy });
    const aviso = wrapText(
      'Todo numero e toda regra citados aqui refletem os dados oficiais disponiveis ate a data de publicacao deste material. Lei migratoria e mercado de trabalho mudam. Antes de tomar qualquer decisao com base nessas informacoes, confirme os requisitos atualizados em fonte oficial (SEPE, BOE, Ministerio de Inclusion, Migracion y Seguridad Social) ou com um profissional habilitado.',
      465,
      fontRegular,
      8.5
    );
    let ay = y - 35;
    for (const l of aviso) { page.drawText(l, { x: 65, y: ay, size: 8.5, font: fontRegular, color: gray }); ay -= 12; }

    addFooter(page, 3);
  }

  // Page 4: Canal 1 - Empléate (SEPE)
  {
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: 0, width, height, color: cream });

    page.drawText('CANAL N 1 - DESTAQUE OFICIAL', { x: 50, y: height - 60, size: 9, font: fontBold, color: gold });
    page.drawText('Comece pela porta da frente', { x: 50, y: height - 90, size: 22, font: fontBold, color: navy });

    let y = height - 120;
    // Box destaque
    page.drawRectangle({ x: 50, y: y - 260, width: 495, height: 260, color: white, borderColor: line, borderWidth: 1 });
    page.drawRectangle({ x: 50, y: y - 35, width: 495, height: 35, color: navy });
    page.drawText('* PORTAL OFICIAL DO GOVERNO ESPANHOL', { x: 65, y: y - 22, size: 10, font: fontBold, color: gold });

    y -= 55;
    page.drawText('Empleate - o Portal do SEPE', { x: 65, y, size: 16, font: fontBold, color: navy });
    page.drawText('sepe.es - Ofertas de empleo (Empleate)', { x: 65, y: y - 16, size: 9.5, font: fontRegular, color: gray });

    y -= 38;
    const txtEmpl = wrapText(
      'O Empleate e o portal oficial do SEPE (Servicio Publico de Empleo Estatal), o orgao do governo espanhol responsavel por toda a politica publica de emprego do pais. Antes de qualquer app, antes de qualquer site privado, esse e o canal que carrega o peso institucional do proprio Estado espanhol.\n\nNa pratica, funciona como uma bolsa de vagas gratuita que reune ofertas de empresas privadas registradas junto ao servico publico de emprego, alem de oportunidades ligadas a programas estatais e regionais. E, tambem, o canal correto pra quem ja esta em processo de regularizacao e precisa comprovar busca ativa de emprego perante autoridades migratorias - um detalhe que muita gente ignora e que pode pesar a seu favor no processo.\n\nNao e o portal com a interface mais bonita, nem o mais badalado nas redes. Mas e o mais confiavel. Comece por aqui - e a porta da frente.',
      465,
      fontRegular,
      10
    );
    for (const l of txtEmpl) {
      if (l === '') { y -= 6; continue; }
      page.drawText(l, { x: 65, y, size: 10, font: fontRegular, color: ink });
      y -= 14;
    }

    y -= 12;
    page.drawText('IDEAL PRA: quem quer seguranca institucional, comprovacao oficial de busca de emprego e vagas com registro formal.', {
      x: 65,
      y,
      size: 8.5,
      font: fontBold,
      color: red,
    });

    // Recado Agente 34
    y -= 60;
    page.drawRectangle({ x: 50, y: y - 75, width: 495, height: 75, color: navy });
    page.drawText('RECADO DO AGENTE 34', { x: 65, y: y - 20, size: 9, font: fontBold, color: gold });
    const recado3 = wrapText(
      'Guarda o print de cada candidatura feita por aqui. Comprovar busca ativa de emprego em canal oficial e o tipo de papel que ninguem lembra de arquivar e todo mundo precisa depois. Pasta no celular, nome com data. Eu carrego a minha ha anos - e ja me salvou mais de uma vez.',
      465,
      fontRegular,
      10
    );
    let ry3 = y - 36;
    for (const l of recado3) { page.drawText(l, { x: 65, y: ry3, size: 10, font: fontRegular, color: cream }); ry3 -= 14; }

    addFooter(page, 4);
  }

  // Page 5: Os outros quatro canais
  {
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: 0, width, height, color: cream });

    page.drawText('OS OUTROS QUATRO', { x: 50, y: height - 55, size: 9, font: fontBold, color: gold });
    page.drawText('Volume, visao de mercado, entrada rapida e velocidade', { x: 50, y: height - 80, size: 17, font: fontBold, color: navy });

    let y = height - 110;

    const channels = [
      {
        num: '02',
        name: 'InfoJobs',
        url: 'infojobs.net',
        desc: 'O maior e mais movimentado portal privado de vagas da Espanha. Reune o maior volume de anuncios ativos e de empresas cadastradas do pais, com filtro fino por cidade, setor, tipo de contrato e faixa salarial, alem de alertas personalizados e avaliacao de empresas por quem ja trabalhou nelas. Se voce so puder se cadastrar em um portal generalista, que seja esse - depois do Empleate.',
        ideal: 'IDEAL PRA: quem quer volume e variedade, de vaga operacional a cargo de gestao.',
      },
      {
        num: '03',
        name: 'Indeed',
        url: 'es.indeed.com',
        desc: 'Nao e bem um portal de vagas - e um motor de busca de vagas. O Indeed rastreia anuncios publicados em outros portais, sites de empresas e agencias, e concentra tudo num so lugar. Isso faz dele o canal mais completo em volume bruto de oportunidades, embora exija mais atencao sua pra filtrar duplicidade e checar a fonte original do anuncio.',
        ideal: 'IDEAL PRA: quem quer visao ampla do mercado sem precisar visitar portal por portal.',
      },
      {
        num: '04',
        name: 'Turijobs',
        url: 'turijobs.com',
        desc: 'Portal lider, na Espanha e em Portugal, especializado em turismo e hotelaria - hoteis, restaurantes, eventos, recepcao, operacao turistica. Pra quem chega recem-mudado, esse setor historicamente e uma das portas de entrada mais rapidas pro primeiro contrato formal, e esse portal concentra justamente esse tipo de vaga. Mesmo que seu plano de carreira aponte pra outro lugar, e aqui que muita travessia comeca a se pagar.',
        ideal: 'IDEAL PRA: quem quer entrar rapido no mercado formal via hotelaria, restauracao ou turismo.',
      },
      {
        num: '05',
        name: 'JobToday',
        url: 'jobtoday.com/es',
        desc: 'Um aplicativo - mais do que um site - de contratacao agil, direto pelo celular, sem processo longo e muitas vezes sem exigir curriculo formal. Forte em vagas de hotelaria, comercio, logistica e servicos em geral, com resposta de empresa em horas, nao em semanas. E o canal do folego: aquele que gera caixa enquanto os processos mais estruturados amadurecem.',
        ideal: 'IDEAL PRA: quem precisa de velocidade - primeira renda rapida enquanto organiza o resto.',
      },
    ];

    for (const ch of channels) {
      page.drawText(ch.num, { x: 50, y, size: 14, font: fontBold, color: gold });
      page.drawText(ch.name, { x: 75, y, size: 13, font: fontBold, color: navy });
      page.drawText(ch.url, { x: 160, y, size: 9, font: fontRegular, color: gray });
      y -= 16;
      const dLines = wrapText(ch.desc, 495, fontRegular, 9.5);
      for (const l of dLines) { page.drawText(l, { x: 50, y, size: 9.5, font: fontRegular, color: ink }); y -= 13; }
      page.drawText(ch.ideal, { x: 50, y, size: 8.5, font: fontBold, color: red });
      y -= 22;
    }

    // Recado box
    page.drawRectangle({ x: 50, y: y - 55, width: 495, height: 55, color: navy });
    page.drawText('RECADO DO AGENTE 34', { x: 65, y: y - 16, size: 8.5, font: fontBold, color: gold });
    const recado4 = wrapText(
      'Primeiro contrato nao e contrato final. Porta aberta vale mais que porta perfeita: dentro do sistema voce negocia, do lado de fora voce so espera. Entra, respira, depois escolhe.',
      465,
      fontRegular,
      9.5
    );
    let ry4 = y - 30;
    for (const l of recado4) { page.drawText(l, { x: 65, y: ry4, size: 9.5, font: fontRegular, color: cream }); ry4 -= 13; }

    addFooter(page, 5);
  }

  // Page 6: Sete dias pra sair do papel
  {
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: 0, width, height, color: cream });

    page.drawText('EXECUCAO - ORDEM DE OPERACAO', { x: 50, y: height - 55, size: 9, font: fontBold, color: gold });
    page.drawText('Sete dias pra sair do papel', { x: 50, y: height - 85, size: 22, font: fontBold, color: navy });

    let y = height - 115;
    const desc = wrapText(
      'Material que voce le e fecha nao muda nada. Material que voce executa em uma semana muda o mes inteiro. Entao aqui vai o plano curto - sete dias, nada de heroismo, so sequencia.',
      495,
      fontRegular,
      11
    );
    for (const l of desc) { page.drawText(l, { x: 50, y, size: 11, font: fontRegular, color: ink }); y -= 16; }

    const steps = [
      {
        tag: 'DIAS 1 E 2 - FUNDACAO',
        tasks: [
          '- Monte um documento a parte com seu resumo profissional em 3 linhas, suas experiencias com numero real e seus dados de contato. Escreve uma vez, usa cinco.',
          '- Curriculo em 1 pagina, no idioma da vaga. Se a vaga e em espanhol, o curriculo e em espanhol - esse e o erro que recrutador espanhol mais reclama de candidato brasileiro.',
        ],
      },
      {
        tag: 'DIAS 3 E 4 - POSICIONAMENTO',
        tasks: [
          '- Cadastro completo no Empleate (SEPE) e no InfoJobs. Perfil inteiro, nada de campo em branco.',
          '- Alertas ligados nos dois, com as palavras-chave do seu setor e a cidade de destino.',
        ],
      },
      {
        tag: 'DIAS 5 E 6 - AMPLITUDE',
        tasks: [
          '- Cadastro no Indeed, no Turijobs e no JobToday. Nesse ponto o processo ja vai estar rapido - e copiar e colar o que voce escreveu no dia 1.',
          '- Primeiras cinco candidaturas enviadas. Nao espere a vaga perfeita: candidatura e treino, e treino melhora mira.',
        ],
      },
      {
        tag: 'DIA 7 - RITMO',
        tasks: [
          '- Defina seu numero semanal de candidaturas e coloque no calendario como se fosse reuniao - porque e.',
          '- Crie a pasta de comprovantes: print de cada candidatura, com data no nome do arquivo.',
        ],
      },
    ];

    y -= 10;
    for (const st of steps) {
      page.drawRectangle({ x: 50, y: y - 22, width: 495, height: 22, color: navy });
      page.drawText(st.tag, { x: 62, y: y - 15, size: 9, font: fontBold, color: gold });
      y -= 30;

      for (const t of st.tasks) {
        const tLines = wrapText(t, 485, fontRegular, 10);
        for (const l of tLines) { page.drawText(l, { x: 55, y, size: 10, font: fontRegular, color: ink }); y -= 14; }
        y -= 4;
      }
      y -= 10;
    }

    // Recado box
    page.drawRectangle({ x: 50, y: y - 65, width: 495, height: 65, color: navy });
    page.drawText('RECADO DO AGENTE 34', { x: 65, y: y - 18, size: 8.5, font: fontBold, color: gold });
    const recado5 = wrapText(
      'Sete dias. E o tempo que a maioria gasta so pensando em comecar. Faz o combinado: se em uma semana voce tiver os cinco cadastros de pe e as cinco primeiras candidaturas enviadas, voce ja saiu na frente de quem baixou este material e deixou na pasta de downloads. - Agente 34, Codigo Europa',
      465,
      fontRegular,
      9.5
    );
    let ry5 = y - 32;
    for (const l of recado5) { page.drawText(l, { x: 65, y: ry5, size: 9.5, font: fontRegular, color: cream }); ry5 -= 13; }

    addFooter(page, 6);
  }

  // Page 7: Pra Fechar
  {
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: 0, width, height, color: cream });

    page.drawText('PRA FECHAR', { x: 50, y: height - 55, size: 9, font: fontBold, color: gold });
    page.drawText('Isso aqui e o reconhecimento. Falta o mapa.', { x: 50, y: height - 85, size: 20, font: fontBold, color: navy });

    let y = height - 115;
    const p1 = wrapText(
      'Cinco canais resolvem o comeco. Resolvem bem - e se voce executar o plano de sete dias, ja vai estar a frente da maioria. Mas seria desonesto da minha parte te deixar achando que o comeco e o caminho inteiro.\n\nO que estas paginas nao cobrem e justamente o que trava quem quer se mudar de verdade: qual visto pedir e por qual via, como se legalizar assim que pousar, quanto tempo leva cada etapa, como adaptar o curriculo ponto a ponto pro padrao espanhol, quais canais funcionam pro seu setor especifico, e o cronograma dos 90 dias que separa quem desembarca com plano de quem desembarca com fe no coracao e curriculo na mala.',
      495,
      fontRegular,
      10.5
    );
    for (const l of p1) {
      if (l === '') { y -= 6; continue; }
      page.drawText(l, { x: 50, y, size: 10.5, font: fontRegular, color: ink });
      y -= 15;
    }

    // Box Mapa Completo
    y -= 15;
    page.drawRectangle({ x: 50, y: y - 165, width: 495, height: 165, color: white, borderColor: line, borderWidth: 1 });
    page.drawText('O QUE ESTA NO MAPA COMPLETO', { x: 65, y: y - 22, size: 9.5, font: fontBold, color: navy });

    const items = [
      '- Os 34 canais - generalistas, especializados por setor, agencias internacionais de recrutamento, executive search, apps de contratacao agil e plataformas de trabalho remoto.',
      '- Os 8 pontos do curriculo espanhol - com um antes e depois real, do modelo brasileiro pro modelo que abre porta na Espanha.',
      '- O cronograma dos 90 dias - fundacao, tracao e fechamento, semana a semana, ate o dia do embarque.',
      '- O cenario por tras da abertura - a demografia, a reforma migratoria de 2025 e a rota mais rapida da Europa pra cidadania, que pouco brasileiro sabe que existe.'
    ];

    let iy = y - 42;
    for (const it of items) {
      const itLines = wrapText(it, 465, fontRegular, 9.5);
      for (const l of itLines) { page.drawText(l, { x: 65, y: iy, size: 9.5, font: fontRegular, color: ink }); iy -= 13; }
      iy -= 4;
    }

    y -= 185;
    // Último recado
    page.drawRectangle({ x: 50, y: y - 65, width: 495, height: 65, color: navy });
    page.drawText('ULTIMO RECADO DO AGENTE 34', { x: 65, y: y - 18, size: 8.5, font: fontBold, color: gold });
    const recado6 = wrapText(
      'O Agente 34 ja fez o reconhecimento do terreno; o Vitor e quem desenha a rota completa com voce. Atravessar com planejamento estrategico e a decisao mais segura.',
      465,
      fontRegular,
      9.5
    );
    let ry6 = y - 32;
    for (const l of recado6) { page.drawText(l, { x: 65, y: ry6, size: 9.5, font: fontRegular, color: cream }); ry6 -= 13; }

    y -= 90;
    // CTA box
    page.drawRectangle({ x: 50, y: y - 95, width: 495, height: 95, color: navy });
    page.drawText('C O D I G O   E U R O P A', { x: 230, y: y - 20, size: 9, font: fontBold, color: gold });
    page.drawText('Quer o mapa completo e o passo a passo - visto, legalizacao, mercado de trabalho e mentalidade?', {
      x: 75,
      y: y - 38,
      size: 9.5,
      font: fontRegular,
      color: cream,
    });
    page.drawText('Me responde no direct e vem pra dentro.  @vitordiorranes', {
      x: 130,
      y: y - 56,
      size: 11,
      font: fontBold,
      color: gold,
    });
    page.drawText('Confraria Europa - a comunidade de quem nao atravessa esse oceano sozinho.', {
      x: 125,
      y: y - 76,
      size: 8.5,
      font: fontRegular,
      color: gray,
    });

    addFooter(page, 7);
  }

  // Page 8: Back cover
  {
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: 0, width, height, color: navy });

    page.drawText('C O D I G O   E U R O P A', {
      x: 215,
      y: height / 2 + 30,
      size: 16,
      font: fontBold,
      color: gold,
    });

    const quote = wrapText(
      'Mobilidade global, bastidores do mercado internacional e posicionamento de quem decide atravessar com estrategia.',
      380,
      fontRegular,
      11
    );
    let qy = height / 2 - 10;
    for (const l of quote) {
      page.drawText(l, { x: 105, y: qy, size: 11, font: fontRegular, color: cream });
      qy -= 16;
    }

    page.drawText('@vitordiorranes', {
      x: 245,
      y: height / 2 - 70,
      size: 12,
      font: fontBold,
      color: gold,
    });

    page.drawRectangle({ x: 0, y: 0, width, height: 12, color: red });
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(process.cwd(), 'public', '5-canais-codigo-europa.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('PDF written successfully to', outputPath, 'bytes:', pdfBytes.length);
}

generatePdf().catch(console.error);
