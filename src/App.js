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
    setCurrentLocation({...CurrentLocation, latitude: props.coords.latitude, longitude: props.coords.longitude})
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

    console.log(res)
    console.log(res.data.clouds)
    console.log(res.data.name)
    console.log(res.data.weather[0].description)

    setCurrentWeather({...CurrentWeather, 
      clouds: '0',
      temp: res.data.main.temp,
      feels_like: res.data.main.feels_like,
      name: res.data.name,
      country: res.data.sys.country,
      weather: res.data.weather[0].description,
      timezone: res.data.timezone
    })

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