//* Debouncing and throttling in JavaScript

//? Que.1 -> Create a button UI and add debouncing as follows =>
//  ---> Show "Button Pressed <X> Times" every time button is pressed.
//  ---> Increase "Triggeered <Y> Times" count after 800 ms of debouncing.

//? Que.2 -> Create a button UI and add throttle as follows =>
//  ---> Show "Button Pressed <X> Times" every time button is pressed.
//  ---> Increase "Triggeered <Y> Times" count after 800 ms of throttle.

//? Que.3 -> Create Debounce() Polyfill Implementation

//? Que.4 -> Create Debounce() Polyfill Implementation

//! Solution ->
const increaseBtn = document.querySelector(".increase_btn");
const btnPressed = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

var pressedCount = 0;
var triggerCount = 0;

// const debounceCount = _.debounce(() => {
//   count.innerHTML = ++triggerCount;
// }, 800);

// const throttleCount = _.throttle(() => {
//   count.innerHTML = ++triggerCount;
// }, 800);

// Polyfill for debouncing
const myDebounce = (cb, d) => {
  let timer;

  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, d);
  };
};

// Polyfill for throttling
const myTrottle = (cb, d) => {
  let last = 0;

  return function (...args) {
    let now = new Date().getTime();
    if (now - last < d) return;
    last = now;
    return cb(...args);
  };
};

const debounceCount = myDebounce((count) => {
  count.innerHTML = ++triggerCount;
}, 800);

const throttleCount = myTrottle((count) => {
  count.innerHTML = ++triggerCount;
}, 800);

increaseBtn.addEventListener("click", () => {
  btnPressed.innerHTML = ++pressedCount;
  throttleCount(count);
});
