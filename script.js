document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================
    // 1. FUNCIONALIDADE DO CARROSSEL
    // =======================================
    const carousel = document.getElementById('music-carousel');
    const slides = carousel.querySelectorAll('.slide');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const nextButton = document.querySelector('.carousel-nav.next');
    const indicator = document.querySelector('.slide-indicator');
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Função para atualizar o carrossel
    function updateCarousel() {
        const offset = -currentIndex * (100 / totalSlides);
        carousel.style.transform = `translateX(${offset}%)`;
        
        indicator.textContent = `${currentIndex + 1}/${totalSlides}`;
        
        // Atualiza a classe 'slide-active'
        slides.forEach((slide, index) => {
            slide.classList.remove('slide-active');
            if (index === currentIndex) {
                slide.classList.add('slide-active');
            }
        });
    }

    // Navegação PRÓXIMO
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    });

    // Navegação ANTERIOR
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });

    // Inicializa o carrossel no carregamento
    updateCarousel();


 // =======================================
    // 2. FUNCIONALIDADE 'LEIA MAIS' / VOLTAR
    // =======================================
    
    // ... (variáveis como blogGridView, fullStoryView, storyContentArea)

    // CORREÇÃO AQUI: Certifique-se de selecionar BOTH os botões da GRADE e do CARROSSEL
    const openStoryBtns = document.querySelectorAll('.open-story-btn, .btn-read-more'); 

    // ... (código da função showFullStory)

    // Ouvintes de evento para os botões "Leia Mais"
    openStoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); 
            const storyId = btn.getAttribute('data-story-id');
            
            // Verifica se o template da história existe:
            if (document.getElementById(storyId)) {
                showFullStory(storyId);
            } else {
                console.error(`Template da história não encontrado: #${storyId}`);
                alert(`Erro: A história com o ID "${storyId}" não foi encontrada no HTML. Certifique-se de que o <template id="${storyId}"> existe.`);
            }
        });
    });

    // ... (Ouvinte para o backToGridBtn)
    }

    // Ouvintes de evento para os botões "Leia Mais"
    openStoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); 
            const storyId = btn.getAttribute('data-story-id');
            showFullStory(storyId);
        });
    });

    // Ouvinte de evento para o botão "Voltar"
    backToGridBtn.addEventListener('click', () => {
        fullStoryView.style.display = 'none';
        
        // 1. Mostra a grade de posts
        blogGridView.style.display = 'grid'; 

        // 2. Mostra as OUTRAS seções de conteúdo principal
        sectionsToHide.forEach(section => {
            section.style.display = ''; 
        });

        // Rola de volta para o topo da grade
        blogGridView.scrollIntoView({ behavior: 'smooth' });
    });
});
// =======================================
    // 3. FUNCIONALIDADE SELETOR DE IDIOMA
    // =======================================
    const langOptions = document.querySelectorAll('.lang-option');

    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o link de navegar (recuperar a página)

            // 1. Remove a classe 'active' de todos
            langOptions.forEach(opt => opt.classList.remove('active'));

            // 2. Adiciona a classe 'active' apenas no elemento clicado
            option.classList.add('active');
            
            // Aqui você adicionaria a lógica real de tradução, 
            // mas por enquanto, a mudança visual já está resolvida.
            // Exemplo: console.log(`Idioma mudado para: ${option.getAttribute('data-lang')}`);
        });
    });