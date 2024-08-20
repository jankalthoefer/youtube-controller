window.addEventListener('gamepadconnected', (e) => {
    console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.', e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
});

window.addEventListener('gamepadbuttondown', function (e) {
    console.log('Button pressed:', e.button);
});
let button0 = false;
let button1 = false;
let timeout = false;
function updateGamepad() {
    requestAnimationFrame(updateGamepad);

    // We'll only get the first gamepad in our list.
    let gamepads = [];
    if (navigator.getGamepads) gamepads = navigator.getGamepads();
    else if (navigator.webkitGetGamepads) gamepads = navigator.webkitGetGamepads();
    const gamepad = gamepads[0];

    // If our gamepad isn't connected, stop here.
    if (timeout || !gamepad) return;

    if (button0 !== gamepad.buttons[0].pressed) {
        console.log('Button 1 pressed:', gamepad.buttons[0].pressed);
        if (gamepad.buttons[0].pressed) {
            switchPlaylist(0);
            timeout = true;
            startTimeout();
        }
    }
    button0 = gamepad.buttons[0].pressed;

    if (button1 !== gamepad.buttons[1].pressed) {
        switchPlaylist(3);
        console.log('Button 2 pressed:', gamepad.buttons[1].pressed);
        if (gamepad.buttons[1].pressed) {
            switchPlaylist(2);
            timeout = true;
            startTimeout();
        }
    }
    button1 = gamepad.buttons[1].pressed;
}

function startTimeout() {
    setTimeout(() => {
        timeout = false;
        console.log('reset timeout');
    }, 3000);
}

updateGamepad();
