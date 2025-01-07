const { config } = require('nodemon')
var eventsAcademicModel = require('../models/eventsAcademicModels.js').eventsAcademicModelExport
var eventsAcademicController = {}
const { set } = require('mongoose')

eventsAcademicController.Registrar = function(request, response){
    var post = {
        eventTitle:request.body.eventTitle,
        description:request.body.description,
        date:request.body.date,
        place:request.body.place
    }
    if(post.eventTitle == undefined || post.eventTitle == null || post.eventTitle == ""){
        response.json({state:false,mensaje:"El eventTitle es obligatorio"})
        return false
    }
    if(post.description == undefined || post.description == "" || post.description == null){
        response.json({state:false,mensaje:"El description es obligatorio"})
        return false
    }
    if(post.date == undefined || post.date == "" || post.date == null){
        response.json({state:false,mensaje:"El date es obligatorio"})
        return false
    }
    if(post.place == undefined || post.place == null || post.place == ""){
        response.json({state:false,mensaje:"El place es obligatorio"})
        return false
    }
    
    eventsAcademicModel.Registrar(post, function(res){
        if(res.state == true){
            response.json({state:true,mensaje:"Evento registrado exitosamente."})
        }else{
            response.json({state:false,mensaje:"Hubo un error al registrar el evento."})
        }
    })
}
eventsAcademicController.Mostrar = function(request, response){
    eventsAcademicModel.Mostrar(null,function(res){
        response.json({state:true, datos:res.data})
    })
}
eventsAcademicController.Actualizar = function(request, response){
    var post = {
        _id:request.body._id,
        eventTitle:request.body.eventTitle,
        description:request.body.description,
        date:request.body.date,
        place:request.body.place
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false,mensaje:"El _id es obligatorio"})
        return false
    }
    if(post.eventTitle == undefined || post.eventTitle == null || post.eventTitle == ""){
        response.json({state:false,mensaje:"El eventTitle es obligatorio"})
        return false
    }
    if(post.description == undefined || post.description == "" || post.description == null){
        response.json({state:false,mensaje:"El description es obligatorio"})
        return false
    }
    if(post.date == undefined || post.date == "" || post.date == null){
        response.json({state:false,mensaje:"El date es obligatorio"})
        return false
    }
    if(post.place == undefined || post.place == null || post.place == ""){
        response.json({state:false,mensaje:"El place es obligatorio"})
        return false
    }
    eventsAcademicModel.validarId(post,function(res){
        if(res.existe == 'Si existe' ){
            eventsAcademicModel.Actualizar(post, function(res){
                if(res.state == true){
                    response.json({state:true,mensaje:"Evento actualizado exitosamente."})
                }else{
                    response.json({state:false,mensaje:"Hubo un error al actualizar el evento."})
                }
            })
        }
        if(res.existe == 'No existe'){
            response.json({state:false,mensaje:"El evento no existe."})
        }
    })
}
eventsAcademicController.Eliminar = function(request,response){
    var post = {
        _id:request.body._id
    }
    if(post._id == undefined || post._id == "" || post._id == null){
        response.json({state:false,mensaje:"El _id es obligatorio"})
        return false
    }

    eventsAcademicModel.validarId(post,function(res){
        if(res.existe == 'Si existe'){
            eventsAcademicModel.Eliminar(post, function(res){
                response.json({state:true,mensaje:"Evento eliminado correctamente."})
                return false
            })
        }
        if(res.existe == 'No existe'){
            response.json({state:false,mensaje:'El evento no existe.'})
        }
    })
    
}
eventsAcademicController.MostrarId = function(request, response){
    var post = {
        _id:request.body._id
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false,mensaje:"El _id es obligatorio"})
        return false
    }
    eventsAcademicModel.MostrarId(post,function(res){
        response.json({state:true,datos:res.data})
    })
}

module.exports.eventsAcademicControllerExport = eventsAcademicController