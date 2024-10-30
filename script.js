//Character movement
const character = document.querySelector('#character');
var interval;
var both = 0;

function moveLeft(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    if(left > 0)
        character.style.left = left - 2 + 'px';
}

function moveRight(){
    let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    if(left < 380)
        character.style.left = left + 2 + 'px';
}

document.addEventListener('keydown', e=>{
    if(both == 0){
        both++;
        if(e.key == 'ArrowLeft'){
            interval = setInterval(moveLeft, 1);
        }
    
        if(e.key == 'ArrowRight'){
            interval = setInterval(moveRight, 1);
        }
    }
})

document.addEventListener('keyup', e=>{
    clearInterval(interval);
    both = 0;
})

//Todo -> generate block and hole 
