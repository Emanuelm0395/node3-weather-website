const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { send } = require('process')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({
            error:'U must to provide the address for the forecast'
        })
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        if (latitude != undefined) {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }

                return res.send({
                    location,
                    forecast: forecastData
                })
            })
        }
    })
    
})

app.get('/products', (req,res) => {
    var queryParameters
    if(!req.query.search)       //This is a very common pattern in express. First you check if the parameters exists, and if not, u return the error. If the parameter exists, the code are gonna run well
        return res.send({
            error:'U must to send some search term'
        })    
    queryParameters = req.query

    console.log(queryParameters)
    res.send({
        products:[]
    })
})

app.post('/postTest', (req, res) => {

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up in port ' + port)
})