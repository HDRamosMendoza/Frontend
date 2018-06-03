var $radioControls = $(':radio[name=controlcolum]'),
    $svg = $('#svg'),
    $circle,
    $imagen = $('#img'),
    box = $('.content-img'),
    DataColumnsEstra,
    DataFotografias,
    controlCboVistaPaleo,
    offset = { x: 0, y: 0 },
    fn = {},
    drag = {
        elem: null,
        x: 0,
        y: 0,
        state: false
    },
    delta = {
        x: 0,
        y: 0
    },
    clicked = {
        x: 0,
        y: 0
    },
    ctlButton = {
        ctlCircle: $('#rbCircle'),
        ctlEditar: $('#rbEditar'),
        ctlRemove: $('#rbRemove')
    };

box.offset({
    left: 100,
    top: 75
});

box.mousedown(function (e) {
    if (!drag.state) {
        drag.elem = this;
        this.style.cursor = 'all-scroll';
        drag.x = e.pageX;
        drag.y = e.pageY;
        drag.state = true;
    }
    return false;
});

$(document)
    .mousemove(function (e) {
        if (drag.state) {

            delta.x = e.pageX - drag.x;
            delta.y = e.pageY - drag.y;

            var cur_offset = $(drag.elem).offset();

            $(drag.elem).offset({
                left: (cur_offset.left + delta.x),
                top: (cur_offset.top + delta.y)
            });

            drag.x = e.pageX;
            drag.y = e.pageY;
        }
    })
    .mouseup(function () {
        if (drag.state) {
            drag.elem.style.cursor = 'crosshair';
            drag.state = false;
        }
    })
    .on('dblclick', '#svg', function (e) {
        e.preventDefault();
        if (!ctlButton.ctlCircle.is(':checked')) return;
        fn.recalcOffsetValues();
        clicked.x = e.pageX;
        clicked.y = e.pageY;
        ctlButton.ctlCircle.prop('checked', false);
        fn.modalImagen();
    })
    .on('click', '#svg circle', function (e) {
        e.preventDefault();
        var $this = $(this);
        if (!ctlButton.ctlRemove.is(':checked')) return;
        $.confirm({
            closeIcon: true,
            content: '&iquest;Seguro que desea remover el item?',
            confirm: function () {
                $this.remove();
            }
        });

    })
    .on('dblclick', '#svg circle', function (e) {
        e.preventDefault();
        $circle = $(this);
        if (!ctlButton.ctlEditar.is(':checked')) return;
        ctlButton.ctlEditar.prop('checked', false);
        fn.modalImagen();
    })
    .on('click', '#tblFotografias tbody button[data-event="select"]', function () {
        if (ctlButton.ctlCircle.parent().hasClass('active'))
            fn.createSVGcircle($(this).data('value'));
        if (ctlButton.ctlEditar.parent().hasClass('active'))
            fn.editSVGcircle($(this).data('value'));
        $(this).closest('.bootbox').modal('hide');
    })
    .on('click', '#tblFotografias tbody button[data-event="edit"]', function () {
        var varFotos = {
            CodigoInternoMuestra: $key.val(),
            Correlativo: $(this).data('value')
        };
        fn.formUploadFotoReset();
        fn.form($('.bbmodal-fotos'));

        $.ajax({
            type: "POST",
            url: 'PaleontologiaMan.aspx/SelListarFotosProyectoMan',
            data: "{ clsFotos:" + JSON.stringify(varFotos) + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
                var varData = (typeof res.d) == 'string' ? eval('(' + res.d + ')') : res.d;

                $('#formUploadImage input[name=opcion]').val(varData.Opcion);
                $('#CodigoFoto').val(varData.CodigoFoto);
                $('#Titfoto').val(varData.Titulo);
                $('#DescripFoto').val(varData.Descripcion);
                $('#formUploadImage input[name=correlativo]').val(varData.Correlativo);
                controlCboVistaPaleo.setValue([varData.CodigoVistaPaleontologica]);
                controlFilefoto.fileinput('refresh', {
                    initialPreview: varData.initialPreview
                });
            },
            error: function () {
                _MsgBoxSingle(2);
            }
        });
    })
    .on('click', '#tblColumnsEstra tbody button[data-event="select"]', function () {
        fn.cargarImagenMap($(this));
    })
    .on('click', '#tblColumnsEstra tbody button[data-event="edit"]', function () {
        fn.getColfotos($(this));
        fn.form($('.bbmodal-uploadcolumn'));
    })
    .on('click', '[data-column]', function (e) {
        e.preventDefault();
        var $parent = $(this).closest('div.bootbox');
        var type = $(this).data("column");
        console.log(type);

        if (typeof fn[type] === 'function') {
            fn[type]($parent);
        }
    })
    .on('keydown', '#SearchTblColumnsEstra input[type=text]', function (e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if (code == 13)
            DataColumnsEstra.draw();
    })
    .on('click', '#SearchTblColumnsEstra span', function () {
        DataColumnsEstra.draw()
    });


