export const dfs = async (
  adjacency,
  speed,
  total,
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
  let sleep = () => {
    return new Promise((resolve) => setTimeout(resolve, speed));
  };
  let order = [];
  let adj = adjacency;
  let visited = {...initialVisited};
  let previous = {};
  let collection = {};
  

  let stack = [];
  stack.push(source);

  while (stack.length > 0) {
    let current = stack[stack.length - 1];
    stack.pop();
    if (!visited[current]) {
      collection[current] = [];
      order.push(current);
      order.forEach((item) => {
        collection[current].push(item);
      });
      visited[current] = true;
      adj[current].forEach((item) => {
        if (!visited[item[0]]) {
          stack.push(item[0]);
          previous[item[0]] = current;
        }
      });
    }
  }

  for (let i = 0; i < order.length; i++) {
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
    await sleep();
  }

  if(type === 2){
    setsecondDrag(true)
}
  setOrder(order);
  setPrevious(previous);
  setCollection(collection);
  setCompleted(true);
  return new Promise(resolve => resolve())
};
