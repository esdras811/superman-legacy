// A. ESTRUTURA DE DADOS COMPLETA (ATUALIZE AQUI AS URLs das suas fotos!)
const supermanVersoes = [
  {
    ator: "Christopher Reeve",
    projeto: "Superman: O Filme",
    ano: 1978,
    tipo: "Filme",
    fotoUrl: "img/superman reev.jpg",
    descricaoLonga: "O filme que definiu o herói para gerações, com efeitos visuais revolucionários. Reeve captura a inocência de Clark Kent e a majestade do Superman. Um clássico atemporal que mistura aventura e romance."
  },
  {
    ator: "Dean Cain",
    projeto: "Lois & Clark",
    ano: 1993,
    tipo: "Série",
    fotoUrl: "img/superman dean.avif",
    descricaoLonga: "Focado no relacionamento entre Clark Kent e Lois Lane. Esta série deu uma ênfase maior à vida pessoal e romântica do casal, tornando Clark Kent tão importante quanto seu alter ego heróico."
  },
  {
    ator: "Tom Welling",
    projeto: "Smallville",
    ano: 2001,
    tipo: "Série",
    fotoUrl: "img/welling.jpg",
    descricaoLonga: "A série que explorou a juventude de Clark Kent, seu crescimento e os desafios para aceitar seu destino. 'Sem capa, sem voo' por muito tempo, foi uma jornada de amadurecimento épica."
  },
  {
    ator: "Henry Cavill",
    projeto: "Man of Steel",
    ano: 2013,
    tipo: "Filme",
    fotoUrl: "img/superman cavill .jpg",
    descricaoLonga: "Uma abordagem mais sombria e realista, explorando o peso de ser um alienígena na Terra e as consequências de sua luta. Marcou o início do Universo Estendido da DC (DCEU)."
  },
  {
    ator: "Tyler Hoechlin",
    projeto: "Superman & Lois",
    ano: 2021,
    tipo: "Série",
    fotoUrl: "img/superman tyler.jpg",
    descricaoLonga: "Focado em Clark e Lois como pais que criam seus dois filhos adolescentes, lidando com crises familiares e ameaças globais. Mostra o Superman como um pai e marido equilibrando mundos."
  },
  {
    ator: "David Corenswet",
    projeto: "Superman",
    ano: 2025,
    tipo: "Filme",
    fotoUrl: "img/superman david.webp",
    descricaoLonga: "O novo início cinematográfico sob a direção de James Gunn. Este filme focará no lado 'esperança' do Superman, voltando às suas raízes como um herói otimista em um mundo moderno."
  }
];

// VARIÁVEIS DO DOM
const painelVersoes = document.getElementById('painel-versoes');
const supermanModal = document.getElementById('superman-modal');
const closeButton = document.querySelector('.close-button');


// FUNÇÃO DE RENDERIZAÇÃO E CLIQUE
function renderizarVersoes(data) {
    painelVersoes.innerHTML = ''; 

    data.forEach(versao => {
        // Usa o data-ator para identificar o card no clique
        const cardHTML = `
            <div class="card-superman" data-ator="${versao.ator}">
                <img src="${versao.fotoUrl}" alt="Foto de ${versao.ator}" class="foto-ator">
                <div class="info">
                    <h3>${versao.ator}</h3>
                    <p>${versao.projeto} (${versao.ano})</p>
                    <span class="badge-${versao.tipo.toLowerCase()}">${versao.tipo}</span> 
                </div>
            </div>
        `;
        painelVersoes.innerHTML += cardHTML;
    });

    // Anexa a função de clique para ABRIR O MODAL em CADA CARD
    document.querySelectorAll('.card-superman').forEach(card => {
        card.addEventListener('click', (e) => {
            const atorNome = e.currentTarget.getAttribute('data-ator');
            abrirModal(atorNome);
        });
    });
}

// FUNÇÃO PARA FILTRAR
function filtrarVersoes(criterio) {
  if (criterio === 'todos') {
    renderizarVersoes(supermanVersoes);
    return;
  }

  const dadosFiltrados = supermanVersoes.filter(versao => {
    return versao.tipo === criterio;
  });

  renderizarVersoes(dadosFiltrados);
}


// NOVO: FUNÇÕES DO MODAL
function abrirModal(atorNome) {
    const versao = supermanVersoes.find(v => v.ator === atorNome);
    if (!versao) return;

    document.getElementById('modal-ator-foto').src = versao.fotoUrl;
    document.getElementById('modal-ator-foto').alt = versao.ator;
    document.getElementById('modal-projeto-titulo').textContent = versao.projeto;
    document.getElementById('modal-ator-nome').textContent = `Ator: ${versao.ator}`;
    document.getElementById('modal-ano-tipo').textContent = `${versao.ano} - ${versao.tipo}`;
    document.getElementById('modal-descricao-longa').textContent = versao.descricaoLonga;

    supermanModal.classList.add('active'); // Mostra o modal
}

// Fecha o modal ao clicar no X
closeButton.addEventListener('click', () => {
    supermanModal.classList.remove('active');
});

// Fecha o modal se clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === supermanModal) {
        supermanModal.classList.remove('active');
    }
});


// INICIALIZAÇÃO: Executa quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    // 1. Carrega todas as versões na primeira vez
    renderizarVersoes(supermanVersoes); 
    
    // 2. Configura o evento de clique nos botões de filtro
    const botoesFiltro = document.querySelectorAll('.filtros button');
    
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const filtro = e.target.getAttribute('data-filtro');
            filtrarVersoes(filtro);
        });
    });
});