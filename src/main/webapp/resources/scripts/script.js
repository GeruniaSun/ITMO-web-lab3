// приколы
const gavrillinaSound = new Audio('resources/sounds/Drama_Queen.mp3');
const easterEgg = document.getElementById('cringe_area');
const hitSounds = [
    'resources/sounds/oue.mp3',
    'resources/sounds/yeei.mp3',
    'resources/sounds/oleg.mp3'
];

const missSounds = [
    'resources/sounds/bruh.mp3',
    'resources/sounds/datyche.mp3',
    'resources/sounds/nepravilno.mp3',
    'resources/sounds/nope.mp3'
];


// DOM elements
const form = document.getElementById('form');

const xText = document.getElementById("form:x_input");
const ySlider = document.getElementById('form:yInput');
const rButtons = document.getElementById('form:r_select').getElementsByTagName("input");
console.log(rButtons);

const submitButton = document.getElementById('form:submitButton_s');
console.log(submitButton);

const clickErrorDiv = document.getElementById('click_error_div');

//refreshTable();
extractDotsFromTable();
refreshCanvas(3);

// вешаем обработчик на кнопки
//rButtons.forEach(input => input.addEventListener("change", confirmSubmit));
//rButtons.forEach(input => input.addEventListener("click", changeRadius));

//rButtons.forEach(button => button.addEventListener("change", changeRadius));
canvas.addEventListener('click', function(event) {
    parseClick(event);
});

function handleFormClick() {
    console.log("поймал");
    // x = ? y = ? r = ?
    //form_hit = getHit(form_x, form_y, form_r);
}

// разрешает нажимать на submit только если x, y, r валидны
function confirmSubmit() {
    const xFilled = true;
    const ySelected = true;
    const rSelected = isR();

    xErrorLabel.style.display = xIsValid() ? "none" : "inline";

    showEasterEgg(xInput.value === "mashusikthebest");

    submitButton.disabled = (xFilled && ySelected && rSelected) ? false : true;
}

function parseClick(event) {
    hideClickError();
    const { x: xValue, y: yValue } = getClickCoordinates(event);

    if(!isR) {
        showClickError("выберите R");
        return;
    }

    addAttempt([
          { name: "x", value: xValue.toString() },
          { name: "y", value: yValue.toString() },
          { name: "r", value: lastR.toString() }
    ]);

    dotsPush([xValue, yValue, getHit(xValue, yValue, lastR)]);
    refreshCanvas(lastR);

    hit = getHit(xValue, yValue, lastR);
    playRandomAudio(hit ? hitSounds : missSounds);
}

function isR() {
    return lastR !== undefined;
}

// обработчик R
function changeRadius(radius) {
    lastR = radius;
    refreshCanvas(radius);
}

// для валидации клика
function showClickError(message) {
    clickErrorDiv.textContent = message;
    clickErrorDiv.style.display = 'block';
}
function hideClickError() {
    clickErrorDiv.textContent = '';
    clickErrorDiv.style.display = 'none';
}

function getHit(x, y, r) {
        if (x > 0 && y > 0) return false;
        else if (x <= 0 && y >= 0) return x * x + y * y <= r * r;
        else if (x <= 0 && y < 0) return y >= -x -r / 2;
        else return y >= -r && x <= r / 2;
}

// прикол
function showEasterEgg(status) {
    easterEgg.style.display = status ? "block" : "none";
    if (status) {
        gavrillinaSound.play().catch(error => {
            console.error("Ошибка при воспроизведении звука:", error);
        });
    }
    else {
        gavrillinaSound.pause();
        gavrillinaSound.currentTime = 0;
    }
}

function playRandomAudio(audios) {
    const randomIndex = Math.floor(Math.random() * audios.length);
    const audio = new Audio(audios[randomIndex]);

    audio.play()
        .catch(error => {
            console.error('Что-то не так со звуком:', error);
        });
}
