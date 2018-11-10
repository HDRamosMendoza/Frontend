//tsc app.ts -w -> Para correr el archivo.
//tsc *.ts -w
//tsc -init
// Pra cancelar es ctrl + c
//https://www.youtube.com/watch?v=RMOJi63ztIY&index=6&list=PLCKuOXG0bPi2J-C0WPRZdHTG6pareIvV2
// Tipos de datos
// - Primitivos(string, numero, booleanos, null, undefined).
// - Compuestos(objetos literales, clases, funciones).
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
/* if( avengers > villanos){
    console.log("Estamos salvados");
} else {
    console.log("Estamos muertos");
} */
otros = 123;
otros = 123.12;
//otros = "123"
// 8. Cadenas de caracteres.
var batman = "Batman";
var linternaVerde = "Linterna Verde";
var volcanNegro = "Volcan negro";
console.log(batman);
console.log(linternaVerde);
console.log(volcanNegro);
var concatenar = "Los herores: " + batman + " " + linternaVerde + " " + volcanNegro + " ";
console.log(concatenar);
// String literal
console.log("Los Mar\u00EDa herores: " + batman + " " + linternaVerde + " " + volcanNegro);
// 9. Tipo de dato ANY.
// El tipo ANY es cualquier tipo de dato.
// Las que no osn declaradas son de tipo ANY.
var vengador;
var existe;
var derrotas;
vengador = "Dr. Strange";
console.log(vengador.charAt(0));
vengador = 150.55555;
console.log(vengador.toFixed(2));
vengador = true;
console.log(vengador);
// 10. Arreglos.
// Mala practica.
//let arreglo = [1,2,3,4,5,6];
var arreglo = [1, 2, 3, 4, 5, 6];
var villano = ["Omega", "Dormamu", "Duende Verde"];
console.log(villano[0].charAt(0));
// 11. Objetos basicos en typescript
