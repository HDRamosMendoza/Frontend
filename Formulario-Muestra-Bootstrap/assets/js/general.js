
//Variables de mensajes
var MSG_OK = "La operación se ha realizado correctamente.";
var MSG_WARNING = "No se ha podido realizar la operación, por favor verifique los datos.";
var MSG_ERROR = "Se ha producido un error, por favor intentelo nuevamente o mas tarde.";

//Variables constantes
var TITLE_OK = "OK";
var TITLE_WARNING = "ADVERTENCIA";
var TITLE_ERROR = "ERROR";

//Variables para los Iconos
var ICO_OK = '<i class="fa fa-check-square-o fa-lg"></i>&nbsp;';
var ICO_WARNING = '<i class="fa fa-exclamation-circle fa-lg"></i>&nbsp;';
var ICO_ERROR = '<i class="fa fa-exclamation-triangle fa-lg"></i>&nbsp;';

function _MsgBoxSingle(Estado) {

    var message = Estado == 0 ? MSG_WARNING
        : Estado == 1 ? MSG_OK
        : Estado == 2 ? MSG_ERROR : Estado;

    $.alert({
        closeIcon: true,
        content: message
    });
}

function _MsgBox($obj, res) {
    if (!res)
        var varData = { Estado: 2 };
    else
        var varData = (typeof res.d) == 'string' ? eval('(' + res.d + ')') : res.d;
    switch (varData.Estado) {
        case 0:
            if (!varData.Mensaje.length)
                $obj.setContent(ICO_WARNING + MSG_WARNING);
            else
                $obj.setContent(ICO_WARNING + varData.Mensaje);
            break;
        case 1:
            $obj.setContent(ICO_OK + MSG_OK);
            break;
        case 2:
            $obj.setContent(ICO_ERROR + MSG_ERROR);
            break;
    }
}

// validar si el valor del elemento es null o vacio
function isEmpty(val) {
    if (jQuery.trim(val).length === 0)
        return false;
    return true;
}

// generate guid
function generateGUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

function mapaSriListaEspecie(lon, lat) {
    require([
       "esri/map",
       "esri/virtualearth/VETiledLayer",
       "esri/layers/ArcGISDynamicMapServiceLayer",
       "esri/layers/ImageParameters",
       'esri/geometry/Point',
       'esri/symbols/SimpleLineSymbol',
       'esri/symbols/SimpleMarkerSymbol',
       "esri/Color",
       'esri/graphic',
       "dojo/domReady!"
    ], function (
        Map,
        VETiledLayer,
        ArcGISDynamicMapServiceLayer,
        ImageParameters,
        Point,
        SimpleLineSymbol,
        SimpleMarkerSymbol,
        Color,
        Graphic
        ) {
        var map = new Map("map", {
            center: [-74.990619363, -9.19467261099999],
            zoom: 5,
            basemap: "topo"
        });

        veTileLayer = new esri.virtualearth.VETiledLayer({
            bingMapsKey: "AqHauerHKkdeXFQMO01Umo2dATSLIX1NN1j1C3hAZFLoTLnjc2VAzJL3To7cdd6_",
            mapStyle: esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS
        });
        map.addLayer(veTileLayer);

        var symbol = new SimpleMarkerSymbol(
          SimpleMarkerSymbol.STYLE_CIRCLE,
          10,
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([255, 244, 0]),
            5
          ), new Color([255, 244, 0, 0.56]));

        var point = new Point([lon, lat]);

        map.on('load', function () {
            if (lon != 0 & lat != 0)
                map.graphics.add(new Graphic(point, symbol));
        });
    });
}

function isNullorEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? false : true;
}

