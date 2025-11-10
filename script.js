// =======================================
// ARQUIVO script.js COMPLETO E FINAL
// =======================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seletores
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselDotsContainer = document.querySelector('.carousel-dots');
    
    // Elementos que serão criados
    let dots; 
    let currentSlide = 0;
    let autoplayInterval; 

    // 2. Função para criar os indicadores (dots)
    function createDots() {
        // Limpa o container antes de criar
        carouselDotsContainer.innerHTML = ''; 
        
        carouselItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            
            // Ativa o primeiro dot
            if (index === 0) {
                dot.classList.add('active');
            }
            
            // Adiciona evento de clique para pular para o slide
            dot.addEventListener('click', () => showSlide(index));
            carouselDotsContainer.appendChild(dot);
        });
        
        // Seleciona os dots criados para uso posterior
        dots = document.querySelectorAll('.dot'); 
    }

    // 3. Função principal para exibir um slide específico
    function showSlide(index) {
        // Reinicia o autoplay sempre que o slide muda (se o usuário clicar)
        resetAutoplay();

        // Lógica de loop infinito
        if (index >= carouselItems.length) {
            currentSlide = 0; 
        } else if (index < 0) {
            currentSlide = carouselItems.length - 1; 
        } else {
            currentSlide = index;
        }

        // Esconde todos os slides (remove a classe 'active')
        carouselItems.forEach(item => {
            item.classList.remove('active');
        });

        // Mostra APENAS o slide atual
        carouselItems[currentSlide].classList.add('active');
        
        // Atualiza o contador de slides no topo (se você usar a classe .slide-counter)
        const slideCounter = carouselItems[currentSlide].querySelector('.slide-counter');
        if (slideCounter) {
            slideCounter.textContent = `${currentSlide + 1}/${carouselItems.length}`;
        }
        
        // Atualiza os indicadores (dots)
        dots.forEach((dot, idx) => {
            dot.classList.remove('active');
            if (idx === currentSlide) {
                dot.classList.add('active');
            }
        });
    }

    // 4. Adiciona eventos de clique aos botões
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1); 
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1); 
    });

    // 5. Funções de Autoplay
    function startAutoplay() {
        // Define o intervalo para a troca automática (a cada 5 segundos)
        autoplayInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000); 
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // 6. Inicializa o carrossel quando a página carrega
    if (carouselItems.length > 0) {
        createDots(); 
        showSlide(currentSlide); 
        startAutoplay(); 

        // Opcional: Pausar autoplay ao passar o mouse no carrossel
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoplay);
            carouselContainer.addEventListener('mouseleave', startAutoplay);
        }
    }
});
// script.js (Continuação)

document.addEventListener('DOMContentLoaded', () => {
    // ... (Código do Carrossel aqui) ...

    // Seletores da Seção de Histórias
    const blogGridView = document.getElementById('blog-grid-view');
    const fullStoryView = document.getElementById('full-story-view');
    const storyContentArea = document.getElementById('story-content-area');
    const openStoryBtns = document.querySelectorAll('.open-story-btn');
    const backToGridBtn = document.getElementById('back-to-grid');

    // Função para mostrar a história completa
    function showFullStory(storyId) {
        // 1. Esconde a grade e mostra a visualização completa
        blogGridView.style.display = 'none';
        fullStoryView.style.display = 'block';

        // 2. Limpa o conteúdo anterior e carrega o novo
        storyContentArea.innerHTML = '';
        
        // Obtém o template (usando o ID fornecido no HTML)
        const template = document.getElementById(`story-template-${storyId.replace('story-', '')}`);
        
        if (template) {
            // Clona o conteúdo do template e insere na área de exibição
            const storyContent = template.content.cloneNode(true);
            storyContentArea.appendChild(storyContent);
            
            // Rola a página para o topo da nova seção
            fullStoryView.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // 3. Adiciona ouvintes de evento aos botões "Leia Mais"
    openStoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o link de navegar (ficar na mesma página)
            const storyId = btn.getAttribute('data-story-id');
            showFullStory(storyId);
        });
    });

    // 4. Adiciona ouvinte ao botão "Voltar"
    backToGridBtn.addEventListener('click', () => {
        fullStoryView.style.display = 'none';
        blogGridView.style.display = 'grid'; // Volta para o display: grid
        blogGridView.scrollIntoView({ behavior: 'smooth' });
    });

});