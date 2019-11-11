const graph = require('./graph-base.js')
const express = require('express')
const path = require('path')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../graph-visualization')

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.sendfile('src/main.html')
   })
app.get('/weather', (req, res) => {
res.send('Your weather')
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})