ctlButton.ctlCircle.parent().click(function () { fn.changeSVGAtributes(); });

fn.changeSVGAtributes = function () {
    $svg.attr({
        'width': $imagen.width(),
        'height': $imagen.height()
    });
};

fn.removeSVGChildren = function () {
    $svg.children().remove();
    $imagen.attr('src', '');
};

fn.SVG = function (tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

fn.recalcOffsetValues = function () {
    offset.x = this.offsetX(box);
    offset.y = this.offsetY(box);
};

fn.rightX = function (x) {
    return x - this.getOffset('x');
};

fn.rightY = function (y) {
    return y - this.getOffset('y');
};

fn.getOffset = function (arg) {
    switch (arg) {
        case 'x':
            return offset.x;
            break;
        case 'y':
            return offset.y;
            break;
    }
    return undefined;
};

fn.offsetX = function (node) {
    var ibox = node[0].getBoundingClientRect(),
        scroll = window.pageXOffset;

    return Math.round(ibox.left + scroll);
};

fn.offsetY = function (node) {
    var ibox = node[0].getBoundingClientRect(),
        scroll = window.pageYOffset;

    return Math.round(ibox.top + scroll);
};

fn.table = function (element) {
    element
        .find('.content-form-column').hide().end()
        .find('.content-table-column').fadeIn(1000).end()
        .find('[data-bb-handler="returns"]').addClass('hidden').end()
        .find('[data-bb-handler="success"]').addClass('hidden').end();
};

fn.form = function (element) {
    element
        .delay(1000)
        .find('.content-table-column').hide().end()
        .find('.content-form-column').fadeIn(1000).end()
        .find('[data-bb-handler="returns"]').removeClass('hidden').end()
        .find('[data-bb-handler="success"]').removeClass('hidden').attr('data-loading-text', 'Pocesando...').end();
};

fn.getPoints = function () {
    var obj = {
        areas: [],
        correlativo: [],
        key: null,
    };

    $.each($svg.find('circle'), function (x) {
        var el = $(this),
            f = [];
        f.push(el.attr('cx'), el.attr('cy'), el.attr('r'));
        obj.correlativo.push(el.data('value'));

        obj.areas.push(f);
    });

    return obj;
};

fn.getPuntosXY = function () {
    var object = { CodigoInternoMuestra: $key.val() };
    $.ajax({
        type: "POST",
        async: false,
        url: "ColumEstratigrafica.aspx/SelListarPuntosxyColstrat",
        data: "{ clsFotos:" + JSON.stringify(object) + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {
            var varData = (typeof res.d) == 'string' ? eval('(' + res.d + ')') : res.d;
            if (!varData.length) return;

            $('#img').attr({
                'src': '' + BASE_URL + 'Modulos/Utils/ResponseImagen.ashx?tipo=colestra&CodigoFoto=' + varData[0].CodigoFoto,
                'data-value': varData[0].CodigoFoto
            });

            for (var i = 0; i < varData.length; i++) {
                var puntosXY = varData[i].PuntosXY.split(',');
                $(fn.SVG('circle')).attr({
                    cx: puntosXY[0],
                    cy: puntosXY[1],
                    r: puntosXY[2],
                    fill: '#09FB00',
                    stroke: '#F50101',
                    'stroke-width': 2,
                    'data-value': varData[i].Correlativo
                }).appendTo($svg);
            }
            $radioControls.prop('disabled', false);
            $radioControls.parent().removeClass('disabled');
        },
        error: function () {
            _MsgBoxSingle(2);
        }
    });
};

fn.cargarImagenMap = function ($this) {
    var row = DataColumnsEstra.row($this.parents('tr')).data().CodigoFoto;
    fn.removeSVGChildren();
    $('#img').attr({
        'src': '' + BASE_URL + 'Modulos/Utils/ResponseImagen.ashx?tipo=colestra&CodigoFoto=' + row + '&g=' + generateGUID(),
        'data-value': row
    });
    $radioControls.prop('disabled', false);
    $radioControls.parent().removeClass('disabled');
    $('.bbmodal-uploadcolumn').modal('hide');
}

fn.getColfotos = function ($this) {
    var row = DataColumnsEstra.row($this.parents('tr')).data();

    $('#formUploadcolumn')
        .find('input[name=opcion]').val("UPD").end()
        .find('input[name=codigo_foto]').val(row.CodigoFoto).end()
        .find('input[name=nombarchivo]').val(row.NombreArchivo).end()
        .find('textarea[name=titulo_foto]').val(row.Descripcion).end()
        .find('.fileinput-remove').trigger('click').end();

    controlFotoCoestra.fileinput('refresh', {
        initialPreview: ['<img src="' + BASE_URL + 'Modulos/Utils/ResponseImagen.ashx?tipo=colestra&CodigoFoto=' +
            row.CodigoFoto + '&g=' + generateGUID() + '" width="160"/>']
    });
}

fn.createSVGcircle = function (value) {
    $(fn.SVG('circle')).attr({
        cx: fn.rightX(clicked.x),
        cy: fn.rightY(clicked.y),
        r: 6,
        fill: '#09FB00',
        stroke: '#F50101',
        'stroke-width': 2,
        'data-value': value
    }).appendTo($svg);
};

fn.editSVGcircle = function (value) {
    $circle.attr('data-value', value);
};

fn.mantPuntoscolumns = function (object) {
    var resp;
    $.ajax({
        type: "POST",
        async: false,
        url: "ColumEstratigrafica.aspx/MantPuntosxyColstrat",
        data: "{ clsFotos:" + JSON.stringify(object) + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {
            resp = res.d;
        },
        error: function () {
            resp = { Estado: 2 };
        }
    });
    return resp;
};

fn.modalImagen = function () {
    bootbox
        .dialog({
            title: "Fotograf&iacute;as",
            message: $('#formUploadImage'),
            className: 'bbmodal-fotos',
            buttons: {
                close: {
                    label: "<i class='fa fa-times fa-lg'></i>&nbsp;Cerrar",
                    icon: 'fa fa-long-arrow-left fa-lg',
                    className: "btn btn-sm btn-danger",
                    callback: function () { }
                },
                returns: {
                    label: "<i class='fa fa-long-arrow-left fa-lg'></i>&nbsp;Retornar",
                    className: "btn btn-sm btn-default hidden",
                    callback: function () {
                        fn.table($('.bbmodal-fotos'));
                        return false;
                    }
                },
                success: {
                    label: "<i class='fa fa-floppy-o fa-lg'></i>&nbsp;Guradar Cambios",
                    className: "btn btn-sm btn-primary hidden",
                    callback: function () {
                        $('#formUploadImage button[type=submit]').trigger('click');
                        return false;
                    }
                }
            }
        })
        .on('shown.bs.modal', function () {
            fn.formUploadFotoReset();
            $('#formUploadImage')
                .find('input[name=opcion]').val('INS').end()
                .find('input[name=correlativo]').val(0).end()
                .show();

        })
        .on('hide.bs.modal', function () {
            fn.formUploadFotoReset();
            fn.table($('.bbmodal-fotos'));
            $('#formUploadImage')
                .find('input[name=opcion]').val('INS').end()
                .find('input[name=correlativo]').val(0).end()
                .hide().appendTo('body');

            if (ctlButton.ctlCircle.parent().hasClass('active'))
                ctlButton.ctlCircle.prop('checked', true);
            if (ctlButton.ctlEditar.parent().hasClass('active'))
                ctlButton.ctlEditar.prop('checked', true);
        });
};

fn.modalcolestra = function () {
    bootbox
       .dialog({
           title: "Columnas Estratigr&aacute;ficas",
           className: 'bbmodal-foto modal-wide',
           message: $('#formContentColestra'),
           buttons: {
               close: {
                   label: "<i class='fa fa-times fa-lg'></i>&nbsp;Cerrar",
                   icon: 'fa fa-long-arrow-left fa-lg',
                   className: "btn btn-sm btn-danger",
                   callback: function () { }
               },
               success: {
                   label: "<i class='fa fa-floppy-o fa-lg'></i>&nbsp;Guradar Cambios",
                   className: "btn btn-sm btn-primary",
                   callback: function () {
                       var object = fn.getPoints();
                       var o = {};
                       var res = {};
                       var html = "<ul>";

                       o.Opcion = "DEL";
                       o.CodigoInternoMuestra = $key.val();
                       o.CodigoFoto = "";
                       o.Correlativo = 0;
                       o.PuntosXY = "";

                       var delRes = fn.mantPuntoscolumns(o);

                       if (!object.areas.length) return false;
                       if (delRes.Estado == 2) return false;

                       for (var i = 0; i < object.areas.length; i++) {
                           o = {};
                           o.Opcion = "INS";
                           o.CodigoInternoMuestra = $key.val();
                           o.CodigoFoto = $imagen.data('value');
                           o.Correlativo = object.correlativo[i];
                           o.PuntosXY = object.areas[i].toString();

                           var resInsert = fn.mantPuntoscolumns(o);
                           var estado = resInsert.Estado == 1 ? 'Registrado Correctamente' : 'No se ha podido registrar';
                           var colorMessage = resInsert.Estado == 1 ? 'green' : 'red';
                           var iconMessage = resInsert.Estado == 1 ? 'fa-check-square-o' : 'fa-exclamation-triangle';

                           html += '<li style="color:' + colorMessage + '">' + object.areas[i].toString() + ' ' + estado +
                                   '<i class="fa ' + iconMessage + ' fa-lg pull-right"></i></li>';

                           // Temporal
                           console.log(object.areas[i].toString(), "-", $('.maparea').attr('data-value'));
                       }

                       html += "</ul>";                          
                       _MsgBoxSingle(html);

                       return false;
                   }
               }
           }
       })
        .on('shown.bs.modal', function () {
            $('#formContentColestra').show();
            fn.changeSVGAtributes();
        })
        .on('hide.bs.modal', function () {
            $('#formContentColestra').hide().appendTo('body');
        });
};

fn.modaluploadcolumn = function () {
    bootbox
       .dialog({
           title: "Fotograf&iacute;as",
           className: 'bbmodal-uploadcolumn',
           message: $('#formUploadcolumn'),
           buttons: {
               close: {
                   label: "<i class='fa fa-times fa-lg'></i>&nbsp;Cerrar",
                   icon: 'fa fa-long-arrow-left fa-lg',
                   className: "btn btn-sm btn-danger",
                   callback: function () { }
               },
               returns: {
                   label: "<i class='fa fa-long-arrow-left fa-lg'></i>&nbsp;Retornar",
                   className: "btn btn-sm btn-default hidden",
                   callback: function () {
                       fn.table($('.bbmodal-uploadcolumn'));
                       return false;
                   }
               },
               success: {
                   label: "<i class='fa fa-floppy-o fa-lg'></i>&nbsp;Guradar Cambios",
                   className: "btn btn-sm btn-primary hidden",
                   callback: function () {
                       $('#formUploadcolumn button[type=submit]').trigger('click');
                       return false;
                   }
               }
           }
       })
        .on('shown.bs.modal', function () {
            $('#navButtons label').removeClass('active');
            $(':radio[name=controlcolum]').prop('checked', false);
            $('#formUploadcolumn')
                .find('input[name=opcion]').val("INS").end()
                .find('input[name=codigo_foto]').val(0).end()
                .find('input[name=nombarchivo]').val("").end()
                .find('textarea[name=titulo_foto]').val("").end()
                .find('.fileinput-remove').trigger('click').end()
                .show();
        })
        .on('hide.bs.modal', function () {
            fn.table($('.bbmodal-uploadcolumn'));
            $('#formUploadcolumn')
                .find('input[name=opcion]').val("INS").end()
                .find('input[name=codigo_foto]').val(0).end()
                .find('input[name=nombarchivo]').val("").end()
                .find('.fileinput-remove').trigger('click').end()
                .find('textarea[name=titulo_foto]').val("").end()
                .hide().appendTo('body');
        });
};

fn.formUploadFotoReset = function () {
    $('#formUploadImage')[0].reset();
    $('#formUploadImage .fileinput-remove').trigger('click');
    controlCboVistaPaleo.setValue();
}

DataColumnsEstra = $('#tblColumnsEstra').DataTable({
    "dom": 'rt<"bottom"p>',
    bAutoWidth: false,
    responsive: true,
    bFilter: false,
    bLengthChange: false,
    bInfo: false,
    bSort: false,
    columns: [
        { 'data': 'CodigoFoto', "sClass": "hidden" },
        {
            mRender: function (data, type, row) {
                var iTmpl = '<div class="media">' +
                                '<div class="media-left">' +
                                    '<img src="' + BASE_URL + 'Modulos/Utils/ResponseImagen.ashx?tipo=colestra&CodigoFoto=' + row.CodigoFoto + '&g=' + generateGUID() + '" width="80"/>' +
                                '</div>' +
                                '<div class="media-body">' +
                                    '<p>' + row.Descripcion + '</p>' +
                                    '<button data-event="select" type="button" class="btn btn-xs btn-primary">Seleccionar</button>&nbsp;' +
                                    '<button data-event="edit" type="button" class="btn btn-xs btn-success">Editar</button>' +
                                '</div>' +
                            '</div>';

                return iTmpl;

            }, "width": ""
        },
        { 'data': 'Fecha', "width": "80px" },
    ],
    bProcessing: true,
    bServerSide: true,
    sAjaxSource: 'ColumEstratigrafica.aspx/SelListarFotosColumnas',
    "fnServerData": function (sSource, aoData, fnCallback) {
        aoData.push({ name: "sSearch_filter", value: $('#SearchTblColumnsEstra input[type=text]').val() });
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: sSource,
            data: JSON.stringify(helpers.formatDataTableData(aoData)),
            dataType: "json",
            success: function (msg) { fnCallback(msg.d); }
        });
    }
});

