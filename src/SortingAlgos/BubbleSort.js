
let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export const  BubbleSort = async(data,speed) => {
  
    let list = data;

    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list.length - i - 1; j++) {
        console.log(j);
        document.getElementById(j).style.backgroundColor = "#FFF222";
        document.getElementById(j + 1).style.backgroundColor = "#EA425C";
        if (list[j] > list[j + 1]) {
          let l = list[j];
          list[j] = list[j + 1];
          list[j + 1] = l;
          let temp = document.getElementById(j).style.height;
          document.getElementById(j).style.height = document.getElementById(
            j + 1
          ).style.height;
          document.getElementById(j + 1).style.height = temp;
        }
        await sleep(speed);
        document.getElementById(j).style.backgroundColor = "aquamarine";
        document.getElementById(j + 1).style.backgroundColor = "aquamarine";
      }
      document.getElementById(list.length - i - 1).style.backgroundColor =
        "pink";
      await sleep(speed*10);
    }
  };