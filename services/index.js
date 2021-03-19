import * as axios from "axios";

const _appid = '&appid=b8d83f4dee79d550cdf1513b6258ce5f&units=metric&lang=ru';
const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
});

export const getPosition = (lat, lon) => {
    return instance.get(`weather?lat=${lat}&lon=${lon}${_appid}`)
        .then(res => res)
        .catch(error => error);
};

export const getWeather = (lat, lon) => {
    return instance.get(`onecall?lat=${lat}&lon=${lon}${_appid}`)
        .then(res => res)
        .catch(error => error);
};
//
// axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=46.430006&lon=30.7458808&appid=b8d83f4dee79d550cdf1513b6258ce5f&units=metric&lang=ru')
// .then(res => console.log(res));
