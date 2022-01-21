const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=11d3a85bfe17ac5dd09cf3a7e0fc4796&query=' + lat + ',' + lon + '&units=f'

    request({url, json: true}, (error, {body} = {}) =>{
        if (error) {
            return callback('Unable to connet to weather service', undefined)
        }

        if (body.error){
            return callback('Uable to find location', undefined)
        }
        
        callback(undefined, body.current.weather_descriptions[0] +". It is currently " + body.current.temperature + " degrees out in " + body.request.query + ", but It feel like " + body.current.feelslike + " degrees. " +
        "Humidity is " + body.current.humidity + "% and Wind Speed is " + body.current.wind_speed + "mph")
    })
}

module.exports = forecast