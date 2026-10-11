// =====================================================================
// PARTE 1 — AQUI VOCÊ EDITA
// Para adicionar uma foto: coloque o nome do arquivo na lista "imagens".
// Para adicionar uma categoria nova: copie um bloco { ... }, cole abaixo
// e troque o título, a descrição e as fotos.
// =====================================================================

const PASTA_IMAGENS = "./img/";
const WHATSAPP = "5562995616767";

const categorias = [
  {
    titulo: "Chaveiros personalizados",
    descricao: "Chaveiros prontos e personalizados para sua marca, empresa ou ideia. Peça seu orçamento!",
    imagens: [
      "imsualogo.png",
      "imgletra.png",
      "imgjhon.png",
      "imgacm.png",
      "imgferragista.png",
      "imgbarbearia.png",
      "chaveiro (coisas estranhas).jpeg",
      "cahveiros academia3.jpeg",
      "capivara.jpeg",
      "chav stity.jpeg",
      "chaveiro aries.jpeg",
      "chaveiro banguela.jpeg",
      "chaveiro camera.jpeg",
      "chaveiro camera2.jpeg",
      "chaveiro flor.jpeg",
      "chaveiro time.jpeg",
      "chaveiro time2.jpeg",
      "chaveiro ursinho puff.jpeg",
      "chaveiros bloco.jpeg",
      "chaveiros brasil.jpeg",
      "chaveiros variados.jpeg",
      "taça .jpeg"
    ]
  },
  {
    titulo: "Brinquedos e Jogos",
    descricao: "Brinquedos sensoriais 3D para estimular a criatividade, aliviar o estresse e trazer diversão para todas as idades. Qualidade, inovação e diversão em um só produto.",
    imagens: [
      "imgovodragao (1).jpeg",
      "imgestrela.jpg",
      "imgovodragao (2).jpeg",
      "imgovodragao (3).jpeg",
      "imgovodragao (4).jpeg",
      "imgovodragao (5).jpeg",
      "jogo do dino.jpeg",
      "balarina sensorial 2.jpeg",
      "balarina sensorial.jpeg",
      "brinquedo nuvem.jpeg",
      "imgovodragao (6).jpeg",
      "imgclickbola.jpg",
      "ovo de dragaoo.jpeg",
      "ovo de dragaoo2q.jpeg"
    ]
  },
  {
    titulo: "Porta Copo",
    descricao: "Suportes 3D personalizados com seu tema, time, marca ou nome. Ideais para presentes, coleções e decoração. Solicite seu orçamento!",
    imagens: [
      "suporte copo moster 3.jpeg",
      "suporte copo time.jpeg",
      "suporte garrafa cinza.jpeg",
      "suporte garrafa long neck.jpeg",
      "suporte lata dourado e verde.jpeg",
      "suporte lata moster 2.jpeg",
      "suporte lata moster.jpeg"
    ]
  },
  {
    titulo: "Miniaturas",
    descricao: "Miniaturas 3D prontas e personalizadas de personagens, bonecos e projetos. Peças únicas com detalhes incríveis para colecionar, presentear ou decorar!",
    imagens: [
      "personagens videogame.jpeg",
      "palhaço.jpeg",
      "boneco flajola.png",
      "boneco mario.png",
      "boneco homem aranha.png",
      "boneco hulk.png",
      "boneco patolino.png",
      "boneco bart.png",
      "boneco corinthias.png"
    ]
  },
  {
    titulo: "Peças personalizadas",
    descricao: "Não encontrou o que procura? Envie sua ideia! Criamos projetos personalizados em impressão 3D e fazemos seu orçamento.",
    imagens: [
      "porta joias 1.jpeg",
      "porta caneta nome simples.jpeg",
      "porta caneta simples2.jpeg",
      "porta caneta (expresso caipira).jpeg",
      "porta bucha bob esponja.jpeg"
    ]
  },

  // Categorias "em breve": lista de imagens vazia [] = card com "Fotos em breve".
  // Quando tiver as fotos, troque o título/descrição e preencha a lista.
  {
    titulo: "Categoria 1",
    descricao: "Em breve, novidades desta categoria. Peça mais informações pelo WhatsApp.",
    imagens: []
  },
  {
    titulo: "Categoria 2",
    descricao: "Em breve, novidades desta categoria. Peça mais informações pelo WhatsApp.",
    imagens: []
  },
  {
    titulo: "Categoria 3",
    descricao: "Em breve, novidades desta categoria. Peça mais informações pelo WhatsApp.",
    imagens: []
  },
  {
    titulo: "Categoria 4",
    descricao: "Em breve, novidades desta categoria. Peça mais informações pelo WhatsApp.",
    imagens: []
  },
  {
    titulo: "Categoria 5",
    descricao: "Em breve, novidades desta categoria. Peça mais informações pelo WhatsApp.",
    imagens: []
  }
];


// ====================================================================
// PARTE 2 — NÃO PRECISA MEXER
// Lê a lista acima e monta os cards na página.
// ====================================================================

const containerProdutos = document.getElementById("produtos");

if (containerProdutos) {
  let html = "";
  let contadorEmBreve = 0;

  // Para cada categoria da lista, monta um card
  categorias.forEach(function (categoria) {
    const temFotos = categoria.imagens.length > 0;
    let carrossel = "";

    if (temFotos) {
      // Para cada foto da categoria, monta uma tag <img>
      let fotos = "";
      categoria.imagens.forEach(function (arquivo, i) {
        const ativa = i === 0 ? ' class="active"' : "";
        const lazy = i === 0 ? "" : ' loading="lazy"';
        fotos += `<img src="${PASTA_IMAGENS}${arquivo}"${ativa}${lazy} alt="${categoria.titulo} - foto ${i + 1}">`;
      });

      carrossel = `
        <div class="carousel">
          <button class="prev" aria-label="Imagem anterior">&#10094;</button>
          <div class="images">${fotos}</div>
          <button class="next" aria-label="Próxima imagem">&#10095;</button>
        </div>`;
    } else {
      contadorEmBreve++;
      carrossel = `
        <div class="carousel">
          <div class="placeholder-slide">
            <span class="placeholder-number">${contadorEmBreve}</span>
            <span class="placeholder-label">Fotos em breve</span>
          </div>
        </div>`;
    }

    html += `
      <div class="card${temFotos ? "" : " card-placeholder"}">
        ${carrossel}
        <h3>${categoria.titulo}</h3>
        <p>${categoria.descricao}</p>
        <a class="btn whatsapp btn-orcamento" target="_blank" rel="noopener noreferrer"
          href="https://wa.me/${WHATSAPP}">
          Solicitar orçamento
        </a>
      </div>`;
  });

  containerProdutos.innerHTML = html;
}