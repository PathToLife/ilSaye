const axios = require('axios');

const DARKSKY_APIKEY = '3de65ccf187008240d1b31f378c2e853';

let cache = {
    date: null,
    data: null
};

function fahrenheitToCelsius(fTemp) {
    const cTemp = (fTemp - 32) * 5/9;
    return parseFloat(cTemp.toFixed(2));
}

async function getTemperature(long, lat) {

    if (cache.date == null || Date.now() - cache.date > 60 * 1000) {
        console.log('Sending darksky weather request');
        const res = await axios.get(
            `https://api.darksky.net/forecast/${DARKSKY_APIKEY}/${long},${lat}`
        ); // Getting the data from DarkSky
        if (res.status === 200) {
            cache.data = res.data;
            cache.date = Date.now();
        }
    }

    return cache.data !== null ? fahrenheitToCelsius(cache.data.currently.temperature) : 'could not get data';
}

// Testing Socket.io
const notifyWeather = async socket => {
    try {
        const temp = await getTemperature(-36.846773, 174.763057);
        socket.emit("weatherNotification", temp); // Emitting a new message. It will be consumed by the client
    } catch (error) {
        console.error(`Notify Weather Error: ${error}`);
    }
};

module.exports = {
    notifyWeather
};