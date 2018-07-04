$(function(){
    let tblIdContent = "tblMuestra";
    let $table = $('#'+ tblIdContent).DataTable({
        columns: [
            { 'data': 'estado'},
            { 'data': 'proyecto'},
            { 'data': 'campaña'},
            { 'data': 'colectado'},
            { 'data': 'codigomuestra'},
            { 'data': 'fechamuestra'},
            { 'data': 'remover', 'sclass':'text-center'},
            { 'data': 'editar', 'sclass':'text-center'},
        ],
        columnDefs: [{ 
                render: function (data, type, row) { 
                    return "<input id=\"\" type=\"text\" value=\"" + data + "\" />"; 
                },"targets": 0
            },{ 
                render: function (data, type, row) { 
                    return "<input id=\"\" type=\"text\" value=\"" + data + "\" />"; 
                },"targets": 1 
            },{ 
                render: function (data, type, row) { 
                    return "<input id=\"\" type=\"text\" value=\"" + data + "\" />"; 
                },"targets": 2
            },{ 
                render: function (data, type, row) { 
                    return "<input id=\"\" type=\"text\" value=\"" + data + "\" class=\"text-right number-mask\" />"; 
                },"targets": 3
            },{ 
                render: function (data, type, row) { 
                    return "<input id=\"\" type=\"text\" value=\"" + data + "\" class=\"date-time-picker\" />";
                },"targets": 4
            },{ 
                render: function (data, type, row) { 
                    return "<input id=\"\" type=\"text\" value=\"" + data + "\" class=\"text-right\" />"; 
                },"targets": 5
            },{ 
                render: function (data, type, row) { 
                    return "<center>\
                                <button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Eliminar\" class=\"btn btn-danger btn-xs\" >\
                                    <span class=\"glyphicon glyphicon-remove\"></span>\
                                </button>\
                            </center>";
                },"targets": 6
            },{ 
                render: function (data, type, row) { 
                    return "<center>\
                                <button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Editar\" class=\"btn btn-warning btn-xs\" >\
                                    <span class=\"glyphicon glyphicon-edit\"></span>\
                                </button>\
                            </center>";
                },"targets": 7
            }
            /*{ "visible": true, "targets": [2] }/*Para Ocultar*/
        ]
    });
    
    /* Se restringe el ingreso de valor numerico */
    $('.number-mask').mask('ZZZZ', {
        translation: {
            'Z': { pattern: /[0-9]/, optional: true }
        }
    });

    let rowTable = new Array();
    
    /* Cantidad de filas */
    const $rowLength = $("#"+ tblIdContent +" tbody tr").length;
    
    /* Declarando la segunda dimensión del array */
    function defineArray(){
        for(let row = 0; row < $rowLength; row++){
            rowTable[row] = new Array();
        }   
    }
    defineArray();
    
    /* Copia de los datos traidos */
    $("#"+ tblIdContent +" tbody td").each( function () {
        //var data = this.data();
        let itemCell = $(this).children()[0].defaultValue;
        const rowIdx = $table.cell(this).index().row;
        const colIdx = $table.cell(this).index().column;
        rowTable[rowIdx][colIdx] = itemCell;
        /* Asignamos a cada celda un ID */
        $(this).find('input').attr("id", (rowIdx + "" + colIdx));
    });
    
    /* Captura el clic en cada celda */
    /*
    $('#tblMSQGeoquimica tbody').on( 'click', 'td', function () {
        var rowIdx = $table.cell(this).index().row;
        console.log(rowIdx);
        var colIdx = $table.cell(this).index().column;
        console.log(colIdx);
        
    });
    */

    /* Asignar a cada item el calendario */
    $('.date-time-picker').datetimepicker({
        locale: 'es',
        format: 'DD/MM/YYYY',
        maxDate: new Date()
    });

    /* Eliminar registro */
    $("#"+ tblIdContent +" tbody td:nth-last-child(2) button").on("click", function(){
        alert("Eliminar Registro .......\n\n( * ) EN CONSTRUCCIÓN.");
    });

    function activatedButton($row,$tdButton){
        $tdButton.attr("title","");
        if ($tdButton.hasClass("btn-primary")) {
            $tdButton.removeClass('btn-primary').addClass('btn-warning');
            $tdButton.find('span').removeClass('glyphicon-saved').addClass('glyphicon-edit');
            $tdButton.attr("data-original-title","Editar");    
            $row.find('td input').removeClass('editActived');
            alert("Guardar los cambios de la fila .......\n\n( * ) EN CONSTRUCCIÓN.");
        } else {
            $row.find('td input').addClass('editActived');
            $tdButton.removeClass('btn-warning').addClass('btn-primary');
            $tdButton.find('span').removeClass('glyphicon-edit').addClass('glyphicon-saved');
            $tdButton.attr("data-original-title","Guardar");
        }
    }

    /* Activar la edición */
    $("#"+ tblIdContent +" tbody td:nth-last-child(1) button").on("click", function(){
        /* NE CONSTRUCCION */
        var $row = $(this).closest("tr");
        var $tdButton = $(this);
        activatedButton($row,$tdButton);
    });

    /* Obtiene la posicion y valida si se actualizo */
    $("#"+ tblIdContent +" tbody").on('click','td',function () {
        const rowIdx = $table.cell(this).index().row;
        const colIdx = $table.cell(this).index().column;
        /* Que indique si es la celda se actualizo antes de que se guarde */
        $('#'+rowIdx+""+colIdx).on('keyup',function(){
            var $row = $(this).closest("tr");
            var $tdButton = $row.find("td:nth-last-child(1) button");
            if(rowTable[rowIdx][colIdx] == $(this).val()){
                $(this).removeClass('editActived');
                $tdButton.find('span').removeClass('glyphicon-saved').addClass('glyphicon-edit');
                $tdButton.removeClass('btn-primary').addClass('btn-warning');
                $tdButton.attr("data-original-title","Editar");  
            } else {
                $(this).addClass('editActived');    
                $tdButton.find('span').removeClass('glyphicon-edit').addClass('glyphicon-saved');
                $tdButton.removeClass('btn-warning').addClass('btn-primary');
                $tdButton.attr("data-original-title","Guardar");  
            }
        }); 

        $('#'+rowIdx+""+colIdx).on("dp.change",function(){
            var $row = $(this).closest("tr");
            var $tdButton = $row.find("td:nth-last-child(1) button");
            if(rowTable[rowIdx][colIdx] == $(this).val()){
                $(this).removeClass('editActived');
                $tdButton.find('span').removeClass('glyphicon-saved').addClass('glyphicon-edit');
                $tdButton.removeClass('btn-primary').addClass('btn-warning');
                $tdButton.attr("data-original-title","Editar");  
            } else {
                $(this).addClass('editActived');    
                $tdButton.find('span').removeClass('glyphicon-edit').addClass('glyphicon-saved');
                $tdButton.removeClass('btn-warning').addClass('btn-primary');
                $tdButton.attr("data-original-title","Guardar");  
            }
        }); 
    });

    /* Guardar todos los cambios */
    $("#"+ tblIdContent +" tfoot td:nth-last-child(2) button").on("click", function(){
        alert("Se refrescara los datos de la base de datos .......\n\n( * ) EN CONSTRUCCIÓN.");
    });

    /* Guardar todos los cambios */
    $("#"+ tblIdContent +" tfoot td:nth-last-child(1) button").on("click", function(){
        $("#"+ tblIdContent +" tr input").removeClass("editActived");
        alert("Guardar todos los cambios .......\n\n( * ) EN CONSTRUCCIÓN.");
    });

    /*
    $.alert({
        closeIcon: true,
        content: "warning",
        confirmButton: 'Aceptar',
        deleteButton: 'Aceptar',
        confirmButtonClass: 'btn-aceptar',
        confirm: function () { }
    });
    */

    /* Etiqueta de apoyo */
    $("#"+ tblIdContent +" [data-toggle=\"tooltip\"]").tooltip(); 
});