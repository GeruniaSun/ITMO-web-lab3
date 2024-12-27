const clock_canvas = document.getElementById('clock');
const contx = clock_canvas.getContext('2d');

const clock_styles = {
    'circle_fill_color': '#fff',
    'circle_line_color': '#333',
    'circle_line_width': 8,
    'numbers_font': 'bold 24px Arial',
    'numbers_fill_color': '#333',
    'hands_color': '#333'
}

function drawClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const radius = clock_canvas.height / 2;

    // Центр часов
    contx.clearRect(0, 0, clock_canvas.width, clock_canvas.height);
    contx.save();
    contx.translate(radius, radius); // Перемещаем начало координат в центр

    drawCircle(radius);
    drawNumbers(radius);

    // Рисуем стрелки
    drawHand((hours + minutes / 60) * (Math.PI / 6), radius - 100, 8); // Часовая стрелка
    drawHand((minutes + seconds / 60) * (Math.PI / 30), radius - 70, 6); // Минутная стрелка
    drawHand(seconds * (Math.PI / 30), radius - 50, 2); // Секундная стрелка

    contx.restore();
}

function drawCircle(radius) {
    contx.beginPath();
    contx.arc(0, 0, radius - 20, 0, Math.PI * 2);
    contx.fillStyle = clock_styles.circle_fill_color;
    contx.fill();
    contx.strokeStyle = clock_styles.circle_line_color;
    contx.lineWidth = clock_styles.circle_line_width;
    contx.stroke();
}

function drawNumbers(radius) {
    contx.font = clock_styles.numbers_font;
    contx.fillStyle = clock_styles.numbers_fill_color;
    for (let i = 1; i <= 12; i++) {
        const angle = i * (Math.PI / 6); // 30 градусов в радианах
        contx.save();
        contx.rotate(angle);
        contx.translate(0, -radius + 40); // Смещение к краю
        contx.fillText(i.toString(), -10, 10); // Смещение текста по центру
        contx.restore();
    }
}

function drawHand(angle, length, width) {
    contx.save(); // Сохраняем текущее состояние канвы
    contx.beginPath();
    contx.rotate(angle);
    contx.moveTo(0, 0);
    contx.lineTo(0, -length);
    contx.lineWidth = width;
    contx.strokeStyle = clock_styles.hands_color;
    contx.stroke();
    contx.restore(); // Возвращаем состояние канвы
}

setInterval(drawClock, 13000);
drawClock();