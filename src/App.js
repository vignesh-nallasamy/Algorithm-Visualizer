import React from 'react'
import SortingPage from "./Components/SortingPage"
import PathFindingPage from "./Components/PathFindingPage"
import Home from "./Components/Home"
import "./App.css"
import {BrowserRouter as Router,Route,Switch,Link} from "react-router-dom" 
function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/Sort" >
          <SortingPage></SortingPage>
        </Route>
        <Route exact path="/Path" >
          <PathFindingPage></PathFindingPage>
        </Route>
      
      </Switch>
    </Router>
   
  )
}

export default App