$('#formUploadcolumn').validate({
    ignore: [],
    rules: {
        fotocolestra: {
            required: {
                depends: function (element) {
                    if ($('#formUploadcolumn input[name=opcion]').val() == "INS") return true;
                }
            }
        }
    },
    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'small',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
        error.appendTo(element.closest('div.form-group'));
    },
    submitHandler: function (form) {
        console.log($(form).attr('action'));
        var fileUpload = $(form).find('input[type=file]'),
            $button = $('.bbmodal-uploadcolumn').find('[data-bb-handler="success"]'),
            files = fileUpload[0].files,
            data = new FormData(),
            res = {};

        for (var i = 0; i < files.length; i++) {
            data.append(files[i].name, files[i]);
        }

        data.append('Opcion', $('#formUploadcolumn input[name=opcion]').val());
        data.append('CodigoFoto', $('#formUploadcolumn input[name=codigo_foto]').val());
        data.append('NombArchivo', $('#NombArchivo').val());
        data.append('desripFoto', $("#TituloFoto").val());

        $button.button('loading');

        $.alert({
            closeIcon: true,
            content: function ($obj) {
                return $.ajax({
                    url: $(form).attr('action'),
                    type: "POST",
                    data: data,
                    async: false,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        res.d = result;
                        _MsgBox($obj, res);
                        DataColumnsEstra.ajax.reload();
                        $button.button('reset');
                        $radioControls.prop('disabled', false);
                        $radioControls.parent().removeClass('disabled');
                        return false;
                    },
                    error: function () {
                        _MsgBoxSingle(2);
                        button.button('reset');
                    }
                });
            },
            onClose: function () {
                if (res.d.Estado == 1) {
                    fn.removeSVGChildren();
                    $('.bbmodal-uploadcolumn').modal('hide');
                    $('#img').attr({
                        'src': '' + BASE_URL + 'Modulos/Utils/ResponseImagen.ashx?tipo=colestra&CodigoFoto=' + res.d.RetVal + '&g=' + generateGUID(),
                        'data-value': res.d.RetVal
                    });
                }
            }

        });
        return false;
    }
});

