const mongoose = require('mongoose')
require('dotenv').config();
let DB_URL = process.env.DB_URL || "mongodb://localhost:27017";



const conn = () =>{
    mongoose.connect(DB_URL, {
        dbName:'smoke'
    })
    .then(()=>{
        console.log('Veri tabanına bağlanıldı')
    })
    .catch((err)=>{console.log(err)})
}



module.exports = conn