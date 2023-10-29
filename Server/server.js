const express = require('express')
const accessConfig = require('./config/accessConfig')
const errorHandler = require('./middleware/error')
const dotenv = require('dotenv')
const app = express()
const server = require('http').createServer(app)

// load env vars
dotenv.config({ path: './config/config.env' })

// allow cross domain access
app.use(accessConfig)

//require the socket function
//require('./middleware/eventsSockethandler')(io)
const products = require('./routes/products')

app.use('/products', products)


const port = process.env.PORT || 3001
server.listen(port, () => console.log('Listening on port ' + port + '...'))