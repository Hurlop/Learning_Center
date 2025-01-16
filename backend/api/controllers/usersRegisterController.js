const { config } = require('nodemon')

var usersRegisterModel = require('../models/usersRegisterModels.js').usersRegisterModelExport
var usersModel = require('../models/usersModels.js').usersModelExport
var usersRegisterController = {}
const setting = require('../../config.js').configExport
const nodemailer = require('nodemailer')
const { set } = require('mongoose')

usersRegisterController.Registrar = function(request, response){
    var post = {
        email:request.body.email,
        name:request.body.name,
        cellphone:request.body.cellphone,
        password:request.body.password
    }
    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false,mensaje:"El email es obligatorio"})
        return false
    }
    if(post.name == undefined || post.name == "" || post.name == null){
        response.json({state:false,mensaje:"El nombre es obligatorio"})
        return false
    }
    if(post.cellphone == undefined || post.cellphone == "" || post.cellphone == null){
        response.json({state:false,mensaje:"El telefono es obligatorio"})
        return false
    }
    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false,mensaje:"La contraseña es obligatoria"})
        return false
    }
    post.password = SHA256(post.password + setting.lock)
    usersRegisterModel.validarEmail(post,function(res){
        if(res.existe == 'Si existe'){
            response.json({state:false,mensaje:"Este email ya existe."})
        }
        if(res.existe == 'No existe'){
            var activationCode = Math.ceil(Math.random() * (999999 + 100000) + 100000)
            post.activationCode = activationCode
            usersRegisterModel.Registrar(post, function(res){
            if(res.state == true){
                response.json({state:true,mensaje:"Usuario registrado exitosamente. Un email ha sido enviado para activar tu cuenta"})
                // enviar codigo
                const transporter = nodemailer.createTransport({
                    host:setting.email.host,
                    port:setting.email.port,
                    secure:false,
                    requireTLS:true,
                    auth:{
                        user:setting.email.user,
                        pass:setting.email.password
                    }
                })
                var mailOptions = {
                    from:setting.email.user,
                    to:post.email,
                    subject:"Activa tu cuenta! -- LearningCenter",
                    html:`<head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title></title>
                            <style type="text/css">
                            
                                @media screen {
                                    @font-face {
                                        font-family: 'Lato';
                                        font-style: normal;
                                        font-weight: 400;
                                        src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                                    }

                                    @font-face {
                                        font-family: 'Lato';
                                        font-style: normal;
                                        font-weight: 700;
                                        src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                                    }

                                    @font-face {
                                        font-family: 'Lato';
                                        font-style: italic;
                                        font-weight: 400;
                                        src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                                    }

                                    @font-face {
                                        font-family: 'Lato';
                                        font-style: italic;
                                        font-weight: 700;
                                        src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                                    }
                                }

                                /* CLIENT-SPECIFIC STYLES */
                                body,
                                table,
                                td,
                                a {
                                    -webkit-text-size-adjust: 100%;
                                    -ms-text-size-adjust: 100%;
                                }

                                table,
                                td {
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                }

                                img {
                                    -ms-interpolation-mode: bicubic;
                                }

                                /* RESET STYLES */
                                img {
                                    border: 0;
                                    height: auto;
                                    line-height: 100%;
                                    outline: none;
                                    text-decoration: none;
                                }

                                table {
                                    border-collapse: collapse !important;
                                }

                                body {
                                    height: 100% !important;
                                    margin: 0 !important;
                                    padding: 0 !important;
                                    width: 100% !important;
                                }

                                /* iOS BLUE LINKS */
                                a[x-apple-data-detectors] {
                                    color: inherit !important;
                                    text-decoration: none !important;
                                    font-size: inherit !important;
                                    font-family: inherit !important;
                                    font-weight: inherit !important;
                                    line-height: inherit !important;
                                }

                                /* MOBILE STYLES */
                                @media screen and (max-width:600px) {
                                    h1 {
                                        font-size: 32px !important;
                                        line-height: 32px !important;
                                    }
                                }

                                /* ANDROID CENTER FIX */
                                div[style*="margin: 16px 0;"] {
                                    margin: 0 !important;
                                }
                            </style>
                        </head>
                        <body class="container">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <!-- LOGO -->
                                <tr>
                                    <td bgcolor="orange" align="center">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                            <tr>
                                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="orange" align="center" style="padding: 0px 10px 0px 10px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                            <tr style="border-top: 2px black solid; border-left: 2px black solid; border-right: 2px black solid;">
                                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">¡Bienvenido a Learning Center!</h1> <img src="https://i.ibb.co/hHVSTFG/learning-center-logo.jpg" width="125" height="120" style="display: block; border: 0px;" />
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                        <!-- <tr>
                                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                    <p style="margin: 0; text-align:center">YOUR OPT : *****</p>
                                                </td>
                                            </tr>-->
                                            <tr style="border-left: 2px black solid; border-right: 2px black solid;">
                                                <td bgcolor="#ffffff" align="left">
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 30px 30px;">
                                                                <table border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td align="center" style="border-radius: 3px;" bgcolor="lime"><a href="${setting.urlReal}/activateAccount/${post.email}/${activationCode}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 5px solid green; display: inline-block;">Activa tu cuenta</a></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr> <!-- COPY -->
                                            <tr style="border-left: 2px black solid; border-right: 2px black solid;">
                                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                    <p style="margin: 0; text-align: center;">Tu codigo de activacion es: ${activationCode}</p>
                                                    <p style="margin: 0;">Estas a un paso de hacer parte de la familia que aprende con el corazón</p> <br>
                                                    <p style="margin: 0;">Si tienes preguntas, responde a este email&mdash;estamos para servirte.</p>
                                                </td>
                                            </tr>
                                            <tr style="border-left: 2px black solid; border-right: 2px black solid; border-bottom:2px black solid;">
                                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                    <p style="margin: 0; text-align: center;">Encuentranos en:</p>
                                                    <div style="text-align: center;">
                                                        <a style="padding-right:10px" href=""><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="25"></a>
                                                        <a href=""><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRVa8lLOwmvEjX6C_zHd7IzDOUShvDBpjLw&s" width="25"></a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                            <tr>
                                                <td bgcolor="orange" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #fff; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                    <h2 style="font-size: 20px; font-weight: 400; color: black; margin: 0;">¿Necesitas más ayuda?</h2>
                                                    <p style="margin: 0;"><a href="#" target="_blank" style="color: black;">Estamos aqui para ayudar</a></p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                            <tr>
                                                <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                                    <p style="margin: 0;">Si no quieres recibir más emails <a href="#" target="_blank" style="color: #111111; font-weight: 700;">cancela tu suscripcion</a>.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </body>`
                }
                transporter.sendMail(mailOptions, (error, info) =>{
                    if(error){
                        console.log(error)
                        return false
                    }
                })
            }
            if(res.state == false){
                response.json({state:false,mensaje:"Hubo un error al registrar."})
            }
            })
        }
    })
    
}
usersRegisterController.RegistrarModal = function(request, response){
    var post = {
        email:request.body.email,
        name:request.body.name,
        cellphone:request.body.cellphone,
        password:request.body.password
    }
    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false,mensaje:"El email es obligatorio"})
        return false
    }
    if(post.name == undefined || post.name == "" || post.name == null){
        response.json({state:false,mensaje:"El nombre es obligatorio"})
        return false
    }
    if(post.cellphone == undefined || post.cellphone == "" || post.cellphone == null){
        response.json({state:false,mensaje:"El telefono es obligatorio"})
        return false
    }
    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false,mensaje:"La contraseña es obligatoria"})
        return false
    }
    post.password = SHA256(post.password + setting.lock)
    usersRegisterModel.validarEmail(post,function(res){
        if(res.existe == 'Si existe'){
            response.json({state:false,mensaje:"Este email ya existe."})
        }
        else{
            var activationCode = Math.ceil(Math.random() * (999999 + 100000) + 100000)
            post.activationCode = activationCode
            usersRegisterModel.RegistrarModal(post, function(res){
            if(res.state == true){
                response.json({state:true,mensaje:"Usuario registrado exitosamente."})
                //Este no enviá codigo
            }else{
                response.json({state:false,mensaje:"Hubo un error al registrar."})
            }
            })
        }
    })
    
}
usersRegisterController.Mostrar = function(request, response){
    usersRegisterModel.Mostrar(null,function(res){
        response.json({state:true, datos:res.data})
    })
}
usersRegisterController.MostrarRegistrosEmail = function(request, response){
    post = {
        email:request.body.emailMod
    }
    if(post.email == undefined || post.email == "" || post.email == null){
        response.json({state:false,mensaje:"El email es obligatorio"})
        return false
    }
        usersRegisterModel.validarEmail(post, function(res){
        if(res.existe == 'Si existe'){
            usersRegisterModel.MostrarRegistrosEmail(post,function(res){
                response.json({state:true,datos:res.data})
            })
        }
        if(res.existe == 'No existe'){
            response.json({state:false,mensaje:'El email ingresado no existe'})
            return false
        }
    })
}
usersRegisterController.Actualizar = function(request, response){
    var post = {
        email:request.body.email,
        name:request.body.name,
        cellphone:request.body.cellphone,
        rol:request.body.rol,
        state:request.body.state
    }
    if(post.email == undefined || post.email == "" || post.email == null){
        response.json({state:false,mensaje:"El email es obligatorio"})
        return false
    }
    if(post.name == undefined || post.name == "" || post.name == null){
        response.json({state:false,mensaje:"El name es obligatorio"})
        return false
    }
    if(post.cellphone == undefined || post.cellphone == "" || post.cellphone == null){
        response.json({state:false,mensaje:"El cellphone es obligatorio"})
        return false
    }if(post.rol == undefined || post.rol == "" || post.rol == null){
        response.json({state:false,mensaje:"El rol es obligatorio"})
        return false
    }
    if(post.state == undefined || post.state == "" || post.state == null){
        response.json({state:false,mensaje:"El state es obligatorio"})
        return false
    }
    usersRegisterModel.validarEmail(post,function(res){
        if(res.existe == 'Si existe'){
            usersRegisterModel.Actualizar(post, function(res){
                if(res.state == true){
                    response.json({state:true,mensaje:"Usuario actualizado exitosamente."})
                }else{
                    response.json({state:false,mensaje:"Hubo un error al registrar."})
                }
            })
        }
        if(res.existe == 'No existe'){
            response.json({state:false,mensaje:'El id no existe'})
            return false
        }
    })
}
usersRegisterController.Eliminar = function(request,response){
    var post = {
        email:request.body.email
    }
    if(post.email == undefined || post.email == "" || post.email == null){
        response.json({state:false,mensaje:"El email es obligatorio"})
    }
    usersRegisterModel.validarEmail(post,function(res){
        if(res.existe == 'Si existe'){
            usersRegisterModel.Eliminar(post, function(res){
                response.json({state:true,mensaje:"Usuario eliminado correctamente."})
                return false
            })
        }
        if(res.existe == 'No existe'){
            response.json({state:false,mensaje:'El email no existe.'})
            return false
        }
    })
    
}
usersRegisterController.Login = function (request, response){
    var post = {
        email:request.body.email,
        password:request.body.password
    }
    if(post.email == undefined || post.email == "" || post.email == null){
        response.json({state:false,mensaje:"El email es obligatorio"})
    }
    if(post.password == undefined || post.password == "" || post.password == null){
        response.json({state:false,mensaje:"El password es obligatorio"})
    }
    post.password = SHA256(post.password + setting.lock)
    usersRegisterModel.validarEmail(post, function(res){
        if(res.existe == "No existe"){
            response.json({state:false,mensaje:"El email ingresado NO existe. Verifica e intenta nuevamente."})
            return false
        }
        if(res.existe == "Si existe"){
            usersRegisterModel.Login(post, function(res){ 
                 response.json(res)
            })
        }
    })
}
usersRegisterController.Activar = function (request, response){
    var post = {
        email:request.body.email,
        activationCode:request.body.activationCode
    }
    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false,mensaje:"El email es obligatorio"})
        return false
    }
    if(post.activationCode == undefined || post.activationCode == "" || post.activationCode == null){
        response.json({state:false,mensaje:"El codigo es obligatorio"})
        return false
    }

    usersRegisterModel.Activar(post, function(res){
        response.json(res)
    })
}
usersRegisterController.ForgotPassword = function (request, response){
    post = {
        email:request.body.email
    }
    if(post.email == undefined || post.email == "" || post.email == null){
        response.json({state:false,mensaje:"El email es obligatorio"})
        return false
    }
    post.ForgotPassword = Math.ceil(Math.random() * (999999 + 100000) + 100000)
    usersRegisterModel.ForgotPassword(post, function(res){
        if(res.state == false){
            response.json(res)
            return false
        }
        if(res.state == true){
            response.json({state:true,mensaje:"Se ha enviado un codigo de recuperacion a tu correo."})
            const transporter = nodemailer.createTransport({
                host:setting.email.host,
                port:setting.email.port,
                secure:false,
                requireTLS:true,
                auth:{
                    user:setting.email.user,
                    pass:setting.email.password
                }
            })
            var mailOptions = {
                from:setting.email.user,
                to:post.email,
                subject:"Recuperacion de contraseña -- LearningCenter",
                html:`<head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title></title>
                        <style type="text/css">
                        
                            @media screen {
                                @font-face {
                                    font-family: 'Lato';
                                    font-style: normal;
                                    font-weight: 400;
                                    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                                }
    
                                @font-face {
                                    font-family: 'Lato';
                                    font-style: normal;
                                    font-weight: 700;
                                    src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                                }
    
                                @font-face {
                                    font-family: 'Lato';
                                    font-style: italic;
                                    font-weight: 400;
                                    src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                                }
    
                                @font-face {
                                    font-family: 'Lato';
                                    font-style: italic;
                                    font-weight: 700;
                                    src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                                }
                            }
    
                            /* CLIENT-SPECIFIC STYLES */
                            body,
                            table,
                            td,
                            a {
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                            }
    
                            table,
                            td {
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                            }
    
                            img {
                                -ms-interpolation-mode: bicubic;
                            }
    
                            /* RESET STYLES */
                            img {
                                border: 0;
                                height: auto;
                                line-height: 100%;
                                outline: none;
                                text-decoration: none;
                            }
    
                            table {
                                border-collapse: collapse !important;
                            }
    
                            body {
                                height: 100% !important;
                                margin: 0 !important;
                                padding: 0 !important;
                                width: 100% !important;
                            }
    
                            /* iOS BLUE LINKS */
                            a[x-apple-data-detectors] {
                                color: inherit !important;
                                text-decoration: none !important;
                                font-size: inherit !important;
                                font-family: inherit !important;
                                font-weight: inherit !important;
                                line-height: inherit !important;
                            }
    
                            /* MOBILE STYLES */
                            @media screen and (max-width:600px) {
                                h1 {
                                    font-size: 32px !important;
                                    line-height: 32px !important;
                                }
                            }
    
                            /* ANDROID CENTER FIX */
                            div[style*="margin: 16px 0;"] {
                                margin: 0 !important;
                            }
                        </style>
                    </head>
                    <body class="container">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <!-- LOGO -->
                            <tr>
                                <td bgcolor="orange" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                        <tr>
                                            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="orange" align="center" style="padding: 0px 10px 0px 10px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                        <tr style="border-top: 2px black solid; border-left: 2px black solid; border-right: 2px black solid;">
                                            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">¿Olvidaste tu contraseña?</h1> <img src="https://i.ibb.co/hHVSTFG/learning-center-logo.jpg" width="125" height="120" style="display: block; border: 0px;" />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <!-- <tr>
                                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                <p style="margin: 0; text-align:center">YOUR OPT : *****</p>
                                            </td>
                                        </tr>-->
                                        <tr style="border-left: 2px black solid; border-right: 2px black solid;">
                                            <td bgcolor="#ffffff" align="left">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 30px 30px;">
                                                            <table border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td align="center" style="border-radius: 3px;" bgcolor="lime"><h3>Tu codigo de recuperacion es:<h3/></td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr> <!-- COPY -->
                                        <tr style="border-left: 2px black solid; border-right: 2px black solid;">
                                            <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                <h1 style="margin: 0; text-align: center;"> ${post.ForgotPassword}</h1>
                                                <p style="margin: 0;">El codigo de verificacion tiene un tiempo limite de 2 minutos, despues de eso expirará</p> <br>
                                                <p style="margin: 0;">Si tienes preguntas, responde a este email&mdash;estamos para servirte.</p>
                                            </td>
                                        </tr>
                                        <tr style="border-left: 2px black solid; border-right: 2px black solid; border-bottom:2px black solid;">
                                            <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                <p style="margin: 0; text-align: center;">Encuentranos en:</p>
                                                <div style="text-align: center;">
                                                    <a style="padding-right:10px" href=""><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width="25"></a>
                                                    <a href=""><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSRVa8lLOwmvEjX6C_zHd7IzDOUShvDBpjLw&s" width="25"></a>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                        <tr>
                                            <td bgcolor="orange" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #fff; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                <h2 style="font-size: 20px; font-weight: 400; color: black; margin: 0;">¿Necesitas más ayuda?</h2>
                                                <p style="margin: 0;"><a href="#" target="_blank" style="color: black;">Estamos aqui para ayudar</a></p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                        <tr>
                                            <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                                <p style="margin: 0;">Si no quieres recibir más emails <a href="#" target="_blank" style="color: #111111; font-weight: 700;">cancela tu suscripcion</a>.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>`
            }
            transporter.sendMail(mailOptions, (error, info) =>{
                if(error){
                    console.log(error)
                    return false
                }
                console.log(info)
            })
        }
        
    })
}
usersRegisterController.ActivateCodeFP = function (request, response){
    function timeLapsed(olddate){
        const oldDate = new Date(olddate)
        const currentDate = new Date()
        const difference = currentDate - oldDate
        if (difference < 0){
            return "La fecha proporcionada está en el futuro"
        }
        const totalSeconds = Math.floor((difference / 1000)/60) 
        return totalSeconds
    }
    post = {
        email:request.body.email,
        forgotPassword:request.body.forgotPassword,
        password:request.body.password,
        password2:request.body.password2
    }
    if(post.email == undefined || post.email == "" || post.email == null){
        response.json({state:false,mensaje:"El email es obligatorio"})
        return false
    }
    if(post.forgotPassword == undefined || post.forgotPassword == "" || post.forgotPassword == null){
        response.json({state:false,mensaje:"El codgio de recuperacion es obligatorio"})
        return false
    }
    if(post.password == undefined || post.password == "" || post.password == null){
        response.json({state:false,mensaje:"El password nuevo es obligatorio"})
        return false
    }
    if(post.password2 == undefined || post.password2 == "" || post.password2 == null){
        response.json({state:false,mensaje:"El password de confirmacion es obligatorio"})
        return false
    }
    if(post.password2 != post.password){
        response.json({state:false,mensaje:"Las contraseñas no coinciden"})
        return false
    }
    post.password = SHA256(post.password + setting.lock)
    usersRegisterModel.checkDate(post, function(res){
        var seconds = timeLapsed(res.data.codeDate)
        if(seconds >= 1){
            response.json({state:false,mensaje:"El codigo ha caducado, solicita uno nuevo."})
            return false
        }
        if(seconds < 1){
            usersRegisterModel.ActivateCodeFP(post, function(res){
                response.json(res)
            })
        }
    })
}
module.exports.usersRegisterControllerExport = usersRegisterController