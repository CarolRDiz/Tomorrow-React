import React, { useState } from 'react'
import queryString from 'query-string';
import { addHours } from "../utilities";


//https://docs.tomorrow.io/recipes/build-your-own-weather-app-with-one-call

const App = () => {

    const [response, setResponse] = useState({});
    const [hasError, setHasError] = useState(false);

    //Establece el punto final GET de Timelines como la URL de destino
    const getTimelineURL = "https://api.tomorrow.io/v4/timelines";

    //APIKey obtenida en https://app.tomorrow.io/development/keys
    const apikey = "ryo20D3hDThJDKt0zPQka1TgkyUGFT5B";

    /*
    //Lista de ubicaciones
    const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'Accept-Encoding': 'gzip'}
      };
    fetch('https://api.tomorrow.io/v4/locations?apikey=ryo20D3hDThJDKt0zPQka1TgkyUGFT5B', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
      */
    //Escoger una ubicacion con latlong pair
    //let location = [40.758, -73.9855];

    //Escoger una ubicacion con id
    let location = "63c42f917cbd99c48eeab3a8";

    //Lista de campos
    const fields = [
        //"precipitationIntensity",
        //"precipitationType",
        "windSpeed",
        //"windGust",
        "windDirection",
        "temperature",
        //"temperatureApparent",
        //"cloudCover",
        //"cloudBase",
        //"cloudCeiling",
        "weatherCode",
    ];
    // Escoger la unidad del sistema
    const units = "metric";

    // Establecer los intervalos de tiempo, como "current", "1h" y "1d"
    const timesteps = ["current", "1h", "1d"];

    // Configurar el marco de tiempo hasta 6 horas anteriores y 15 días siguientes
    const now = new Date();
    const startTime = now.toISOString();
    const endTime = addHours({ date: now, hours: 6 }).toISOString();

    // Especificar la zona horaria, usando el formato estándar IANA
    const timezone = "Europe/Madrid";

    //Solicitar las líneas de tiempo con todos los 
    //parámetros de la cadena de consulta como opciones 
     
    const getTimelineParameters =  queryString.stringify({
        apikey,
        location,
        fields,
        units,
        timesteps,
        startTime,
        endTime,
        timezone,
    }, {arrayFormat: "comma"});
    console.log("getTimelineParameters: " + getTimelineParameters)

    fetch(getTimelineURL + "?" + getTimelineParameters, {method: "GET", compress: true})
    .then((res) => res.json())
    .then((data) => console.log(data))
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
        <div>a</div>
    )
}

export default App

//https://api.tomorrow.io/v4/timelines?apikey=ryo20D3hDThJDKt0zPQka1TgkyUGFT5B&location=63c42f917cbd99c48eeab3a8&fields=weatherCode&units=metric

curl --request GET --url \
'https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature&timesteps=1h&units=metric&apikey=ryo20D3hDThJDKt0zPQka1TgkyUGFT5B'