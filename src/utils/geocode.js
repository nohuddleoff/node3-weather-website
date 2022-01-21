const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGltYnVrMiIsImEiOiJja3lncXkya3kwZ2NiMnFuczVmc2FmNGQ2In0.yINTTmvSHyZkb5bTyq1ILw&limit=1'
    request({url, json: true}, (error, {body} ={}) => {
        // const center = (response.body.features[0].center)
        // console.log(center[1], center[0])
        if (error){
            return callback('Unable to connect Geo Service', undefined)
        }

        if (body.features.length === 0){
            return callback('Unable to find the location.  Try different place', undefined)
        }

        callback(undefined, {
            lat: body.features[0].center[1],
            lon: body.features[0].center[0],
            location: body.features[0].place_name
        })
    })
}

module.exports = geocode