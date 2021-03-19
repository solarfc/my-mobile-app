import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Text} from "react-native";
import {fetchWeather} from "../../reducers/weatcher-reducer";
import CurrencyWeather from "../currency-weather/currency-weather";
import {fetchPosition} from "../../reducers/position-reducer";

const WeatherContainer = ({weather: {data, error, loading}, position: {data: {name}}, fetchWeather, fetchPosition}) => {

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {coords: {latitude, longitude}} = position;
                fetchWeather(latitude, longitude);
                fetchPosition(latitude, longitude);
            },
            (err) => console.log(err),
            { enableHighAccuracy: false, timeout: 8000, maximumAge: 10000 }
        );
    }, []);

    if(loading) {
        return <Text>Обновление</Text>
    }

    if(error) {
        return <Text>Sorry, something went wrong</Text>
    }

    return (
        <CurrencyWeather data={data} name={name}/>
    )
};

const mapStateToProps = state => {
    return {
        weather: state.weather,
        position: state.position
    }
};

export default connect(mapStateToProps, {fetchWeather, fetchPosition})(WeatherContainer);