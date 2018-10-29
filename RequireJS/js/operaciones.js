// En el caso de que definas se usa DEFINE.
define([], function(){
	return {
		sumar: function(num1, num2){
			return num1 + num2;
		},
		restar: function(num1, num2){
			return num1 - num2;
		},
		multiplicar: function(num1, num2){
			return num1 * num2;	
		},
		dividir: function(num1, num2){
			return num1 / num2;
		}
	}
});