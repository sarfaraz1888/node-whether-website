const request =require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/fd7ce44f34b957a6a85269bead481ac4/'+ latitude +','+ longitude+'?units=us'
    request ({url : url , json: true }, (error, {body}) =>{
        if(error){
            callback('Unable to connect to whether service', undefined)
        }
        else if(body.error){
            callback('Unable to find the location. Try another search..', undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary + 'It is currently '+ body.currently.temperature +" degrees out. There is a "+ body.currently.precipProbability + " % chance of rain")
        }
    })
}
module.exports = forecast