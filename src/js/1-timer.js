// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = "";
const startButton = document.querySelector('[data-start]');
const dataTimePicker = document.querySelector(`#datetime-picker`);
const dataValueAll = document.querySelectorAll(`.value`);
startButton.disabled = true;
startButton.addEventListener(`click`, takeonStartTimer);
const [days, hours, minutes, seconds] = dataValueAll;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  dateFormat: 'd.m.Y H:i',
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(selectedDates[0].getTime() > Date.now()) {
      startButton.disabled = false;
      startButton.classList.remove(`button-disabled`);
    }
    else {
      startButton.disabled = true;
      startButton.classList.add(`button-disabled`);
      iziToast.error ({
          position: 'topRight',
          messageColor: 'brown',
          message: 'Please choose a date in the future',
          timeout: 3000,
      })
    }
    userSelectedDate = selectedDates[0].getTime();
  },
};
flatpickr(dataTimePicker, options);
function takeonStartTimer () {
  startButton.disabled = true;
  dataTimePicker.disabled = true;
  const interval = setInterval(() => {
    const dateInterval = userSelectedDate - Date.now();
    if (dateInterval >= 0) {
        days.textContent = addLeadingZero(convertMs(dateInterval).days);
        hours.textContent = addLeadingZero(convertMs(dateInterval).hours);
        minutes.textContent = addLeadingZero(convertMs(dateInterval).minutes);
        seconds.textContent = addLeadingZero(convertMs(dateInterval).seconds);
      } else {
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
        clearInterval(interval);
        inputDateRef.disabled = false;
      }
  }, 1000);
}

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
console.log(convertMs(2000));
console.log(convertMs(140000)); 
console.log(convertMs(24140000));