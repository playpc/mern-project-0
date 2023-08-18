import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCard.js'
import Cors from 'cors'
//App Config
const app = express()
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://dboon:tytkskwnqhvm@cluster0.lpj9ih7.mongodb.net/?retryWrites=true&w=majority'

//Middleware
app.use(express.json())
app.use(Cors())
//DB Config
mongoose.connect(connection_url, {})
//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))
app.post('/dating/cards', (req, res)=>{
    const dbCard = req.body
    Cards.create(dbCard)
    .then(data=>data.status(201).send(data))
    .catch(err=>res.status(500).send(err))
})
app.get('/dating/cards', (req, res)=>{
    Cards.find()
    .then(data=>res.status(200).send(data))
    .catch(err=>res.status(500).send(err))
})
    
//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))