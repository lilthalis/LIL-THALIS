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
    const blogGridView = document.getElementById('blog-grid-view');
    const fullStoryView = document.getElementById('full-story-view');
    const storyContentArea = document.getElementById('story-content-area');
    const backToGridBtn = document.getElementById('back-to-grid');
    const openStoryBtns = document.querySelectorAll('.open-story-btn, .btn-read-more');

    // Seções principais que devem ser escondidas ao abrir a história
    const sectionsToHide = [
        document.getElementById('main-carousel-section'),
        document.getElementById('products-section'),
        document.getElementById('main-footer')
    ].filter(el => el != null); 

    // Função para mostrar a história completa
    function showFullStory(storyId) {
        const template = document.getElementById(storyId);
        if (template) {
            // Clona o conteúdo do template
            const storyClone = document.importNode(template.content, true);
            storyContentArea.innerHTML = ''; // Limpa a área anterior
            storyContentArea.appendChild(storyClone); // Insere o novo conteúdo
            
            // 1. Esconde a grade e as OUTRAS seções de conteúdo
            blogGridView.style.display = 'none';
            sectionsToHide.forEach(section => {
                section.style.display = 'none';
            });

            // 2. Mostra APENAS a visualização completa
            fullStoryView.style.display = 'block';
            
            // 3. Rola para o topo da página para ver a história
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // 4. Limpa a hashtag da URL (Correção de problema anterior)
            history.pushState(null, '', window.location.pathname);
        }
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