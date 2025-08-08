const translations = {
    'pt-BR': {
        headerSubtitle: 'Um site acessível sobre a série de terror analógico',
        historiaTitle: 'História',
        personagensTitle: 'Personagens',
        episodiosTitle: 'Episódios',
        teoriasTitle: 'Teorias dos Fãs',
        timelineTitle: 'Linha do Tempo',
        fontSizeLabel: 'Aumentar/Reduzir Fonte',
        contrastLabel: 'Ativar/Desativar Alto Contraste',
        vhsLabel: 'Ativar/Desativar Efeito VHS',
        languageLabel: 'Alternar entre Português e Inglês'
    },
    'en-US': {
        headerSubtitle: 'An accessible website about the analog horror series',
        historiaTitle: 'Story',
        personagensTitle: 'Characters',
        episodiosTitle: 'Episodes',
        teoriasTitle: 'Fan Theories',
        timelineTitle: 'Timeline',
        fontSizeLabel: 'Increase/Decrease Font Size',
        contrastLabel: 'Enable/Disable High Contrast',
        vhsLabel: 'Enable/Disable VHS Effect',
        languageLabel: 'Switch between Portuguese and English'
    }
};

// Inicializar HandTalk
window.ht = new HT({
    token: "SEU_TOKEN_AQUI",
    lang: "pt-BR"
});

// Carregar preferências salvas
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('fontSizeLarge') === 'true') document.body.classList.add('font-size-large');
    if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
    if (localStorage.getItem('vhsEffect') === 'true') document.body.classList.add('vhs-effect');
    if (localStorage.getItem('language')) updateLanguage(localStorage.getItem('language'));
});

// Alternar tamanho da fonte
function toggleFontSize() {
    document.body.classList.toggle('font-size-large');
    localStorage.setItem('fontSizeLarge', document.body.classList.contains('font-size-large'));
    announce(document.body.classList.contains('font-size-large') ? 'Fonte aumentada.' : 'Fonte reduzida.');
}

// Alternar alto contraste
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    announce(document.body.classList.contains('high-contrast') ? 'Alto contraste ativado.' : 'Alto contraste desativado.');
}

// Alternar efeito VHS
function toggleVHSEffect() {
    document.body.classList.toggle('vhs-effect');
    localStorage.setItem('vhsEffect', document.body.classList.contains('vhs-effect'));
    announce(document.body.classList.contains('vhs-effect') ? 'Efeito VHS ativado.' : 'Efeito VHS desativado.');
}

// Alternar idioma
function toggleLanguage() {
    const currentLang = document.documentElement.lang === 'pt-BR' ? 'en-US' : 'pt-BR';
    updateLanguage(currentLang);
    localStorage.setItem('language', currentLang);
    announce(currentLang === 'pt-BR' ? 'Idioma alterado para Português.' : 'Language changed to English.');
}

// Atualizar idioma
function updateLanguage(lang) {
    document.documentElement.lang = lang;
    document.getElementById('header-subtitle').textContent = translations[lang].headerSubtitle;
    document.getElementById('titulo-historia').textContent = translations[lang].historiaTitle;
    document.getElementById('titulo-personagens').textContent = translations[lang].personagensTitle;
    document.getElementById('titulo-episodios').textContent = translations[lang].episodiosTitle;
    document.getElementById('titulo-teorias').textContent = translations[lang].teoriasTitle;
    document.getElementById('titulo-timeline').textContent = translations[lang].timelineTitle;
    document.querySelector('button[onclick="toggleFontSize()"]').setAttribute('title', translations[lang].fontSizeLabel);
    document.querySelector('button[onclick="toggleHighContrast()"]').setAttribute('title', translations[lang].contrastLabel);
    document.querySelector('button[onclick="toggleVHSEffect()"]').setAttribute('title', translations[lang].vhsLabel);
    document.querySelector('button[onclick="toggleLanguage()"]').setAttribute('title', translations[lang].languageLabel);
}

// Adicionar evento à linha do tempo
function addTimelineEvent() {
    const event = prompt(document.documentElement.lang === 'pt-BR' ? 'Digite um novo evento para a linha do tempo:' : 'Enter a new event for the timeline:');
    if (event) {
        const li = document.createElement('li');
        li.textContent = event;
        document.getElementById('timeline-content').querySelector('ul').appendChild(li);
        announce(document.documentElement.lang === 'pt-BR' ? 'Novo evento adicionado à linha do tempo.' : 'New event added to the timeline.');
    }
}

// Abrir modal
function openModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    modal.style.display = 'block';
    modal.querySelector('.modal-content').focus();
    trapFocus(modal);
}

// Fechar modal
function closeModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    modal.style.display = 'none';
    document.querySelector(`button[onclick="openModal('${id}')"]`).focus();
}

// Prender foco no modal
function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll('a[href], button, textarea, input, select');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
        if (e.key === 'Escape') closeModal(modal.id.replace('modal-', ''));
    });
}

// Anunciar mudanças para leitores de tela
function announce(message) {
    const liveRegion = document.getElementById('timeline-content');
    liveRegion.setAttribute('aria-live', 'assertive');
    const p = document.createElement('p');
    p.className = 'sr-only';
    p.textContent = message;
    liveRegion.appendChild(p);
    setTimeout(() => p.remove(), 2000);
}