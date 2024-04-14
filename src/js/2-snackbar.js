// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
const delayInput = document.querySelector('input[name="delay"]');
const stateButtons = document.querySelectorAll('input[name="state"]');
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const delay = parseInt(delayInput.value, 10);
    const selectedState = Array.from(stateButtons).find(
      input => input.checked
    ).value;
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (selectedState === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
    promise
      .then(result => {
        iziToast.success({
          title: 'Fulfilled Promise',
          message: `Fulfilled promise in ${result}ms`,
          position: 'topCenter',
        });
      })
      .catch(error => {
        iziToast.error({
          title: 'Rejected Promise',
          message: `Rejected promise in ${error}ms`,
          position: 'topCenter',
        });
      });
  });
});