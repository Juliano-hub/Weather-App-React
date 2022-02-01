import './App.css';
import react, {useEffect, useState} from 'react'

function App() {
  let [CurrentLocation, setCurrentLocation] = useState({
    latitude: '',
    longitude: ''
  })

  function Success(props){
    setCurrentLocation({...CurrentLocation, latitude: props.coords.latitude, longitude: props.coords.longitude})
    //console.log(CurrentLocation)
  }

  function error(props){
    window.alert(props.error)
  }

  useEffect (() =>{
    navigator.geolocation.getCurrentPosition(Success, error)
  }, [])

  return (
    <div>

    </div>
  );
}

export default App;