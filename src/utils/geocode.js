const request =require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2FyZmFyYXo5NyIsImEiOiJjazZvbDhqdTUwaGc5M25wOWt0a3dlY2pqIn0.1jUk5svk12rKhu4K0KhYmQ'
    request ({url, json: true }, (error, {body}) =>{
        console.log(body)
        if(error){
            callback('Unable to connect to location service', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find the location. Try another search..', undefined)
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}
module.exports = geocode