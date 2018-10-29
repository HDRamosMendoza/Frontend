define( [], function () {
	let pathUrl = document.write(document.URL);
  	return {
    	ramos: function(){
    		return pathUrl;
    	}
    }
});