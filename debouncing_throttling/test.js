const increaseBtn = document.querySelector(".increase_btn");
const btnPressed = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

var pressedCount = 0;
var triggerCount = 0;

const myDebounce = (cb, d) => {
  let timer;

  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, d);
  };
};

const debounceCount = myDebounce((count) => {
  count.innerHTML = ++triggerCount;
}, 400);

// increaseBtn.addEventListener("click", () => {
//   btnPressed.innerHTML = ++pressedCount;
//   debounceCount(count);
// });

// Throttle

const myThrottle = (cb, d) => {
  let last = 0;

  return (...args) => {
    let now = new Date().getTime();
    if (now - last < d) return;
    last = now;
    return cb(...args);
  };
};

const throttleCount = myThrottle((count) => {
  count.innerHTML = ++triggerCount;
}, 800);

increaseBtn.addEventListener("click", () => {
  btnPressed.innerHTML = ++pressedCount;
  throttleCount(count);
});
