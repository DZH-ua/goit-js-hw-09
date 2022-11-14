const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

stopBtn.disabled = true;

startBtn.addEventListener('click', runColorChange);
stopBtn.addEventListener('click', stopColorChange);

function runColorChange() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    const newColor = getRandomHexColor();
    bodyEl.style.backgroundColor = `${newColor}`;
    console.log('Запустили');
  }, 1000);
}

function stopColorChange() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  console.log('Остановили');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
