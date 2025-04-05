import App from "./App";
 function StationSelector({onStationChange}){
    const stations = ["STAR", "FX",'STRING CHEESE', 'PSP','CLEAN', 'CIRCLES','RAINBOW'];
    return(
    <div>
      <h1>Sound Visualizer !</h1>
        <h4> Select Visualization Station and Import Audio </h4>
   
{stations.map((station)=>
    
    <button key ={station} onClick={() => onStationChange(station)}>

      {station}
        </button>
    )}        
    </div>

)}
export default StationSelector;