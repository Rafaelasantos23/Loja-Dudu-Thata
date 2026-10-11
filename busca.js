// =====================================================================
// BARRA DE PESQUISA DO CATÁLOGO
// Cria o campo de pesquisa sozinho, acima dos cards, e esconde os cards
// que não combinam com o que a pessoa digitou.
// =====================================================================

(function () {
  const produtos = document.getElementById("produtos");
  if (!produtos) return;

  const numero = typeof WHATSAPP !== "undefined" ? WHATSAPP : "5562995616767";

  // --- Estilo da barra (usa as cores do seu style.css) ---
  const estilo = document.createElement("style");
  estilo.textContent = `
    .busca { max-width: 560px; margin: 0 auto 40px; text-align: center; }
    .busca input {
      width: 100%;
      padding: 14px 22px;
      border: 2px solid transparent;
      border-radius: 999px;
      background: var(--white);
      box-shadow: var(--shadow);
      font: inherit;
      font-size: 1rem;
      color: var(--ink);
      transition: border-color .3s ease;
    }
    .busca input:focus { outline: none; border-color: var(--violet); }
    .busca-vazia { margin-top: 20px; color: #6b6572; }
    .busca-vazia a { color: var(--violet-deep); font-weight: 700; }
    @media (max-width: 768px) {
      .busca { margin-bottom: 24px; }
      .busca input { padding: 12px 18px; font-size: .95rem; }
    }
  `;
  document.head.appendChild(estilo);

  // --- Campo de pesquisa + mensagem "nada encontrado" ---
  const mensagem = encodeURIComponent("Olá! Não achei o que procurava no site e gostaria de um orçamento.");
  const caixa = document.createElement("div");
  caixa.className = "busca";
  caixa.innerHTML = `
    <input type="search" id="campo-busca" placeholder="🔍 Pesquisar produtos (ex.: chaveiro, time, capivara)"
           aria-label="Pesquisar produtos" autocomplete="off">
    <p class="busca-vazia" id="busca-vazia" style="display:none">
      Não encontramos esse produto no catálogo.
      <a href="https://wa.me/${numero}?text=${mensagem}" target="_blank" rel="noopener noreferrer">Fale com a gente pelo WhatsApp</a>
      e criamos sob encomenda!
    </p>`;
  produtos.parentNode.insertBefore(caixa, produtos);

  const campo = document.getElementById("campo-busca");
  const vazio = document.getElementById("busca-vazia");
  const cards = produtos.querySelectorAll(".card");

  // Tira acentos e maiúsculas: "Chaveiro" e "chavéiro" viram "chaveiro"
  const normalizar = (texto) =>
    texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  campo.addEventListener("input", () => {
    const termos = normalizar(campo.value).split(" ").filter(Boolean);
    let encontrados = 0;

    cards.forEach((card) => {
      let mostrar = true;

      if (termos.length > 0) {
        if (card.classList.contains("card-placeholder")) {
          mostrar = false; // cards "em breve" não entram na pesquisa
        } else {
          const titulo = card.querySelector("h3")?.textContent || "";
          const descricao = card.querySelector("p")?.textContent || "";
          const palavras = card.dataset.busca || "";
          const texto = normalizar(`${titulo} ${descricao} ${palavras}`);
          mostrar = termos.every((t) => texto.includes(t));
        }
      }

      card.style.display = mostrar ? "" : "none";
      if (mostrar) encontrados++;
    });

    vazio.style.display = termos.length > 0 && encontrados === 0 ? "block" : "none";
  });
})();