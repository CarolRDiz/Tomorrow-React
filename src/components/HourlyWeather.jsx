import React, { useEffect } from 'react'
import { useState } from 'react'

const HourlyWeather = (props) => {
    const hourItems = props.hourItems.map((hourItem, index) => {
        return <li className="hourlyWeather__li" key={index}>
                <div className='hourlyWeather__date'>
                    <span className='hourlyWeather__day'>{props.getDateComplete(hourItem)}</span>
                    <span className='hourlyWeather__hours'>{props.getHoursfromDate(hourItem)}</span>   
                </div>
                <span>{ props.temperatureItems[index]} º</span>
            </li>
    })
    return (
        <div className='hourlyWeather'>
            <h2>Temperatura por horas</h2>
            <ul className='hourlyWeather__ul'>
                {hourItems}
            </ul>
            <div className='hourlyWeather__buttons'>
                <button onClick={props.prevHandler}>Prev</button>
                <button onClick={props.nextHandler}>Next</button>    
            </div>
            <span>Página: {props.currentPage}</span>
        </div>
            
    )
    
}
export default HourlyWeather