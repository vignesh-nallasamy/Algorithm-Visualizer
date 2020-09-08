export const selectionSort = async (data, speed) => {
  if (speed === 25) {
    speed = 15;
  } else if (speed === 60) {
    speed = 30;
  }
  let list = data;
  let sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  for (let i = 0; i < list.length; i++) {
    let min = i;
    for (let j = i; j < list.length; j++) {
      document.getElementById(j).style.backgroundColor = "#FFF222";

      if (list[j] < list[min]) {
        document.getElementById(min).style.backgroundColor = "aquamarine";

        min = j;
        document.getElementById(min).style.backgroundColor = "#EA425C";
        await sleep(speed);
      }
      await sleep(speed);
      document.getElementById(j).style.backgroundColor = "aquamarine";
      document.getElementById(min).style.backgroundColor = "#EA425C";
    }
    let t = list[i];
    list[i] = list[min];
    list[min] = t;
    let temp = document.getElementById(i).style.height;
    document.getElementById(i).style.height = document.getElementById(
      min
    ).style.height;
    await sleep(speed);
    document.getElementById(min).style.height = temp;
    document.getElementById(i).style.backgroundColor = "pink";
    await sleep(speed);
  }
  console.log(list);
  return new Promise((resolve) => resolve());
};
