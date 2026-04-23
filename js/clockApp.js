//@description - Main Animation engine for the canvas clock
//@return {void}
//@description - uses the requestAnimation frame to sync
export function initCLock()  {
    const canvas = document.querySelector('#ClockCanvas');
    if (!canvas) return;
    const context = canvas.getContext('2d');


    function render() {
        //no setinterval using requestAnimationFrame for 60fps sync
        drawClock(context, canvas);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}


//@param {CanvasRendingContext2D} context - the drawing context
//@param {HTMLCanvasElement} canvas - the canvas element
//@description math logic calculates coordinates using trigonometry sin and cosine
function drawClock(context, canvas) {
    const radius = canvas.width / 2;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // UI interaction (state check)
    // check if the body has the night-mode class
    const isNight = document.body.classList.contains('night-mode');

    const colours = {
        face: isNight ? '#1e1e1e' : '#ffffff',
        border: isNight ? '#0dcaf0' : '#003366',
        hands: isNight ? '#e0e0e0' : '#2c3e50',
        secondHand: '#ff0000'
    };

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw clock face
    context.beginPath();
    context.arc(centerX, centerY, radius -10, 0, 2 * Math.PI);
    context.fillStyle = colours.face
    context.fill();
    context.strokeStyle = colours.border;
    context.lineWidth = 4;
    context.stroke();

    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    //Trigonometry for hands
    //angles are subtracted in radians: (Unit / total) * (2 * PI)
    // subtract PI/2 because 0 radians in the math starts at 3 o'clock

    const drawHand = (value, total , length, width, colours) => {
        const angle = (value / total) * (2 * Math.PI) - (Math.PI / 2);
        context.beginPath();
        context.lineWidth = width;
        context.lineCap = 'round';
        context.strokeStyle = colours;
        context.moveTo(centerX, centerY);
        context.lineTo(
            centerX + Math.cos(angle) * length,
            centerY + Math.sin(angle) * length
        );
        context.stroke();
    };




    // Hour hand
    drawHand((h % 12) + m / 60, 12, radius * 0.5, 6, colours.hands);

    // minute hand
    drawHand(m + s / 60, 60, radius * 0.7, 4, colours.hands);

    //second hand
    drawHand(s, 60, radius * 0.8, 2, colours.secondHand);


    context.beginPath();
    context.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    context.fillStyle = colours.border;
    context.fill();
}


