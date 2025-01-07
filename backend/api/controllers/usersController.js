var usersModel = require('../models/usersModels.js').usersModelExport
var usersController = {}

usersController.Guardar = function(request, response){
    var post = {
        id:request.body.idNumber,
        fName:request.body.name,
        mName:request.body.middlename,
        lName:request.body.lastname,
        sLname:request.body.secondlastname
    }
    if(post.id == undefined || post.id == "" || post.id == null){
        response.json({state:false,mensaje:"El id es obligatorio"})
    }
    const regex = /^[0-9]+$/;
    if (regex.test(post.id) == false){
        response.json({state:false,mensaje:"El id debe ser numerico"})
        return false
    }
    if(post.fName == undefined || post.fName == "" || post.fName == null){
        response.json({state:false,mensaje:"El primer nombre es obligatorio"})
        return false
    }
    if(post.mName == undefined || post.mName == null){
        response.json({state:false,mensaje:"El segundo nombre es obligatorio pero puede estar vacio"})
        return false
    }
    if(post.lName == undefined || post.lName == "" || post.lName == null){
        response.json({state:false,mensaje:"El apellido es obligatorio"})
        return false
    }
    if(post.sLname == undefined || post.sLname == null){
        response.json({state:false,mensaje:"El segundo apellido es obligatorio pero puede estar vacio"})
        return false
    }
    usersModel.validarId(post,function(res){
        if(res.existe == 'Si existe'){
            response.json({state:false,mensaje:"El usuario ya existe."})
        }
        else{
            usersModel.Guardar(post, function(res){
            if(res.state == true){
                response.json({state:true,mensaje:"Usuario guardado exitosamente."})
            }else{
                response.json({state:false,mensaje:"Hubo un error al guardar."})
            }
            })
        }
    })
    
}

usersController.Mostrar = function(request, response){
    usersModel.Mostrar(null,function(res){
        response.json({state:true, datos:res.data})
    })
}

usersController.Actualizar = function(request, response){
    var post = {
        _id:request.body._id,
        id:request.body.idNumber,
        fName:request.body.name,
        mName:request.body.middlename,
        lName:request.body.lastname,
        sLname:request.body.secondlastname
    }
    if(post._id == undefined || post._id == "" || post._id == null){
        response.json({state:false,mensaje:"El _id es obligatorio"})
    }
    if(post.id == undefined || post.id == "" || post.id == null){
        response.json({state:false,mensaje:"El id es obligatorio"})
    }
    const regex = /^[0-9]+$/;
    if (regex.test(post.id) == false){
        response.json({state:false,mensaje:"El id debe ser numerico"})
        return false
    }
    if(post.fName == undefined || post.fName == "" || post.fName == null){
        response.json({state:false,mensaje:"El primer nombre es obligatorio"})
        return false
    }
    if(post.mName == undefined || post.mName == null){
        response.json({state:false,mensaje:"El segundo nombre es obligatorio pero puede estar vacio"})
        return false
    }
    if(post.lName == undefined || post.lName == "" || post.lName == null){
        response.json({state:false,mensaje:"El apellido es obligatorio"})
        return false
    }
    if(post.sLname == undefined || post.sLname == null){
        response.json({state:false,mensaje:"El segundo apellido es obligatorio pero puede estar vacio"})
        return false
    }
    usersModel.validarId(post, function (res){
        if (res.existe == 'No existe'){
            response.json({state:false,mensaje:"El id ingresado no existe"})
        }
        else{
            usersModel.Actualizar(post, function(res){
                response.json({state:true,mensaje:"El registro fue actualizado correctamente."})
                return false
            })
        }
    })
}

usersController.Eliminar = function(request,response){
    var post = {
        _id:request.body._id
    }
    if(post._id == undefined || post._id == "" || post._id == null){
        response.json({state:false,mensaje:"El _id es obligatorio"})
    }
    usersModel.Eliminar(post, function(res){
        response.json({state:true,mensaje:"Usuario eliminado correctamente."})
        return false
    })
}
module.exports.usersControllerExport = usersController