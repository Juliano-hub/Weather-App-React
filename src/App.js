import './App.css';
import react, {useEffect, useState} from 'react'
import axios from 'axios'

function App() {
  //verification if clicked the button
  const [bitOnClick, setbitOnClick] = useState(0)

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
    window.alert('Location is required for application! Please clear this setting, click OK and then accept access to the location!')
    window.location.reload()
  }

  const [CurrentWeather, setCurrentWeather] = useState({
    clouds: '',
    temp: '',
    feels_like: '',
    name: '',
    country: '',
    weather: '',
    timezone: '',
    hours: ''
  })

  let Weather = async(lat, lon) => {
    //console.log('In:', lat, lon)

    console.log(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_KEY}`)

    let res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_KEY}`)

    //console.log(res)
    //console.log(res.data.name)
    //console.log(res.data.weather[0].description)
    //console.log('Clouds:', res.data.clouds.all)
    let ReturnHours = GetHours()

    await setCurrentWeather({...CurrentWeather, 
      clouds: res.data.clouds.all,
      temp: res.data.main.temp,
      feels_like: res.data.main.feels_like,
      name: res.data.name,
      country: res.data.sys.country,
      weather: res.data.weather[0].description,
      timezone: res.data.timezone,
      hours: ReturnHours
    })

    console.log(CurrentWeather)

    setbitOnClick(1)
  }

  useEffect (() =>{
    navigator.geolocation.getCurrentPosition(Success, error)
    //console.log('Out:', CurrentLocation.latitude)
  })

  function GetHours(){
    var date = new Date();
    let Hours = date.getHours()
    console.log(Hours)
    return Hours
  }

  return (
      <div className='Centering'> 

        <button className='ShowButton' onClick={() => Weather(CurrentLocation.latitude, CurrentLocation.longitude)}> Show the weather for your current location  </button>
      
        {bitOnClick?(
          <div className='Centering'>
            <div className={CurrentWeather.hours >= 19? 'Night' : 'Day'}> <br/> 
    
              <b>{CurrentWeather.name}{' / '}{CurrentWeather.country}</b> <br/><br/>

              {CurrentWeather.hours >= 19?(
                  ////https://fontawesome.com/v5.15/icons/moon?style=solid
                <i className="fas fa-moon"></i>
                  //https://fontawesome.com/v5.15/icons/sun?style=solid
              ): <i className="fas fa-sun"></i> } <br/><br/>

              <b>{'Current temperature: '}</b>{CurrentWeather.temp}<br/> <br/>
              <b>{'Thermal sensation: '}</b>{CurrentWeather.feels_like}<br/> <br/>
              <b>{'Weather: '}</b>{CurrentWeather.weather}<br/> <br/>
              <b>{'Amount of clouds: '}</b>{CurrentWeather.clouds}

            </div>  
          </div>
        
        ): null}


      </div>
  )
}

export default App;