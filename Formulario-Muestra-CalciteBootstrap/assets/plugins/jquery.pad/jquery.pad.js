(function (window, $) {
    $.pad = function (str, strlength, padchar, side) {
        var o = str.toString();
        if (!padchar) { padchar = '0'; }
        if (side == 'l') {
            while (o.length < strlength) {
                o = padchar + o;
            }
        } else {
            while (o.length < strlength) {
                o = o + padchar;
            }
        }

        return o;
    };
    $.lpad = function (str, length, padchar) {
        return $.pad(str, length, padchar, 'l');
    };
    $.rpad = function (str, length, padchar) {
        return $.pad(str, length, padchar, 'r');
    };
})(window, jQuery);
