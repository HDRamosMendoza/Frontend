(function ($) {

    var key = "MODAL__",
	    $modal_bootstrap;

    $.createModalBootstrap = function (element, options) {
        var defaults = {
            id: "myModal",
            title: "",
            modalSize: "md",
            buttons: [],
            warp: null,
            closeButton: true,
            scrollable: false,
            sAjaxWarp: null,
            hiddenModal: function () {}
        },
		plugin = this,
		$element = $(element),
        element = element;

        plugin.settings = {};

        plugin._init = function () {
            plugin.settings = $.extend({}, defaults, options);
            $modal_bootstrap = $('#' + key + plugin.settings.id);
            plugin.__create();
            plugin.__createButtons();
            $modal_bootstrap.show();
            if (plugin.settings.sAjaxWarp!=null)
                plugin._sAjaxWarp();

            $modal_bootstrap.modal().on("hidden.bs.modal", function () {
                plugin.settings.hiddenModal();
                $(this).remove();
            });
        }
        plugin.__create = function () {
            var b = plugin.settings,
			    c = (b.scrollable === true) ? 'style="max-height: 420px;overflow-y: auto;"' : "",
			html = $([
                '<div class="modal fade" id="', key + b.id, '">',
                    '<div class="modal-dialog modal-', b.modalSize, '">',
						'<div class="modal-content">',
							'<div class="modal-header">',
								'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>',
								'<h4 class="modal-title">', b.title, '</h4>',
							'</div>',
							'<div class="modal-body"', c, '>', b.warp,
                                '<div class="waitpage" style="display:none;">',
                                    '<div class="loading"></div>',
                                 '</div>',
                            '</div>',
							'<div class="modal-footer"', c, '><button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button></div>',
						'</div>',
                    '</div>',
                '</div>'].join(''));
            $("body").prepend(html);
        };
        plugin.__createButtons = function () {
            var that = plugin.settings,
				buttons = that.buttons,
				footerButtoms = $modal_bootstrap.find('div.modal-footer');

            if ($.isEmptyObject(buttons) || ($.isArray(buttons) && !buttons.length))
                return;

            footerButtoms.empty();

            $.each(buttons, function (name, props) {
                var click, buttonOptions;				
                props = $.isFunction(props) ?
				{ click: props, text: name } :
					props;
                // Default to a non-submitting button
                props = $.extend({ type: "button" }, props);
                // Change the context for the click callback to be the main element
                click = props.click;
                props.click = function () {
                    click.apply(props.click, arguments);
                };
                buttonOptions = {
                    icons: props.icons,
                    text: props.showText
                };
                delete props.icons;
                delete props.showText;
                $("<button></button>", props)
					.button(buttonOptions)
					.appendTo(footerButtoms);
            });

            return footerButtoms;
        };

        plugin._sAjaxWarp = function () {
            var that = plugin.settings,
                $modalBody = $modal_bootstrap.find('div.modal-body');
            $modalBody.find('.waitpage').show();

            $modalBody.load(that.sAjaxWarp, function (responseTxt, statusTxt, xhr) {
                if(statusTxt == "error")
                    alert("Error: " + xhr.status + ": " + xhr.statusText);
            });

        }
        plugin.foo_public_method = function () {
            // code goes here
        }

        var foo_private_method = function () {
            // code goes here
        }

        plugin._init();



    }

    $.fn.createModalBootstrap = function (options) {

        return this.each(function () {
            //if (undefined == $(this).data('pluginName')) {
            var plugin = new $.createModalBootstrap(this, options);
            $(this).data('pluginName', plugin);
            //}
        });

    }

})(jQuery);