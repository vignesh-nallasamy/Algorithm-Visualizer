let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};


export const insertionSort = async (data,speed) => {
    let list = data;
    for (let i = 1; i < list.length; i++) {
      let j = i;
      let val = list[i];
      let h = document.getElementById(i).style.height;
      while (j > 0) {
        document.getElementById(j).style.backgroundColor = "#FFF222";
        await sleep(speed);
        if (val < list[j - 1]) {
          list[j] = list[j - 1];
          
          document.getElementById(j).style.backgroundColor = "pink";
          await sleep(speed);
          await sleep(speed);
          document.getElementById(j).style.height = document.getElementById( j - 1).style.height;

          await sleep(speed);
          j = j - 1;
          await sleep(speed);
          document.getElementById(j).style.backgroundColor = "#FFF222";
          await sleep(speed);
        } else {
          await sleep(speed);
          break;

        }
       
      }
      
      list[j] = val;
      document.getElementById(j).style.height = h;
      document.getElementById(j).style.backgroundColor = "pink";
      await sleep(speed)
    }

    console.log(list);
  };
