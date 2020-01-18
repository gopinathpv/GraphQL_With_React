const express = require('express')
const graphql = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')

const schema =  require('./graphqlSchema/schema')
const app = express();

mongoose.connect('mongodb+srv://admin:Gopinath28@rest-shop-lij7y.mongodb.net/graphql?retryWrites=true&w=majority',{useUnifiedTopology: true ,useNewUrlParser:true })
mongoose.connection.once('open',()=>{
    console.log("connect to the database")
})

app.use(cors())


app.get('/',(req,res) =>{
    res.send("into the get in graphapi")
})

app.use('/graphql',graphql({
    schema,
    graphiql:true
}))


app.listen(3001,()=>{
    console.log(`listening to the port 3001`)
})