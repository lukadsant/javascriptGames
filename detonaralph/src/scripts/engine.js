const state = {
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelectorAll('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values:{

        gameVelocity: 1000,
        hitPosition:0,
        result:0,
        currentTime : 60
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countdownTimerId: setInterval(countdown, 1000)
    }
};

//function moveenemy(){
//    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity );
//
//}

function countdown(){
    state.values.currentTime--;

    state.view.timeLeft.textContent = state.values.currentTime;

    if( state.values.currentTime < 0){
        clearInterval(state.actions.countdownTimerId);
        clearInterval(state.actions.timerId);
        alert('Game Over' + state.values.result);
    }
}

function playsound(audioname){
    let audio = new Audio(`./src/audios/${audioname}.mp3`);
    audio.volume=0.2
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach(square => {
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}



function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if(square.id===state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition=null;
                playsound("detonar");
            }
        });
    });
}

function init(){
   // moveenemy();
    addListenerHitbox();
}

init()