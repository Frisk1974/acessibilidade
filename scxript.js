const translations = {
    'pt-BR': {
        headerSubtitle: 'Um site acessível sobre a série de terror analógico e findjackwalten.com',
        historiaTitle: 'História',
        personagensTitle: 'Personagens',
        episodiosTitle: 'Episódios',
        teoriasTitle: 'Teorias dos Fãs',
        timelineTitle: 'Linha do Tempo',
        findjackwaltenTitle: 'FindJackWalten.com',
        fontSizeLabel: 'Aumentar/Reduzir Fonte',
        contrastLabel: 'Ativar/Desativar Alto Contraste',
        colorBlindLabel: 'Ativar/Desativar Modo para Daltonismo',
        vhsLabel: 'Ativar/Desativar Efeito VHS',
        languageLabel: 'Alternar entre Português e Inglês'
    },
    'en-US': {
        headerSubtitle: 'An accessible website about the analog horror series and findjackwalten.com',
        historiaTitle: 'Story',
        personagensTitle: 'Characters',
        episodiosTitle: 'Episodes',
        teoriasTitle: 'Fan Theories',
        timelineTitle: 'Timeline',
        findjackwaltenTitle: 'FindJackWalten.com',
        fontSizeLabel: 'Increase/Decrease Font Size',
        contrastLabel: 'Enable/Disable High Contrast',
        colorBlindLabel: 'Enable/Disable Color Blind Mode',
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
    if (localStorage.getItem('colorBlind') === 'true') document.body.classList.add('color-blind');
    if (localStorage.getItem('vhsEffect') === 'true') document.body.classList.add('vhs-effect');
    if (localStorage.getItem('language')) updateLanguage(localStorage.getItem('language'));
    setupGame();
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

// Alternar modo para daltonismo
function toggleColorBlindMode() {
    document.body.classList.toggle('color-blind');
    localStorage.setItem('colorBlind', document.body.classList.contains('color-blind'));
    announce(document.body.classList.contains('color-blind') ? 'Modo para daltonismo ativado.' : 'Modo para daltonismo desativado.');
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
    document.getElementById('titulo-findjackwalten').textContent = translations[lang].findjackwaltenTitle;
    document.querySelector('button[onclick="toggleFontSize()"]').setAttribute('title', translations[lang].fontSizeLabel);
    document.querySelector('button[onclick="toggleHighContrast()"]').setAttribute('title', translations[lang].contrastLabel);
    document.querySelector('button[onclick="toggleColorBlindMode()"]').setAttribute('title', translations[lang].colorBlindLabel);
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

// Minijogo Beach Fun
function setupGame() {
    new p5(function(sketch) {
        let ballX, ballY, ballSpeedX, ballSpeedY;
        let bannyY, billyY, paddleHeight, paddleWidth;
        let bannyScore = 0, billyScore = 0;
        let gamePaused = true;
        let showGlitch = false;
        let glitchTimer = 0;
        let glitchType = '';

        sketch.setup = function() {
            const canvas = sketch.createCanvas(600, 400);
            canvas.parent('game-canvas');
            ballX = sketch.width / 2;
            ballY = sketch.height / 2;
            ballSpeedX = 5;
            ballSpeedY = 5;
            bannyY = sketch.height / 2;
            billyY = sketch.height / 2;
            paddleHeight = 80;
            paddleWidth = 10;
        };

        sketch.draw = function() {
            sketch.background(220);
            if (gamePaused) {
                sketch.textAlign(sketch.CENTER);
                sketch.textSize(20);
                sketch.text('Pressione Espaço para Iniciar', sketch.width / 2, sketch.height / 2);
                return;
            }

            // Desenhar raquetes
            sketch.fill(0, 0, 255);
            sketch.rect(20, bannyY, paddleWidth, paddleHeight); // Banny
            sketch.fill(255, 0, 0);
            sketch.rect(sketch.width - 30, billyY, paddleWidth, paddleHeight); // Billy

            // Desenhar bola
            sketch.fill(255);
            sketch.ellipse(ballX, ballY, 10, 10);

            // Atualizar bola
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            // Colisão com bordas superior e inferior
            if (ballY < 0 || ballY > sketch.height) {
                ballSpeedY *= -1;
            }

            // Colisão com raquetes
            if (ballX < 30 && ballY > bannyY && ballY < bannyY + paddleHeight) {
                ballSpeedX *= -1;
                if (bannyScore === 19 && billyScore === 74) {
                    showGlitch = true;
                    glitchType = '1974';
                }
                if (bannyScore === 34 && billyScore === 63) {
                    showGlitch = true;
                    glitchType = 'Rosemary';
                }
            }
            if (ballX > sketch.width - 30 && ballY > billyY && ballY < billyY + paddleHeight) {
                ballSpeedX *= -1;
                if (bannyScore === 19 && billyScore === 82) {
                    showGlitch = true;
                    glitchType = '1982';
                }
            }

            // Pontuação
            if (ballX < 0) {
                billyScore++;
                resetBall();
            }
            if (ballX > sketch.width) {
                bannyScore++;
                resetBall();
            }

            // Glitch
            if (showGlitch) {
                glitchTimer++;
                sketch.fill(255, 0, 0);
                sketch.textSize(20);
                sketch.textAlign(sketch.CENTER);
                if (glitchType === '1974') {
                    sketch.text('GLITCH: Mochila de Molly e Sapato de Edd', sketch.width / 2, sketch.height / 2);
                } else if (glitchType === '1982') {
                    sketch.text('GLITCH: Imagem de Charles', sketch.width / 2, sketch.height / 2);
                } else if (glitchType === 'Rosemary') {
                    sketch.text('GLITCH: Rosemary Desfigurada', sketch.width / 2, sketch.height / 2);
                }
                if (glitchTimer > 100) {
                    showGlitch = false;
                    glitchTimer = 0;
                    glitchType = '';
                }
            }

            // Desenhar pontuação
            sketch.fill(0);
            sketch.textSize(20);
            sketch.text(`Banny: ${bannyScore}`, 50, 30);
            sketch.text(`Billy: ${billyScore}`, sketch.width - 80, 30);

            // Movimento das raquetes
            if (sketch.keyIsDown(87)) bannyY -= 5; // W
            if (sketch.keyIsDown(83)) bannyY += 5; // S
            if (sketch.keyIsDown(38)) billyY -= 5; // Seta cima
            if (sketch.keyIsDown(40)) billyY += 5; // Seta baixo

            // Limitar movimento das raquetes
            bannyY = sketch.constrain(bannyY, 0, sketch.height - paddleHeight);
            billyY = sketch.constrain(billyY, 0, sketch.height - paddleHeight);
        };

        function resetBall() {
            ballX = sketch.width / 2;
            ballY = sketch.height / 2;
            ballSpeedX *= -1;
            announce(`Pontuação: Banny ${bannyScore}, Billy ${billyScore}`);
        }

        sketch.keyPressed = function() {
            if (sketch.keyCode === 32) { // Espaço
                gamePaused = !gamePaused;
                announce(gamePaused ? 'Jogo pausado.' : 'Jogo iniciado.');
            }
        };
    });
}