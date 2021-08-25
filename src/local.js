import React from "react";
import { CurrentDate } from "./current-date";
import { useEffect, useState } from "react";
import { Card, CardGroup } from "react-bootstrap";
import cloudy from './_images/cloudy.png';
import partlyCloudy from './_images/partly-cloudy.png';
import rainy from './_images/rainy.png';
import stormy from './_images/stormy.png';
import sunny from './_images/sunny.png';
import './local.css';
import { CityContext } from "./App";

export function Local() {

    /* Load the entire data object - could use Axios here, but this is a pretty simple request */ 
    const API_URL = "https://wttr.in/Detroit?format=j1";
    const [weather, setWeather] = useState({});  // initialize as empty object

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setWeather(data.current_condition[0]);
            console.log(data.current_condition[0]);
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

    return (
        <CityContext.Consumer>
            {({ citySelected }) => (
                <section>
                    <div className="forecast">
                        <h2>Local weather forecast ( {citySelected} )</h2>
                        <CurrentDate />
                        <div>
                            {!weather.FeelsLikeF ? (
                                <div>loading...</div> 
                            ) : (
                                <div>
                                    <CardGroup className="localWeatherCardGroup">
                                        <Card className="localWeatherCard">
                                            <Card.Img variant="top" src={renderWeatherIcon(weather.weatherDesc[0].value)} />
                                            <Card.Body>
                                                <Card.Text className="boldCenter">
                                                {weather.weatherDesc[0].value}, {weather.FeelsLikeF}F
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        <Card className="localWeatherCard">
                                            <Card.Body>
                                                <Card.Title>Detailed weather</Card.Title>
                                                <Card.Text><b>Humidity: </b>{weather.humidity}%</Card.Text>
                                                <Card.Text><b>Cloud cover: </b>{weather.cloudcover}%</Card.Text>
                                                <Card.Text><b>Precipitation: </b>{weather.precipInches} in</Card.Text>
                                                <Card.Text><b>Wind: </b>{weather.windspeedMiles} mph, {weather.winddir16Point}</Card.Text>
                                                <Card.Text><b>UV index: </b>{weather.uvIndex}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </CardGroup>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </CityContext.Consumer>
    )
}
