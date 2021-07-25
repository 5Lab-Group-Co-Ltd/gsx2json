const api = require('./api')
const addRowAPI = require('./addRowAPI')

const express = require('express')
const app = express()

const port = process.env.PORT || 5000

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// body parser middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// get api
app.get('/api', api)
app.get('/v1/api/get', api)
app.get('/v1/api/add-row', addRowAPI)

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(400).send(err.message)
})

app.listen(port, function () {
  console.log('GSX2JSON listening on port ' + port)
})
