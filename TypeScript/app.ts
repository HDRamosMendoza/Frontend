//tsc app.ts -w -> Para correr el archivo.
//tsc *.ts -w
//tsc -init
// Pra cancelar es ctrl + c
//https://www.youtube.com/watch?v=RMOJi63ztIY&index=6&list=PLCKuOXG0bPi2J-C0WPRZdHTG6pareIvV2

// Tipos de datos

// - Primitivos(string, numero, booleanos, null, undefined).
// - Compuestos(objetos literales, clases, funciones).

// Objetos literales
let persona ={
    nombre : "Daniel",
    edad: 30
}

// Booleanos
let esSuperman:boolean = true;
let esBatman:boolean;
let esAcuman = true;
//esAcuman = "hola"

if (esSuperman) {
    console.log("Estamos salvados");
} else {
    console.log("Opps!! oh");
}

esSuperman = convertirClark();

function convertirClark(){
    return false;
}
// 7. Tipos numericos
let avengers:number = 5;
let villanos:number;
let otros=2;

/* if( avengers > villanos){    
    console.log("Estamos salvados");
} else {
    console.log("Estamos muertos");
} */

otros = 123;
otros = 123.12;
//otros = "123"

// 8. Cadenas de caracteres.
let batman:string = "Batman";
let linternaVerde:string ="Linterna Verde";
let volcanNegro:string = "Volcan negro";

console.log(batman);
console.log(linternaVerde);
console.log(volcanNegro);

let concatenar:string = "Los herores: " + batman + " " + linternaVerde + " " + volcanNegro + " " ;
console.log(concatenar);

// String literal
console.log(`Los María herores: ${batman} ${linternaVerde} ${volcanNegro}`);

// 9. Tipo de dato ANY.
// El tipo ANY es cualquier tipo de dato.
// Las que no osn declaradas son de tipo ANY.

let vengador;
let existe;
let derrotas;
vengador = "Dr. Strange";
console.log(vengador.charAt(0));

vengador = 150.55555;
console.log(vengador.toFixed(2));

vengador = true;
console.log(vengador);

// 10. Arreglos.
// Mala practica.
//let arreglo = [1,2,3,4,5,6];
let arreglo:number[] = [1,2,3,4,5,6];
let villano:string[] = ["Omega", "Dormamu", "Duende Verde"];

console.log(villano[0].charAt(0));

// 11. Objetos basicos en typescript
let flash = {
    nombre: "Barry Allen",
    edad: 24,
    poderes: ["Puede coorer muy rapido", "Viajar por el tiempo"]
};
// 12 Tipos especificos.
let flash2: {
        nombre:string, 
        edad:number, 
        poderes:string[]
    } = {
    nombre: "Barry Allen",
    edad: 24,
    poderes: ["Puede coorer muy rapido", "Viajar por el tiempo"]
};

// 13. Tipos personalizados
// Estoy creando una definicion de
// un tipo.
type Heroe = {
    nombre:string,
    edad:number,
    poderes:any[],
    getNombre:() => string
}

let flashHeroe:Heroe = {
    nombre: "Barry",
    edad:24,
    poderes:["Puede","Ser"],
    getNombre(){
        return this.nombre;
    }
}

// 14 . Interfaz basica.

interface Xmen {
    nombre:string,
    poder:string
};
/*function enviarMision ( xmen: {nombreXmen:string}){
    console.log("Enviando a: " + xmen.nombreXmen);
};*/
function enviarMision ( xmen: Xmen){
    console.log("Enviando a: " + xmen.nombre);
};

/*function enviarCuartel ( xmen: {nombre:string}){
    console.log("Enviando al cuartel: " + xmen.nombre);
};*/

function enviarCuartel ( xmen: Xmen){
    console.log("Enviando al cuartel: " + xmen.nombre);
};

/*let wolverine = {
    nombreXmen: "Wolverine",
    poder: "Regeneracion"
};*/

let wolverine:any = {
    nombre: "Wolverine",
    poder: "Regeneracion"
};

enviarMision(wolverine);
enviarCuartel(wolverine);

// 15 Definición de una clase básica en
//    TypeScript

class Avenger {
    nombre:string = "Antman";
    //equipo:string;
    //nombreReal:string;
    //puedePelear:boolean; 
}

let antman:Avenger = new Avenger();
console.log(antman);

// 16 Constructorees en las clase
//      de TypeScript.

class Avenger2 {
    nombre:string = "Antman";
    //equipo:string = undefined;
    //nombreReal:string = undefined;

    puedePelear:boolean = true;
    peleasGanadas:number = 0;

    constructor( nombre:string, equipo:string, nombreReal:string) {
        this.nombre = nombre;
        //this.equipo = equipo;
        //this.nombreReal = nombreReal;
    }
}

let antman2:Avenger2 = new Avenger2("Antman","cap","Scott Lang");
console.log(antman2);