const increaseBtn = document.querySelector(".increase_btn");
const btnPressed = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

var pressedCount = 0;
var triggerCount = 0;

// cb -> callback
// d -> delay time

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
}, 800);

increaseBtn.addEventListener("click", () => {
  btnPressed.innerHTML = ++pressedCount;
  debounceCount(count);
});
