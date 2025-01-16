var config = {
    email:{}
}
config.puerto = 3000
config.db = 'learningCenterDB'
config.db_Test = 'learningCenterDB_Test'
config.lock = 'dsaifh89f23jh89fqhfioaewjfq¨[*_¡?=)(#!"#'
config.urlReal = "http://localhost:4200"

//info para enviar correos
config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "daniel99020602844@gmail.com"
config.email.password = "allofhgekddjiego"
//fin de info

//info de CORS
config.blacklist = [
    "http://localhost:4200"
]


module.exports.configExport = config