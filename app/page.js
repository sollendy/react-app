"use client"
import Image from 'next/image'
import styles from './page.module.css'
import axios, { all } from 'axios'
import { useEffect, useState } from 'react';


export default function Home() {
  const [meteo, setMeteo] = useState(null);
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  
  function getMeteo(lat, lon) {
    
    let resultEl = document.getElementById("risultato")
    if (lat !== undefined && lat !== null && lon !== undefined && lon !== null) {
      if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
        axios.get(`http://localhost:2800/world?lat=${lat}&lon=${lon}`).then(response => {
          //console.log('jhyfjhf', response);
          setMeteo(response.data);
          resultEl.style.display = "block";
          resultEl.innerHTML = `
            <p>Our location is: <b>${response.data.timezone}</b></p>
            <p>The weather is:<br>
              <b>${response.data.current.weather[0].main}</b><br>
              <b>${response.data.current.weather[0].description}</b><br>
              <span>Temperature: <b>${response.data.current.temp}K</b></span><br>
              <span>Feels like: <b>${response.data.current.feels_like}K</b></span><br>
              <span>Clouds: <b>${response.data.current.clouds}%</b></span><br>
              <span>Humidity: <b>${response.data.current.humidity}%</b></span><br>
              <span>Wind Speed: <b>${response.data.current.wind_speed}mph</b></span><br>
            </p>
            
          `
          //console.log("Iris fritta")
        }).catch((e) => {
          resultEl.style.display = "block"
          resultEl.innerHTML = `
            <h3>server non disponibile, riprovare più tardi.</h3>
          `
          //console.log("cassata al forno")
        })
      } else {
        resultEl.style.display = "block"
        resultEl.innerHTML = `
          <h3>dati non validi!</h3>
        `
        //console.log("cannolo di Piana")
      }
    } 
  }
  
  return (
  <div className={styles.body}> 
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
      crossOrigin="anonymous"
    />
    <main className={styles.main}>
      <h1>Random Weather!</h1>
      <form className={styles.form_area}>
        <div className='latitudine'>
          <label>Please give me a latitude value: </label>
          <input type='number' value={lat} min="-90" max="90" placeholder=' lat' required onChange={(e) => setLat(e.target.value)} /> 
        </div>
        <div className='longitudine'>
          <label>Please give me a longitude value: </label>
          <input type='number' value={lon} min="-180" max="180" placeholder=' lon' required onChange={(e) => setLon(e.target.value)}/> 
        </div>
          <button className={styles.form_btn} type="button" onClick={() => getMeteo(lat, lon)}>confirm!</button>
      </form>
      {meteo?.data?.con}
      <div id='risultato'>
      </div>
    </main>
  </div>
  )
}
