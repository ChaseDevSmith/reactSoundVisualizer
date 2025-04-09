import { useState } from 'react'
import './App.css'
import StationSelector from './stationSelector'
import AudioVisualizer from './AudioVisualizer'
function App() {
  const [sound, setSound] = useState(null);
  const [currentStation, setStation] = useState("BASIC");
  const handleStationChange =(station)=> {

    setStation(station);
    console.log("changed station! EZZZ", station)
  }
  const handleFileChange = (e) =>{
    const file = e.target.files[0]
    if(file){
      setSound(URL.createObjectURL(file))
    }
  }

// initAudio()
  return (
    
   <div id ="container">
   
         <h1>Sound Visualizer !</h1>

    <div id = "selectBar">
    <StationSelector onStationChange={handleStationChange}/>
    <input type="file"  accept="audio/*" onChange={handleFileChange}></input>
    </div>
    <AudioVisualizer audioFile={sound} station={currentStation}/>

  
   


  </div>
     
 

  )
}

export default App
