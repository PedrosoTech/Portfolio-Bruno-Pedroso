// script.js

// Alternar o tema claro/escuro
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Verifique se o botão de alternância existe antes de adicionar o evento
if (toggleButton) {
    toggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
    });
}

let lastScrollTop = 0; // Variável para armazenar a posição do scroll anterior

// Função para alternar a visibilidade da barra de navegação no topo
function toggleMenu() {
    const topNav = document.getElementById('top-nav');
    topNav.classList.toggle('active'); // Alterna a classe 'active'
}

// Função para rolar para uma seção específica
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Função para rolar para o topo da página
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar/ocultar botão "Voltar ao Topo"
window.onscroll = function() {
    const btn = document.querySelector('.back-to-top');
    if (btn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    }
    revealOnScroll();
    fadeOutOnScroll();
};

// Função para exibir os elementos ao rolar a página para baixo
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.classList.contains('footer')) return; // Ignorar o rodapé
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 150; // Ajustado para todas as seções
        if (sectionTop < triggerPoint) {
            section.classList.add('show');
            section.classList.remove('fade-out');
            // Adiciona transição lateral apenas para a seção MEUS PROJETOS
            if (section.id === 'projects') {
                section.classList.add('slide-in');
            } else {
                section.classList.remove('slide-in');
            }
        }
    });
}

// Função para ocultar os elementos ao rolar a página para cima (incluindo "MEUS PROJETOS")
function fadeOutOnScroll() {
    const sections = document.querySelectorAll('section');
    const currentScroll = window.scrollY; // Posição atual do scroll
    sections.forEach(section => {
        if (section.classList.contains('footer')) return; // Ignorar o rodapé
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        const triggerPoint = window.innerHeight; // Ajustado para desaparecer mais tarde
        // Efeito de sumir na seção MEUS PROJETOS somente ao subir
        if (section.id === 'projects' && currentScroll < lastScrollTop && sectionBottom < triggerPoint + 50) {
            section.classList.add('fade-out');
            section.classList.remove('show');
        } else if (section.id === 'projects' && currentScroll > lastScrollTop) {
            section.classList.remove('fade-out');
        }
        // Seções "Sobre Mim" e "Contato" não terão o efeito de sumir
        if (section.id !== 'contact' && section.id !== 'about' && sectionBottom < triggerPoint + 100 && sectionTop > 150) {
            section.classList.add('fade-out');
            section.classList.remove('show');
        }
    });
    lastScrollTop = currentScroll; // Atualiza a posição do scroll anterior
}

// Adicionar evento de carregamento da janela para garantir que todas as funções sejam chamadas após o carregamento completo da página
window.addEventListener('load', function () {
    revealOnScroll();
    fadeOutOnScroll();
});

// Evento de clique para alternar a barra de navegação
const menuButton = document.getElementById('menu-button');
menuButton.addEventListener('click', toggleMenu);

// Adicionar evento DOMContentLoaded para animação de digitação
document.addEventListener('DOMContentLoaded', function() {
    const text = "O futuro é compilado com as suas escolhas!";
    let index = 0;
    const speed = 100; // Velocidade de digitação em milissegundos

    function typeWriter() {
        if (index < text.length) {
            document.getElementById("typewriter-text").innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
});