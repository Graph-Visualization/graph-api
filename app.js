const graph = require('./graph-base.js')
const express = require('express')
const path = require('path')
const prepResponse = require('./fetch_algo')
const app = express()
const publicDirectoryPath = path.join(__dirname, '../graph-visualization')

const prepErrorMsg = (error)=>{

    const err = {
        result : "Content Not found!",
        error
    }

    return JSON.stringify(err)
}

app.use(express.static(publicDirectoryPath))
app.use(express.json())


app.get('', (req, res) => {
    res.sendfile('src/main.html')
   })

app.get('/visual', (req, res) => {
    res.sendfile('src/visual.html')
})

app.post('/api', (req, res)=>{

    try
    {
        let respp = prepResponse(req.body['values'], req.body['algo']) 
        console.log(respp)
        res.json(respp)
    }
    catch(e)
    {
        let errorMsg = prepErrorMsg(e)
        res.status(404).json(errorMsg)
    }
})

app.post('/dfs', (req, res) => {

    let respp = prepResponse(req.body['values']) 
    console.log(respp)
    res.json(respp)
    
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})