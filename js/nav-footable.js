/*
 * This file is part of the Sonatra package.
 *
 * (c) François Pluchino <francois.pluchino@sonatra.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/*global define*/
/*global jQuery*/
/*global document*/

/**
 * @param {jQuery} $
 *
 * @typedef {object}      define.amd
 * @typedef {NavFootable} NavFootable
 */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', 'bootstrap/js/tab', 'footable/js/footable'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    /**
     * Refresh the footable on nav shown action.
     *
     * @param {jQuery.Event|Event} event The event
     *
     * @typedef {NavFootable} Event.data
     *
     * @private
     */
    function onShown(event) {
        var self = event.data,
            $contents = $(self.options.footableSelector, $(this).attr('href'));

        $contents.each(function(index, content) {
            var $content = $(content),
                footable = $content.data('footable');

            if (footable) {
                footable.resize();
            }
        });
    }

    // NAV FOOTABLE CLASS DEFINITION
    // =============================

    /**
     * @constructor
     *
     * @param {string|elements|object|jQuery} element
     * @param {object}                        options
     *
     * @this NavFootable
     */
    var NavFootable = function (element, options) {
        this.guid     = jQuery.guid;
        this.options  = $.extend(true, {}, NavFootable.DEFAULTS, options);
        this.$element = $(element);

        this.$element.on('shown.bs.tab.data-api.st.navfootable', '[data-toggle="tab"], [data-toggle="pill"]', this, onShown);
    },
        old;

    /**
     * Defaults options.
     *
     * @type {object}
     */
    NavFootable.DEFAULTS = {
        footableSelector: '.footable'
    };

    /**
     * Destroy instance.
     *
     * @this NavFootable
     */
    NavFootable.prototype.destroy = function () {
        this.$element.off('shown.bs.tab.data-api.st.navfootable', '[data-toggle="tab"], [data-toggle="pill"]', onShown);
        this.$element.removeData('st.navfootable');
    };


    // NAV FOOTABLE PLUGIN DEFINITION
    // ==============================

    function Plugin(option) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {
            var $this   = $(this),
                data    = $this.data('st.navfootable'),
                options = typeof option === 'object' && option;

            if (!data && option === 'destroy') {
                return;
            }

            if (!data) {
                data = new NavFootable(this, options);
                $this.data('st.navfootable', data);
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    }

    old = $.fn.navFootable;

    $.fn.navFootable             = Plugin;
    $.fn.navFootable.Constructor = NavFootable;


    // NAV FOOTABLE NO CONFLICT
    // ========================

    $.fn.navFootable.noConflict = function () {
        $.fn.navFootable = old;

        return this;
    };


    // NAV FOOTABLE DATA-API
    // =====================

    $(window).on('load', function () {
        $(document).each(function () {
            var $this = $(this);
            Plugin.call($this, $this.data());
        });
    });

}));
