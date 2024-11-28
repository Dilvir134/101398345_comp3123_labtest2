import React, {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'


const Weather = ({city}) => {

    const [weather, setWeather] = React.useState();
    const [weatherForecast, setWeatherForecast] = React.useState([]);
    const [isValidCity, setIsValidCity] = React.useState(false);
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const weekdayShort = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    useEffect(() => {
        const updateWeatherData = async () => {
            await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=706e47bb3bbecfeb0e8785896e22165a')
                .then(res => {
                    if (res.status === 200) {
                        setWeather(res.data);
                        setIsValidCity(true);
                    }
                    else {
                        setIsValidCity(false);
                        setWeather(null);
                    }
                })
                .catch(err => console.log(err))
        };
        updateWeatherData();
    }, [city]);

    useEffect(() => {
        const updateForecastData = async () => {
            if (!weather?.coord) return;

            const forecastRes = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&appid=706e47bb3bbecfeb0e8785896e22165a`
            );

            if (forecastRes.status === 200) {
                const nextFiveWeather = [];
                let prevDay = -1;

                forecastRes.data.list.forEach((weather) => {
                    const date = new Date(weather.dt * 1000);
                    if (prevDay === -1) {
                        prevDay = date.getDay();
                        return;
                    }
                    if (date.getDay() !== prevDay) {
                        prevDay = date.getDay();
                        nextFiveWeather.push(weather);
                    }
                });

                setWeatherForecast(nextFiveWeather);
            }
        };

        updateForecastData();
    }, [weather]);


    const date = new Date((weather?.dt) * 1000);



    return (
        <div className="container mt-5">

            <div className={isValidCity ? "row" : "row d-none"}>
                <div className="col-md-4">
                    <div className="card bg-dark text-light rounded-4 p-4">
                        <h5>
                            {
                                weekday[date.getDay()]
                            }
                        </h5>
                        <p className="mb-1">
                            {
                                date.toLocaleTimeString()
                            }
                        </p>
                        <p className="mb-4">{weather?.name}</p>
                        <div className="d-flex align-items-center">
                            <img src={'https://openweathermap.org/img/wn/' + weather?.weather[0].icon + '@2x.png'}/>
                            <h1 className="display-3 mb-0">{Math.round(weather?.main.temp)}°C</h1>
                        </div>
                        <p className="mt-3 fs-4">{weather?.weather[0].description}</p>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card rounded-4 p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            {weather?.name}
                        </div>

                        <div className="d-flex justify-content-between mb-4">
                            <div className="text-center">
                                <img style={{width: "50px", height: "50px"}} src={'https://openweathermap.org/img/wn/' + weather?.weather[0].icon + '@2x.png'}/>
                                <p className="mb-0">{weekdayShort[date.getDay()]}</p>
                                <p className="mb-0">{Math.round(weather?.main.temp)}°C</p>
                            </div>
                            <div className="text-center">
                                <img style={{width: "50px", height: "50px"}}
                                     src={'https://openweathermap.org/img/wn/' + weatherForecast[0]?.weather[0].icon + '@2x.png'}/>
                                <p className="mb-0">{weekdayShort[new Date(weatherForecast[0]?.dt * 1000).getDay()]}</p>
                                <p className="mb-0">{Math.round(weatherForecast[0]?.main.temp)}°C</p>
                            </div>
                            <div className="text-center">
                                <img style={{width: "50px", height: "50px"}}
                                     src={'https://openweathermap.org/img/wn/' + weatherForecast[1]?.weather[0].icon + '@2x.png'}/>
                                <p className="mb-0">{weekdayShort[new Date(weatherForecast[1]?.dt * 1000).getDay()]}</p>
                                <p className="mb-0">{Math.round(weatherForecast[1]?.main.temp)}°C</p>
                            </div>
                            <div className="text-center">
                                <img style={{width: "50px", height: "50px"}}
                                     src={'https://openweathermap.org/img/wn/' + weatherForecast[2]?.weather[0].icon + '@2x.png'}/>
                                <p className="mb-0">{weekdayShort[new Date(weatherForecast[2]?.dt * 1000).getDay()]}</p>
                                <p className="mb-0">{Math.round(weatherForecast[2]?.main.temp)}°C</p>
                            </div>
                            <div className="text-center">
                                <img style={{width: "50px", height: "50px"}}
                                     src={'https://openweathermap.org/img/wn/' + weatherForecast[3]?.weather[0].icon + '@2x.png'}/>
                                <p className="mb-0">{weekdayShort[new Date(weatherForecast[3]?.dt * 1000).getDay()]}</p>
                                <p className="mb-0">{Math.round(weatherForecast[3]?.main.temp)}°C</p>
                            </div>
                            <div className="text-center">
                                <img style={{width: "50px", height: "50px"}}
                                     src={'https://openweathermap.org/img/wn/' + weatherForecast[4]?.weather[0].icon + '@2x.png'}/>
                                <p className="mb-0">{weekdayShort[new Date(weatherForecast[4]?.dt * 1000).getDay()]}</p>
                                <p className="mb-0">{Math.round(weatherForecast[4]?.main.temp)}°C</p>
                            </div>
                        </div>

                        <div>
                            <h6 className="mb-2">HUMIDITY</h6>
                            <p>{weather?.main.humidity}%</p>
                            <h6 className="mb-2">WIND</h6>
                            <p>{weather?.wind.speed} km/h</p>
                            <h6 className="mb-2">MAX TEMP</h6>
                            <p>{Math.round(weather?.main.temp_max)}°C</p>
                            <h6 className="mb-2">MIN TEMP</h6>
                            <p>{Math.round(weather?.main.temp_min)}°C</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Weather;