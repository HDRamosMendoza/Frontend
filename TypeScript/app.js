//tsc app.ts -w -> Para correr el archivo.
//tsc *.ts -w
//tsc -init
// Pra cancelar es ctrl + c
//https://www.youtube.com/watch?v=RMOJi63ztIY&index=6&list=PLCKuOXG0bPi2J-C0WPRZdHTG6pareIvV2
// Objetos literales
var persona = {
    nombre: "Daniel",
    edad: 30
};
// Booleanos
var esSuperman = true;
var esBatman;
var esAcuman = true;
//esAcuman = "hola"
if (esSuperman) {
    console.log("Estamos salvados");
}
else {
    console.log("Opps!! oh");
}
esSuperman = convertirClark();
function convertirClark() {
    return false;
}
// 7. Tipos numericos
var avengers = 5;
var villanos;
var otros = 2;
if (avengers > villanos) {
    console.log("Estamos salvados");
}
else {
    console.log("Estamos muertos");
}
otros = 123;
otros = 123.12;
//otros = "123"
// 8. Cadenas de caracteres.
var batman = "Batman";
var linternaVerde = "Linterna Verde";
var volvanNegro = "Volcan negro";
console.log(batman);
console.log(linternaVerde);
console.log(volvanNegro);
// Me quedw en el video 8
