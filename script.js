/**
 * @description Controls the state of the clock's theme (Day or Night).
 */
let isNightMode = false;

function drawClockFace(ctx, cx, cy, radius) {
    const bgColor = isNightMode ? '#1a1a1a' : '#ffffff';
    const rimColor = isNightMode ? '#555555' : '#333333';
    const tickColor = isNightMode ? '#ffffff' : '#000000';

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.fillStyle = bgColor;
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.strokeStyle = rimColor;
    ctx.stroke();

    for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6; 
        const x1 = cx + Math.cos(angle) * (radius - 20);
        const y1 = cy + Math.sin(angle) * (radius - 20);
        const x2 = cx + Math.cos(angle) * (radius - 5);
        const y2 = cy + Math.sin(angle) * (radius - 5);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = tickColor;
        ctx.lineWidth = 4;
        ctx.stroke();
    }
}

function drawHand(ctx, cx, cy, angle, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(cx, cy);
    
    const x = cx + Math.cos(angle - Math.PI / 2) * length;
    const y = cy + Math.sin(angle - Math.PI / 2) * length;
    
    ctx.lineTo(x, y);
    ctx.stroke();
}

function animateClock() {
    const canvas = document.getElementById('analog-clock');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2 - 10;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    drawClockFace(ctx, cx, cy, radius);

    const secAngle = (Math.PI * 2) * (seconds + milliseconds / 1000) / 60;
    const minAngle = (Math.PI * 2) * (minutes + seconds / 60) / 60;
    const hrAngle = (Math.PI * 2) * (hours + minutes / 60) / 12;

    const handColor = isNightMode ? '#ffffff' : '#000000';
    const accentColor = '#e74c3c';

    drawHand(ctx, cx, cy, hrAngle, radius * 0.5, 6, handColor); 
    drawHand(ctx, cx, cy, minAngle, radius * 0.75, 4, handColor);
    drawHand(ctx, cx, cy, secAngle, radius * 0.85, 2, accentColor);

    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, 2 * Math.PI);
    ctx.fillStyle = accentColor;
    ctx.fill();

    window.requestAnimationFrame(animateClock);
}

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    
    toggleBtn.addEventListener('click', () => {
        isNightMode = !isNightMode;
        toggleBtn.textContent = isNightMode ? 'Toggle Day Mode' : 'Toggle Night Mode';
        document.getElementById('analog-clock').style.background = isNightMode ? '#222' : '#fff';
        document.body.style.backgroundColor = isNightMode ? '#111' : '#f4f4f9';
    });

    window.requestAnimationFrame(animateClock);
});