const arr = ["Niket", "Saumya", "Ashutosh", "Swati", "Shivam", "Anand"];
const arr2 = [1, 2, 3, 4, 5, 6, 7];
const arr3 = [1, 2, 3, 4, 5];

// Polyfill for Call
Function.prototype.myCall = function (context, ...rest) {
  if (typeof this !== "function") {
    throw new Error(`${this} Invalid Call`);
  }

  context.func = this;
  return context.func(...rest);
};

// Polyfill for Apply
Function.prototype.myApply = function (context, rest) {
  if (typeof this !== "function") {
    throw new TypeError(`${this} invalid call`);
  }

  if (!Array.isArray(rest)) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  context.func = this;
  return context.func(...rest);
};

// Polyfill for Bind\
Function.prototype.myBind = function (context, ...rest) {
  if (typeof this !== "function") {
    throw new TypeError(`${this} invalid call`);
  }

  context.func = this;

  return function (...args) {
    context.func(...rest, ...args);
  };
};

// Polyfills for reduce
Array.prototype.myReduce = function (cb, initialVal) {
  if (typeof cb !== "function") {
    throw new Error(`${cb} is not a function`);
  }

  let acc = initialVal;

  for (let i = 0; i < this.length; i++) {
    if (acc !== undefined) {
      acc = cb(acc, this[i], i, this);
    } else {
      acc = this[i];
    }
  }

  return acc;
};

// Polyfills for myFilter
Array.prototype.myFilter = function (cb, thisArg) {
  if (typeof cb !== "function") {
    throw new Error(`${cb} is not a function`);
  }

  let result = [];

  for (let i = 0; i < this.length; i++) {
    if (cb.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

// Polyfills for forEach
Array.prototype.myForEach = function (cb, thisArg) {
  if (typeof cb !== "function") {
    throw new Error(`${cb} is not a function`);
  }

  for (let i = 0; i < this.length; i++) {
    cb.call(thisArg, this[i], i, this);
  }
};

// Polyfills for Map
Array.prototype.myMap = function (callbackFn, thisArg) {
  if (typeof callbackFn !== "function") {
    throw new Error(`${callbackFn} is not a function`);
  }

  const output = [];

  for (let i = 0; i < this.length; i++) {
    output.push(callbackFn.call(thisArg, this[i], i, this));
  }

  return output;
};

// Deepcopy
const obj = {
  name: "Niket",
  nums: [2, 3, 4],
  details: {
    name: "Rajesh",
  },
};

// const obj2 = { ...obj };
const obj2 = JSON.parse(JSON.stringify(obj));

obj2.name = "Rajesh";
obj2.nums = [5];
obj2.details.name = "Gullu";

// console.log(obj);
// console.log(obj2);

function deepCopy(object) {
  const newOjb = {};

  for (let x in object) {
    if (typeof object[x] === "object" && object[x] !== null) {
      newOjb[x] = deepCopy(object[x]);
    } else {
      newOjb[x] = object[x];
    }
  }

  return newOjb;
}

// Polyfill for Promise methods

// 1. Promise.any
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises?.length === 0) {
      resolve([]);
    }

    let counter = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          counter++;

          if (counter === promises.length) {
            reject("AggregateError: No Promise in Promise.myAny was resolved");
          }
        });
    });
  });
};

// 2. Promise.race
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises?.length === 0) {
      resolve([]);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

// 3. Promise.all
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises?.length === 0) {
      resolve([]);
    }

    const results = [];
    let counter = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          results[index] = res;
          counter++;

          if (counter === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};

// 4. Promise.allSettled
Promise.myAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises?.length === 0) {
      resolve([]);
    }

    const results = [];
    let counter = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          results[index] = {
            status: "fulfilled",
            value: res,
          };
          counter++;

          if (counter === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          results[index] = {
            status: "rejected",
            reason: error,
          };
          counter++;

          if (counter === promises.length) {
            reject(results);
          }
        });
    });
  });
};

// Usage
const p1 = Promise.resolve("P1 Promise Resolved");
const p2 = Promise.reject("P2 Promise Rejected");
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("P3 Promise Resolved");
  }, 2000);
});
const p4 = Promise.reject("P4 Promise Rejected");

Promise.myRace([p1, p2, p3, p4])
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log("error: ", error);
  });
