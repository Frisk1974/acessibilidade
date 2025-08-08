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
});

// Alternar tamanho da fonte
function toggleFontSize() {
    document.body.classList.toggle('font-size-large');
    localStorage.setItem('fontSizeLarge', document.body.classList.contains('font-size-large'));
    announce('Tamanho da fonte ajustado.');
}

// Alternar alto contraste
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    announce('Modo de alto contraste ativado/desativado.');
}

// Alternar efeito VHS
function toggleVHSEffect() {
    document.body.classList.toggle('vhs-effect');
    localStorage.setItem('vhsEffect', document.body.classList.contains('vhs-effect'));
    announce('Efeito VHS ativado/desativado.');
}

// Adicionar evento à linha do tempo
function addTimelineEvent() {
    const event = prompt('Digite um novo evento para a linha do tempo:');
    if (event) {
        const li = document.createElement('li');
        li.textContent = event;
        document.getElementById('timeline-content').querySelector('ul').appendChild(li);
        announce('Novo evento adicionado à linha do tempo.');
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