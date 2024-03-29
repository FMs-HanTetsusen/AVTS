const express = require('express')
const { MongoClient } = require('mongodb') // syntax only available for Node v6 or higher

const app = express()
app.use(express.json()) // syntax only available for Express 4.16 or higher

const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

async function insert(body) {
    try {
        await client.connect()

        const databse = client.db('AVTS')
        const visitor = databse.collection('visitor')

        await visitor.insertOne(body)

        console.log('One document inserted.')
    } finally {
        await client.close()
    }
}

app.post('/AVTS/server', function (req, res) {
    console.log(req.body)
    res.send('OK')
    insert(req.body)
})

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log('Server listening at http://$s:%s', host, port)
})
