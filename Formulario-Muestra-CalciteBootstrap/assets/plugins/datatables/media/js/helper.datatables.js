(function () {

    var helpers = (function () {
    });

    helpers.formatDataTableData = function (aoData) {
        var r = {};
        var x;
        for (x in aoData) {
            r[aoData[x].name] = aoData[x].value
        }
        return { tableParams: r };
    }    
    window.helpers = helpers;
})();