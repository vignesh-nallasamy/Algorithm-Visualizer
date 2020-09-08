import React from 'react'
import { Link ,useHistory} from "react-router-dom"


function Home() {
    let history = useHistory()
    return (
        <div className="container_sort">
        <div className="nav_sort">
            <h1 style={{color:"white",fontWeight:"bold"}}>Algorithm Visualizer</h1>
        </div>
        <div className="container flex_col">
                <div className="index" onClick={()=>{history.push("/sort")}}>
                    <h2 style={{color:"white",fontWeight:"bold"}}>Sorting Algorithms</h2>
                </div>
                <div className="index" onClick={()=>{history.push("/path")}}>
                   <h2 style={{color:"white",fontWeight:"bold"}}> PathFinding Algorithms</h2>
                </div>
        </div>
        <div className="foot_sort">
            <p style={{color:"white"}}>Vignesh Nallasamy</p>
        </div>


            
        </div>
    )
}

export default Home
