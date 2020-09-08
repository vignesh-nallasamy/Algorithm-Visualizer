import React, { useState } from "react";
import "./App.css";
import {sort} from "./SortingAlgos/BubbleSort"

function App() {
  let data = [];

  for (let k = 0; k < 20; k++) {
    let val = Math.floor(Math.random() * 20);
    data.push(val);
  }

  let sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };




  const selectionSort = async () => {
    let list = data;

    for (let i = 0; i < list.length; i++) {
      let min = i;
      for (let j = i; j < list.length; j++) {
        document.getElementById(j).style.backgroundColor = "red";
        await sleep(15);
        if (list[j] < list[min]) {
          min = j;
        }
        document.getElementById(j).style.backgroundColor = "aquamarine";
      }
      let t = list[i];
      list[i] = list[min];
      list[min] = t;
      let temp = document.getElementById(i).style.height;
      document.getElementById(i).style.height = document.getElementById(
        min
      ).style.height;
      document.getElementById(min).style.height = temp;
      document.getElementById(i).style.backgroundColor = "blue";
    }
    console.log(list);
  };

  const insertionSort = async () => {
    let list = data;
    for (let i = 1; i < list.length; i++) {
      let j = i;
      let val = list[i];
      let h = document.getElementById(i).style.height;
      while (j > 0) {
        if (val < list[j - 1]) {
          list[j] = list[j - 1];

          document.getElementById(j).style.height = document.getElementById(
            j - 1
          ).style.height;

          await sleep(10);
          j = j - 1;
        } else {
          break;
        }
      }
      list[j] = val;
      document.getElementById(j).style.height = h;
      document.getElementById(j).style.backgroundColor = "blue";
    }

    console.log(list);
  };

  const mergeSort = async (array, start, end) => {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);
      await mergeSort(array, start, mid);
      await mergeSort(array, mid + 1, end);
      await merge(array, start, mid, end);
      console.log(start, end);
    }
    return new Promise((resolve) => resolve());
  };
  const merge = async (array, start, mid, end) => {
    if (start < end) {
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
        await sleep(50);
        j = j + 1;
      }
      return new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  const quickSort = async (array, start, end) => {
    if (start < end) {
      console.log(start, end);

      let index = await partition(array, start, end);
      console.log(index);
      await quickSort(array, start, index - 1);
      await quickSort(array, index + 1, end);

      return new Promise((resolve) => resolve());
    }
  };

  const partition = async (array, start, end) => {
    let pivot = array[end];
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
    document.getElementById(partitionIndex).style.height = temp;
    return new Promise((resolve) => resolve(partitionIndex));
  };

  return (
    <div className="container">
      <div className="graph">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              id={index}
              className="box"
              style={{ height: `${30 * item}px` }}
            ></div>
          );
        })}
      </div>

      <button onClick={()=>{sort(data)}}> sort</button>
      <button onClick={selectionSort}> selectionSort</button>
      <button onClick={insertionSort}> insertionSort</button>
      <button
        onClick={() => {
          mergeSort(data, 0, data.length - 1);
        }}
      >
        {" "}
        mergeSort
      </button>
      <button
        onClick={() => {
          quickSort(data, 0, data.length - 1);
        }}
      >
        {" "}
        quickSort
      </button>
      <button
        onClick={() => {
          console.log(data);
        }}
      >
        click
      </button>
    </div>
  );
}

export default App;
