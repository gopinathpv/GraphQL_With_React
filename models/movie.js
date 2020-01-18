const mongoose = require('mongoose')
const SChema  = mongoose.Schema;
const movieSchema = new SChema({
    name: String,
    genre : String, 
    directorId: String
     
})

module.exports = mongoose.model('Movie', movieSchema)