$('#formUploadImage').validate({
    ignore: [],
    rules: {
        foto: {
            required: {
                depends: function (element) {
                    if ($('#formUploadImage input[name=opcion]').val() == "INS") return true;
                }
            }
        }
    },
    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'small',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
        error.appendTo(element.closest('div.form-group'));
    },
    submitHandler: function (form) {
        console.log($(form).attr('action'));
        var fileUpload = $(form).find('input[type=file]'),
            $button = $('.bbmodal-fotos').find('[data-bb-handler="success"]'),
            files = fileUpload[0].files,
            data = new FormData(),
            res = {};

        for (var i = 0; i < files.length; i++) {
            data.append(files[i].name, files[i]);
        }

        data.append('Opcion', $('#formUploadImage input[name=opcion]').val());
        data.append('CodIntMuestra', $key.val());
        data.append('CodigoFoto', $('#CodigoFoto').val());
        data.append('Titulo', $("#Titfoto").val());
        data.append('CodVistPaleo', controlCboVistaPaleo.getValue());
        data.append('DesripFoto', $("#DescripFoto").val());
        data.append('Correlativo', $('#formUploadImage input[name=correlativo]').val());

        $button.button('loading');

        $.alert({
            closeIcon: true,
            content: function ($obj) {
                return $.ajax({
                    url: $(form).attr('action'),
                    type: "POST",
                    data: data,
                    async: false,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        res.d = result;
                        _MsgBox($obj, res);
                        DataFotografias.ajax.reload();
                        $button.button('reset');
                        $radioControls.prop('disabled', false);
                        return false;
                    },
                    error: function () {
                        _MsgBoxSingle(2);
                        button.button('reset');
                    }
                });
            },
            onClose: function () {
                if (res.d.Estado == 1) {
                    if (ctlButton.ctlCircle.parent().hasClass('active'))
                        fn.createSVGcircle(res.d.RetVal);
                    if (ctlButton.ctlEditar.parent().hasClass('active'))
                        fn.editSVGcircle(res.d.RetVal);
                    $('.bbmodal-fotos').modal('hide');
                }
            }

        });
        return false;
    }
});

