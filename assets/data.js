// Catálogo Liga Motors
const WHATSAPP = "5537998170795";

const SCOOTERS = [
  {
    id: "sudu-a3",
    nome: "SUDU A3",
    marca: "SUDU",
    categoria: "Urbana",
    tagline: "Sem CNH, sem combustível, sem complicação.",
    preco: 9990,
    autonomia: 60,
    velocidade: 32,
    potencia: 1000,
    bateria: "60V 20Ah · Lítio removível",
    carga: "6 a 7h carga total",
    peso: 75,
    suspensao: "Amortecedores duplos dianteiro e traseiro",
    freios: "Disco hidráulico dianteiro e traseiro",
    licenciamento: "Não exige CNH nem emplacamento (autopropelido)",
    cor: "Preto · Creme · Cinza",
    garantia: "1 ano motor e sistema elétrico",
    imagem: "url('https://dcdn-us.mitiendanube.com/stores/001/185/446/products/sudu-a3-bbbfa73da4d895281617491350983370-1024-1024.webp') center/cover no-repeat, linear-gradient(135deg,#1a1a1a 0%,#fd6814 100%)",
    fotos: [
      "https://dcdn-us.mitiendanube.com/stores/001/185/446/products/sudu-a3-bbbfa73da4d895281617491350983370-1024-1024.webp",
      "https://dcdn-us.mitiendanube.com/stores/001/185/446/products/design-sem-nome-d085993a91306138f317483751819584-1024-1024.webp",
      "https://dcdn-us.mitiendanube.com/stores/001/185/446/products/design-sem-nome-9ce23e15ba9dc4f6d217483751672799-1024-1024.webp",
      "https://dcdn-us.mitiendanube.com/stores/001/185/446/products/a3-creme-8-6cd1c5d5b4e2b6f63f17458707307841-1024-1024.webp"
    ],
    destaques: [
      "Bateria de lítio removível",
      "Alarme com trava nas rodas",
      "Painel LCD digital",
      "Entrada USB integrada",
      "Cartão NFC para ligar",
      "IP65 — resistente à água"
    ],
    descricao: "A SUDU A3 é a porta de entrada ideal para o universo elétrico. Compacta, silenciosa e sem burocracia — não precisa de CNH nem emplacamento. Bateria de lítio removível que carrega em qualquer tomada, alarme antifurto com trava nas rodas e painel digital LCD. Perfeita para o dia a dia urbano.",
    destaque: true
  },
  {
    id: "sudu-a3-plus",
    nome: "SUDU A3 Plus",
    marca: "SUDU",
    categoria: "Urbana",
    tagline: "Mais autonomia, mais potência, mesma liberdade.",
    preco: 10990,
    autonomia: 80,
    velocidade: 32,
    potencia: 1000,
    bateria: "60V 30Ah · Lítio removível",
    carga: "6 a 7h carga total",
    peso: 80,
    suspensao: "Amortecedores duplos dianteiro e traseiro",
    freios: "Disco hidráulico dianteiro e traseiro",
    licenciamento: "Não exige CNH nem emplacamento (autopropelido)",
    cor: "Preto · Creme · Cinza",
    garantia: "1 ano motor e sistema elétrico",
    imagem: "url('https://static.wixstatic.com/media/227124_187330afd3b54cd9b51d8550e012b19c~mv2.png') center/cover no-repeat, linear-gradient(135deg,#0a0a0a 0%,#fd6814 100%)",
    fotos: [
      "https://static.wixstatic.com/media/227124_187330afd3b54cd9b51d8550e012b19c~mv2.png",
      "https://static.wixstatic.com/media/227124_ad7c7eb825b248ddb11de959cf43a4dd~mv2.png",
      "https://static.wixstatic.com/media/227124_83c74c5965a74fd4a2b94050b053d363~mv2.png",
      "https://static.wixstatic.com/media/227124_dd6a53954c514143a38e04815ef52b54~mv2.png"
    ],
    destaques: [
      "Bateria 30Ah — 33% mais autonomia",
      "Motor 1000W (pico 1500W)",
      "Banco em couro maior e confortável",
      "Botão de ré",
      "Alarme com trava nas rodas",
      "IP65 — resistente à água"
    ],
    descricao: "A versão evoluída da A3. Com bateria 30Ah, a A3 Plus entrega até 80 km por carga — ideal para quem roda mais no dia a dia. Motor com pico de 1500W, banco premium em couro, botão de ré e todas as facilidades da linha SUDU. Sem CNH, sem emplacamento.",
    novo: true
  },
  {
    id: "sudu-a3t",
    nome: "Triciclo SUDU",
    marca: "SUDU",
    categoria: "Triciclo",
    tagline: "Estabilidade total. Sem precisar de equilíbrio.",
    preco: 12590,
    autonomia: 60,
    velocidade: 32,
    potencia: 800,
    bateria: "60V 20Ah · Lítio removível",
    carga: "7 a 8h carga total",
    peso: 74,
    suspensao: "Telescópica dianteira · Mola traseira",
    freios: "Disco dianteiro · Tambor traseiro",
    licenciamento: "Não exige CNH nem emplacamento (autopropelido)",
    cor: "Preto · Cinza · Vermelho",
    garantia: "1 ano motor e sistema elétrico",
    imagem: "url('https://dcdn-us.mitiendanube.com/stores/001/185/446/products/a3-creme-4-91429230d043a6912b17458707319806-1024-1024.webp') center/cover no-repeat, linear-gradient(135deg,#1a1a2a 0%,#fd6814 100%)",
    fotos: [
      "https://dcdn-us.mitiendanube.com/stores/001/185/446/products/a3-creme-4-91429230d043a6912b17458707319806-1024-1024.webp",
      "https://dcdn-us.mitiendanube.com/stores/001/185/446/products/a3-creme-5-eea06b724e46c75b2f17458707318912-1024-1024.webp",
      "https://dcdn-us.mitiendanube.com/stores/001/185/446/products/a3-creme-6-cbf9b01768c3e530df17458707317086-1024-1024.webp",
      "https://dcdn-us.mitiendanube.com/stores/001/185/446/products/a3-creme-7-9b487b5d7cf1faa6f817458707305981-1024-1024.webp"
    ],
    destaques: [
      "Três rodas — equilíbrio garantido",
      "Capacidade até 150 kg",
      "Bateria de lítio removível",
      "Sobe inclinações de até 25°",
      "Ideal para 2 passageiros",
      "Faróis LED"
    ],
    descricao: "O Triciclo SUDU é a escolha perfeita para quem busca estabilidade máxima. Com três rodas e chassi reforçado, oferece segurança em subidas, cargas pesadas e condução para duas pessoas. Sem precisar de CNH — ideal para quem nunca pilotou ou quer mais conforto no dia a dia.",
    destaque: true
  },
  {
    id: "k06-scooter",
    nome: "K06 Scooter",
    marca: "K06",
    categoria: "Urbana",
    tagline: "Compacta na cidade. Grande no estilo.",
    preco: 8990,
    autonomia: 50,
    velocidade: 32,
    potencia: 1000,
    bateria: "60V 20Ah · Lítio",
    carga: "5 a 6h carga total",
    peso: 70,
    suspensao: "Amortecedores duplos dianteiro e traseiro",
    freios: "Disco hidráulico dianteiro e traseiro",
    licenciamento: "Não exige CNH nem emplacamento (autopropelido)",
    cor: "Preto · Branco · Vermelho",
    garantia: "1 ano motor e sistema elétrico",
    imagem: "url('https://dcdn-us.mitiendanube.com/stores/001/185/446/products/design-sem-nome-d085993a91306138f317483751819584-1024-1024.webp') center/cover no-repeat, linear-gradient(135deg,#111 0%,#333 100%)",
    fotos: [
      "https://dcdn-us.mitiendanube.com/stores/001/185/446/products/design-sem-nome-d085993a91306138f317483751819584-1024-1024.webp",
      "https://dcdn-us.mitiendanube.com/stores/001/185/446/products/design-sem-nome-9ce23e15ba9dc4f6d217483751672799-1024-1024.webp"
    ],
    destaques: [
      "Design compacto e ágil",
      "Motor 1000W silencioso",
      "Painel digital LCD",
      "Iluminação LED completa",
      "Sem CNH nem emplacamento",
      "Fácil de carregar em casa"
    ],
    descricao: "A K06 é a scooter elétrica ideal para quem precisa de agilidade no trânsito urbano com o menor custo de operação. Design moderno, motor silencioso e bateria de lítio que carrega em qualquer tomada. Sem burocracia: não precisa de CNH nem emplacamento."
  },
  {
    id: "evoltx-exgts",
    nome: "EvoltX EXGTS",
    marca: "EvoltX",
    categoria: "Urbana",
    tagline: "Zero emissão. Zero compromisso com o passado.",
    preco: 8500,
    autonomia: 60,
    velocidade: 32,
    potencia: 1000,
    bateria: "60V 20Ah · Chumbo-ácido",
    carga: "8 a 10h carga total",
    peso: 90,
    suspensao: "Suspensão hidráulica dianteira e traseira",
    freios: "Disco dianteiro e traseiro",
    licenciamento: "Não exige CNH nem emplacamento (autopropelido)",
    cor: "Cinza Claro · Cinza · Preto · Vermelho · Branco",
    garantia: "1 ano motor e sistema elétrico",
    imagem: "url('https://evoltx.com.br/wp-content/uploads/2025/09/IMG_6308-300x225.jpg') center/cover no-repeat, linear-gradient(135deg,#0a0a0a 0%,#2a2a2a 100%)",
    fotos: [
      "https://evoltx.com.br/wp-content/uploads/2025/09/IMG_6308-300x225.jpg",
      "https://evoltx.com.br/wp-content/uploads/2025/09/MODELO-CINZA-CLARO-FOTO-4-300x225.jpg",
      "https://evoltx.com.br/wp-content/uploads/2025/09/MODELO-VERMELHO-FOTO-5-300x225.jpg",
      "https://evoltx.com.br/wp-content/uploads/2025/09/MODELO-BRANCO-FOTO-3-300x225.jpg"
    ],
    destaques: [
      "Rodas de liga de alumínio",
      "Conforme legislação brasileira",
      "Capacidade até 200 kg",
      "Carregador bivolt 110V/220V",
      "Pneus 300-10",
      "Sem CNH nem emplacamento"
    ],
    descricao: "A EvoltX EXGTS foi desenvolvida para mobilidade urbana sustentável com design robusto e tecnologia acessível. Rodas de liga de alumínio, suspensão hidráulica e carregador bivolt incluso. Capacidade de até 200 kg — uma das maiores do segmento. Sem precisar de CNH ou emplacamento.",
    novo: true
  }
];

if (typeof window !== "undefined") {
  window.SCOOTERS = SCOOTERS;
  window.WHATSAPP = WHATSAPP;
}
