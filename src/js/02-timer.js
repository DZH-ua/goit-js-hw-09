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

const timer = {
  timerId: null,
  deltaTime: 0,

  getDate() {
    flatpickr('input#datetime-picker', {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose(selectedDates) {
        timer.checkDate(selectedDates[0]);
        console.log(selectedDates[0]);
      },
    });
  },

  checkDate(date) {
    const currentDate = new Date();
    if (currentDate < date) {
      refs.startBtn.disabled = false;
      this.deltaTime = date - currentDate;
      const time = convertMs(this.deltaTime);
      updateTimerFace(time);
    } else {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please, choose a date in the future!');
    }
  },

  checkTimerValue() {
    if (this.deltaTime >= 1000) {
      this.deltaTime -= 1000;
      console.log(this.deltaTime);
      const time = convertMs(this.deltaTime);
      updateTimerFace(time);
    } else {
      this.stop();
    }
  },

  start() {
    refs.startBtn.disabled = true;
    console.log('Запустили');

    this.timerId = setInterval(() => {
      this.checkTimerValue();
    }, 1000);
  },

  stop() {
    clearInterval(this.timerId);
    console.log('Остановили');
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.timerDaysEl.textContent = addLeadingZero(`${days}`);
  refs.timerHoursEl.textContent = addLeadingZero(`${hours}`);
  refs.timerMinutesEl.textContent = addLeadingZero(`${minutes}`);
  refs.timerSecondsEl.textContent = addLeadingZero(`${seconds}`);
}

timer.getDate();

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', () => {
  timer.start();
});
