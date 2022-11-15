import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const startBtn = document.querySelector('[data-start]');
const daysVal = document.querySelector('[data-days]');
const hoursVal = document.querySelector('[data-hours]');
const minutesVal = document.querySelector('[data-minutes]');
const secondsVal = document.querySelector('[data-seconds]');
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - new Date() > 0) {
      selectedDate = selectedDates[0];
      startBtn.removeAttribute('disabled');
    } else {
      alert('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);
startBtn.setAttribute('disabled', true);
startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
  startBtn.setAttribute('disabled', true);
  const timerId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      selectedDate - new Date()
    );
    daysVal.textContent = addLeadingZero(days);
    hoursVal.textContent = addLeadingZero(hours);
    minutesVal.textContent = addLeadingZero(minutes);
    secondsVal.textContent = addLeadingZero(seconds);
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timerId);
    }
  }, 1000);
}
