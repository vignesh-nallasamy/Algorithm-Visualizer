let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const quickSort = async (array, start, end, speed) => {
  if (start < end) {
    if (speed === 10) {
      speed = 40;
    } else if (speed === 25) {
      speed = 50;
    } else if (speed === 50) {
      speed = 70;
    }

    let index = await partition(array, start, end, speed);

    await quickSort(array, start, index - 1, speed);
    await quickSort(array, index + 1, end, speed);

    return new Promise((resolve) => resolve());
  }
};

export const partition = async (array, start, end, speed) => {
  let pivot = array[end];
  document.getElementById(end).style.backgroundColor = "#EA425C";
  let partitionIndex = start;

  for (let i = start; i <= end; i++) {
    if (array[i] < pivot) {
      let temp = array[partitionIndex];
      array[partitionIndex] = array[i];
      array[i] = temp;

      temp = document.getElementById(i).style.height;
      document.getElementById(i).style.height = document.getElementById(
        partitionIndex
      ).style.height;
      document.getElementById(partitionIndex).style.height = temp;
      partitionIndex = partitionIndex + 1;
    }
    await sleep(50);
  }
  let temp = array[partitionIndex];
  array[partitionIndex] = array[end];
  array[end] = temp;
  temp = document.getElementById(end).style.height;
  document.getElementById(end).style.height = document.getElementById(
    partitionIndex
  ).style.height;
  document.getElementById(end).style.backgroundColor = "aquamarine";
  document.getElementById(partitionIndex).style.backgroundColor = "pink";
  document.getElementById(partitionIndex).style.height = temp;
  return new Promise((resolve) => resolve(partitionIndex));
};
