var usersModel = {}
const mongoose = require('mongoose')
var Schema = mongoose.Schema
var usersSchema = new Schema({
    // id:request.body.idNumber,
    // fName:request.body.name,
    // mName:request.body.middlename,
    // lName:request.body.lastname,
    // sLname:request.body.secondlastname

    id:String,
    fName:String,
    mName:String,
    lName:String,
    sLname:String
})

const MyModel = mongoose.model("users", usersSchema)

usersModel.validarId = function(post, callback){
    MyModel.findOne({id:post.id}).then((res) => {
        console.log(res)
        if(res == null){
            return callback({existe:'No existe'})
        }else{
            return callback({existe:'Si existe'})
        }
    })
}

usersModel.Guardar = function(post, callback){

    const instance = new MyModel
    instance.id = post.id
    instance.fName = post.fName
    instance.mName = post.mName
    instance.lName = post.lName
    instance.sLname = post.sLname

    instance.save().then((res) => {
        console.log(res)
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
        return callback({state:false})
    })
    // datos.push(post)
    // return callback({state:true})
}

usersModel.Mostrar = function (post, callback){
    MyModel.find({}).then((res) =>{
        return  callback({data:res})
    })
}

usersModel.Actualizar = function (post, callback){
    MyModel.findOneAndUpdate({_id:post._id},
        {
            id:post.id,
            fName:post.fName,
            mName:post.mName,
            lName:post.lName,
            sLname:post.sLname
        }
    ).then((res) => {
        return callback({state:true})
    }).catch((error) => {
        console.log(error)
    })
}

usersModel.Eliminar = function (post, callback){

    MyModel.deleteOne({_id:post._id}).then((res => {
        return callback({state:true})
    })).catch((error) => {
        console.log(error)
    })
}
module.exports.usersModelExport = usersModel