import React from "react";
import {Text, View, StyleSheet, Image, ScrollView} from "react-native";
import {useFonts} from "expo-font";

const CurrencyWeather = ({data, name}) => {
    const [loaded] = useFonts({
        Geometria: require('../../assets/fonts/Geometria.ttf'),
        GeometriaBold: require('../../assets/fonts/Geometria-Bold.ttf'),
        GeometriaExtraBold: require('../../assets/fonts/Geometria-ExtraBold.ttf')
    });
    const {current, daily, hourly} = data;
    console.log(hourly);

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center'
        },
        name: {
            fontFamily: 'GeometriaBold',
            fontSize: 16
        },
        temp_block: {
            marginTop: 40,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        temp: {
            fontFamily: 'GeometriaExtraBold',
            fontSize: 72
        },
        deg: {
            fontFamily: 'GeometriaExtraBold',
            fontSize: 24,
            marginTop: 10
        },
        img: {
            width: 128,
            height: 128
        },
        desc: {
            fontFamily: 'Geometria',
            fontSize: 18,
            textAlign: 'center'
        },
        block: {
            backgroundColor: 'rgba(224, 238, 249, 0.9)',
            borderRadius: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginVertical: 10,
            marginHorizontal: 10,
            padding: 10
        },
        block_child: {
            width: '50%',
            fontFamily: 'Geometria',
            fontSize: 14,
            marginBottom: 10
        },
    });

    const capitalizeStr = (str) => {
        return str.split(' ').map(item => {
            return item[0].toUpperCase() + item.slice(1)
        }).join(' ');
    };

    const windDirection = (deg) => {
        if(deg === 360 || deg === 0) {
            return "Северный"
        } else if(deg === 90) {
            return "Восточный"
        } else if(deg === 180) {
            return "Южный"
        } else if(deg === 270) {
            return "Западный"
        } else if(deg > 0 && deg < 90) {
            return "Северо Восточный"
        } else if(deg > 90 && deg < 180) {
            return "Юго Восточный"
        } else if(deg > 180 && deg < 270) {
            return "Юго Западный"
        } else if(deg > 270 && deg < 360) {
            return "Северо Западный"
        }
    };

    const dateTransform = (date) => {
        const newDate = new Date(date * 1000);
        let day = newDate.getDate() > 9 ? newDate.getDate() : `0${newDate.getDate()}`,
            month = newDate.getMonth() + 1 > 9 ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`,
            year = newDate.getFullYear();

        return `${day}.${month}.${year}`;
    };

    const timeTransform = (date) => {
        const newDate = new Date(date * 1000),
            hour = newDate.getHours() > 9 ? newDate.getHours() : `0${newDate.getHours()}`,
            minutes = newDate.getMinutes() > 9 ? newDate.getMinutes() : `0${newDate.getMinutes()}`;

        return `${hour}:${minutes} `
    }

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <ScrollView>
                <View style={styles.temp_block}>
                    <Text style={styles.temp}>{Math.round(current.temp)}</Text>
                    <Text style={styles.deg}>&#176;C</Text>
                </View>
                <Text style={{textAlign: 'center'}}>{timeTransform(current.dt) + dateTransform(current.dt)}</Text>
                <View style={styles.container}>
                    <Image style={styles.img}
                           source={{uri: `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${current.weather[0].icon}.png`}}
                    />
                </View>
                <Text style={styles.desc}>{capitalizeStr(current.weather[0].description)}</Text>
                <Text>Рассвет: {timeTransform(current.sunrise)}</Text>
                <Text>Закат: {timeTransform(current.sunset)}</Text>
                <View style={styles.block}>
                    <Text style={styles.block_child}>Ощущается: {Math.floor(current.feels_like)}&#176;C</Text>
                    <Text style={styles.block_child}>Скорость ветра: {current.wind_speed} м/с {windDirection(current.wind_deg)}</Text>
                    <Text style={styles.block_child}>Видимость: {current.visibility / 1000} км</Text>
                    <Text style={styles.block_child}>Влажность: {current.humidity}%</Text>
                    <Text style={styles.block_child}>Давление: {current.pressure} гПа</Text>
                    <Text style={styles.block_child}>УФ-индекс: {Math.floor(current.uvi)}</Text>
                </View>
                <ScrollView horizontal={true} >
                    <View style={{flexDirection: 'row'}}>
                        {
                            daily.map(item => {
                                return <View key={item.dt} >
                                    <Text>{dateTransform(item.dt)}</Text>
                                    <Text>{Math.floor(item.temp.min)}&#176;C {Math.round(item.temp.max)}&#176;C</Text>
                                    <Image style={styles.img}
                                           source={{uri: `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${item.weather[0].icon}.png`}}
                                    />
                                </View>
                            })
                        }
                    </View>
                </ScrollView>
                <ScrollView horizontal={true}>
                    {
                        hourly.map(item => {
                            return <View key={item.dt}>
                                <Text>{timeTransform(item.dt)}</Text>
                                <Text>{Math.round(item.temp)}&#176;C</Text>
                                <Image style={styles.img}
                                       source={{uri: `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${item.weather[0].icon}.png`}}
                                />
                            </View>
                        })
                    }
                </ScrollView>
            </ScrollView>
        </View>
    )
};

export default CurrencyWeather;