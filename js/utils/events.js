/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import $ from 'jquery';

/**
 * Refresh the footable on nav shown action.
 *
 * @param {jQuery.Event|Event} event The event
 *
 * @typedef {NavFootable} Event.data
 */
export function onShown(event) {
    let self = event.data,
        $contents = $(self.options.footableSelector, $(this).attr('href'));

    $contents.each(function(index, content) {
        let $content = $(content),
            footable = $content.data('footable');

        if (footable) {
            footable.resize();
        }
    });
}
