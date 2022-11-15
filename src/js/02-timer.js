import '../css/timer.css';
import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  timerDaysEl: document.querySelector('[data-days]'),
  timerHoursEl: document.querySelector('[data-hours]'),
  timerMinutesEl: document.querySelector('[data-minutes]'),
  timerSecondsEl: document.querySelector('[data-seconds]'),
};

let deltaTime = 0;
refs.startBtn.addEventListener('click', onButtonClickStartTimer);
refs.startBtn.disabled = true;

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (currentDate < selectedDates[0]) {
      refs.startBtn.disabled = false;
      deltaTime = selectedDates[0] - currentDate;
      console.log(deltaTime);
    } else {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please, choose a date in the future!');
    }
    console.log(selectedDates[0]);
  },
});

function onButtonClickStartTimer() {
  refs.startBtn.disabled = true;
  console.log('Запустили');
  convertMs(deltaTime);
  timerId = setInterval(() => {
    if (deltaTime > 1000) {
      deltaTime -= 1000;
      convertMs(deltaTime);
    } else {
      stop();
      convertMs(0);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  updateTimer({ days, hours, minutes, seconds });
  // return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.timerDaysEl.textContent = addLeadingZero(`${days}`);
  refs.timerHoursEl.textContent = addLeadingZero(`${hours}`);
  refs.timerMinutesEl.textContent = addLeadingZero(`${minutes}`);
  refs.timerSecondsEl.textContent = addLeadingZero(`${seconds}`);
}

function stop() {
  clearInterval(timerId);
  console.log('Остановили');
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
