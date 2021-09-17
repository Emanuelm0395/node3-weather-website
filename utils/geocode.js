const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZW1hbnVlbG0wOTUiLCJhIjoiY2t0Mjh0dTliMG15MTJ6b3RhNndidDkzYiJ9.szVysYHPrSli0a7xgi3OkQ'
    request(url, (error, response, body) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (JSON.parse(body).features[0] == null || JSON.parse(body).features[0].center == undefined) {
            // console.log(response)
            // console.log(body)
            // console.log(error)
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: JSON.parse(body).features[0].center[1],
                longitude: JSON.parse(body).features[0].center[0],
                location: JSON.parse(body).features[0].place_name
            })
        }
    })
}

module.exports = geocode