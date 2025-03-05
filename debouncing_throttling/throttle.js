const increaseBtn = document.querySelector(".increase_btn");
const btnPressed = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

var pressedCount = 0;
var triggerCount = 0;

const myTrottle = (cb, d) => {
  let last = 0;

  return (...args) => {
    let now = new Date().getTime();
    if (now - last < d) return;
    last = now;
    return cb(...args);
  };
};

const throttleCount = myTrottle((count) => {
  count.innerHTML = ++triggerCount;
}, 800);

increaseBtn.addEventListener("click", () => {
  btnPressed.innerHTML = ++pressedCount;
  throttleCount(count);
});
