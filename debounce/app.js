const homeButton = document.getElementById('home');
const message = document.getElementById('message');
let counter = 0;

const debounce = (func) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func();
    }, 3000)
  }
}

const logResult = () => {
  counter++;
  message.innerText = counter;
}

homeButton.addEventListener('click', debounce(logResult));