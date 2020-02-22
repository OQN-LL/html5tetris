function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[r];
    arr[r] = tmp;
  }
  return arr;
}
