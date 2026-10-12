// =====================================================================
// PARTE 1 — AQUI VOCÊ EDITA
// Para adicionar uma foto: coloque o nome do arquivo na lista "imagens".
// Para adicionar uma categoria nova: copie um bloco { ... }, cole abaixo
// e troque o título, a descrição e as fotos.
// =====================================================================

// =====================================================================
// PARTE 1 — AQUI VOCÊ EDITA
// Para adicionar uma foto: coloque o nome do arquivo na lista "imagens".
// Para adicionar uma categoria nova: copie um bloco { ... }, cole abaixo
// e troque o título, a descrição e as fotos.
// =====================================================================

const PASTA_IMAGENS = "./img/";
const WHATSAPP = "5562995616767";

// ATALHO PARA MUITAS FOTOS: se as fotos tiverem nomes numerados
// (decoracao-1.jpg, decoracao-2.jpg ...), em vez de escrever uma por uma use:
//   imagens: gerarFotos("decoracao-", 12, ".jpg")
// Isso cria decoracao-1.jpg até decoracao-12.jpg. Para somar uma foto, aumente o número.
function gerarFotos(prefixo, quantidade, extensao) {
    const lista = [];
    for (let i = 1; i <= quantidade; i++) {
        lista.push(prefixo + i + extensao);
    }
    return lista;
}

