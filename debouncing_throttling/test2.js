const button = document.querySelector(".increase_btn");
const incPressed = document.querySelector(".increment_pressed");
const incCount = document.querySelector(".increment_count");

let incrementVal = 0;
let pressedVal = 0;

const myDebounce = (cb, delay) => {
  let timer;

  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const handleDebounce = myDebounce((count) => {
  count.innerHTML = ++incrementVal;
}, 400);

// button.addEventListener("click", () => {
//   incPressed.innerHTML = ++pressedVal;
//   handleDebounce(incCount);
// });

// Throttling

const myThrottle = (cb, delay) => {
  let last = 0;

  return function (...args) {
    let now = Date.now();
    if (now - last < delay) return;

    cb(...args);
    last = now;
  };
};

const handleThrottle = myThrottle(() => {
  incCount.innerHTML = ++incrementVal;
}, 1000);

button.addEventListener("click", () => {
  incPressed.innerHTML = ++pressedVal;
  handleThrottle();
});
