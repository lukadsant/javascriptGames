const state = {
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelectorAll('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values:{
        timerId: null,
        gameVelocity: 1000,
        hitPosition:0,
        result:0
    },
};

function moveenemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity );

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
            }
        });
    });
}

function init(){
    moveenemy();
    addListenerHitbox();
}

init()