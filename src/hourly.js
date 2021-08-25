import React from "react";
import { useState, useEffect } from "react";
import { CurrentDate } from "./current-date";
import { CardGroup, Card } from "react-bootstrap";
import cloudy from './_images/cloudy.png';
import partlyCloudy from './_images/partly-cloudy.png';
import rainy from './_images/rainy.png';
import stormy from './_images/stormy.png';
import sunny from './_images/sunny.png';
import "./hourly.css";
import { CityContext } from './App';

export function Hourly() {

    /* Load the entire data object - could use Axios here, but this is a pretty simple request  */
    /* Need to chunk this API URL and pull city from CityContext */
    const API_URL = "https://wttr.in/Detroit?format=j1";
    const [hourlyWeather, setHourlyWeather] = useState({});  // initialize as empty object
     
    useEffect(() => {
        loadData();
    }, []);
     
    const loadData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setHourlyWeather(data.weather[0]);
            console.log(data.weather[0]);
        } catch (error) {
            console.log("error", error);
        }
    }    

    function renderWeatherIcon(param) {
        switch(param) {
            case 'Sunny':
                return sunny;
            case 'Patchy rain possible':
                return rainy;
            case 'Mist':
                return rainy;
            case 'Partly cloudy':
                return partlyCloudy;
            case 'Cloudy':
                return cloudy;
            case 'Stormy':
                    return stormy;                
            default:
                return sunny;
        }
    }

    function renderTime(time) {
        switch(time) {
            case '0':
                return '12:00am';
            case '300':
                return '3:00am';
            case '600':
                return '6:00am';
            case '900':
                return '9:00am';
            case '1200':
                return '12:00pm';
            case '1500':
                return '3:00pm';
            case '1800':
                return '6:00pm';
            case '2100':
                return '9:00pm';
            default:
                return 'Unknown';
        }
    }


    return (
        <CityContext.Consumer>
            {({ citySelected }) => (
                <section>
                    <div>
                        {!hourlyWeather.hourly ? (
                            <div>loading...</div> 
                        ) : (
                            <div className="forecast">
                                <h2>Hourly weather forecast ( {citySelected} )</h2>
                                <CurrentDate />, <b>Average temp: </b>{hourlyWeather.avgtempF}F
                                <hr />
                                <CardGroup className="weatherCardGroup">
                                    {hourlyWeather.hourly.map((hour, index) => (
                                        <Card key={index} className="weatherCard">
                                            <Card.Img variant="top" src={renderWeatherIcon(hour.weatherDesc[0].value)} />
                                            <Card.Body>
                                                <p>{renderTime(hour.time)}</p>
                                                <p><b>Feels like: </b>{hour.FeelsLikeF}</p>
                                                <p><b>Wind: </b>{hour.WindGustMiles} mph</p>
                                                <p><b>Rain: </b>{hour.chanceofrain}%, {hour.precipInches} in</p>
                                                <p>{hour.weatherDesc[0].value}</p>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </CardGroup>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </CityContext.Consumer>
    )
}
