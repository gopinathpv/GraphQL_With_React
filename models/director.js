const mongoose = require('mongoose')
const SChema  = mongoose.Schema;
const directorSchema = new SChema({
    name: String,
    age : Number, 
     
})

module.exports = mongoose.model('Director', directorSchema)