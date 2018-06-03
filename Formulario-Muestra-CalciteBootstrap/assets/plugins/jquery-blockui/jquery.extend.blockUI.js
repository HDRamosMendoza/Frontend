$.extend(true, $.blockUI.defaults, {
    css: {
        zIndex: 99999,
        border: 0,
        backgroundColor: 'initial'
    },
    overlayCSS: {
        backgroundColor: 'none'
    },
    message: '<div class="loading-message-boxed"><div class="loading"></div><span>&nbsp;&nbsp;Procesando...</span></div>'
});

// Loadind ajax
$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
