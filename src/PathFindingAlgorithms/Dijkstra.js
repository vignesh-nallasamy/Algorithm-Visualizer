/* eslint-disable no-loop-func */
export const dijkstra = async (
  adjacency,
  speed,
  source,
  destination,
  setPrevious,
  setCollection,
  setOrder,
  setCompleted,
  setsecondDrag,
  initialVisited,
  total,
  type = 1
) => {
  const sleep = () => {
    return new Promise((resolve) => setTimeout(resolve, speed));
  };

  let order = [];
  let previous = {};
  let collection = {};
  let distance = new Array(total).fill(1000000);
  let tempDistance = [];
  let current;
  let visited = { ...initialVisited };
  for (let i = 0; i < total; i++) {
    if (!initialVisited[i]) {
      if (i === source) {
        tempDistance.push([i, 0]);
      } else {
        tempDistance.push([i, 1000000]);
      }
    }
  }
  distance[source] = 0;

  tempDistance = tempDistance.sort(function (a, b) {
    return a[1] - b[1];
  });
  console.log(tempDistance);

  while (tempDistance.length > 0) {

    current = tempDistance.shift();
   
    collection[current[0]] = [];
    order.push(current[0]);
    order.forEach((val) => {
      collection[current[0]].push(val);
    });
    adjacency[current[0]].forEach((item) => {
      if (!visited[item[0]]) {
        if (distance[item[0]] > distance[current[0]] + item[1]) {
          distance[item[0]] = distance[current[0]] + item[1];
          previous[item[0]] = current[0];
          for (let i = 0; i < tempDistance.length; i++) {
            if (tempDistance[i][0] === item[0]) {
              tempDistance[i][1] = distance[current[0]] + item[1];
            }
          }
        }
      }
    });
    tempDistance = tempDistance.sort(function (a, b) {
      return a[1] - b[1];
    });
  }

  for (let i = 0; i < order.length; i++) {
    await sleep();
    document
      .getElementById(order[i])
      .classList.add(
        type === 1
          ? "anime"
          : document.getElementById(order[i]).classList.contains("path") ===
            true
          ? "dummy"
          : "anime2"
      );
    if (order[i] === destination) {
      let j = destination;
      while (j !== source) {
        document.getElementById(j).classList.add(type === 1 ? "path" : "path2");
        j = previous[j];
        await sleep();
      }
      document.getElementById(j).classList.add(type === 1 ? "path" : "path2");
      break;
    }
  }

  if (type === 2) {
    setsecondDrag(true);
  }
  setOrder(order);
  setPrevious(previous);
  setCollection(collection);
  setCompleted(true);
  return new Promise(resolve => resolve())
};
