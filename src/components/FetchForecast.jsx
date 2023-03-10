import React, { useState } from 'react'
import queryString from 'query-string';
import { addHours } from "../utilities";

const FetchForecast = (
    //latitude, longitude
    //latitude, latitude, hourly, dialy, timesteps
    ) => {

    const [forecastData, setForecastData] = useState({});
    const [hasError, setHasError] = useState(false);

    //Establece el punto final GET de FORECASTcomo la URL de destino
    const getForecastURL = "https://api.open-meteo.com/v1/forecast";

    //Escoger una ubicacion con coordenadas. Madrid
    let latitude = 40.42;
    let longitude = -3.70;
    // const latitudeFloat = parseFloat(latitude)
    // const longitudeFloat = parseFloat(longitude)
    // console.log(latitudeFloat)

    //Variables de tiempo por hora
    const hourly = "weathercode"

    //Variables de tiempo por día
    const dialy = ["temperature_2m_max","temperature_2m_min","sunrise","sunset","rain_sum","windspeed_10m_max"]

    const timezone="Europe/London"

    // Escoger la unidad del sistema
    const units = "metric";

    // Establecer los intervalos de tiempo, como "current", "1h" y "1d"
    const timesteps = ["current", "1h", "1d"];

    // Configurar el marco de tiempo hasta 6 horas anteriores y 15 días siguientes
    function formatDaysAndMonth (dayOrMonth) {
        if(dayOrMonth.toString().length == 1) {
            dayOrMonth ='0'+dayOrMonth.toString();
        }
        return dayOrMonth
    }
    const currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentDay = currentDate.getDate();
    currentDay = formatDaysAndMonth(currentDay)
    var currentMonth = currentDate.getMonth() + 1;
    currentMonth = formatDaysAndMonth(currentMonth)
    const start_date = `${currentYear}-${currentMonth}-${currentDay}`
    //const start_date = "2023-01-17";
    console.log("start_date: "+ start_date)


    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    var endYear = endDate.getFullYear();
    var endDay = endDate.getDate();
    endDay = formatDaysAndMonth(endDay)
    var endMonth = endDate.getMonth() + 1;
    endMonth = formatDaysAndMonth(endMonth)    
    const end_date = `${endYear}-${endMonth}-${endDay}`
    //const end_date = "2023-01-19";
    console.log("end_date: "+ end_date)

    //Solicitar las líneas de tiempo con todos los 
    //parámetros de la cadena de consulta como opciones 
     
    const getForecastParameters =  queryString.stringify({
        latitude,
        longitude,
        hourly,
        dialy,
        timezone,
        start_date,
        end_date,
    }, {arrayFormat: "comma"});
    console.log("getForecastParameters: " + getForecastParameters)

    fetch(getForecastURL + "?" + getForecastParameters, {method: "GET", compress: true})
    .then((res) => res.json())
    .then((data) => console.log(data))
    .then((data) => setForecastData(data))


    /*
    .then((result) => {
        console.log("FETCH: result.json()")
       result.json()
    })
    .then((json) => console.log(json)) 
    .then((result) => {
        setResponse(result);
    })
    .catch(() => setHasError(true))
    console.log(JSON.stringify(response))
    */
    return (
        <div>
           Fetch
        </div>
        
    )

}

export default FetchForecast
//https://api.tomorrow.io/v4/timelines?apikey=ryo20D3hDThJDKt0zPQka1TgkyUGFT5B&location=63c42f917cbd99c48eeab3a8&fields=weatherCode&units=metric
