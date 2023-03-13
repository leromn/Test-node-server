const express = require('express');
var cors = require('cors')
var app = express()

app.use(cors())
app.get('/', (req, res) => {
    res.send('Welcome to CORS server 😁')
})

app.get('/cors', (req, res) => {
res.send({ "msg": "This has CORS enabled 🎈" })
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})
