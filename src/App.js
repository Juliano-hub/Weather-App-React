import './App.css';
import react, {useEffect, useState} from 'react'
import axios from 'axios'
import reactDom from 'react-dom';

function App() {

  const [CurrentLocation, setCurrentLocation] = useState({
    latitude: '',
    longitude: ''
  })

  function Success(props){

    setCurrentLocation({...CurrentLocation, 
      latitude: props.coords.latitude, 
      longitude: props.coords.longitude
    })

    //console.log(CurrentLocation)
  }

  function error(props){
    window.alert(props.error)
  }

  const [CurrentWeather, setCurrentWeather] = useState({
    clouds: '',
    temp: '',
    feels_like: '',
    name: '',
    country: '',
    weather: '',
    timezone: ''
  })

  let Weather = async(lat, lon) => {
    //console.log('In:', lat, lon)

    console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_KEY}`)

    let res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_KEY}`)

    //console.log(res)
    //console.log(res.data.name)
    //console.log(res.data.weather[0].description)

    let AuxVar = res

    console.log('Current Weather:', AuxVar)

    setCurrentWeather({...CurrentWeather, 
      clouds: AuxVar.data.clouds,
      temp: AuxVar.data.main.temp,
      feels_like: AuxVar.data.main.feels_like,
      name: AuxVar.data.name,
      country: AuxVar.data.sys.country,
      weather: AuxVar.data.weather[0].description,
      timezone: AuxVar.data.timezone
    })

    console.log('Current Weather:', AuxVar)
    console.log(CurrentWeather)
  }

  useEffect (() =>{
    navigator.geolocation.getCurrentPosition(Success, error)
    //console.log('Out:', CurrentLocation.latitude)
  })

  return (
      <div className='Centering'> 
        <button className='ShowButton' onClick={() => Weather(CurrentLocation.latitude, CurrentLocation.longitude)}> Show Weather </button>
      </div>
  )
}

export default App;