//cargo de librerias
var express = require("express");
var bodyParser  = require("body-parser");
var serialport = require('serialport');

//variable para el manejo del servidor web
var servidorWeb = express();

//configuracion del puerto serial
var port = new serialport("/COM3", {
  baudRate: 1200,
  parity: "odd",
  stopBits: 1,
  dataBits: 7,
  rtscts: true,
  parser: serialport.parsers.readline("\r\n")
});


//Mensaje cuando el puerto serial se abre
port.on('open', function() {
  console.log("puerto abierto");
});

// Mensaje de error al abrir el puerto
port.on('error', function(err) {
  console.log('Error al abrirl el puerto serial: ', err.message);
})

//Setea los resultados a tipo json
servidorWeb.use(bodyParser.urlencoded({ extended: false }));
servidorWeb.use(bodyParser.json());

//manejador de las peticiones
var router = express.Router();

//Crea el enrutamiento para la url /peso
router.get('/peso', function(req, res) {
  //setea el tipo de contenido a json
  res.type('application/json');
  console.log("Se solicitó el peso");
  //instrucción de solicitud del peso a la balanza
  var peticion = String.fromCharCode(27)+'P'+String.fromCharCode(13,10);
  //Pide la instrucción a la balanza
  
  port.write(peticion, function(){
    //función de callback del listener para cuando
    //se recibe informacion del puerto de comunicaciones
    var callback = function(data) {
      console.log(data);
      //se genera la respuesta en formato json
      res.json({peso: data});
      //se auto elimina el callback de los listeners del puerto
      port.removeListener('data', callback);
    };
    //crea el listener de escritura del puerto
    port.on('data', callback);
  });
});

//se le asigna el enrutador al servidor web
servidorWeb.use(router);

//lanza el servidor web
servidorWeb.listen(8888, function() {
  console.log("Escuchando peticiones en el puerto 8888");
});
