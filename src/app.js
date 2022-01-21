const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//routing to root
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Michael'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Michael'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is a Helpful message',
        title: 'Help',
        name: 'Michael'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an Address'
        })
    }

    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
        
        forecast(lat, lon, (error, forecastData) => {
            if (error){
                return res.send({
                    error
                })
            }
    
            res.send({
                forecast: forecastData,
                location
            })
        })
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Michael'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Michael'
    })
})

app.listen(port, () => {
    console.log("Server is up and running at port " + port)
})