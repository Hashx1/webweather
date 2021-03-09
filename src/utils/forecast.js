const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4f54b0b4904ec63009e890901ca90813&query=' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } 
        else if (response.body.error) {
            callback('Unable to find location'+url, undefined)
        } 
        else {
            callback(undefined, ' It is currently '+response.body.current.weather_descriptions[0] + ' with '+ response.body.current.temperature +' degree  and '  + response.body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast