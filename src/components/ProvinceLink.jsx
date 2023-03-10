import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const ProvinceLink = ({ province }) => {
    const provinceName = province.label
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [provinceData, setProvinceData] =useState(null)
    useEffect(()=> {
        const URL = `https://geocoding-api.open-meteo.com/v1/search?name=${provinceName}&language=es&count=1`
        //const result =  axios.get(URL)
        fetch(URL)
        .then((res) => res.json())
        .then((data) => setProvinceData(data.results[0]))
        // .then(setLatitude(provinceData.latitude))
        // .then(setLongitude(provinceData.longitude))
        //.then((data) => setLatitude(data.results.latitude))
        // .then((data) => setLongitude(data.longitude))
        //.then(console.log("Latitude: "+latitude))
        // .then(console.log("Longitude: "+longitude))
    },[])
    console.log(provinceData)
    if(provinceData){
        setLatitude(provinceData.latitude)
        console.log(latitude)
    }
    
    
    return (
        //key={province.fields.codigo}
        <li key={province.code} className="provinces-list__province">
            <Link className='option__link' to={`/prediccion/${latitude}/${longitude}`}>
                {provinceName}
            </Link>
        </li>    
    )
    
}
export default ProvinceLink