import React from 'react';
import axios from 'axios';
import { apiKey } from './setting.js';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name || 'New York',
            weather: {}
        };

        // Bind the event handler methods to the component instance
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // Call the fetchData() method to fetch weather data for the initial city name
        this.fetchData(this.state.name);
    }

    // Define a fetchData() method that fetches weather data for a given city name
    fetchData(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

        axios.get(url)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const weather = res.data;
                    this.setState({ weather });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({ weather: null });
            });
    }

    // Define an event handler method that updates the component state when the user inputs a city name
    handleInputChange(event) {
        const name = event.target.value;
        this.setState({ name });
    }

    // Define an event handler method that fetches weather data for the city name submitted by the user
    handleSubmit(event) {
        event.preventDefault();
        const { name } = this.state;
        this.fetchData(name);
    }

    render() {
        const { name, weather } = this.state;

        if (!weather) {
            // If weather is undefined or null, show an error message
            return <div>Weather data not found for {name}, Refresh in order to search again</div>;
        }

        if (Object.keys(weather).length === 0) {
            // If weather is an empty object, show a loading message
            return <div>Loading...</div>;
        }

        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" onChange={this.handleInputChange} className="search-box" placeholder="City name" />
                    </label>
                    <button type="submit" className="search-button">Search</button>
                </form>
                <div>
                    <br></br>
                    <p>{weather.name}, {weather.sys.country}</p>
                    <br></br>
                    <p>{weather.main.temp}&#176;C</p>
                    <p>{weather.weather[0].description}</p>
                    <p>Feels like {weather.main.feels_like}&#176;C</p>
                </div>
            </>
        );
    }
}

export default Weather;
