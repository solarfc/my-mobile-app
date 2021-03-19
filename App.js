import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from "react-redux";
import store from "./store";
import WeatherContainer from "./components/weather-container";

const App = () => {


    const styles = StyleSheet.create({
        container: {
            height: '100%',
            paddingVertical: 50,
            paddingHorizontal: 15,
        }
    });


    return (

        <Provider store={store}>
            <View style={styles.container}>
                <WeatherContainer />
                {/*<HeaderContainer />*/}
                {/*<CurrencyWeatherContainer />*/}
            </View>
        </Provider>
    );
}


export default App;

// window.state = store;