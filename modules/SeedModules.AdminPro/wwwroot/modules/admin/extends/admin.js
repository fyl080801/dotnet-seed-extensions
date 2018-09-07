/*! AdminLTE app.js
* ================
* Main JS application file for AdminLTE v2. This file
* should be included in all pages. It controls some layout
* options and implements exclusive AdminLTE plugins.
*
* @Author  Almsaeed Studio
* @Support <https://www.almsaeedstudio.com>
* @Email   <abdullah@almsaeedstudio.com>
* @version 2.4.5
* @repository git://github.com/almasaeed2010/AdminLTE.git
* @license MIT <http://opensource.org/licenses/MIT>
*/
define(["require", "exports", "SeedModules.AdminPro/lib/jquery-slimscroll/jquery.slimscroll.min"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    if (typeof jQuery === 'undefined') {
        throw new Error('AdminLTE requires jQuery');
    }
    +(function ($) {
        'use strict';
        var DataKey = 'lte.boxwidget';
        var Default = {
            animationSpeed: 500,
            collapseTrigger: '[data-widget="collapse"]',
            removeTrigger: '[data-widget="remove"]',
            collapseIcon: 'fa-minus',
            expandIcon: 'fa-plus',
            removeIcon: 'fa-times'
        };
        var Selector = {
            data: '.box',
            collapsed: '.collapsed-box',
            header: '.box-header',
            body: '.box-body',
            footer: '.box-footer',
            tools: '.box-tools'
        };
        var ClassName = {
            collapsed: 'collapsed-box'
        };
        var Event = {
            collapsed: 'collapsed.boxwidget',
            expanded: 'expanded.boxwidget',
            removed: 'removed.boxwidget'
        };
        var BoxWidget = function (element, options) {
            this.element = element;
            this.options = options;
            this._setUpListeners();
        };
        BoxWidget.prototype.toggle = function () {
            var isOpen = !$(this.element).is(Selector.collapsed);
            if (isOpen) {
                this.collapse();
            }
            else {
                this.expand();
            }
        };
        BoxWidget.prototype.expand = function () {
            var expandedEvent = $.Event(Event.expanded);
            var collapseIcon = this.options.collapseIcon;
            var expandIcon = this.options.expandIcon;
            $(this.element).removeClass(ClassName.collapsed);
            $(this.element)
                .children(Selector.header + ', ' + Selector.body + ', ' + Selector.footer)
                .children(Selector.tools)
                .find('.' + expandIcon)
                .removeClass(expandIcon)
                .addClass(collapseIcon);
            $(this.element)
                .children(Selector.body + ', ' + Selector.footer)
                .slideDown(this.options.animationSpeed, function () {
                $(this.element).trigger(expandedEvent);
            }.bind(this));
        };
        BoxWidget.prototype.collapse = function () {
            var collapsedEvent = $.Event(Event.collapsed);
            var collapseIcon = this.options.collapseIcon;
            var expandIcon = this.options.expandIcon;
            $(this.element)
                .children(Selector.header + ', ' + Selector.body + ', ' + Selector.footer)
                .children(Selector.tools)
                .find('.' + collapseIcon)
                .removeClass(collapseIcon)
                .addClass(expandIcon);
            $(this.element)
                .children(Selector.body + ', ' + Selector.footer)
                .slideUp(this.options.animationSpeed, function () {
                $(this.element).addClass(ClassName.collapsed);
                $(this.element).trigger(collapsedEvent);
            }.bind(this));
        };
        BoxWidget.prototype.remove = function () {
            var removedEvent = $.Event(Event.removed);
            $(this.element).slideUp(this.options.animationSpeed, function () {
                $(this.element).trigger(removedEvent);
                $(this.element).remove();
            }.bind(this));
        };
        BoxWidget.prototype._setUpListeners = function () {
            var that = this;
            $(this.element).on('click', this.options.collapseTrigger, function (event) {
                if (event)
                    event.preventDefault();
                that.toggle($(this));
                return false;
            });
            $(this.element).on('click', this.options.removeTrigger, function (event) {
                if (event)
                    event.preventDefault();
                that.remove($(this));
                return false;
            });
        };
        function Plugin(option) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data(DataKey);
                if (!data) {
                    var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option);
                    $this.data(DataKey, (data = new BoxWidget($this, options)));
                }
                if (typeof option == 'string') {
                    if (typeof data[option] == 'undefined') {
                        throw new Error('No method named ' + option);
                    }
                    data[option]();
                }
            });
        }
        var old = $.fn['boxWidget'];
        $.fn['boxWidget'] = Plugin;
        $.fn['boxWidget'].Constructor = BoxWidget;
        $.fn['boxWidget'].noConflict = function () {
            $.fn['boxWidget'] = old;
            return this;
        };
        $(window).on('load', function () {
            $(Selector.data).each(function () {
                Plugin.call($(this));
            });
        });
    })(jQuery);
});
//# sourceMappingURL=admin.js.map