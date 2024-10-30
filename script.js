const player = document.querySelector(".player");
const obstacle = document.querySelector(".obstacle");

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


