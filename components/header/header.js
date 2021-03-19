import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import Geolocation from "react-native-geolocation-service";

const Header = ({fetchCurrencyWeather, fetchForecastWeather}) => {

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [city, setCity] = useState('');

    const setPosition = (lat, lon) => {
        setLatitude(lat);
        setLongitude(lon);
        if(lat.length !== 0 && lon.length !== 0) {
            fetchCurrencyWeather(lat, lon);
        }
    };

    useEffect(() => {
        // fetchCurrencyWeather('Odessa');
        // fetchForecastWeather('Odessa');
        navigator.geolocation.getCurrentPosition(
            (position) => setPosition(position.coords.latitude, position.coords.longitude),
            (err) => console.log(err),
            { enableHighAccuracy: false, timeout: 8000, maximumAge: 10000 }
        );
        // });
    }, []);


    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        input: {
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: '#000',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderTopLeftRadius: 5
        },
        button: {
            fontSize: 16,
            fontWeight: '500',
            backgroundColor: 'tomato',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderBottomRightRadius: 5,
            // borderTopRightRadius: 5
        }
    });

    const handleChange = (text) => {
        setCity(text);
    };

    const handlePress = () => {
        fetchCurrencyWeather(city);
        fetchForecastWeather(city);
        setCity('');
    };

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your city"
                    value={city}
                    onChangeText={(text) => handleChange(text)}
                />
            </View>
            <View>
                <Text style={styles.button}
                      onPress={() => handlePress()}
                >
                    Search
                </Text>
            </View>
        </View>
    )
};

export default Header;