const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f34102948eae846fd35b1d937bd28a84&query=' + latitude + ',' + longitude

    request(url, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (JSON.parse(body).error) {
            console.log(JSON.parse(body).error)
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, JSON.parse(body).current.weather_descriptions + ' It is currently ' + JSON.parse(body).current.temperature + ' degress out. There is a ' + JSON.parse(body).current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast