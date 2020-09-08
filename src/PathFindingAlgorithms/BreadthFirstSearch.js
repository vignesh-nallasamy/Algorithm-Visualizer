export const bfs = async (
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
  type = 1
) => {
  const sleep = () => {
    return new Promise((resolve) => setTimeout(resolve, speed));
  };
  console.log(initialVisited);
console.log("called");
  let order = [];
  let adj = adjacency;
  let visited = {...initialVisited}
  let queue = [];
  let previous = {};
  let collection = {};
  queue.push(source);

  while (queue.length > 0) {
    let current = queue[0];
    queue.shift();
    if (!visited[current]) {
      collection[current] = [];
      visited[current] = true;
      order.push(current);
      order.forEach((item) => {
        collection[current].push(item);
      });

      adj[current].forEach((item) => {
        if (!visited[item[0]] && queue.includes(item[0]) === false) {
          queue.push(item[0]);
          previous[item[0]] = current;
        }
      });
    }
  }

  for (let i = 0; i < order.length; i++) {
    await sleep();
    document
      .getElementById(order[i])
      .classList.add(type === 1 ? "anime" : document.getElementById(order[i]).classList.contains("path") === true ? "dummy":"anime2" );
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

  if(type === 2){
      setsecondDrag(true)
  }
  setOrder(order);
  setPrevious(previous);
  setCollection(collection);
  setCompleted(true);


  return new Promise((resolve) => resolve());
};
