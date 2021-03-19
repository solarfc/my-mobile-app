import React from "react";
import Header from "./header";
import {connect} from "react-redux";
import {fetchCurrencyWeather} from "../../reducers/weatcher-reducer";
import {fetchForecastWeather} from "../../reducers/position-reducer";

const HeaderContainer = ({fetchCurrencyWeather, fetchForecastWeather}) => {

    return (
        <Header fetchCurrencyWeather={fetchCurrencyWeather}
                fetchForecastWeather={fetchForecastWeather}
        />
    )
};

export default connect(null, {fetchCurrencyWeather, fetchForecastWeather})(HeaderContainer);