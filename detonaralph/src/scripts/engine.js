const state = {
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelectorAll('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 25
    },
    actions:{
        timerId: null, // Definido como null inicialmente para que seja atribuído mais tarde
        countdownTimerId: null // Definido como null inicialmente para que seja atribuído mais tarde
    }
};

function countdown(){
    state.values.currentTime--;

    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime < 0){
        clearInterval(state.actions.countdownTimerId);
        clearInterval(state.actions.timerId);
        if (state.values.result > 14) {
            playsound("gg");
            alert('Parabéns! Você acertou ' + state.values.result+ ' vezes, que bela intuição! 😁');

        } else {
            playsound("gameover");
            alert('Foi quase! você acertou apenas ' + state.values.result + ' vezes, bora tentar denovo.. 😫');
        }
        // Exibe o botão "Tentar Novamente"
        document.getElementById('try-again-button').style.display = 'block';
        document.getElementById('try-again-button').style.height = '50px';
    }
    
}

document.getElementById('try-again-button').addEventListener('click', function() {
    location.reload(); // Recarrega a página
});


function playsound(audioname){
    let audio = new Audio(`./src/audios/${audioname}.mp3`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquares() {
    state.view.squares.forEach(square => {
        square.classList.remove('enemy');
        square.classList.remove('false-enemy');
        square.classList.remove('clicked'); // Remover a classe 'clicked' ao gerar novos inimigos
        square.removeAttribute('data-enemy-id');
    });

    let trueEnemyIndex = Math.floor(Math.random() * 9);
    let falseEnemyIndex1;
    let falseEnemyIndex2;

    do {
        falseEnemyIndex1 = Math.floor(Math.random() * 9);
    } while (falseEnemyIndex1 === trueEnemyIndex);

    do {
        falseEnemyIndex2 = Math.floor(Math.random() * 9);
    } while (falseEnemyIndex2 === trueEnemyIndex || falseEnemyIndex2 === falseEnemyIndex1);

    let trueEnemySquare = state.view.squares[trueEnemyIndex];
    let falseEnemySquare1 = state.view.squares[falseEnemyIndex1];
    let falseEnemySquare2 = state.view.squares[falseEnemyIndex2];

    trueEnemySquare.classList.add('enemy');
    falseEnemySquare1.classList.add('enemy');
    falseEnemySquare2.classList.add('enemy');

    // Atribui um ID único ao inimigo verdadeiro
    trueEnemySquare.dataset.enemyId = 'true';

    // Adiciona a classe de inimigo falso aos quadrados falsos
    falseEnemySquare1.classList.add('false-enemy');
    falseEnemySquare2.classList.add('false-enemy');

    state.values.hitPositions = [trueEnemyIndex, falseEnemyIndex1, falseEnemyIndex2];
}


function addListenerHitbox() {
    state.view.squares.forEach((square, index) => {
        square.addEventListener('mousedown', () => {
            if (state.values.hitPositions.includes(index) && square.dataset.enemyId === 'true') {
                if (!square.classList.contains('clicked')) { // Verifica se o quadrado já foi clicado antes
                    state.values.result++;
                    state.view.score.textContent = state.values.result;
                    playsound("detonar");

                    // Adiciona a classe 'clicked' ao quadrado para desativar o evento de clique
                    square.classList.add('clicked');
                }
            }
        });
    });
}


function init() {
    alert('Tente acertar o inimigo verdadeiro 15 vezes antes que o tempo acabe!');

    randomSquares();
    addListenerHitbox();
    state.actions.timerId = setInterval(randomSquares, 1000);
    state.actions.countdownTimerId = setInterval(countdown, 1000);
}

init();
