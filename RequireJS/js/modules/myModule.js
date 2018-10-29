define( 
  [
  'text!templates/template.html',
  'jquery'
  ], function (divTemplate, $) {
  return {
    init: function() {      
      'Note: widget model'
			let friendsList = $( "#WidgetTemplate" );
    	let template = $( divTemplate );
    	friendsList.html( template );
  	},
  	pathUrl: function(name) {
      'Note: Get language - WebSite'
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      results = regex.exec(location.search);
    	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }	
  }
});