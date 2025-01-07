var express = require('express')
global.app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const mongoose = require('mongoose')
const { configExport } = require('./config.js')
const config = require('./config.js').configExport
global.SHA256 = require('sha256')
const cors = require('cors')

app.all('*',function(req, res, next){

    var whitelist = req.headers.origin;
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");

    next();

});

require('./paths.js')
mongoose.connect("mongodb://127.0.0.1:27017/" + configExport.db).then((res) => {
    console.log("Connection successful to mongo DB")
}).catch((error) => {
    console.log(error)
})
app.use(cors({
    origin: function(origin, callback){
        console.log(origin)
        if(!origin){
            return callback(null,true)
        }
        if(config.blacklist.indexOf(origin) === -1){
            return callback("error de CORS, sin permisos",false)
        } else {
            return callback(null, true)
        }
    }
}))
app.listen(configExport.puerto , function(){
    console.log("Servidor funcionando por el puerto: " + configExport.puerto)
})