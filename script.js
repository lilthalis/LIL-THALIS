// 1. Armazena os elementos HTML que o JS precisa manipular
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev-btn'); // Deve usar .prev-btn
const nextBtn = document.querySelector('.next-btn'); // Deve usar .next-btn
// ...
let currentSlide = 0; // Começa no primeiro slide (índice 0)

// 2. Função principal para exibir um slide específico
function showSlide(index) {
    // Garante que o índice não saia dos limites (loop infinito)
    if (index >= carouselItems.length) {
        currentSlide = 0; // Volta para o primeiro
    } else if (index < 0) {
        currentSlide = carouselItems.length - 1; // Vai para o último
    } else {
        currentSlide = index;
    }

    // Esconde TODOS os slides
    carouselItems.forEach(item => {
        item.classList.remove('active');
    });

    // Mostra APENAS o slide atual
    carouselItems[currentSlide].classList.add('active');
    
    // NOTA: Você faria o mesmo para os 'dots' (indicadores) aqui, se quisesse.
}

// 3. Adiciona ouvintes de evento aos botões
prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1); // Volta um slide
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1); // Avança um slide
});

// 4. (Opcional) Função para autoplay
function startAutoplay() {
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000); // Troca a cada 5 segundos (5000 milissegundos)
}

// 5. Inicializa o carrossel (mostra o primeiro slide e inicia o autoplay)
showSlide(currentSlide);
// startAutoplay(); // Descomente esta linha se quiser que o carrossel seja automático
// script.js (Parte de Seletores)
const prevBtn = document.querySelector('.prev-btn'); // Deve usar .prev-btn
const nextBtn = document.querySelector('.next-btn'); // Deve usar .next-btn
// ...