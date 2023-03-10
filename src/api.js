import React,{useEffect, useState} from 'react'


/*
  *
  * Obtener JSON de las provincias y comunidades autónomas
  * 
  */
fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=provincias-espanolas&q=&rows=52&sort=provincia&facet=ccaa&facet=provincia")
.then((res) => res.json())
.then((data) => obtenerUbicaciones(data))



/*
*
* Desestructuración del JSON
* 
*/
const obtenerUbicaciones = (data) => {

// Hacemos destructuring
const {
  nhits, parameters, records, facet_groups
} = data

setComunidades(facet_groups[0]["facets"])
setProvincias(records)
console.log(records)
}
/*
*
* Se hace fetch de la provincia elegida y... 
* 
*/
const mostrarProvincia = (provinciaElegida) => {
const [latitude, longitude] = provinciaElegida.fields.geo_point_2d
setProvincia(provinciaElegida)
const resultado = document.querySelector('.resultado')
//resultado.appendChild()
const jsonForecast = fetchForecast(latitude, longitude)
crearProvincia(provinciaElegida, jsonForecast)
}

const crearProvincia = (provinciaElegida, jsonForecast) => {

}
/*
*
* Fetch de la predicción de una provincia
* Devuelve un JSON
* 
*/

const fetchForecast = (latitude, longitude) => {

const [forecastData, setForecastData] = useState({});
const [hasError, setHasError] = useState(false);

//Establece el punto final GET de FORECASTcomo la URL de destino
const getForecastURL = "https://api.open-meteo.com/v1/forecast";
/*
//Escoger una ubicacion con coordenadas. Madrid
let latitude = 40.42;
let longitude = -3.70;
*/

//Variables de tiempo por hora
const hourly = "weathercode"
//Variables de tiempo por día
const dialy = "weathercode"

const timezone="Europe/London"

// Configurar el marco de tiempo hasta 6 horas anteriores y 15 días siguientes
const start_date = "2023-01-17";
console.log("start_date: "+ start_date)
const end_date = "2023-01-19";
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
    forecastData
)
}