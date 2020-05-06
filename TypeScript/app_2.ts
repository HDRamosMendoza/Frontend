/*
* Los identificadores son nombres dados a elementos en un programa como variables, 
  funciones, etc.
    => Las reglas para identificadores son:
    - Los identificadores pueden incluir tanto caracteres como dígitos. Sin embargo,
      el identificador no puede comenzar con un dígito.
    - Los identificadores no pueden incluir símbolos especiales excepto el guión 
      bajo (_) o un signo de dólar ($).
    - Los identificadores no pueden ser palabras clave.
    - Deben ser únicos.
    - Los identificadores distinguen entre mayúsculas y minúsculas.
    - Los identificadores no pueden contener espacios.
    Ejemplo: firstName, first_name, num1, $result
*/

//1. Object Orientation
class Persona {
    origen():void{
        console.log("Hello World !!!");
    }
}
// Llamando al objeto creado
var objPersona = new Persona(); 
objPersona.origen();

//2. Tipos

// Any. Cualquier tipo.

//number, string, boolean, void, null y undefined.

/*  Una variable inicializada con "undefined" significa que la 
    variable no tiene un valor o un objeto asignado, mientras 
    que "null" significa que la variable se ha establecido en un
    objeto cuyo valor no está definido.
*/

//3.Aserción de tipo y scope de variable.

var str = '1' 
var str2:number = <number> <any> str   //str is now of type number 
console.log(str2)

var global_num = 12          //global variable 
class Numbers { 
   num_val = 13;             //class variable 
   static sval = 10;         //static field 
   
   storeNum():void { 
      var local_num = 14;    //local variable 
   } 
} 
console.log("Global num: "+global_num)  
console.log(Numbers.sval)   //static variable  
var obj = new Numbers(); 
console.log("Global num: "+obj.num_val) 

//4. Declaración de variables.

var name2:string = "John"; 
var score1:number = 50;
var score2:number = 42.50
var sum = score1 + score2 
console.log("name"+name) 
console.log("first score: "+score1) 
console.log("second score: "+score2) 
console.log("sum of the scores: "+sum)

//5. Tipo de operador.
//Generated by typescript 1.8.10
var num = 12;
console.log(typeof num);   //output: number

// 6. Funciones.
// - Definir una función. Tipo de retorno.
function greet():string { //the function returns a string 
    return "Hello World" 
}
function caller() { 
    var msg = greet() //function greet() invoked 
    console.log(msg) 
}
 //invoke function 
 caller()

 // - Posición de parametros.
 function test_param(n1:number,s1:string) { 
    console.log(n1) 
    console.log(s1) 
 } 
 test_param(123,"this is a string")
 
 // - Parametros opcionales.
 function disp_details(id:number,name:string,mail_id?:string) { 
    console.log("ID:", id); 
    console.log("Name",name); 
    
    if(mail_id!=undefined)  
    console.log("Email Id",mail_id); 
 }
 disp_details(123,"John");
 disp_details(111,"mary","mary@xyz.com");

 // - Parámetros de descanso. Deben de ser el mismo tipo
 function addNumbers(...nums:number[]) {  
    var i;   
    var sum:number = 0; 
    
    for(i = 0;i<nums.length;i++) { 
       sum = sum + nums[i]; 
    } 
    console.log("sum of the numbers",sum) 
 } 
 addNumbers(1,2,3) 
 addNumbers(10,10,10,10,10)

 // - Parámetros predeterminados.
 function calculate_discount(price:number,rate:number = 0.50) { 
    var discount = price * rate; 
    console.log("Discount Amount: ",discount); 
 } 
 calculate_discount(1000) 
 calculate_discount(1000,0.30)
 /* Salida.
    Discount amount : 500 
    Discount amount : 300
 */

 // NOTA: var res = new Function( [arguments] ) { ... }.

 // - Constructor de funciones.
 var myFunction = new Function("a", "b", "return a * b"); 
var x = myFunction(4, 3); 
console.log(x);

// - Recursividad.
function factorial(number:number):number {
    if (number <= 0) { // termination case
       return 1; 
    } else {     
       return (number * factorial(number - 1)); // function invokes itself
    } 
 }; 
 console.log(factorial(6)); // outputs 720 

 // - Función recursiva anónima.
(function () { 
    var x = "Hello!!";
    console.log(x); 
})()      // the function invokes itself using a pair of parentheses ()

// - Lambda. Es un mecanismo conciso para representar funciones anónimas.

// Expresión Lambda.
var foo = (x:number)=>10 + x
console.log(foo(100)) //outputs 110 

