export const astar = async (
  adjacency,
  speed,
  source,
  destination,
  setCompleted,
  setsecondDrag,
  initialVisited,
  type = 1
) => {
  const sleep = () => {
    return new Promise((resolve) => setTimeout(resolve, speed));
  };

  let coordinates = [];
  let Obj = {};
  let a;
  let b;

  let destCoordinates = {
    x: Math.floor(destination / 53),
    y: destination % 53,
  };
  console.log(destCoordinates);
  let h = 0;
  const create = (h) => {
    let Obj = {};
    Obj["x"] = Math.floor(h / 53);
    Obj["y"] = h % 53;
    a = Math.abs(Obj["x"] - destCoordinates["x"]);
    b = Math.abs(Obj["y"] - destCoordinates["y"]);
    Obj["heuristics"] = Math.sqrt(a * a + b * b);
    return new Promise((resolve) => resolve(Obj));
  };
  while (h < 1166) {
    Obj = await create(h);
    coordinates.push(Obj);
    h = h + 1;
  }

  console.log(coordinates);

  let flag = false;
  let openList = [];
  let closed = { ...initialVisited };
  let current = {};
  let previous = {};
  let order = [];
  let distance = new Array(1166).fill(1000000);
  let total = new Array(1166).fill(1000000);

  openList.push(source);
  distance[source] = 0;
  total[source] = coordinates[source]["heuristics"];

  while (openList.length > 0) {
    current = openList.shift();
    closed[current] = true;
    order.push(current);
    if (current === destination) {
      break;
    }

    for (let i = 0; i < adjacency[current].length; i++) {
      if (!closed[adjacency[current][i][0]]) {
        if (
          distance[adjacency[current][i][0]] >
            distance[current] + adjacency[current][i][1] &&
          total[adjacency[current][i][0]] >
            distance[current] +
              adjacency[current][i][1] +
              coordinates[adjacency[current][i][0]]["heuristics"]
        ) {
          if (openList.includes(adjacency[current][i][0]) === false) {
            openList.push(adjacency[current][i][0]);
          } else {
            console.log("hello");
          }
          openList.forEach((item) => {
            console.log(item);
          });
          console.log("hello");
          distance[adjacency[current][i][0]] =
            distance[current] + adjacency[current][i][1];
          previous[adjacency[current][i][0]] = current;
          total[adjacency[current][i][0]] =
            distance[current] +
            adjacency[current][i][1] +
            coordinates[adjacency[current][i][0]]["heuristics"];
        }
      }
    }

    openList = [
      ...openList.sort(function (a, b) {
        return total[a] - total[b];
      }),
    ];
    console.log(openList);
  }

  console.log(closed);

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
        await sleep();
      }
      document.getElementById(j).classList.add(type === 1 ? "path" : "path2");
      break;
    }
  }

  setsecondDrag(true);
  setCompleted(true);
  return new Promise((resolve) => resolve());
};
