var eventsAcademicModel = {}
const mongoose = require('mongoose')
var Schema = mongoose.Schema
var eventsAcademicSchema = new Schema({
    eventTitle:String,
    description:String,
    date:String,
    place:String,
})

const MyModel = mongoose.model("eventsAcademic", eventsAcademicSchema)

eventsAcademicModel.validarId = function(post, callback){
    MyModel.findOne({_id:post._id}).then((res) => {
        console.log(res)
        if(res == null){
            return callback({existe:'No existe'})
        }else{
            return callback({existe:'Si existe'})
        }
    })
}

eventsAcademicModel.Registrar = function(post, callback){

    const instance = new MyModel
    instance.eventTitle = post.eventTitle
    instance.description = post.description
    instance.date = post.date
    instance.place = post.place

    instance.save().then((res) => {
        console.log(res)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

eventsAcademicModel.Mostrar = function (post, callback){
    MyModel.find({},{eventTitle:1, description:1, date:1, place:1}).then((res) =>{
        return  callback({data:res})
    })
}

eventsAcademicModel.MostrarId = function (post, callback){
    MyModel.find({_id:post._id},{eventTitle:1, description:1, date:1, place:1}).then((res) =>{
        return  callback({data:res})
    })
}

eventsAcademicModel.Actualizar = function (post, callback){
    MyModel.findOneAndUpdate({_id:post._id},
        {
            eventTitle:post.eventTitle,
            description:post.cellphone,
            date:post.date,
            place:post.place
        }
    ).then((res) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

eventsAcademicModel.Eliminar = function (post, callback){

    MyModel.deleteOne({_id:post._id}).then((res => {
        console.log(res)
        return callback({state:true})
    })).catch((error) => {
        console.log(error)
    })
}

module.exports.eventsAcademicModelExport = eventsAcademicModel