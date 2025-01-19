var usersRegisterController = require("./usersRegisterController.js").usersRegisterControllerExport
var usersRegisterModel = require('../models/usersRegisterModels.js').usersRegisterModelExport
global.SHA256 = require('sha256')
const mongoose = require('mongoose')
const config = require('../../config.js').configExport

describe("POST /Registrar", () => {
    let request
    let response
    beforeAll((done) =>{
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.db_Test).then((res) => {
            console.log("Connection successful to mongo DB")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })
    beforeEach(() => {
        request = { body:{} }
        response = { json:jest.fn() }
    })
    test("El campo email irá vacio, se espera que mande error", (done) => {
        request.body = {}
        usersRegisterController.Registrar(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El email es obligatorio"})
        done()
    })
    test("El campo name irá vacio, se espera que mande error", (done) => {
        request.body = {
            email:"test@test.com"
        }
        usersRegisterController.Registrar(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El nombre es obligatorio"})
        done()
    })
    test("El campo cellphone irá vacio, se espera que mande error", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe"
        }
        usersRegisterController.Registrar(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El telefono es obligatorio"})
        done()
    })
    test("El campo password irá vacio, se espera que mande error", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001"
        }
        usersRegisterController.Registrar(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"La contraseña es obligatoria"})
        done()
    })
    test("El usuario deberá ser registrado", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001",
            password:"123456"
        }
        usersRegisterController.Registrar(request,response)
        setTimeout(() =>{
            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario registrado exitosamente. Un email ha sido enviado para activar tu cuenta"})
            done()
        },60)
    })
    test("El email ya existe, mandará error", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001",
            password:"123456"
        }
        usersRegisterController.Registrar(request,response)
        setTimeout(() =>{
            expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"Este email ya existe."})
            done()
        },10)
    })
    afterAll((done) => {
        usersRegisterModel.MyModel.findOneAndDelete({email:"test@test.com"}).then((res) => {
            done()
        })
    })
})
describe("POST /RegistrarModal", () => {
    let request
    let response
    beforeAll((done) =>{
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.db_Test).then((res) => {
            console.log("Connection successful to mongo DB")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })
    beforeEach(() => {
        request = { body:{} }
        response = { json:jest.fn() }
    })
    test("El campo email irá vacio, se espera que mande error", (done) => {
        request.body = {}
        usersRegisterController.RegistrarModal(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El email es obligatorio"})
        done()
    })
    test("El campo name irá vacio, se espera que mande error", (done) => {
        request.body = {
            email:"test@test.com"
        }
        usersRegisterController.RegistrarModal(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El nombre es obligatorio"})
        done()
    })
    test("El campo cellphone irá vacio, se espera que mande error", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe"
        }
        usersRegisterController.RegistrarModal(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El telefono es obligatorio"})
        done()
    })
    test("El campo password irá vacio, se espera que mande error", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001"
        }
        usersRegisterController.RegistrarModal(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"La contraseña es obligatoria"})
        done()
    })
    test("El usuario deberá ser registrado", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001",
            password:"123456"
        }
        usersRegisterController.RegistrarModal(request,response)
        setTimeout(() =>{
            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario registrado exitosamente."})
            done()
        },60)
    })
    test("El email ya existe, mandará error", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001",
            password:"123456"
        }
        usersRegisterController.RegistrarModal(request,response)
        setTimeout(() =>{
            expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"Este email ya existe."})
            done()
        },10)
    })
    afterAll((done) => {
        usersRegisterModel.MyModel.findOneAndDelete({email:"test@test.com"}).then((res) => {
            done()
        })
    })
})
describe("POST /login", () => {
    let request
    let response
    beforeAll((done) =>{
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.db_Test).then((res) => {
            console.log("Connection successful to mongo DB")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })
    beforeEach(() => {
        request = { body:{} }
        response = { json:jest.fn() }
    })
    test("El campo email irá vacio, se espera que mande error", (done) => {
        request.body = {}
        usersRegisterController.Login(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El email es obligatorio"})
        done()
    })
    test("El campo password irá vacio, se espera que mande error", (done) => {
        request.body = {
            email:"test@test.com"
        }
        usersRegisterController.Login(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El password es obligatorio"})
        done()
    })
    test("El usuario deberá ser registrado", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001",
            password:"123456"
        }
        usersRegisterController.Registrar(request,response)
        setTimeout(() =>{
            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario registrado exitosamente. Un email ha sido enviado para activar tu cuenta"})
            done()
        },60)
    })
    test("La cuenta aun no se activa, debe pedir activacion", (done) => {
        request.body = {
            email:"test@test.com",
            password:"123456"
        }
        usersRegisterController.Login(request,response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:false, mensaje:'Por favor activar la cuenta'})
            done()
        },40)
    })
    test("El login debe ser exitoso", (done) => {
        usersRegisterModel.MyModel.findOneAndUpdate({email:"test@test.com"},{state:1}).then((res) =>{
            request.body = {
                email:"test@test.com",
                password:"123456"
            }
            usersRegisterController.Login(request,response)
            setTimeout(() => {
                expect(response.json).toHaveBeenCalledWith(
                    expect.objectContaining({
                        state:true
                    })
                )
                done()
            },40)
        })
    })
    afterAll((done) => {
        usersRegisterModel.MyModel.findOneAndDelete({email:"test@test.com"}).then((res) => {
            done()
        })
    })
})
describe("GET /mostrarRegistros", () => {
    let request
    let response
    beforeAll((done) =>{
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.db_Test).then((res) => {
            console.log("Connection successful to mongo DB")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })
    beforeEach(() => {
        request = { body:{} }
        response = { json:jest.fn() }
    })
    test("El usuario deberá ser registrado", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001",
            password:"123456"
        }
        usersRegisterController.Registrar(request,response)
        setTimeout(() =>{
            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario registrado exitosamente. Un email ha sido enviado para activar tu cuenta"})
            done()
        },60)
    })
    test("Se listará todo lo que la DB tiene", (done) => {
            request.body = {
            }
            usersRegisterController.Mostrar(request, response)
            console.log(response)
            setTimeout(() =>{
                expect(response.json).toHaveBeenCalledWith(
                    expect.objectContaining({
                        state:true
                    })
                )
            done()
            },60)
    })
    afterAll((done) => {
        usersRegisterModel.MyModel.findOneAndDelete({email:"test@test.com"}).then((res) => {
            done()
        })
    })
})
describe("GET /mostrarRegistrosEmail", () => {
    let request
    let response
    beforeAll((done) =>{
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.db_Test).then((res) => {
            console.log("Connection successful to mongo DB")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })
    beforeEach(() => {
        request = { body:{} }
        response = { json:jest.fn() }
    })
    test("El usuario deberá ser registrado", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001",
            password:"123456"
        }
        usersRegisterController.RegistrarModal(request,response)
        setTimeout(() =>{
            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario registrado exitosamente."})
            done()
        },60)
    })
    test("El campo email irá vacio, se espera que mande error", (done) => {
        request.body = {}
        usersRegisterController.MostrarRegistrosEmail(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El email es obligatorio"})
        done()
    })
    test("El campo email irá errado. Deberá mandar error", (done) => {
        request.body = {
            emailMod:"hurlop@outlook.com"
        }
        usersRegisterController.MostrarRegistrosEmail(request,response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:false,mensaje:'El email ingresado no existe'})
            done()
        },60);
    })
    test("Mostrará el registros por email", (done) => {
        request.body = {
            emailMod:"test@test.com"
        }
        usersRegisterController.MostrarRegistrosEmail(request,response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({
                state:true,
                datos:{
                    email: "test@test.com",
                    name: "Pepe",
                    cellphone: "001001",
                    rol: "cliente",
                    state: 1
                }
            })
            done()
        },60);
    })
    afterAll((done) => {
        usersRegisterModel.MyModel.findOneAndDelete({email:"test@test.com"}).then((res) => {
            done()
        })
    })
})
describe("PUT /actualizarRegistro", () => {
    let request
    let response
    beforeAll((done) =>{
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.db_Test).then((res) => {
            console.log("Connection successful to mongo DB")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })
    beforeEach(() => {
        request = { body:{} }
        response = { json:jest.fn() }
    })
    test("El usuario deberá ser registrado", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001",
            password:"123456"
        }
        usersRegisterController.Registrar(request,response)
        setTimeout(() =>{
            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario registrado exitosamente. Un email ha sido enviado para activar tu cuenta"})
            done()
        },60)
    })
    test("No se mandará correo, debe indicar que el campo email esta vacio o errado", (done) => {
        request.body = {}
        usersRegisterController.Actualizar(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El email es obligatorio"})
        done()
    })
    test("No se mandará name, debe indicar que el campo name esta vacio o errado", (done) => {
        request.body = {
            email:"test@test.com"
        }
        usersRegisterController.Actualizar(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El name es obligatorio"})
        done()
    })
    test("No se mandará cellphone, debe indicar que el campo cellphone esta vacio o errado", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe"
        }
        usersRegisterController.Actualizar(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El cellphone es obligatorio"})
        done()
    })
    test("No se mandará rol, debe indicar que el campo rol esta vacio o errado", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001"
        }
        usersRegisterController.Actualizar(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El rol es obligatorio"})
        done()
    })
    test("No se mandará state, debe indicar que el campo state esta vacio o errado", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001",
            rol:"cliente"
        }
        usersRegisterController.Actualizar(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El state es obligatorio"})
        done()
    })
    test("Actualizará correctamente", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001",
            rol:"cliente",
            state:1
        }
        usersRegisterController.Actualizar(request,response)
        setTimeout(() => {
            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario actualizado exitosamente."})
        },100)
        done()
        
    })
    afterAll((done) => {
        usersRegisterModel.MyModel.findOneAndDelete({email:"test@test.com"}).then((res) => {
            done()
        })
    })
})
describe("POST /forgotPassword", () => {
    let request
    let response
    beforeAll((done) =>{
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.db_Test).then((res) => {
            console.log("Connection successful to mongo DB")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })
    beforeEach(() => {
        request = { body:{} }
        response = { json:jest.fn() }
    })
    test("El usuario deberá ser registrado", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001",
            password:"123456"
        }
        usersRegisterController.Registrar(request,response)
        setTimeout(() =>{
            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario registrado exitosamente. Un email ha sido enviado para activar tu cuenta"})
            done()
        },60)
    })
    test("No se mandará correo, debe indicar que el campo email esta vacio o errado", (done) => {
        request.body = {}
        usersRegisterController.ForgotPassword(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El email es obligatorio"})
        done()
    })
    test("Enviará el email con codigo de recuperacion", (done) => {
        request.body = {
            email:"test@test.com"
        }
        usersRegisterController.ForgotPassword(request,response)
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Se ha enviado un codigo de recuperacion a tu correo."})
            done()
        },100)
        
    })
    afterAll((done) => {
        usersRegisterModel.MyModel.findOneAndDelete({email:"test@test.com"}).then((res) => {
            done()
        })
    })
})
describe("POST /eliminarRegistro", () => {
    let request
    let response
    beforeAll((done) =>{
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.db_Test).then((res) => {
            console.log("Connection successful to mongo DB")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })
    beforeEach(() => {
        request = { body:{} }
        response = { json:jest.fn() }
    })
    test("El usuario deberá ser registrado", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001",
            password:"123456"
        }
        usersRegisterController.RegistrarModal(request,response)
        setTimeout(() =>{
            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario registrado exitosamente."})
            done()
        },60)
    })
    test("No se mandará correo, debe indicar que el campo email esta vacio o errado", (done) => {
        request.body = {}
        usersRegisterController.Eliminar(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El email es obligatorio"})
        done()
    })
    test("Se enviará un correo invalido, mandará error", (done) => {
        request.body = {
            email:"test@test.co"
        }
        usersRegisterController.Eliminar(request,response)
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:false,mensaje:'El email no existe.'})
            done()
        },40)
    })
    test("Eliminará al usuario por email", (done) => {
        request.body = {
            email:"test@test.com"
        }
        usersRegisterController.Eliminar(request,response)
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario eliminado correctamente."})
            done()
        },40)
    })
})
describe("POST /activateAccount", () => {
    let request
    let response
    beforeAll((done) =>{
        mongoose.connect("mongodb://127.0.0.1:27017/" + config.db_Test).then((res) => {
            console.log("Connection successful to mongo DB")
            done()
        }).catch((error) => {
            console.log(error)
        })
    })
    beforeEach(() => {
        request = { body:{} }
        response = { json:jest.fn() }
    })
    test("El usuario deberá ser registrado", (done) => {
        request.body = {
            email:"test@test.com",
            name:"Pepe",
            cellphone:"001001",
            password:"123456"
        }
        usersRegisterController.RegistrarModal(request,response)
        setTimeout(() =>{
            expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"Usuario registrado exitosamente."})
            done()
        },60)
    })
    test("No se mandará correo, debe indicar que el campo email esta vacio o errado", (done) => {
        request.body = {}
        usersRegisterController.Activar(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El email es obligatorio"})
        done()
    })
    test("No se envia codigo, debe pedir el codigo", (done) => {
        request.body = {
            email:"test@test.com"
        }
        usersRegisterController.Activar(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El codigo es obligatorio"})
        done()
    })
    test("No se envia codigo, debe pedir el codigo", (done) => {
        request.body = {
            email:"test@test.com"
        }
        usersRegisterController.Activar(request,response)
        expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El codigo es obligatorio"})
        done()
    })
    test("Se envia un codigo errado", (done) => {
        request.body = {
            email:"test@test.com",
            activationCode:123456
        }
        usersRegisterController.Activar(request,response)
        setTimeout(()=>{
            expect(response.json).toHaveBeenCalledWith({state:false,mensaje:"El codigo es invalido"})
            done()
        },40)
    })
    test("Se activa la cuenta", (done) => {
        usersRegisterModel.MyModel.findOneAndUpdate({email:"test@test.com"},{code:101010}).then((res) =>{
            request.body = {
                email:"test@test.com",
                activationCode:101010
            }
            usersRegisterController.Activar(request,response)
            setTimeout(()=>{
                expect(response.json).toHaveBeenCalledWith({state:true,mensaje:"La cuenta ha sido activada"})
                done()
            },40)
        })
    })
    afterAll((done) => {
        usersRegisterModel.MyModel.findOneAndDelete({email:"test@test.com"}).then((res) => {
            done()
        })
    })
})