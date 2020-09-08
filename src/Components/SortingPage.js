import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Switch,
  Typography,
  Slider,
  Button,
  FormHelperText,
  makeStyles,
  Input,
} from "@material-ui/core";
import { SwapCalls, ArrowBack } from "@material-ui/icons";
import { BubbleSort } from "../SortingAlgos/BubbleSort";
import { insertionSort } from "../SortingAlgos/InsertionSort";
import { selectionSort } from "../SortingAlgos/SelectionSort";
import { merge, mergeSort } from "../SortingAlgos/MergeSort";
import { quickSort, partition } from "../SortingAlgos/QucikSort";

function SortingPage() {
  let history = useHistory();
  const [measurement, setmeasurement] = useState({ size: 30, width: "20px" });
  const [array, setArray] = useState([]);
  const [toggler, setToggler] = useState(false);
  const [Algorithm, setAlgorithm] = useState("bubble");
  const [speed, setSpeed] = useState(50);

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < measurement.size; i++) {
      let entry = Math.floor(Math.random() * 50);
      temp.push(entry);
    }
    setArray(temp);
  }, [measurement]);

  const sort = async () => {
    let list = new Array(...array);
    setToggler(true);
    switch (Algorithm) {
      case "bubble":
        await BubbleSort(list, speed);
        break;
      case "insertion":
        await insertionSort(list, speed);
        break;
      case "selection":
        await selectionSort(list, speed);
        break;
      case "merge":
        await mergeSort(list, 0, list.length - 1, speed, list.length - 1);
        break;
      case "quick":
        await quickSort(list, 0, list.length - 1);
        break;
      default:
        break;
    }
    setToggler(false);
  };

  const getMeasurement = (event, val) => {
    let width = 0;
    if (val === 30) {
      width = "20px";
    } else if (val === 80) {
      width = "10px";
    } else {
      width = "5px";
    }
    reset()
    setmeasurement({ size: val, width: width });
  };

  const reset = () => {
    let temp = [];
    for (let i = 0; i < measurement.size; i++) {
      let entry = Math.floor(Math.random() * 50);
      temp.push(entry);
      document.getElementById(i).style.backgroundColor = "aquamarine";
    }
    setArray(temp);
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

  const changeAlgo = (e) => {
    setAlgorithm(e.target.value);
  };

  return (
    <div className="container_sort">
      <div className="nav_sort">
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
        <h3 className="title_sort">Sorting:</h3>
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
              <MenuItem value={"bubble"}>Bubble Sort</MenuItem>
              <MenuItem value={"insertion"}>Insertion Sort</MenuItem>
              <MenuItem value={"selection"}>Selection Sort</MenuItem>
              <MenuItem value={"merge"}>Merge Sort</MenuItem>
              <MenuItem value={"quick"}>Quick Sort</MenuItem>
            </Select>
            <FormHelperText color="secondary" className={classes.text}>
              Choose Your Algorithm
            </FormHelperText>
          </FormControl>
        </div>
        <div>
          <Button
            onClick={sort}
            variant="contained"
            color="secondary"
            size="large"
          >
            <span
              style={{
                fontFamily: "serif",
                fontWeight: "900",
                fontSize: "20px",
              }}
            >
              Lets Sort
            </span>
          </Button>
        </div>
        <div>
          <Typography id="discrete-slider" gutterBottom>
            <span style={{ color: "white" }}>ArraySize</span>
          </Typography>
          <Slider
            disabled={toggler}
            defaultValue={30}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChange={getMeasurement}
            step={50}
            marks
            min={30}
            max={130}
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
              <MenuItem value={25}>Medium</MenuItem>
              <MenuItem value={5}>Fast</MenuItem>
            </Select>
            <FormHelperText color="secondary" className={classes.text}>
              Choose Speed
            </FormHelperText>
          </FormControl>
        </div>
        <Button
          disabled={toggler}
          variant="contained"
          color="primary"
          onClick={reset}
        >
          Reset
        </Button>
      </div>
      <div className="container">
        <div className="graph">
          {array.map((item, index) => {
            return (
              <div
                key={index}
                id={index}
                className="box"
                style={{ height: `${10 * item}px`, width: measurement.width }}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="foot_sort">
        <div className="legend">
          <div className="element">
            <div
              className="grid"
              style={{ border: "none", backgroundColor: "aquamarine" }}
            ></div>
            <p style={{ color: "white" }}> {Algorithm === "quick" ? " - Unsorted or Unprocessed":" - Unsorted"}</p>
          </div>
          <div className="element">
            <div
              className="grid"
              style={{
                border: "none",
                backgroundColor: "pink",
                marginLeft: "5px",
              }}
            ></div>
            <p style={{ color: "white" }}> - Sorted</p>
          </div>
          <div className="element">
            <div
              className="grid"
              style={{ border: "none", backgroundColor: "#FFF222" }}
            ></div>
            <p style={{ color: "white" }}> - InProcess</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortingPage;