// Declaración lambda.
var foo2 = (x:number)=> {    
    x = 10 + x 
    console.log(x)  
 } 
 foo2(100)

// ** Variaciones sintácticas.
// Tipo de parámetro Inferencia
var func = (x:any)=> { /*Agregue any*/
    if(typeof x=="number") { 
       console.log(x+" is numeric") 
    } else if(typeof x=="string") { 
       console.log(x+" is a string") 
    }  
 } 
 func(12) 
 func("Tom")
 // Salida. 12 is numeric;Tom is a string

 // Paréntesis opcionales para un solo parámetro
 var display = (x3:any) => { 
    console.log("The function got "+x3) 
 } 
 display(12)

 /* Aparatos ortopédicos opcionales para una sola declaración,
    paréntesis vacíos para ningún parámetro */
var disp =()=> { 
    console.log("Function invoked"); 
    } 
    disp();

// Prototype
/* var emp = new employee(123,"Smith") 
 employee.prototype.email = "smith@abc.com" 
 
 console.log("Employee 's Id: "+emp.id) 
 console.log("Employee's name: "+emp.name) 
 console.log("Employee's Email ID: "+emp.email)*/

// Precision
var num5 = new Number(7.123456); 
console.log(num5.toPrecision()); 

// ToFixed
var num3 = 177.234 
console.log("num3.toFixed() is "+num3.toFixed()) 
console.log("num3.toFixed(2) is "+num3.toFixed(2)) 
console.log("num3.toFixed(6) is "+num3.toFixed(6))
/*num3.toFixed() is 177 
num3.toFixed(2) is 177.23 
num3.toFixed(6) is 177.234000*/

// 7. Cadenas.
// https://www.tutorialspoint.com/typescript/typescript_strings.htm

// 8. Array

// - Array simple.
var alphas:string[]; 
alphas = ["1","2","3","4"] 
console.log(alphas[0]); 
console.log(alphas[1]);

// - declaración de declaración única e inicialización.
var nums:number[] = [1,2,3,3] 
console.log(nums[0]); 
console.log(nums[1]); 
console.log(nums[2]); 
console.log(nums[3]);

// - Objeto de matriz
var arr_names:number[] = new Array(4)  
for(var i = 0;i<arr_names.length;i++) { 
   arr_names[i] = i * 2 
   console.log(arr_names[i]) 
}

// - Array Constructor acepta valores separados por comas
var names:string[] = new Array("Mary","Tom","Jack","Jill")
for(var i = 0;i<names.length;i++) { 
   console.log(names[i]) 
}

// - Metodos de la matriz
// https://www.tutorialspoint.com/typescript/typescript_arrays.htm

// - Desestructuración de matrices
// var arr:number[] = [12,13] 
// var[x,y] = arr 
// console.log(x) 
// console.log(y)

// - Array Traversal usando for ... in loop
var j:any; 
var nums:number[] = [1001,1002,1003,1004] 

for(j in nums) { 
   console.log(nums[j]) 
} 

// - Array de 2 dimensiones.
var multi:number[][] = [[1,2,3],[23,24,25]]  
console.log(multi[0][0]) 
console.log(multi[0][1]) 
console.log(multi[0][2]) 
console.log(multi[1][0]) 
console.log(multi[1][1]) 
console.log(multi[1][2])

// Pasando un array por función
var names:string[] = new Array("Mary","Tom","Jack","Jill")  
function disp2(arr_names:string[]) {
   for(var i = 0;i<arr_names.length;i++) { 
      console.log(names[i]) 
   }  
}  
disp2(names)

// Retorno de un array en una función
function disp3():string[] { 
    return new Array("Mary","Tom","Jack","Jill") 
 } 
  
 var nums8:string[] = disp3() 
 for(var p in nums8) { 
    console.log(nums8[i]) 
 }

 // 9. Tuplas.
 var mytuple1 = []; 
mytuple1[0] = 120 
mytuple1[1] = 234

var mytuple2 = [10,"Hello"]; //create a  tuple 
console.log(mytuple2[0]) 
console.log(mytuple2[1])

var tup = [] 
tup[0] = 12 
tup[1] = 23 

console.log(tup[0]) 
console.log(tup[1])

// - Actualizando TUPLAS.
var mytuple = [10,"Hello","World","typeScript"]; //create a  tuple 
console.log("Tuple value at index 0 "+mytuple[0]) 

//update a tuple element 
mytuple[0] = 121     
console.log("Tuple value at index 0 changed to   "+mytuple[0])

