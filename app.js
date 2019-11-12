const graph = require('./graph-base.js')
const express = require('express')
const path = require('path')
const prepResponse = require('./fetch_algo')
const app = express()
const publicDirectoryPath = path.join(__dirname, '../graph-visualization')

app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.get('', (req, res) => {
    res.sendfile('src/main.html')
   })

app.get('/visual', (req, res) => {
    res.sendfile('src/visual.html')
})

app.post('/dfs', (req, res) => {
    // console.log('REQUEST!!')
    // console.log(req.body)
    let respp = prepResponse(req.body['values']) 
    console.log(respp)
    res.json(respp)
    
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})