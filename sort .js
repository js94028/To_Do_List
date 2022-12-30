function merge(arr1, arr2) {
  let arr = [];
  let i = 0;
  let j = 0;
  while (arr1.length > i && arr2.length > j) {
    if (arr1[i] > arr2[j]) {
      arr.push(arr2[j]);
      j++;
    } else if (arr1[i] < arr2[j]) {
      arr.push(arr1[i]);
      i++;
    } else {
      arr.push(arr1[i]);
      arr.push(arr2[j]);
      i++;
      j++;
    }
  }
  while (arr1.length > i) {
    arr.push(arr1[i]);
    i++;
  }
  while (arr2.length > j) {
    arr.push(arr2[j]);
    j++;
  }
  return arr;
}

function merge_sort(arr) {
  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(merge_sort(left), merge_sort(right));
  }
}
console.log(merge_sort([2, 8, 4, 4, 5, 6, 1, 7, 7, 4, 7, 2]));
