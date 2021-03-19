import React from "react";
import {connect} from "react-redux";
import CurrencyWeather from "./currency-weather";


const CurrencyWeatherContainer = ({currency_weather: {loading, error, data}}) => {
    if(loading) {
        return false
    }

    if(error) {
        return <h1>Sorry, something went wrong</h1>
    }

    return (
        <CurrencyWeather data={data} />
    )
};
const mapStateToProps = state => {
    return {
        currency_weather: state.currency_weather,
        forecast_weather: state.forecast_weather
    }
};

export default connect(mapStateToProps, null)(CurrencyWeatherContainer)