const categorias = [
    {
        titulo: "Chaveiros tradicionais e personalizados",
        palavras: "chaveiro chaveiros letra nome logo time futebol flor capivara signo aries academia barbearia ferragista camera ursinho taca brasil bloco personalizado",
        descricao: "Chaveiros prontos e personalizados para sua marca, empresa ou ideia. Peça seu orçamento!",
        imagens: [
            "chaveiro1.jpeg",
            "chaveiro2.jpeg",
            "chaveiro3.jpeg",
            "chaveiro4.jpeg",
            "chaveiro5.jpeg",
            "chaveiro6.jpeg",
            "chaveiro7.jpeg",
            "chaveiro8.jpeg",
            "chaveiro9.jpeg",
            "chaveiro10.jpeg",
            "chaveiro11.jpeg",
            "chaveiro12.jpeg",
            "chaveiro13.jpeg",
            "chaveiro14.jpeg",
            "chaveiro15.jpeg",
            "chaveiro16.jpeg",
            "chaveiro17.jpeg",
            "chaveiro18.jpeg",
            "chaveiro19.jpeg",
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
        titulo: "Brinquedos sensoriais e Jogos ",
        palavras: "brinquedo brinquedos jogo jogos sensorial ovo dragao estrela cobra dado parafuso dino bailarina nuvem bola click antiestresse",
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
            "ovo de dragaoo2q.jpeg",
            "brinquedo1.jpeg",
            "brinquedo2.jpeg",
            "brinquedo3.jpeg",
            "brinquedo4.jpeg",
            "brinquedo5.jpeg",
            "brinquedo6.jpeg",
            "brinquedo7.jpeg",
            "brinquedo8.jpeg",
            "brinquedo9.jpeg",
            "brinquedo10.jpeg",
            "brinquedo11.jpeg",
            "brinquedo12.jpeg",
            "brinquedo13.jpeg",
            "brinquedo14.jpeg",
            "brinquedo15.jpeg",
            "brinquedo16.jpeg",
            "brinquedo17.jpeg",
            "brinquedo18.jpeg",
            "brinquedo19.jpeg",
            "brinquedo20.jpeg",
            
        ]
    },
    {
        titulo: "Porta Copo e Porta garrafas",
        palavras: "porta copo suporte garrafa lata long neck time presente decoracao",
        descricao: "Suportes 3D personalizados com seu tema, time, marca ou nome. Ideais para presentes, coleções e decoração. Solicite seu orçamento!",
        imagens: [
            "suporte copo moster 3.jpeg",
            "suporte copo time.jpeg",
            "suporte garrafa cinza.jpeg",
            "suporte garrafa long neck.jpeg",
            "suporte lata dourado e verde.jpeg",
            "suporte lata moster 2.jpeg",
            "suporte lata moster.jpeg",
            "copo1.jpeg",
            "copo2.jpeg",
            "copo3.jpeg",
            "copo4.jpeg",
            "copo5.jpeg",
            "copo6.jpeg",
            "copo7.jpeg",
            "copo8.jpeg",
            "copo9.jpeg",
            "copo10.jpeg",
            "copo11.jpeg",
           

        ]
    },
    {
        titulo: "Miniaturas e personagens",
        palavras: "miniatura miniaturas boneco bonecos personagem videogame mario hulk homem aranha patolino bart palhaco corinthians colecao",
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
            "boneco corinthias.png",
            "miniaturatime1.jpeg",
            "miniaturatime2.jpeg",
        ]
    },
    {
        titulo: "Porta canetas",
        palavras: "peca pecas personalizada porta joias porta caneta bucha bob esponja organizador encomenda sob medida",
        descricao: "Não encontrou o que procura? Envie sua ideia! Criamos projetos personalizados em impressão 3D e fazemos seu orçamento.",
        imagens: [
            "porta caneta nome simples.jpeg",
            "porta caneta simples2.jpeg",
            "porta caneta (expresso caipira).jpeg",
            "portacaneta1.jpeg",
            "portacaneta2.jpeg",
            "portacaneta3.jpeg",
            "portacaneta4.jpeg",
            "portacaneta5.jpeg",
            "portacaneta6.jpeg",
            "portacaneta7.jpeg",
            "portacaneta8.jpeg",
            "portacaneta9.jpeg",
            "portacaneta10.jpeg",
            "portacaneta11.jpeg",
            "portacaneta12.jpeg",
            "portacaneta13.jpeg",
            "portacaneta14.jpeg",
            "portacaneta15.jpeg",
            "portacaneta16.jpeg",
            "portacaneta17.jpeg",
            "portacaneta18.jpeg",
            "portacaneta19.jpeg",
            "portacaneta20.jpeg",
            "portacaneta21.jpeg",
            "portacaneta22.jpeg",
        
        ]
    },



    {
        titulo: "Para o seu Negocio",
        palavras: "praticidade dia dia negocio placa nfc",
        descricao: "Placas NFC para facilitar seu dia dia",
        imagens: [
            "placa nfc3.jpeg",
            "placa nfc2.jpeg",
            "placa nfc4.jpeg",
            "placa nfc5.jpeg",
            "placa nfc6.jpeg",
            "placa nfc1.jpeg",
            "placa nfc7.jpeg",
            "placa nfc8.jpeg",
            "placa nfc9.jpeg",
            "placa nfc10.jpeg",
            "placa nfc11.jpeg",
            "placa nfc12.jpeg",
            "placa nfc13.jpeg",
            "placa nfc14.jpeg",
            "placa nfc15.jpeg",
            "placa nfc16.jpeg",
            "placa nfc17.jpeg",
            "placa nfc18.jpeg",
            "placa nfc19.jpeg",
            "placa nfc20.jpeg",
            "placa nfc21.jpeg",
            "placa nfc22.jpeg",
            "placa nfc23.jpeg",
            "placa nfc24.jpeg",
            "placa nfc25.jpeg",
            
            



        ]
    },
    {
        titulo: "Microfones",
        descricao: "Em breve, novidades desta categoria. Peça mais informações pelo WhatsApp.",
        imagens: [
            "microfone1.jpeg",
            "microfone2.jpeg",
            "microfone3.jpeg",
            "microfone4.jpeg",
            "microfone5.jpeg",
            "microfone6.jpeg",
            "microfone7.jpeg",
            "microfone8.jpeg",
            "microfone9.jpeg",
            "microfone10.jpeg",
            "microfone11.jpeg",
            "microfone12.jpeg",
            "microfone13.jpeg",
            "microfone14.jpeg",
            "microfone15.jpeg",
           
        ]
    },
    {
        titulo: "Porta joias ",
        descricao: "Em breve, novidades desta categoria. Peça mais informações pelo WhatsApp.",
        imagens: [
            "porta joias 1.jpeg",
            "portajoia1.jpeg",
            "portajoia2.jpeg",
            "portajoia3.jpeg",
            "portajoia4.jpeg",
            "portajoia5.jpeg",
            "portajoia6.jpeg",
            "portajoia7.jpeg",
            "portajoia8.jpeg",
            "portajoia9.jpeg",
            "portajoia10.jpeg",
            "portajoia11.jpeg",
            "portajoia12.jpeg",
            "portajoia13.jpeg",
            "portajoia14.jpeg",
            "portajoia15.jpeg",
            "portajoia16.jpeg",
            "portajoia17.jpeg",


        ]
    },
    {
        titulo: "Suportes - telefone - play game",
        descricao: "Em breve, novidades desta categoria. Peça mais informações pelo WhatsApp.",
        imagens: [
            "suporte1.jpeg",
            "suporte2.jpeg",
            "suporte3.jpeg",
            "suporte4.jpeg",
            "suporte5.jpeg",
            "suporte6.jpeg",
            "suporte7.jpeg",
            "suporte8.jpeg",
            "suporte9.jpeg",
            "suporte10.jpeg",
    
        ]
    },
    {
        titulo: "Natal",
        descricao: "Em breve, novidades desta categoria. Peça mais informações pelo WhatsApp.",
        imagens: [
            "natal1.jpeg",
            "natal2.jpeg",
            "natal3.jpeg",
            "natal4.jpeg",
            "natal5.jpeg",
            "natal6.jpeg",
            "natal7.jpeg",
            "natal8.jpeg",
        ]
    }
];


// =====================================================================
// Lê a lista acima e monta os cards na página.
// =====================================================================

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
      <div class="card${temFotos ? "" : " card-placeholder"}" data-busca="${categoria.palavras || ''}">
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