// funcion para listas combos
(function ($) {
    var proxy = $.fn.serializeArray;
    $.fn.serializeArray = function () {
        var inputs = this.find(':disabled');
        inputs.prop('disabled', false);
        var serialized = proxy.apply(this, arguments);
        inputs.prop('disabled', true);
        return serialized;
    };

    $.fn.controlCBOS = function (options) {
        var $this = this;
        var defaults = {
            url: "",
            async: false,
            data: {},
            value: "",
            text: "Descripcion",
            val: "Codigo",
            adicional: 'Adicional',
            adicionalType: false,
            selectDefault: false
        };
        var settings = $.extend({}, defaults, options);
        var functions = {
            adOptionsDefault: function (e) {
                $this
                    .empty()
                    .append($('<option />', {
                        text: "",
                        val: ""
                    }));
            }
        };

        $.ajax({
            type: "POST",
            async: settings.async,
            url: settings.url,
            data: settings.data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
                var varData = res.d;
                functions.adOptionsDefault();
                for (var i = 0; i < varData.length; i++) {
                    $('<option />', {
                        text: varData[i][settings.text],
                        val: varData[i][settings.val],
                        'data-select-type': function () {
                            if (settings.adicionalType)
                                return varData[i][settings.adicional];
                        }
                    }).appendTo($this);
                };

                $this.chosen({ width: "100%", allow_single_deselect: settings.selectDefault });
                $this.val(settings.value).trigger("chosen:updated");
            },
            error: function () {
                $.MsgBOX({ type: 'error' });
            }
        });

        return $this;
    };

    $.fn.serealizeInput = function () {
        var input = this.serializeArray();
        if (input.length > 0)
            return input[0].value;
        return "";
    };

    $.fn.serializeFormJSON = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

// Dominios Ingemmet
(function ($) {
    var Dominios = {
        Direccion: function () {
            return { Opcion: '04_DC_DIRECCION' };
        },
        Proyecto: function () {
            return { Opcion: "04_DC_PROYECTO" };
        },
        SubProyecto: function (value, union) {
            union = union || '|';
            return { Opcion: "04_DC_PROYECTOSUB", Descripcion: value + union }
        },
        Zona: function () {
            return { Opcion: "G_DC_ZONA" };
        },
        Certificado: function () {
            return { Opcion: "04_DC_CERTIFICADOESTADO" };
        },
        TipoCuenca: function () {
            return { Opcion: "04_DC_CUENCATIPO" };
        },
        FormaDeLaCuenca: function () {
            return { Opcion: "04_DC_CUENCAFORMA" };
        },
        TipoAfloramiento: function () {
            return { Opcion: "04_DC_AFLTIPO" };
        },
        AfloramientoSubTipo: function (value, union) {
            union = union || '|';
            return { Opcion: "04_DC_AFLSUBTIPO", Descripcion: value + union };
        },
        OrigenDatos: function () {
            return { Opcion: "04_DC_DATOORIGEN" };
        },
        TipoRoca: function () {
            return { Opcion: "04_DC_ROCATIPO" };
        },
        SubTipoRoca: function (value, union) {
            union = union || '|';
            return { Opcion: "04_DC_ROCASUBTIPO", Descripcion: value + union }
        },
        Vertiente: function () {
            return { Opcion: "04_DC_VERTIENTE" };

        },
        UnidadConcentacion: function () {
            return { Opcion: "04_DC_UNIDADCONCENTRACION" };
        },
        ViaTipo: function () {
            return { Opcion: "04_DC_VIATIPO" };
        },
        //Parámetros Organolépticas
        ColorAgua: function () {
            return { Opcion: "04_DC_COLORAGUA" };
        },
        Sabor: function () {
            return { Opcion: "04_DC_SABOR" };
        },
        Intensidad: function () {
            return { Opcion: "04_DC_INTENSIDAD" };
        },
        Olor: function () {
            return { Opcion: "04_DC_OLOR" };
        },
        Multimedia: function () {
            return { Opcion: "04_DC_MULTIMEDIA" };
        },
    };

    window.Dominios = Dominios || {};

})(jQuery);