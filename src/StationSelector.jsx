import App from "./App";
 function StationSelector({onStationChange}){
    const stations = ["TAJIN", "CIRCLES",'STRING CHEESE', 'PSP','CLEAN', 'LILYPAD','RAINBOW'];
    
    return(
    <div>
  
      <p4> Select Visualization Station and Import Audio </p4>
    
      <div>
{stations.map((station)=>
   
    <button key ={station} onClick={() => onStationChange(station)}>

      {station}
        </button>
    )}      
    </div>  
    </div>

)}
export default StationSelector;