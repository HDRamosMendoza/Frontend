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
var flash = {
    nombre: "Barry Allen",
    edad: 24,
    poderes: ["Puede coorer muy rapido", "Viajar por el tiempo"]
};
// 12 Tipos especificos.
var flash2 = {
    nombre: "Barry Allen",
    edad: 24,
    poderes: ["Puede coorer muy rapido", "Viajar por el tiempo"]
};
var flashHeroe = {
    nombre: "Barry",
    edad: 24,
    poderes: ["Puede", "Ser"],
    getNombre: function () {
        return this.nombre;
    }
};
;
/*function enviarMision ( xmen: {nombreXmen:string}){
    console.log("Enviando a: " + xmen.nombreXmen);
};*/
function enviarMision(xmen) {
    console.log("Enviando a: " + xmen.nombre);
}
;
/*function enviarCuartel ( xmen: {nombre:string}){
    console.log("Enviando al cuartel: " + xmen.nombre);
};*/
function enviarCuartel(xmen) {
    console.log("Enviando al cuartel: " + xmen.nombre);
}
;
/*let wolverine = {
    nombreXmen: "Wolverine",
    poder: "Regeneracion"
};*/
var wolverine = {
    nombre: "Wolverine",
    poder: "Regeneracion"
};
enviarMision(wolverine);
enviarCuartel(wolverine);
// 15 Definición de una clase básica en
//    TypeScript
var Avenger = /** @class */ (function () {
    function Avenger() {
        this.nombre = "Antman";
        //equipo:string;
        //nombreReal:string;
        //puedePelear:boolean; 
    }
    return Avenger;
}());
var antman = new Avenger();
console.log(antman);
// 16 Constructorees en las clase
//      de TypeScript.
var Avenger2 = /** @class */ (function () {
    function Avenger2(nombre, equipo, nombreReal) {
        this.nombre = "Antman";
        //equipo:string = undefined;
        //nombreReal:string = undefined;
        this.puedePelear = true;
        this.peleasGanadas = 0;
        this.nombre = nombre;
        //this.equipo = equipo;
        //this.nombreReal = nombreReal;
    }
    return Avenger2;
}());
var antman2 = new Avenger2("Antman", "cap", "Scott Lang");
console.log(antman2);
