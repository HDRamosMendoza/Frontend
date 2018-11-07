//tsc app.ts -w -> Para correr el archivo.
//tsc *.ts -w
//tsc -init
// Pra cancelar es ctrl + c
//https://www.youtube.com/watch?v=RMOJi63ztIY&index=6&list=PLCKuOXG0bPi2J-C0WPRZdHTG6pareIvV2

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

if( avengers > villanos){
    console.log("Estamos salvados");
} else {
    console.log("Estamos muertos");
}

otros = 123;
otros = 123.12;
//otros = "123"

// 8. Cadenas de caracteres.
let batman:string = "Batman";
let linternaVerde:string ="Linterna Verde";
let volvanNegro:string = "Volcan negro";

console.log(batman);
console.log(linternaVerde);
console.log(volvanNegro);

 // Me quedw en el video 8
