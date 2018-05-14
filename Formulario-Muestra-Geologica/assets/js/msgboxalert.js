(function ($) {
    $.MsgBOX = function (options) {
        var MsgBox;
        var defaults = {
            msgError: "Se ha producido un error, por favor intentelo nuevamente o mas tarde.",
            msgWarning: "No se ha podido realizar la operación, por favor verifique los datos.",
            msgOk: "La operación se ha realizado correctamente.",
            icoError: "error",
            icoWarning: "warning",
            icoOk: "ok",
            msg: '',
            type: "warning",
            closeIcon: true,
            confirmButton: 'Aceptar',
            confirmButtonClass: 'btn-aceptar',
            confirm: function () { }
        };

        var settings = $.extend({}, defaults, options);

        var fun = {
            _init: function () {
                $.alert({
                    closeIcon: settings.closeIcon,
                    content: this._retunTypeMsg(),
                    confirmButton: settings.confirmButton,
                    confirmButtonClass: settings.confirmButtonClass,
                    confirm: settings.confirm
                });
            },

            _retunTypeMsg: function () {
                var message = null;
                var msg = settings.type;
                var msgTex = settings.msg;
                switch (msg) {
                    case "warning":
                    case 0:
                        msgTex = msgTex.length > 0 ? msgTex : settings.msgWarning;
                        message = this.obtenerIcono(settings.icoWarning, msgTex);
                        break;

                    case "ok":
                    case 1:
                        msgTex = msgTex.length > 0 ? msgTex : settings.msgOk;
                        message = this.obtenerIcono(settings.icoOk, settings.msgOk);
                        break;

                    case "error":
                    case 2:
                        msgTex = msgTex.length > 0 ? msgTex : settings.msgError;
                        message = this.obtenerIcono(settings.icoError, settings.msgError);
                        break;
                };

                return message;
            },

            obtenerIcono: function (icon, msg) {
                return "<ul class='jconfirm-msgbok jconfirm-msgbok-" + icon + "'><li>" + msg + "</li>";
            }
        };

        //inicializa
        fun._init();
    };
})(jQuery);