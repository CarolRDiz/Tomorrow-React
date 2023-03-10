import React, { useEffect } from 'react'
import { useState } from 'react'
import queryString from 'query-string';
import axios from 'axios'
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import ProvinceLink from '../components/ProvinceLink'

const Busqueda = () => {
  const [provinces, setProvinces] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [communities, setCommunities] = useState([])
  const [communityOptions, setCommunityOptions] = useState([])
  const [search, setSearch] = useState('')
  const [communitySelected, setCommunitySelected] = useState("")
  const allCommunities =
    [
      {
        "parent_code": "0",
        "label": "Andalucía",
        "code": "01"
      },
      {
        "parent_code": "0",
        "label": "Aragón",
        "code": "02"
      },
      {
        "parent_code": "0",
        "label": "Asturias, Principado de",
        "code": "03"
      },
      {
        "parent_code": "0",
        "label": "Balears, Illes",
        "code": "04"
      },
      {
        "parent_code": "0",
        "label": "Canarias",
        "code": "05"
      },
      {
        "parent_code": "0",
        "label": "Cantabria",
        "code": "06"
      },
      {
        "parent_code": "0",
        "label": "Castilla y León",
        "code": "07"
      },
      {
        "parent_code": "0",
        "label": "Castilla - La Mancha",
        "code": "08"
      },
      {
        "parent_code": "0",
        "label": "Cataluńa",
        "code": "09"
      },
      {
        "parent_code": "0",
        "label": "Comunitat Valenciana",
        "code": "10"
      },
      {
        "parent_code": "0",
        "label": "Extremadura",
        "code": "11"
      },
      {
        "parent_code": "0",
        "label": "Galicia",
        "code": "12"
      },
      {
        "parent_code": "0",
        "label": "Madrid, Comunidad de",
        "code": "13"
      },
      {
        "parent_code": "0",
        "label": "Murcia, Región de",
        "code": "14"
      },
      {
        "parent_code": "0",
        "label": "Navarra, Comunidad Foral de",
        "code": "15"
      },
      {
        "parent_code": "0",
        "label": "País Vasco",
        "code": "16"
      },
      {
        "parent_code": "0",
        "label": "Rioja, La",
        "code": "17"
      },
      {
        "parent_code": "0",
        "label": "Ceuta",
        "code": "18"
      },
      {
        "parent_code": "0",
        "label": "Melilla",
        "code": "19"
      }
  ]
  const allProvinces = [
    {
      "parent_code": "01",
      "code": "04",
      "label": "Almería",
    },
    {
      "parent_code": "01",
      "code": "11",
      "label": "Cádiz"
    },
    {
      "parent_code": "01",
      "code": "14",
      "label": "Córdoba"
    },
    {
      "parent_code": "01",
      "code": "18",
      "label": "Granada"
    },
    {
      "parent_code": "01",
      "code": "21",
      "label": "Huelva"
    },
    {
      "parent_code": "01",
      "code": "23",
      "label": "Jaén"
    },
    {
      "parent_code": "01",
      "code": "29",
      "label": "Málaga"
    },
    {
      "parent_code": "01",
      "code": "41",
      "label": "Sevilla"
    },
    {
      "parent_code": "02",
      "code": "22",
      "label": "Huesca"
    },
    {
      "parent_code": "02",
      "code": "44",
      "label": "Teruel"
    },
    {
      "parent_code": "02",
      "code": "50",
      "label": "Zaragoza"
    },
    {
      "parent_code": "03",
      "code": "33",
      "label": "Oviedo"
    },
    {
      "parent_code": "04",
      "code": "07",
      "label": "Islas Baleares"
    },
    {
      "parent_code": "05",
      "code": "35",
      "label": "Las Palmas de Gran Canaria"
    },
    {
      "parent_code": "05",
      "code": "38",
      "label": "Santa Cruz de Tenerife"
    },
    {
      "parent_code": "06",
      "code": "39",
      "label": "Santander"
    },
    {
      "parent_code": "07",
      "code": "05",
      "label": "Ávila"
    },
    {
      "parent_code": "07",
      "code": "09",
      "label": "Burgos"
    },
    {
      "parent_code": "07",
      "code": "24",
      "label": "León"
    },
    {
      "parent_code": "07",
      "code": "34",
      "label": "Palencia"
    },
    {
      "parent_code": "07",
      "code": "37",
      "label": "Salamanca"
    },
    {
      "parent_code": "07",
      "code": "40",
      "label": "Segovia"
    },
    {
      "parent_code": "07",
      "code": "42",
      "label": "Soria"
    },
    {
      "parent_code": "07",
      "code": "47",
      "label": "Valladolid"
    },
    {
      "parent_code": "07",
      "code": "49",
      "label": "Zamora"
    },
    {
      "parent_code": "08",
      "code": "02",
      "label": "Albacete"
    },
    {
      "parent_code": "08",
      "code": "13",
      "label": "Ciudad Real"
    },
    {
      "parent_code": "08",
      "code": "16",
      "label": "Cuenca"
    },
    {
      "parent_code": "08",
      "code": "19",
      "label": "Guadalajara"
    },
    {
      "parent_code": "08",
      "code": "45",
      "label": "Toledo"
    },
    {
      "parent_code": "09",
      "code": "08",
      "label": "Barcelona"
    },
    {
      "parent_code": "09",
      "code": "17",
      "label": "Girona"
    },
    {
      "parent_code": "09",
      "code": "25",
      "label": "Lleida"
    },
    {
      "parent_code": "09",
      "code": "43",
      "label": "Tarragona"
    },
    {
      "parent_code": "10",
      "code": "03",
      "label": "Alicante"
    },
    {
      "parent_code": "10",
      "code": "12",
      "label": "Castelló de la Plana"
    },
    {
      "parent_code": "10",
      "code": "46",
      "label": "Valencia"
    },
    {
      "parent_code": "11",
      "code": "06",
      "label": "Badajoz"
    },
    {
      "parent_code": "11",
      "code": "10",
      "label": "Cáceres"
    },
    {
      "parent_code": "12",
      "code": "15",
      "label": "La Coruña"
    },
    {
      "parent_code": "12",
      "code": "27",
      "label": "Lugo"
    },
    {
      "parent_code": "12",
      "code": "32",
      "label": "Orense"
    },
    {
      "parent_code": "12",
      "code": "36",
      "label": "Pontevedra"
    },
    {
      "parent_code": "13",
      "code": "28",
      "label": "Madrid"
    },
    {
      "parent_code": "14",
      "code": "30",
      "label": "Murcia"
    },
    {
      "parent_code": "15",
      "code": "31",
      "label": "Pamplona"
    },
    {
      "parent_code": "16",
      "code": "01",
      "label": "Alava"
    },
    {
      "parent_code": "17",
      "code": "26",
      "label": "Logroño"
    },
    {
      "parent_code": "18",
      "code": "51",
      "label": "Ceuta"
    },
    {
      "parent_code": "19",
      "code": "52",
      "label": "Melilla"
    }
  ]
  useEffect(() => {
    setCommunityOptions(allCommunities)
    setCommunities(allCommunities)
    setProvinces(allProvinces)
    setIsLoading(false)
  }, []
  )
  useEffect(() => {
    console.log("FILTRANDO")
    var provinces_filter = allProvinces
    var communities_filter = allCommunities
    console.log(communities_filter)

    if (search) {
      provinces_filter = provinces_filter.filter(province => province.label.toLowerCase().includes(search.toLowerCase()))
      //setProvinces(provinces_filter)
      communities_filter = communities_filter.filter(community => provinces_filter.filter(province => province.parent_code == community.code).length != 0)
      //setCommunities(communities_filter)
    }
    if (communitySelected){
      console.log("IF COMMUNITY SELECTED")
      console.log(communitySelected)
      communities_filter = communities_filter.filter(community => community.label==communitySelected)
      console.log(communities_filter)
    }

    setProvinces(provinces_filter)
    setCommunities(communities_filter)
  }, [search,communitySelected])

  const filterProvinces = async (e) => {
    e.preventDefault()
    console.log(e.target.value)
    let forecastURL = getForecastURL + "?" + getForecastParameters;
    const result = await axios.get(forecastURL)
  }
  const handleChange = (e) => {
    if (e.target.name == "search") {
      setSearch(e.target.value)
    }
    if (e.target.name =="select__communities") {
      console.log("setCommunitySelected")
      console.log(e.target.value)
      setCommunitySelected(e.target.value)
    }
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
      <section className='main__search'>
        <input
          name='search'
          type='text'
          className='provinces__search'
          placeholder='Introduce una provincia para ver su predicción'
          onChange={(e) => handleChange(e)}
          value={search}
        />
        <select name="select__communities"
          onChange={(e) => handleChange(e)} >
          <option value=''>Selecciona CCAA</option>
          {communityOptions.map((community) => (
            <option value={community.label}>{community.label}</option>
          )
          )}
        </select>
      </section>
      {provinces.length != 0 ?
        <section className="main__ccaa-section">
          <article className="ccaa-section__list">
            {communities.map((community) => (
              <div className="list__ccaa-div">
                <p className="ccaa-div__link" href="#">{community.label}</p>
                <ul className="ccaa-div__provinces-list">
                  {
                    provinces.filter(province => province.parent_code == community.code)
                      .map((province) => (
                        <li key={province.code} className="provinces-list__province">
                          <Link className='option__link' to={`/prediccion/${community.label}/${province.label}`}>
                            {province.label}
                          </Link>
                        </li>
                      )
                      )
                  }
                </ul>
              </div>
            ))}
          </article>
        </section>
        :
        <span>La búsqueda no ha dado resultados</span>
      }
    </main>


    //<App apikey={apikey} lat={lat} lon={lon} location={location} />
  )
}

export default Busqueda