require.config({
	baseUrl: '.',
	paths:{
		operaciones:'js/operaciones',
		//tool:'js/tool',
		jquery:'js/lib/jquery-3.3.1.min',
		text:'node_modules/text/text'
	}
});

require(['modules/myModule', 'modules/nls/strings'], function(mod, nls) {
    
    mod.init();

    let lang = mod.pathUrl('lang');
    
    /*
   	OBS: Se tiene que leer de la carpeta nls el idioma y reemplazar en la 
   		web. Hasta el momento es la mejor opción que eh visto.
   		Atte: Ing. Daniel Ramos Mendoza.
   	*/

    let obj = JSON.parse(JSON.stringify(nls), function(key, value) {
    	//console.log(nls[key]);
    	if(key==lang && value){
    		return value;
    	} else {
    		return value;
    	}
    });
  	//console.log(obj);
  	

    //console.log(nls);
    //console.log(mod.pathUrl('lang'));

    /*
		var text = '{ "name":"John", "birth":"1986-12-14", "city":"New York"}';
		var obj = JSON.parse(text, function (key, value) {
	    	if (key == "birth") {
	        	return new Date(value);
	    	} else {
	        	return value;
	    	}
	    });

	    console.log(obj);

	    */
    
});