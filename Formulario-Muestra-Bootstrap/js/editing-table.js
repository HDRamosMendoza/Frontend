$(function(){
    /* ID de la tabla de resultado */
    let tblIdContent = "tblMuestra";
    
    let rowTable = new Array();
    
    /* Cantidad de filas */
    const $rowLength = $("#"+ tblIdContent +" tbody tr").length;

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
                                <button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Eliminar\" class=\"btn btn-danger btn-xs\" value=\"" + row['colectado'] + "\">\
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
                                <button type=\"button\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Guardar\" class=\"btn btn-primary btn-xs hidden\" >\
                                    <span class=\"glyphicon glyphicon-saved\"></span>\
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
    
    /* Function de envio de datos */
    function sendTableRow($this){
        alert("Enviando datos .... \n\n EN CONSTRUCCION !!!");
        let thisTr = $this.closest("tr");
        let param = {
            Operacion : "",
            Estado    : thisTr.find('td:nth-child(1) input').val(),
            Proyecto  : thisTr.find('td:nth-child(2) input').val(),
            Campana   : thisTr.find('td:nth-child(3) input').val(),
            colectado : thisTr.find('td:nth-child(4) input').val(),
            CodigoMuestra : thisTr.find('td:nth-child(5) input').val(),
            FechaMuestra  : thisTr.find('td:nth-child(6) input').val()
        };
        console.log(param);
        /*
        $.ajax({
            type: "POST",
            url: "",
            data: "{ clsMuestra:" + JSON.stringify(param) + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (res) {
                var varData = (typeof res.d) == 'string' ? eval('(' + res.d + ')') : res.d;
                console.log("varData");
            },
            error: function () {
                console.log("ERROR");
            }
        });
        */
    }

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
  
    /* Asignar a cada item el calendario */
    $('.date-time-picker').datetimepicker({
        locale: 'es',
        format: 'DD/MM/YYYY',
        maxDate: new Date()
    });

    function buttonSiblings($this){
        let btnSiblings = $this.siblings('button');
        btnSiblings.removeClass('hidden').addClass('show');
    }

    function activatedButton($this, $row, $boolean){
        $this.addClass('hidden');
        if ($this.hasClass("btn-primary")) {
            $row.removeClass('editActived');
            buttonSiblings($this);
            if ($boolean){
                sendTableRow($this);
            }
        } else {
            $row.addClass('editActived');
            buttonSiblings($this);
        }
    }
    
    /* Activar la edición */
    $("#"+ tblIdContent +" tbody td:nth-last-child(1) button").on("click", function(){
        let $row = $(this).closest("tr").find('td input');
        activatedButton($(this), $row, true);
    });

    /* Obtiene la posicion y valida si se actualizo */
    $("#"+ tblIdContent +" tbody").on('click','td',function () {
        const rowIdx = $table.cell(this).index().row;
        const colIdx = $table.cell(this).index().column;
        // Si el contenido de la celda se actualizo
        $('#'+rowIdx+""+colIdx).on('keyup',function(){
            let $tr = $(this).closest("tr");
            let $btnSaved = $tr.find("td:nth-last-child(1) button:nth-last-child(1)");
            let $btnEdit = $tr.find("td:nth-last-child(1) button:nth-last-child(2)");
            let $row = $(this);

            if(rowTable[rowIdx][colIdx] == $(this).val()){
                activatedButton($btnSaved, $row, false); 
            } else {
                activatedButton($btnEdit, $row, false);
            }
        });

        $('#'+rowIdx+""+colIdx).on("dp.change",function(){
            let $tr = $(this).closest("tr");
            let $btnSaved = $tr.find("td:nth-last-child(1) button:nth-last-child(1)");
            let $btnEdit = $tr.find("td:nth-last-child(1) button:nth-last-child(2)");
            let $row = $(this);

            if(rowTable[rowIdx][colIdx] == $(this).val()){
                activatedButton($btnSaved, $row, false); 
            } else {
                activatedButton($btnEdit, $row, false);
            }
        });       
    });

    /* Eliminar registro */
    $("#"+ tblIdContent +" tbody td:nth-last-child(2) button").on("click", function(){
        alert("Eliminar Registro .......\n\n( * ) EN CONSTRUCCIÓN.");
        let param = $(this).val();
        /* ID del registro a actualizar */
        console.log(param);
    });

    /* Refrescar todos los cambios */
    $("#"+ tblIdContent +" tfoot td:nth-last-child(1) button").on("click", function(){
        alert("Se refrescara los datos de la base de datos .......\n\n( * ) EN CONSTRUCCIÓN.");
        // Se agrega funcion de DATATABLE para mandar la consulta y con ello refrescar
        // La funcion actual funciona si se tiene conectado con la base de datos.
        $table.draw();
    });
    /* Guardar todos los cambios */
    /*
    $("#"+ tblIdContent +" tfoot td:nth-last-child(1) button").on("click", function(){
        $("#"+ tblIdContent +" tr input").removeClass("editActived");
        alert("Guardar todos los cambios .......\n\n( * ) EN CONSTRUCCIÓN.");
    });
    */
    /* Etiqueta de apoyo */
    $("#"+ tblIdContent +" [data-toggle=\"tooltip\"]").tooltip(); 
});