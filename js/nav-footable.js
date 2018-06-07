/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import pluginify from '@fxp/jquery-pluginify';
import BasePlugin from '@fxp/jquery-pluginify/js/plugin';
import {onShown} from "./utils/events";
import 'bootstrap/js/tab';
import 'footable/js/footable';

/**
 * NavFootable class.
 */
export default class NavFootable extends BasePlugin
{
    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    constructor(element, options = {}) {
        super(element, options);

        this.$element
            .on('shown.bs.tab.data-api.fxp.navfootable', '[data-toggle="tab"], [data-toggle="pill"]', this, onShown);
    }

    /**
     * Destroy the instance.
     */
    destroy() {
        this.$element
            .off('shown.bs.tab.data-api.fxp.navfootable', '[data-toggle="tab"], [data-toggle="pill"]', onShown);

        super.destroy();
    }
}

/**
 * Defaults options.
 */
NavFootable.defaultOptions = {
    footableSelector: '.footable'
};

pluginify('navFootable', 'fxp.navfootable', NavFootable, true, document);
