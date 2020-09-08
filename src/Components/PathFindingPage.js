import React, { useState, useEffect } from "react";
import location from "../images/location.png";
import man from "../images/man.png";
import house from "../images/house.png";
import location_white from "../images/location_white.png";
import man_white from "../images/man_white.png";
import house_white from "../images/house_white.png";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Button,
  FormHelperText,
  makeStyles,
  Input,
} from "@material-ui/core";
import { SwapCalls, ArrowBack } from "@material-ui/icons";

//Algorithms function
import { bfs } from "../PathFindingAlgorithms/BreadthFirstSearch";
import { dfs } from "../PathFindingAlgorithms/DepthFirstSearch";
import { dijkstra } from "../PathFindingAlgorithms/Dijkstra";
import { astar } from "../PathFindingAlgorithms/Astar";

function PathFindingPage() {
  let history = useHistory();
  let val = "`";
  const [Vertices, setVertices] = useState([]);
  const [adjacency, setadjacency] = useState({});
  const [total, setTotal] = useState(1166);
  const [speed, setSpeed] = useState(1);
  const [source, setSource] = useState(60);
  const [destination, setDestination] = useState(806);
  const [previous, setPrevious] = useState({});
  const [collection, setCollection] = useState([]);
  const [order, setOrder] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [intermediate, setIntermediate] = useState(500);
  const [isPickup, setIsPickup] = useState(false);
  const [visited, setVisited] = useState({});
  const [isBlock, setIsBlock] = useState(false);
  const [pouring, setPouring] = useState(false);
  const [secondDrag, setsecondDrag] = useState(false);
  const [isSettingWeight, setIsSettingWeight] = useState(false);
  const [weight, setWeight] = useState(1);
  const [toggler, settoggler] = useState(false);
  const [Algorithm, setAlgorithm] = useState("bfs");

  useEffect(() => {
    let rowsize = 53;
    let list = [];
    let temp = {};
    for (let i = 0; i < total; i++) {
      list.push(i);
    }

    for (let i = 0; i < total; i++) {
      temp[i] = [];
      if (i - rowsize < 0 && i % rowsize === 0) {
        temp[i].push([i + 1, 1]);
        temp[i].push([i + rowsize, 1]);
      } else if (i - rowsize < 0 && i % rowsize === rowsize - 1) {
        temp[i].push([i - 1, 1]);
        temp[i].push([i + rowsize, 1]);
      } else if (i + rowsize > total - 1 && i % rowsize === 0) {
        temp[i].push([i + 1, 1]);
        temp[i].push([i - rowsize, 1]);
      } else if (i + rowsize > total && i % rowsize === rowsize - 1) {
        temp[i].push([i - 1, 1]);
        temp[i].push([i - rowsize, 1]);
      } else if (i - rowsize < 0) {
        temp[i].push([i - 1, 1]);
        temp[i].push([i + 1, 1]);
        temp[i].push([i + rowsize, 1]);
      } else if (i + rowsize > total - 1) {
        temp[i].push([i - 1, 1]);
        temp[i].push([i + 1, 1]);
        temp[i].push([i - rowsize, 1]);
      } else if (i % rowsize === 0) {
        temp[i].push([i + rowsize, 1]);
        temp[i].push([i - rowsize, 1]);
        temp[i].push([i + 1, 1]);
      } else if (i % rowsize === rowsize - 1) {
        temp[i].push([i + rowsize, 1]);
        temp[i].push([i - rowsize, 1]);
        temp[i].push([i - 1, 1]);
      } else {
        temp[i].push([i + rowsize, 1]);
        temp[i].push([i - rowsize, 1]);
        temp[i].push([i - 1, 1]);
        temp[i].push([i + 1, 1]);
      }
    }

    setadjacency(temp);
    setVertices(list);
  }, [toggler]);

  const drop = (e, item) => {
    e.preventDefault();
    var type = e.dataTransfer.getData("text");

    if (completed === true) {
      for (let i = 0; i < total; i++) {
        let p = document.getElementById(i);
        p.classList.remove("anime", "path");
        if (collection[item].includes(i) === true) {
          p.classList.add("anime");
        }
      }

      let j = item;
      while (j !== source) {
        document.getElementById(j).classList.add("path");
        j = previous[j];
      }
      document.getElementById(j).classList.add("path");
    }

    if (type === "source") {
      setSource(item);
    } else if (type === "destination") {
      setDestination(item);
    } else {
      setIntermediate(item);
    }
  };

  const drag = (e, type) => {
    e.dataTransfer.setData("text", type);
  };
  const dragOver = (e) => {
    e.preventDefault();
  };

  const depthFirstSearch = async () => {
    if (isPickup === true) {
      await dfs(
        adjacency,
        speed,
        total,
        source,
        intermediate,
        setPrevious,
        setCollection,
        setOrder,
        setCompleted,
        setsecondDrag,
        visited
      );
      await sleep();
      await sleep();

      dfs(
        adjacency,
        speed,
        total,
        intermediate,
        destination,
        setPrevious,
        setCollection,
        setOrder,
        setCompleted,
        setsecondDrag,
        visited,
        2
      );
    } else {
      dfs(
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
        visited
      );
    }
  };

  const breadthFirstSearch = async () => {
    if (isPickup === true) {
      await bfs(
        adjacency,
        speed,
        source,
        intermediate,
        setPrevious,
        setCollection,
        setOrder,
        setCompleted,
        setsecondDrag,
        visited,
        1
      );
      await sleep();
      bfs(
        adjacency,
        speed,
        intermediate,
        destination,
        setPrevious,
        setCollection,
        setOrder,
        setCompleted,
        setsecondDrag,
        visited,
        2
      );
    } else {
      await bfs(
        adjacency,
        speed,
        source,
        destination,
        setPrevious,
        setCollection,
        setOrder,
        setCompleted,
        setsecondDrag,
        visited,
        1
      );
    }
  };

  const dijkstraSearch = async () => {
    if (isPickup) {
      await dijkstra(
        adjacency,
        speed,
        source,
        intermediate,
        setPrevious,
        setCollection,
        setOrder,
        setCompleted,
        setsecondDrag,
        visited,
        total,
        1
      );
      await sleep();
      dijkstra(
        adjacency,
        speed,
        intermediate,
        destination,
        setPrevious,
        setCollection,
        setOrder,
        setCompleted,
        setsecondDrag,
        visited,
        total,
        2
      );
    } else {
      dijkstra(
        adjacency,
        speed,
        source,
        destination,
        setPrevious,
        setCollection,
        setOrder,
        setCompleted,
        setsecondDrag,
        visited,
        total,
        1
      );
    }
  };

  const astarSearch = async () => {
    if (isPickup) {
      await astar(
        adjacency,
        speed,
        source,
        intermediate,
        setCompleted,
        setsecondDrag,
        visited,
        1
      );
      await sleep();
      await sleep();
      astar(
        adjacency,
        speed,
        intermediate,
        destination,
        setCompleted,
        setsecondDrag,
        visited,
        2
      );
    } else {
      astar(
        adjacency,
        speed,
        source,
        destination,
        setCompleted,
        setsecondDrag,
        visited,
        1
      );
    }
  };
  const sleep = () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const reset = () => {
    for (let i = 0; i < total; i++) {
      let element = document.getElementById(i);
      element.classList.remove(
        "anime",
        "path",
        "anime2",
        "path2",
        "block",
        "its_a_weight"
      );
    }
    setCollection([]);
    setSource(753);
    setDestination(806);
    setIsPickup(false);
    setCompleted(false);
    setPrevious({});
    setsecondDrag(false);
    setVisited({});
  };

  const buildBlock = (item) => {
    let element = document.getElementById(item);
    if (visited[item] && visited[item] === true) {
      element.classList.remove("block");
      setVisited({ ...visited, [item]: false });
    } else {
      if (
        item !== source &&
        item !== destination &&
        item !== intermediate &&
        element.classList.contains("its_a_weight") !== true
      ) {
        element.classList.add("block");
        setVisited({ ...visited, [item]: true });
      }
    }
  };

  const addWeight = (item) => {
    if (
      document.getElementById(item).classList.contains("block") === false &&
      item !== source &&
      item !== destination &&
      item !== intermediate
    ) {
      let processingList = adjacency;
      let temp = [];
      let account = [];
      let element = document.getElementById(item);
      let input = 1;
      if (element.classList.contains("its_a_weight")) {
        input = 1;
        element.classList.remove("its_a_weight");
        element.innerHTML = val;
      } else {
        input = weight;
        element.classList.add("its_a_weight");
        element.innerHTML = weight;
      }

      processingList[item].forEach(([index, wei]) => {
        temp.push([index, input]);
        account.push(index);
      });
      processingList[item] = temp;
      temp = [];
      account.forEach((value) => {
        processingList[value].forEach(([index, wei]) => {
          if (index === item) {
            temp.push([index, input]);
          } else {
            temp.push([index, wei]);
          }
        });
        processingList[value] = temp;
        temp = [];
      });

      setadjacency(processingList);
    }
  };

  const Visualize = () => {
    switch (Algorithm) {
      case "dfs":
        depthFirstSearch();
        break;
      case "bfs":
        breadthFirstSearch();
        break;
      case "diji":
        dijkstraSearch();
        break;
      case "astar":
        astarSearch();
        break;
      default:
        break;
    }
  };

  const changeAlgo = (e) => {
    setAlgorithm(e.target.value);
  };

  const useStyles = makeStyles(() => ({
    formControl: {
      color: "white",
    },
    text: {
      color: "white",
    },
  }));

  const classes = useStyles();

  return (
    <div className="container_path">
      <div className="nav_path">
        <div style={{ position: "absolute", left: "0", top: "0" }}>
          <Button
            style={{ backgroundColor: "grey" }}
            onClick={() => {
              history.push("/");
            }}
            variant="outlined"
            color="default"
            size="small"
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <Select
              className={classes.text}
              color="secondary"
              labelId="algorithm-label"
              id="algorithm"
              value={Algorithm}
              onChange={changeAlgo}
            >
              <MenuItem value={"dfs"}>Depth First Search</MenuItem>
              <MenuItem value={"bfs"}>Breadth First Search</MenuItem>
              <MenuItem value={"diji"}>Dijkstra's Algorithm</MenuItem>
              <MenuItem value={"astar"}>A Star Search</MenuItem>
            </Select>
            <FormHelperText color="secondary" className={classes.text}>
              Choose Your Algorithm
            </FormHelperText>
          </FormControl>
        </div>
        <div>
          <Button
            onClick={Visualize}
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<SwapCalls fontSize="large" />}
          >
            <span
              style={{
                fontFamily: "serif",
                fontWeight: "900",
                fontSize: "20px",
              }}
            >
              Find Path
            </span>
          </Button>
        </div>
        <div>
          <FormControlLabel
            className={classes.text}
            value="top"
            control={
              <Switch
                color="primary"
                checked={isPickup}
                onChange={() => {
                  setIsPickup(!isPickup);
                }}
              />
            }
            label="Pickup"
            labelPlacement="top"
          />
        </div>
        <div>
          <FormControlLabel
            className={classes.text}
            value="top"
            control={
              <Switch
                color="primary"
                checked={isBlock}
                onChange={() => {
                  setIsSettingWeight(false);
                  setIsBlock(!isBlock);
                }}
              />
            }
            label="Draw Walls"
            labelPlacement="top"
          />
        </div>
        <div>
          <FormControlLabel
            className={classes.text}
            value="top"
            control={
              <Switch
                color="secondary"
                checked={isSettingWeight}
                onClick={() => {
                  setIsBlock(false);
                  setIsSettingWeight(!isSettingWeight);
                }}
              />
            }
            label="Add weights"
            labelPlacement="top"
          />

          <FormControlLabel
            className={classes.text}
            value="top"
            control={
              <Input
                type="number"
                color="secondary"
                className={classes.text}
                style={{
                  width: "50px",
                  border: "solid 1px #8395A7",
                  textAlign: "center",
                  paddingLeft: "3px",
                  paddingRight: "3px",
                  paddingTop: "3px",
                  borderRadius: "3px",
                }}
                value={weight}
                onChange={(e) => {
                  setWeight(parseInt(e.target.value));
                }}
                disabled={isSettingWeight ? false : true}
              >
                /
              </Input>
            }
            label="Weight"
            labelPlacement="top"
          />
        </div>

        <div>
          <FormControl className={classes.formControl}>
            <Select
              className={classes.text}
              color="secondary"
              labelId="speed-label"
              id="speed"
              value={speed}
              onChange={(e) => {
                setSpeed(e.target.value);
              }}
            >
              <MenuItem value={50}>Slow</MenuItem>
              <MenuItem value={10}>Medium</MenuItem>
              <MenuItem value={1}>Fast</MenuItem>
            </Select>
            <FormHelperText color="secondary" className={classes.text}>
              Choose Speed
            </FormHelperText>
          </FormControl>
        </div>
      </div>

      <div
        className="graph_conntainer"
        onMouseDown={() => {
          if (isBlock === true) {
            setPouring(true);
          }
        }}
        onMouseUp={() => {
          if (isBlock === true) {
            setPouring(false);
          }
        }}
      >
        {Vertices.map((item) => {
          return (
            <div
              key={item}
              className="grid disable_select"
              id={item}
              onDrop={(e) => {
                drop(e, item);
              }}
              onMouseOver={() => (pouring === true ? buildBlock(item) : "")}
              onClick={() =>
                isSettingWeight === true
                  ? addWeight(item)
                  : isBlock === true
                  ? buildBlock(item)
                  : ""
              }
              onDragOver={(e) => {
                dragOver(e);
              }}
            >
              {val}
              {item === source ? (
                <img
                  id="source"
                  draggable={completed === true ? false : true}
                  src={man}
                  className="icon"
                  onDragStart={(e) => {
                    drag(e, "source");
                  }}
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              ) : (
                ""
              )}
              {item === destination ? (
                <img
                  id="destination"
                  src={house}
                  draggable={secondDrag === true ? false : true}
                  className="icon"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  onDragStart={(e) => {
                    drag(e, "destination");
                  }}
                />
              ) : (
                ""
              )}
              {isPickup === true && item === intermediate ? (
                <img
                  id="intermediate"
                  draggable={secondDrag === true ? false : true}
                  src={location}
                  className="icon"
                  onDragStart={(e) => {
                    drag(e, "intermediate");
                  }}
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      <div className="foot_sort">
        <div>
          <Button
            onClick={reset}
            variant="contained"
            color="primary"
            size="medium"
          >
            <span style={{ fontFamily: "serif", fontWeight: "900" }}>
              Reset
            </span>
          </Button>
        </div>

        <div className="legend">
          <div className="element">
            <div className="grid" style={{ border: "none" }}>
              <img
                src={man_white}
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>
            <p style={{ color: "white" }}> - Source</p>
          </div>
          <div className="element">
            <div className="grid" style={{ border: "none" }}>
              <img
                src={house_white}
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>
            <p style={{ color: "white" }}> - Destination</p>
          </div>

          <div className="element">
            <div className="grid" style={{ border: "none" }}>
              <img
                src={location_white}
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>
            <p style={{ color: "white" }}> - Pickup</p>
          </div>
          <div className="element">
            <div
              className="grid"
              style={{ border: "none", backgroundColor: "white" }}
            ></div>
            <p style={{ color: "white" }}> - Unvisited</p>
          </div>
          <div className="element">
            <div
              className="grid"
              style={{ border: "none", backgroundColor: "turquoise" }}
            ></div>

            <div
              className="grid"
              style={{
                border: "none",
                backgroundColor: "pink",
                marginLeft: "5px",
              }}
            ></div>
            <p style={{ color: "white" }}> - Visited</p>
          </div>
          <div className="element">
            <div
              className="grid"
              style={{ border: "none", backgroundColor: "#FFF222" }}
            ></div>
            <p style={{ color: "white" }}> - Path</p>
          </div>
          <div className="element">
            <div
              className="grid"
              style={{ border: "none", backgroundColor: "black" }}
            ></div>
            <p style={{ color: "white" }}> - Wall</p>
          </div>
          <div className="element">
            <div
              className="grid"
              style={{
                border: "none",
                color: "white",
                backgroundColor: "#E83350",
              }}
            >
              1
            </div>
            <p style={{ color: "white" }}> - Weight</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PathFindingPage;
