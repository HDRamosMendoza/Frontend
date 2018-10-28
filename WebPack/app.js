var personas = require('./personas.js');
var $ = require(jquery);

$('body').append('<h1>' + personas[0].name + '</h1>');
    

console.log(personas);
//var mensaje = require('./personas.js');
//alert(mensaje.name);