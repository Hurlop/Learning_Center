var usersController = require('./api/controllers/usersController.js').usersControllerExport
var usersRegisterController = require('./api/controllers/usersRegisterController.js').usersRegisterControllerExport
var eventsAcademicController = require('./api/controllers/eventsAcademicController.js').eventsAcademicControllerExport

app.post('/usuarios/Guardar', function(request,response){
    usersController.Guardar(request,response)
})

app.get('/usuarios/Mostrar', function(request,response){
    usersController.Mostrar(request,response)
})

app.put('/usuarios/Actualizar', function(request,response){
    usersController.Actualizar(request,response)
})

app.delete('/usuarios/Eliminar', function(request,response){
    usersController.Eliminar(request,response)
})


//Registro con email, password y # celular
app.post('/Registrar', function(request, reponse){
    usersRegisterController.Registrar(request, reponse)
})
app.post('/RegistrarModal', function(request, reponse){
    usersRegisterController.RegistrarModal(request, reponse)
})
app.get('/mostrarRegistros',function (request,response){
    usersRegisterController.Mostrar(request,response)
})
app.post('/mostrarRegistrosEmail',function (request,response){
    usersRegisterController.MostrarRegistrosEmail(request,response)
})
app.put('/actualizarRegistro',function (request,response){
    usersRegisterController.Actualizar(request,response)
})
app.post('/eliminarRegistro',function (request,response){
    usersRegisterController.Eliminar(request,response)
})
app.post('/login', function(request, response){
    usersRegisterController.Login(request, response)
})
app.post('/activateAccount',function (request,response){
    usersRegisterController.Activar(request,response)
})
app.post('/forgotPassword', function(request, response){
    usersRegisterController.ForgotPassword(request, response)
})
app.post('/activateCodeFP', function(request, response){
    usersRegisterController.ActivateCodeFP(request, response)
})





//Registro de eventos para estudiantes y personal academico
app.post('/RegistrarEventoAcademico', function(request, reponse){
    eventsAcademicController.Registrar(request, reponse)
})
app.get('/mostrarRegistrosEventoAcademico',function (request,response){
    eventsAcademicController.Mostrar(request,response)
})
app.post('/mostrarRegistrosEventoAcademicoId',function (request,response){
    eventsAcademicController.MostrarId(request,response)
})
app.put('/actualizarRegistroEventoAcademico',function (request,response){
    eventsAcademicController.Actualizar(request,response)
})
app.post('/eliminarRegistroEventoAcademico',function (request,response){
    eventsAcademicController.Eliminar(request,response)
})
