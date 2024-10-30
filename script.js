//Character movement
const character = document.querySelector('#character');
let interval;
let both = 0;
let counter = 0;
let currentBlock = []; //register the no of all active blockandhole

function moveLeft() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    if (left > 0)
        character.style.left = left - 1 + 'px';
}
function moveRight() {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    if (left < 380)
        character.style.left = left + 1 + 'px';
}
document.addEventListener('keydown', e => {
    if (both == 0) {
        both++;
        if (e.key == 'ArrowLeft') {
            interval = setInterval(moveLeft, 1);
        }

        if (e.key == 'ArrowRight') {
            interval = setInterval(moveRight, 1);
        }
    }
})
document.addEventListener('keyup', e => {
    clearInterval(interval);
    both = 0;
})

//Todo -> generate block and hole 
var gameplay = setInterval(function () {
    var blockLast = document.getElementById("block" + (counter - 1));
    var holeLast = document.getElementById("hole" + (counter - 1));
    if (counter > 0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue('top'));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue('top'));
    }

    if (blockLastTop < 400 || counter == 0) {
        //generate block and random hole
        const block = document.createElement('div');
        const hole = document.createElement('div');
        block.setAttribute('class', 'block');
        hole.setAttribute('class', 'hole');
        block.setAttribute('id', 'block' + counter);
        hole.setAttribute('id', 'hole' + counter);
        //generate the next block with top + 100 taken from the last block (blockTop)
        block.style.top = blockLastTop + 100 + 'px';
        hole.style.top = holeLastTop + 100 + 'px';
        //randomly generate the position of hole
        let random = Math.floor(Math.random() * 360);
        hole.style.left = random + 'px';
        playzone.append(block);
        playzone.append(hole);
        currentBlock.push(counter);
        counter++;
    }

    const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
    const characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    var drop = 0;
    //determine the block and drop zone by iterating over all blockandhole
    for (let i = 0; i < currentBlock.length; i++) {
        let current = currentBlock[i];
        iblock = document.getElementById('block' + current);
        ihole = document.getElementById('hole' + current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue('top'));
        let iholeTop = parseFloat(window.getComputedStyle(ihole).getPropertyValue('top'));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue('left'));
        iblock.style.top = iblockTop - 0.5 + 'px';
        ihole.style.top = iholeTop - 0.5 + 'px';

        //delets the blockandhole if it exceeds the min range
        if (iblockTop < 0) {
            currentBlock.shift();
            iblock.remove();
            ihole.remove();
        }

        //determine the block and drop zone of the character
        if (iblockTop - 20 < characterTop && iblockTop > characterTop) {
            drop++;
            if (iholeLeft <= characterLeft && iholeLeft + 20 >= characterLeft) {
                drop = 0;
            }
        }
        if (drop == 0)
            character.style.top = characterTop + 2 + 'px';
        else
            character.style.top = characterTop - 0.5 + 'px';
    }

    //TO check the score
    if(characterTop < 1){
        alert("lOOSE!!! total Score: "+ currentBlock[0]);
        gameStop();
    }
    if(characterTop > 480){
        alert("WIN!!! totalScore + bonus:  "+ currentBlock[currentBlock.length-1]*10 );
        gameStop();
    }
}, 1)

function gameStop(){
    clearInterval(gameplay);
}
