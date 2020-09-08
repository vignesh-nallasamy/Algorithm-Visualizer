
let sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

export const mergeSort = async (array, start, end,speed,limit) => {
    if (start < end) {
      if(speed === 10){
        speed = 20
      }
      if(speed === 25){
        speed = 35
      }
      if(speed === 50){
        speed = 60
      }
      let mid = Math.floor((start + end) / 2);
      await mergeSort(array, start, mid,speed,limit);
      await mergeSort(array, mid + 1, end,speed,limit);
      await merge(array, start, mid, end,speed,limit);
      console.log(start, end);
    }
    return new Promise((resolve) => resolve());
  };

  export const merge = async (array, start, mid, end,speed,limit) => {
    if (start < end) {
      let color = start === 0 && end === limit ? "pink" : "#FFF222"
      let low = start;
      let high = mid + 1;
      let stack = [];

      while (low <= mid && high <= end) {
        if (array[low] <= array[high]) {
          document.getElementById(low).style.backgroundColor = "yellow";
          stack.push({
            index: array[low],
            height: document.getElementById(low).style.height,
          });
          low = low + 1;
        } else {
          document.getElementById(high).style.backgroundColor = "yellow";
          stack.push({
            index: array[high],
            height: document.getElementById(high).style.height,
          });
          high = high + 1;
        }
      }

      while (low <= mid) {
        document.getElementById(low).style.backgroundColor = "yellow";
        stack.push({
          index: array[low],
          height: document.getElementById(low).style.height,
        });
        low = low + 1;
      }

      while (high <= end) {
        document.getElementById(high).style.backgroundColor = "yellow";
        stack.push({
          index: array[high],
          height: document.getElementById(high).style.height,
        });
        high = high + 1;
      }

      let j = start;
      for (let i = 0; i < stack.length; i++) {
        array[j] = stack[i]["index"];
        document.getElementById(j).style.height = stack[i]["height"];
        document.getElementById(j).style.backgroundColor = color;
        await sleep(speed);
        j = j + 1;
      }
      return new Promise((resolve) => setTimeout(resolve, 100));
    }
  };