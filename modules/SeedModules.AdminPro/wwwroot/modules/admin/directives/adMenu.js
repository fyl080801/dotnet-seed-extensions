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
    var PushMenu = function (options) {
        this.options = options;
        this.init();
    };
    function directive($menuOptions) {
        function init(instanceElement) {
            if ($menuOptions.expandOnHover ||
                $('body').is(Selector.mini + Selector.layoutFixed)) {
                expandOnHover(instanceElement);
                $('body').addClass(ClassName.expandFeature);
            }
            $(Selector.contentWrapper).click(function () {
                if ($(window).width() <= $menuOptions.collapseScreenSize &&
                    $('body').hasClass(ClassName.open)) {
                    close();
                }
            }.bind(instanceElement));
            $(Selector.searchInput).click(function (e) {
                e.stopPropagation();
            });
        }
        function toggle() {
            var windowWidth = $(window).width();
            var isOpen = !$('body').hasClass(ClassName.collapsed);
            if (windowWidth <= $menuOptions.collapseScreenSize) {
                isOpen = $('body').hasClass(ClassName.open);
            }
            if (!isOpen) {
                open();
            }
            else {
                close();
            }
        }
        function open() {
            var windowWidth = $(window).width();
            if (windowWidth > $menuOptions.collapseScreenSize) {
                $('body')
                    .removeClass(ClassName.collapsed)
                    .trigger($.Event(Event.expanded));
            }
            else {
                $('body')
                    .addClass(ClassName.open)
                    .trigger($.Event(Event.expanded));
            }
        }
        function close() {
            var windowWidth = $(window).width();
            if (windowWidth > $menuOptions.collapseScreenSize) {
                $('body')
                    .addClass(ClassName.collapsed)
                    .trigger($.Event(Event.collapsed));
            }
            else {
                $('body')
                    .removeClass(ClassName.open + ' ' + ClassName.collapsed)
                    .trigger($.Event(Event.collapsed));
            }
        }
        function expandOnHover(instanceElement) {
            $(Selector.mainSidebar).hover(function () {
                if ($('body').is(Selector.mini + Selector.collapsed) &&
                    $(window).width() > $menuOptions.collapseScreenSize) {
                    expand();
                }
            }.bind(instanceElement), function () {
                if ($('body').is(Selector.expanded)) {
                    collapse();
                }
            }.bind(instanceElement));
        }
        function expand() {
            setTimeout(function () {
                $('body')
                    .removeClass(ClassName.collapsed)
                    .addClass(ClassName.expanded);
            }, $menuOptions.expandTransitionDelay);
        }
        function collapse() {
            setTimeout(function () {
                $('body')
                    .removeClass(ClassName.expanded)
                    .addClass(ClassName.collapsed);
            }, $menuOptions.expandTransitionDelay);
        }
        return {
            replace: false,
            restrict: 'A',
            link: {
                post: function (scope, instanceElement, instanceAttributes) {
                    init(instanceElement);
                }
            }
        };
    }
    directive.$inject = ['$menuOptions'];
    mod.directive('adMenu', directive);
});
//# sourceMappingURL=adMenu.js.map