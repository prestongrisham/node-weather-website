const request = require('request')

const forecast = (long, lat, callback) => {
	const weatherURL = `http://api.weatherstack.com/current?access_key=e6032d28fb2ed8f37fe20c4546d216e4&query=${lat},${long}&units=f`
	//console.log(weatherURL)
	request({ url: weatherURL, json: true }, (error, response, body) => {
		
		if (error) {
			//console.error('error:', error); // Print the error if one occurred
			callback('Unable to connect to weather service.', undefined)
		} else if (body.success == false){
			//console.log('Error finding location with coordinates')
			callback('Error finding location with coordinates', undefined)
		}else {			  
			//console.log(body.request.query)	  
			//console.log("Currently in " + body.location.name + " it is " + body.current.weather_descriptions[0] + " and " + body.current.temperature + " and feels like " + body.current.feelslike)
			callback(undefined, "Currently in " + body.location.name + " it is " + body.current.weather_descriptions[0] + " and " + body.current.temperature + " and feels like " + body.current.feelslike)
		}
	})
}

module.exports = forecast
