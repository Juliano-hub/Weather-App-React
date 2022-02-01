import './App.css';
import react, {useEffect, useState} from 'react'
import axios from 'axios'

function App() {
  const [CurrentLocation, setCurrentLocation] = useState({
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

  const [CurrentWeather, setCurrentWeather] = useState()

  let Weather = async(lat, lon) => {
    //console.log('In:', lat, lon)
    console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_KEY}`)

    let res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_KEY}`)

    console.log(res)
    setCurrentWeather(res)
  }

  useEffect (() =>{
    navigator.geolocation.getCurrentPosition(Success, error)
    //console.log('Out:', CurrentLocation.latitude)
  })

  return (
    <div>
      <button className='ShowButton' onClick={() => Weather(CurrentLocation.latitude, CurrentLocation.longitude)}> Show Weather </button>
    </div>    
  )
}

export default App;