// - Destructurando tuplas
var a =[10,"hello"] 
var [b,c] = a 
console.log( b )    
console.log( c ) 

// 10. Union
// - Variable Tipo Unión
var val:string|number 
val = 12 
console.log("numeric value of val "+val) 
val = "This is a string" 
console.log("string value of val "+val)

// - Tipo de unión y parámetro de función.
function disp7(name:string|string[]) { 
    if(typeof name == "string") { 
       console.log(name) 
    } else { 
       var i; 
       
       for(i = 0;i<name.length;i++) { 
          console.log(name[i])
       } 
    } 
 } 
 disp7("mark") 
 console.log("Printing names array....") 
 disp7(["Mark","Tom","Mary","John"])

 // - Tipo de unión y matrices. Los tipos de unión también se 
 // pueden aplicar a matrices, propiedades e interfaces
 var arr:number[]|string[]; 
var i:number; 
arr = [1,2,4] 
console.log("**numeric array**")  

for(i = 0;i<arr.length;i++) { 
   console.log(arr[i]) 
}  

arr = ["Mumbai","Pune","Delhi"] 
console.log("**string array**")  

for(i = 0;i<arr.length;i++) { 
   console.log(arr[i]) 
} 

// 11. Interfaz. define la sintaxis a la que debe adherirse cualquier entidad.
// - interfaz y objetos
interface IPerson { 
    firstName:string, 
    lastName:string, 
    sayHi: ()=>string 
 } 
 
 var customer:IPerson = { 
    firstName:"Tom",
    lastName:"Hanks", 
    sayHi: ():string =>{return "Hi there"} 
 } 
 
 console.log("Customer Object ") 
 console.log(customer.firstName) 
 console.log(customer.lastName) 
 console.log(customer.sayHi())  
 
 var employee:IPerson = { 
    firstName:"Jim",
    lastName:"Blakes", 
    sayHi: ():string =>{return "Hello!!!"} 
 } 
   
 console.log("Employee  Object ") 
 console.log(employee.firstName)
 console.log(employee.lastName)

 // - Tipo de unión e interfaz
 interface RunOptions { 
    program:string; 
    commandline:string[]|string|(()=>string); 
 } 
 
 //commandline as string 
 var options9:RunOptions = {program:"test1",commandline:"Hello"}; 
 console.log(options9.commandline)  
 
 //commandline as a string array 
 options9 = {program:"test1",commandline:["Hello","World"]}; 
 console.log(options9.commandline[0]); 
 console.log(options9.commandline[1]);  
 
 //commandline as a function expression 
 options9 = {program:"test1",commandline:()=>{return "**Hello World**";}}; 
 
 var fn:any = options9.commandline; 
 console.log(fn());

 // - Interfaces y matrices
 interface namelist { 
    [index:number]:string 
 } 
 
 var list2:namelist = ["John",1,"Bran"] //Error. 1 is not type string  
 interface ages { 
    [index:string]:number 
 } 
 
 var agelist:ages; 
 agelist["John"] = 15   // Ok 
 agelist[2] = "nine"   // Error

 // - Interfaces y herencia
/*
Sintaxis: Herencia de interfaz única
    Child_interface_name extends super_interface_name
Sintaxis: Herencia de interfaz múltiple
    Child_interface_name extends super_interface1_name, 
    super_interface2_name,…,super_interfaceN_name
 */

 // - Herencia de interfaz simple
 interface Person { 
    age:number 
 } 
 
 interface Musician extends Person { 
    instrument:string 
 } 
 
 var drummer = <Musician>{}; 
 drummer.age = 27 
 drummer.instrument = "Drums" 
 console.log("Age:  "+drummer.age) console.log("Instrument:  "+drummer.instrument)

 // - Herencia de interfaz múltiple
interface IParent1 { 
   v1:number 
} 

interface IParent2 { 
   v2:number 
} 

interface Child extends IParent1, IParent2 { } 
var Iobj:Child = { v1:12, v2:23} 
console.log("value 1: "+this.v1+" value 2: "+this.v2)

// 12. Clase.
// - declarar una clase
class Car { 
    //field 
    engine:string; 
    
    //constructor 
    constructor(engine:string) { 
       this.engine = engine 
    }  
    
    //function 
    disp():void { 
       console.log("Function displays Engine is  :   "+this.engine) 
    } 
 } 
 
 //create an object 
 var objr = new Car("XXSY1")
 
 //access the field 
 console.log("Reading attribute value Engine as :  "+objr.engine)  
 
 //access the function
 objr.disp()

 // - Herencia de clase
 //* Repasar el tema. */