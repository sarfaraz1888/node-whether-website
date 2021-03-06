const path = require('path')
const express = require ('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//define paths for express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Whether',
        name : 'Sarfaraz Khan'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title : 'About',
        name : 'Sarfaraz Khan'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title : 'Help',
        name : 'Sarfaraz Khan',
        helpText : 'This is some helpful text'
    })
})

app.get('/weather', (req, res) =>{
    
    if(!req.query.address){
        return res.send ({
            error : 'You must provide a address !'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            return res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })

        })
    })
})

app.get('/products', (req, res) =>{

    if(!req.query.search){
        return res.send ({
            error : 'You must provide a search term.'
        })
    }

    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title : '404',
        name : 'Sarfaraz Khan',
        errorMessage : 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Sarfaraz Khan',
        errorMessage : 'Page not found'
    })
})




app.listen(2000, () =>{
    console.log('server started at port 2000 !')
})  