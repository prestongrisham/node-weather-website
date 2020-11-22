const request = require('request')

const geocode = (address, callback) => {
	const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicHJlc3RvbmdyaXNoYW0iLCJhIjoiY2tobzc0ZGE5MDY5ZjJ4bGFlaGU0MnJrYiJ9.84a1OxN232L0kNZcH1YT2g&limit=1`
	request({ url: mapboxURL, json: true }, (error, response, body) => {
		if (error) {
			//console.error('error:', error); // Print the error if one occurred
			callback('Unable to connect to location services', undefined)
		} else if (body.features.length === 0) {
			callback('Unable to find location', undefined)
		} else {
			callback(undefined, {
				latitude: body.features[0].center[0],
				longitude: body.features[0].center[1],
				location: body.features[0].place_name
			})
		}
	})
}

module.exports = geocode