var controlFilefoto = $("#uploadFoto").fileinput({
    showUpload: false,
    uploadAsync: false,
    overwriteInitial: true,
    maxFileSize: 5120,
    showClose: false,
    showCaption: false,
    removeLabel: 'Remover',
    browseLabel: 'Cargar Nueva Columna',
    browseIcon: '<i class="fa fa-folder-open fa-lg"></i>',
    browseClass: 'btn btn-sm btn-primary',
    removeIcon: '<i class="fa fa-times fa-lg"></i>',
    removeClass: 'btn btn-sm btn-default',
    elErrorContainer: '#kv-avatar-errors',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="' + BASE_URL + 'assets/images/fotodefault.jpg" style="width:160px">',
    layoutTemplates: { main2: '{preview} {remove} {browse}' },
    allowedFileExtensions: ["jpg", "png", "gif"]
});

var controlFotoCoestra = $("#avatar").fileinput({
    showUpload: false,
    uploadAsync: false,
    overwriteInitial: true,
    maxFileSize: 5120,
    showClose: false,
    showCaption: false,
    removeLabel: 'Remover',
    browseLabel: 'Cargar Nueva Columna',
    browseIcon: '<i class="fa fa-folder-open fa-lg"></i>',
    browseClass: 'btn btn-sm btn-primary',
    removeIcon: '<i class="fa fa-times fa-lg"></i>',
    removeClass: 'btn btn-sm btn-default',
    elErrorContainer: '#kv-avatar-errors',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="' + BASE_URL + 'assets/images/fotodefault.jpg" style="width:160px">',
    layoutTemplates: { main2: '{preview} {remove} {browse}' },
    allowedFileExtensions: ["jpg", "png", "gif"]
});

