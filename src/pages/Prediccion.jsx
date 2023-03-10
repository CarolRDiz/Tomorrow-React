import React, { useState, useEffect } from 'react'
import queryString from 'query-string';
import { useParams } from 'react-router-dom'
import FetchForecast from '../components/FetchForecast'
import axios from 'axios'
import despejado from "../assets/img/weathercode/despejado.svg"
import despejado_noche from "../assets/img/weathercode/despejado_noche.svg"
import principlamente_despejado from "../assets/img/weathercode/nube.svg"
import nublado from "../assets/img/weathercode/nublado.svg"
import lluvia from "../assets/img/weathercode/lluvia.svg"
import lluvioso from "../assets/img/weathercode/lluvioso.svg"
import nieve from "../assets/img/weathercode/nieve.svg"
import granizo from "../assets/img/weathercode/granizo.svg"
import tormenta from "../assets/img/weathercode/tormenta.svg"
import niebla from "../assets/img/weathercode/niebla.svg"



const Prediccion = () => {

  const weathercodeDiccionary = {
    "0": despejado,
    "1": principlamente_despejado,
    "2": nublado,
    "3": nublado,
    "45": niebla,
    "48": nieve,
    "51": lluvia,
    "53": lluvia,
    "55": lluvia,
    "56": lluvia,
    "61": lluvia,
    "66": lluvia,
    "63": lluvia,
    "65": lluvioso,
    "67": lluvioso,
    "71": nieve,
    "72": nieve,
    "85": nieve,
    "73": nieve,
    "86": nieve,
    "77": granizo,
    "80": lluvioso,
    "81": lluvioso,
    "82": lluvioso,
    "95": tormenta,
    "96": tormenta
  }

  const [isLoading, setIsLoading] = useState(true);

  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [forecastData, setForecastData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [hourly, setHourly] = useState(null);
  const [current_weather, setCurrentWeather] = useState(null)
  const [temperatures, setTemperatures] = useState(null)
  const [weathercodes, setWeathercodes] = useState(null)
  const [rainSum, setRainSums] = useState(null)
  const [windSpeeds, setWindSpeeds] = useState(null)
  const [sunsets, setSunsets] = useState(null)
  const [sunrises, setSunrises] = useState(null)
  const [maxTemperatures, setMaxTemperatures] = useState(null)
  const [minTemperatures, setMinTemperatures] = useState(null)
  const [today, setToday] = useState(null)
  const [days, setDays] = useState(null)
  const [numberDays, setNumberDays] = useState([0, 1, 2, 3, 4, 5, 6])

  var { communityName, provinceName } = useParams()
  const URL = `https://geocoding-api.open-meteo.com/v1/search?name=${provinceName}&language=es&count=1`

  useEffect(() => {

    const getCoordenates = async () => {
      const URL = `https://geocoding-api.open-meteo.com/v1/search?name=${provinceName}&language=es&count=1`
      const result = await axios.get(URL)
      const {
        latitude, longitude
      } = result.data.results[0]

      setLatitude(parseFloat(latitude).toFixed(2))
      setLongitude(parseFloat(longitude).toFixed(2))
      getForecast(latitude, longitude)
    }
    getCoordenates()

    const getForecast = async (latitude, longitude) => {

      //Establece el punto final GET de FORECASTcomo la URL de destino
      const getForecastURL = "https://api.open-meteo.com/v1/forecast";

      //Escoger una ubicacion con coordenadas. Madrid
      // let latitude = 40.42;
      // let longitude = -3.70;

      //Variables de tiempo por hora
      const hourly = ["temperature_2m", "weathercode"]

      //Variables de tiempo por día
      const daily = ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "rain_sum", "windspeed_10m_max"]


      //const timezone = "Europe/Berlin"
      const timezone = "auto"
      const forecast_days = 7

      // Escoger la unidad del sistema
      const units = "metric";

      // Establecer los intervalos de tiempo, como "current", "1h" y "1d"
      const timesteps = ["current", "1h", "1d"];

      // Configurar el marco de tiempo hasta 6 horas anteriores y 15 días siguientes
      function formatDaysAndMonth(dayOrMonth) {
        if (dayOrMonth.toString().length == 1) {
          dayOrMonth = '0' + dayOrMonth.toString();
        }
        return dayOrMonth
      }
      const currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var currentDay = currentDate.getDate();
      setToday(`${currentDay}`);
      currentDay = formatDaysAndMonth(currentDay)
      var currentMonth = currentDate.getMonth() + 1;
      currentMonth = formatDaysAndMonth(currentMonth)
      const start_date = `${currentYear}-${currentMonth}-${currentDay}`
      //const start_date = "2023-01-17";
      console.log("start_date: " + start_date)


      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);
      var endYear = endDate.getFullYear();
      var endDay = endDate.getDate();
      endDay = formatDaysAndMonth(endDay)
      var endMonth = endDate.getMonth() + 1;
      endMonth = formatDaysAndMonth(endMonth)
      const end_date = `${endYear}-${endMonth}-${endDay}`
      //const end_date = "2023-01-19";
      console.log("end_date: " + end_date)

      const current_weather = true;

      // Solicitar las líneas de tiempo con todos los 
      // parámetros de la cadena de consulta como opciones 

      const getForecastParameters = queryString.stringify({
        latitude,
        longitude,
        hourly,
        daily,
        timezone,
        forecast_days,
        current_weather,
        start_date,
        end_date,
      }, { arrayFormat: "comma" });
      console.log("getForecastParameters: " + getForecastParameters)

      let forecastURL = getForecastURL + "?" + getForecastParameters;
      // fetch(getForecastURL + "?" + getForecastParameters, {method: "GET", compress: true})
      // .then((res) => res.json())
      // .then((data) => console.log(data))
      // .then((data) => setForecastData(data))

      const result = await axios.get(forecastURL)
      setForecastData(result.data)
      console.log(result.data)
      setCurrentWeather(result.data.current_weather)
      setTemperatures(result.data.hourly.temperature_2m)
      setWeathercodes(result.data.hourly.weathercode)
      setRainSums(result.data.daily.rain_sum)
      setWindSpeeds(result.data.daily.windspeed_10m_max)
      setSunsets(result.data.daily.sunset)
      setSunrises(result.data.daily.sunrise)
      setMaxTemperatures(result.data.daily.temperature_2m_max)
      setMinTemperatures(result.data.daily.temperature_2m_min)
      setDays(result.data.daily.time)
      setIsLoading(false);
    }
  }, [])

  function translateWeatherCode(weathercode) {
    return weathercodeDiccionary[weathercode]
  }
  function getHoursfromDate(dateString) {
    let date = new Date(dateString);
    return date.getHours() + ":" + date.getMinutes()
  }
  function getDayMonth(dateString) {
    let date = new Date(dateString)
    return date.getDate()
  }
  function getDayWeek(dateString) {
    const dias = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    let date = new Date(dateString)
    let today = new Date()
    today = today.setHours(0, 0, 0, 0)
    return dias[date.getDay()]
  }

  if (isLoading) { // si está cargando, mostramos un texto que lo indique
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <main>
      <section className="main__city">
        <div className="city__block-1">
          <h1>{communityName}</h1>
          <h3 className="city__province">{provinceName}</h3>
        </div>
        <div className="city__info">
          <img className="info__weather-icon" src={translateWeatherCode(current_weather.weathercode)} alt="Soleado" />
          <span className="info__temperature">{current_weather.temperature}º</span>
          <div className="info__wind">
            <i className="icon icon--small icon--wind"></i>
            <span className="wind__velocity">{current_weather.windspeed} km/h</span>
          </div>
        </div>
      </section>
      <section className="main__weather-table">
        {/* <ul className="weather-table__selection">
                    <li className="selection__option--rounded selection__option--rounded--active">
                        <span>Días</span>
                    </li>
                    <li className="selection__option--rounded  ">
                        <a className="option__link"href="#">Por horas</a>
                    </li>
                    <li className="selection__option--rounded">
                        <a className="option__link"href="#">Fin de semana</a>
                    </li>
                </ul> */}
        <div className="weather-table__table">
          {/* Primera columna */}
          <div className="table__header table__column">
            <div className="table__cell table__weather">
              8:00
            </div>
            <div className="table__cell table__weather">
              14:00
            </div>
            <div className="table__cell table__weather">
              20:00
            </div>
            <span className="table__rain">Lluvias</span>
            <div className="table__cell table__wind">
              Viento
            </div>
            <i className="icon--large icon--dawn"></i>
            <i className="icon--large icon--nightfall"></i>
          </div>
          <div className="table__wrapper">
            {numberDays.map((i) => (
              <div className="table__column">
                <h3 className="table__cell table__day">
                  <span>{i == 0 ? "Hoy" : getDayWeek(days[i])}</span>
                  <span>{getDayMonth(days[i])}</span>
                </h3>
                <div className="table__cell table__temperature-limits">
                  <span className="temperature-limits__span"><i className="icon--small icon--temperature--max"></i> {maxTemperatures[i]}º</span>
                  <span className="temperature-limits__span"><i className="icon--small icon--temperature--min"></i> {minTemperatures[i]}º</span>
                </div>
                <div className="table__cell table__weather">
                  <img className="weather__img" src={translateWeatherCode(weathercodes[8 + 24 * i])} alt="Sol" />
                  <span className="weather__temperature">{temperatures[8]}º</span>
                </div>
                <div className="table__cell table__weather">
                  <img className="weather__img" src={translateWeatherCode(weathercodes[14 + 24 * i])} alt="Sol" />
                  <span className="weather__temperature">{temperatures[14]}º</span>
                </div>
                <div className="table__cell table__weather">
                  <img className="weather__img" src={translateWeatherCode(weathercodes[20 + 24 * i])} alt="Sol" />
                  <span className="weather__temperature">{temperatures[20]}º</span>
                </div>
                <span className="table__rain">{rainSum[i]} mm</span>
                <div className="table__cell table__wind">
                  <i className="icon--medium icon--wind direction--left-down"></i>
                  <span className="wind__velocity">{windSpeeds[i]} km/h</span>
                </div>
                <span className="table__cell table__dawn">{getHoursfromDate(sunrises[i])}</span>
                <span className="table__cell table__nightfall">{getHoursfromDate(sunsets[i])}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Prediccion
