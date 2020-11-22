const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Preston Grisham'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Page',
		name: 'Preston Grisham'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		helpMessage: 'This is going to be the help message that appears on the web page that is served up by HBS',
		title: 'Help',
		name: 'Help Master: Preston Grisham'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		})
	}
	
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error })
		}
		forecast(latitude, longitude, (error, data) => {
			console.log(data)

			if (error) {
				return res.send({ error })
			}

			res.send({
				address: req.query.address,
				location: location,
				data: data
			})
			
		})
		
	})
})

app.get('/products', (req,res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	} 
	
	console.log(req.query)
	res.send({
		products: []
	})
})

// 404 Page Routes
app.get('/help/*', (req, res) => {
	res.render('404', {
		errorMessage: 'Help article not found',
		title: '404',
		name: 'Preston Grisham'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		errorMessage: 'Page not found.',
		title: '404',
		name: 'Preston Grisham'
	})
})

// Starting the server
app.listen(3000, () => {
	console.log('The server has started on port 3000')
})