var $selectVistaPaleo = $('#cboVistaPaleo').selectize({
    valueField: 'Codigo',
    labelField: 'Descripcion',
    searchField: 'Descripcion',
    preload: true,
    options: [],
    create: false,
    render: {
        option: function (item, escape) {
            return '<div>' + escape(item.Descripcion) + '</div>';
        }
    },
    load: function (query, callback) {
        var varVistaPaleo = { Opcion: "BDT_M_VISTA_PALEONTOLOGICA" };
        $.ajax({
            type: "POST",
            async: false,
            url: "PaleontologiaMan.aspx/SelListarTablasMaestras",
            data: "{ clsGedmLista:" + JSON.stringify(varVistaPaleo) + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
                callback(res.d);
            },
            error: function () {
                callback();
            }
        });

    }
});

DataFotografias = $('#tblFotografias').DataTable({
    "dom": 'rt<"bottom"p>',
    bAutoWidth: false,
    responsive: true,
    bFilter: false,
    bLengthChange: false,
    bInfo: false,
    bSort: false,
    columns: [
        { 'data': 'CodigoInternoMuestra', "sClass": "hidden" },
        { 'data': 'Correlativo', "sClass": "hidden" },
        {
            mRender: function (data, type, row) {
                var iTmpl = '<div class="media">' +
                                '<div class="media-left">' +
                                    '<img src="' + BASE_URL + 'Modulos/Utils/ResponseImagen.ashx?tipo=foto&CodigoFoto=' + row.CodigoInternoMuestra + '&Correlativo=' + row.Correlativo + '&g=' + generateGUID() + '" width="80"/>' +
                                '</div>' +
                                '<div class="media-body">' +
                                    '<p>' + row.Descripcion + '</p>' +
                                    '<button data-event="select" type="button" class="btn btn-xs btn-primary" data-value="' + row.Correlativo + '">Seleccionar</button>&nbsp;' +
                                    '<button data-event="edit" type="button" class="btn btn-xs btn-success" data-value="' + row.Correlativo + '">Editar</button>' +
                                '</div>' +
                            '</div>';
                return iTmpl;

            }
        },
        { 'data': 'Fecha', "width": "80px" },
    ],
    bProcessing: true,
    bServerSide: true,
    sAjaxSource: 'PaleontologiaMan.aspx/SelListarFotosProyecto',
    "fnServerData": function (sSource, aoData, fnCallback) {
        aoData.push({ name: "sCodigoInternoMuestra", value: $key.val() });
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: sSource,
            data: JSON.stringify(helpers.formatDataTableData(aoData)),
            dataType: "json",
            success: function (msg) { fnCallback(msg.d); }
        });
    }
});

controlCboVistaPaleo = $selectVistaPaleo[0].selectize;