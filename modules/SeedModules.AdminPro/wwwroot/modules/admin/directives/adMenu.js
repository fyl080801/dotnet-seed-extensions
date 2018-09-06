define(["require", "exports", "SeedModules.AdminPro/modules/admin/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var DataKey = 'lte.pushmenu';
    var Default = {
        collapseScreenSize: 767,
        expandOnHover: false,
        expandTransitionDelay: 200
    };
    var Selector = {
        collapsed: '.sidebar-collapse',
        open: '.sidebar-open',
        mainSidebar: '.main-sidebar',
        contentWrapper: '.content-wrapper',
        searchInput: '.sidebar-form .form-control',
        button: '[data-toggle="push-menu"]',
        mini: '.sidebar-mini',
        expanded: '.sidebar-expanded-on-hover',
        layoutFixed: '.fixed'
    };
    var ClassName = {
        collapsed: 'sidebar-collapse',
        open: 'sidebar-open',
        mini: 'sidebar-mini',
        expanded: 'sidebar-expanded-on-hover',
        expandFeature: 'sidebar-mini-expand-feature',
        layoutFixed: 'fixed'
    };
    var Event = {
        expanded: 'expanded.pushMenu',
        collapsed: 'collapsed.pushMenu'
    };
    var Menu = (function () {
        function Menu(element, options) {
            this.element = element;
            this.options = options;
        }
        Menu.prototype.init = function () {
            var $this = this;
            if (this.options.expandOnHover ||
                $('body').is(Selector.mini + Selector.layoutFixed)) {
                this.expandOnHover();
                $('body').addClass(ClassName.expandFeature);
            }
            $(Selector.contentWrapper).click(function () {
                if ($(window).width() <= $this.options.collapseScreenSize &&
                    $('body').hasClass(ClassName.open)) {
                    $this.close();
                }
            }.bind(this.element));
            $(Selector.searchInput).click(function (e) {
                e.stopPropagation();
            });
        };
        Menu.prototype.toggle = function () {
            var windowWidth = $(window).width();
            var isOpen = !$('body').hasClass(ClassName.collapsed);
            if (windowWidth <= this.options.collapseScreenSize) {
                isOpen = $('body').hasClass(ClassName.open);
            }
            if (!isOpen) {
                this.open();
            }
            else {
                this.close();
            }
        };
        Menu.prototype.open = function () {
            var windowWidth = $(window).width();
            if (windowWidth > this.options.collapseScreenSize) {
                $('body')
                    .removeClass(ClassName.collapsed)
                    .trigger($.Event(Event.expanded));
            }
            else {
                $('body')
                    .addClass(ClassName.open)
                    .trigger($.Event(Event.expanded));
            }
        };
        Menu.prototype.close = function () {
            var windowWidth = $(window).width();
            if (windowWidth > this.options.collapseScreenSize) {
                $('body')
                    .addClass(ClassName.collapsed)
                    .trigger($.Event(Event.collapsed));
            }
            else {
                $('body')
                    .removeClass(ClassName.open + ' ' + ClassName.collapsed)
                    .trigger($.Event(Event.collapsed));
            }
        };
        Menu.prototype.expandOnHover = function () {
            var $this = this;
            $(Selector.mainSidebar).hover(function () {
                if ($('body').is(Selector.mini + Selector.collapsed) &&
                    $(window).width() > $this.options.collapseScreenSize) {
                    $this.expand();
                }
            }.bind(this.element), function () {
                if ($('body').is(Selector.expanded)) {
                    $this.collapse();
                }
            }.bind(this.element));
        };
        Menu.prototype.expand = function () {
            setTimeout(function () {
                $('body')
                    .removeClass(ClassName.collapsed)
                    .addClass(ClassName.expanded);
            }, this.options.expandTransitionDelay);
        };
        Menu.prototype.collapse = function () {
            setTimeout(function () {
                $('body')
                    .removeClass(ClassName.expanded)
                    .addClass(ClassName.collapsed);
            }, this.options.expandTransitionDelay);
        };
        return Menu;
    }());
    function directive($menuOptions) {
        return {
            replace: false,
            restrict: 'A',
            link: function (scope, instanceElement, instanceAttributes) {
                new Menu(instanceElement, $.extend(Default, $menuOptions)).init();
            }
        };
    }
    directive.$inject = ['$menuOptions'];
    mod.directive('adMenu', directive);
});
//# sourceMappingURL=adMenu.js.map