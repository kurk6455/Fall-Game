//player movement (left/right)
const player = document.querySelector(".player");
let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));

document.addEventListener("keydown", (e) => {
    if (e.key == 'ArrowLeft' && playerLeft > 0) {
        playerLeft -= 10;
        player.style.left = playerLeft + 'px';
    }
    if (e.key == 'ArrowRight' && playerLeft < 370) {
        playerLeft += 10;
        player.style.left = playerLeft + 'px';
    }
})

//random passthrough generation and obstacle upward movement
//obstacle(container that contains block and passthrough) --> block + passthrough
const obstacle = document.querySelector(".obstacle");
let obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
let counter = 0;
setInterval(() => {
    //creation of block and passtrough
    const block = document.createElement('div');
    block.classList.add('block');
    const passthrough = document.createElement('div');
    passthrough.classList.add('passthrough');
    //random passthrough location generation
    let passthroughLeft = parseInt(window.getComputedStyle(passthrough).getPropertyValue('left'));
    let rnd = Math.floor(Math.random() * 320);
    passthrough.style.left = rnd + 'px';
    //append block and passthrough into obstacle container
    obstacle.append(block);
    obstacle.append(passthrough);

    //upward movement of obstacle until the top-most
    if (counter < 9) {
        obstacleTop -= 60;
        obstacle.style.top = obstacleTop + 'px';   
    }

    //delets the first child as the obstacle reaches the top-most
    if (counter >= 9) {
        document.querySelector('.block').remove();
        document.querySelector('.passthrough').remove();
    }
    counter++;
}, 2000)


//player continuous downward animation
setInterval(()=>{
    playerTop += 10;
    player.style.top = playerTop + 'px';
}, 100)

//TO do -> stop player downward animation at the top of the block and continue downward movement along passthrough