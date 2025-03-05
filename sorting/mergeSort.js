const mergeFn = (arr, low, mid, high) => {
  let left = low;
  let right = mid + 1;
  const output = [];

  while (left <= mid && right <= high) {
    if (arr[left] < arr[right]) {
      output.push(arr[left]);
      left++;
    } else {
      output.push(arr[right]);
      right++;
    }
  }

  while (left <= mid) {
    output.push(arr[left]);
    left++;
  }

  while (right <= high) {
    output.push(arr[right]);
    right++;
  }

  for (let i = low; i <= high; i++) {
    arr[i] = output[i - low];
  }
};

const mergeSort = (arr, low, high) => {
  if (low >= high) return;

  let mid = Math.floor((low + high) / 2);

  mergeSort(arr, low, mid);
  mergeSort(arr, mid + 1, high);
  mergeFn(arr, low, mid, high);
};

const arr = [4, 2, 7, 1, 9];

mergeSort(arr, 0, arr.length - 1);

console.log(arr);
