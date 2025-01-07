var usersRegisterModel = {}
const mongoose = require('mongoose')
var Schema = mongoose.Schema
var usersRegisterSchema = new Schema({
    email:String,
    name:String,
    cellphone:String,
    password:String,
    rol:String, //admin /Trabajador /cliente
    state:Number, //1 actve /2 innactive
    code:Number, //codigo de activacion
    forgotPassword:Number, //codigo de recuperacion de contraseña
    codeDate:Date //fecha del codigo
})

const MyModel = mongoose.model("usersRegistered", usersRegisterSchema)

usersRegisterModel.validarId = function(post, callback){
    MyModel.findOne({_id:post._id}).then((res) => {
        console.log(res)
        if(res == null){
            return callback({existe:'No existe'})
        }else{
            return callback({existe:'Si existe'})
        }
    })
}

usersRegisterModel.validarEmail = function(post, callback){
    MyModel.findOne({email:post.email}).then((res) => {
        console.log(res)
        if(res == null){
            return callback({existe:'No existe'})
        }else{
            return callback({existe:'Si existe'})
        }
    })
}

usersRegisterModel.Registrar = function(post, callback){

    const instance = new MyModel
    instance.email = post.email
    instance.name = post.name
    instance.cellphone = post.cellphone
    instance.password = post.password
    instance.rol = "cliente"
    instance.state = 0
    instance.code = post.activationCode

    instance.save().then((res) => {
        console.log(res)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

usersRegisterModel.RegistrarModal = function(post, callback){

    const instance = new MyModel
    instance.email = post.email
    instance.name = post.name
    instance.cellphone = post.cellphone
    instance.password = post.password
    instance.rol = "cliente"
    instance.state = 1

    instance.save().then((res) => {
        console.log(res)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

usersRegisterModel.Mostrar = function (post, callback){
    MyModel.find({},{email:1, name:1, cellphone:1, rol:1, state:1}).then((res) =>{
        return  callback({data:res})
    })
}

usersRegisterModel.MostrarRegistrosEmail = function (post, callback){
    MyModel.findOne({email:post.email},{email:1, name:1, cellphone:1, rol:1, state:1}).then((res) =>{
        if (res === undefined || res === null || res === "") {
            return callback({state:false,mensaje:"No se contró un usuario con ese email"})
        } else {
            return  callback({state:true,data:res})
        }
    })
}

usersRegisterModel.Actualizar = function (post, callback){
    MyModel.findOneAndUpdate({email:post.email},
        {
            name:post.name,
            cellphone:post.cellphone,
            rol:post.rol,
            state:post.state
        }
    ).then((res) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
}

usersRegisterModel.Eliminar = function (post, callback){

    MyModel.deleteOne({email:post.email}).then((res => {
        console.log(res)
        return callback({state:true})
    })).catch((error) => {
        console.log(error)
    })
}

usersRegisterModel.Login = function (post , callback){
    MyModel.findOne({email:post.email, password:post.password}, {name:1, rol:1, state:1}).then((res) => {
        if (res == null){
            return callback({state:false,mensaje:'credenciales invalidas, intenta nuevamente'})
        }
        else {
            return callback({state:true,mensaje:'Bienvenido ' + res.name})
        }
    })
}

usersRegisterModel.Activar = function (post, callback){
    MyModel.findOneAndUpdate({email:post.email, code:post.activationCode},{
        state:1
    }).then((res) =>{
        if(res == null){
            return callback({state:false,mensaje:"El codigo es invalido"})
        }
        if(res != null){
            return callback({state:true,mensaje:"La cuenta ha sido activada"})
        }
    })
}

usersRegisterModel.ForgotPassword = function (post, callback){
    MyModel.findOneAndUpdate({email:post.email},{forgotPassword:post.ForgotPassword, codeDate: new Date()}).then((res) => {
        if (res == null){
            return callback({state:false,mensaje:"No se pudo crear el codigo de recuperacion"})
        }
        if(res != null){
            return callback({state:true,mensaje:"Codigo de recuperacion creado exitosamente."})
        }
    })
}

usersRegisterModel.ActivateCodeFP = function (post, callback){
    MyModel.findOneAndUpdate({email:post.email, forgotPassword:post.forgotPassword},{password:post.password}).then((res) =>{
            if(res == null){
                return callback({state:false,mensaje:"El codgido de recuperacion no es valido"})
            }
            if(res != null){
                return callback({state:true,mensaje:"La contraseña fue actualizada."})
            }
        
    })
}

usersRegisterModel.checkDate = function (post, callback){
    MyModel.findOne({email:post.email},{codeDate:1}).then((res) =>{
        if(res == null){
            return callback({state:false, mensaje:"El correo no es valido"})
        }
        if(res != null){
            return callback({state:true, data:res})
        }
    })
}
module.exports.usersRegisterModelExport = usersRegisterModel