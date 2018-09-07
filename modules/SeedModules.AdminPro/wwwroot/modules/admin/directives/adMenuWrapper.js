define(["require", "exports", "SeedModules.AdminPro/modules/admin/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var DataKey = 'lte.pushmenu';
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
    var MenuWrapper = (function () {
        function MenuWrapper(element, $menuOptions, option) {
            this.element = element;
            this.$menuOptions = $menuOptions;
            if (option === 'toggle')
                this.toggle();
            this.init();
        }
        MenuWrapper.prototype.init = function () {
            var _this = this;
            if (this.$menuOptions.expandOnHover ||
                $('body').is(Selector.mini + Selector.layoutFixed)) {
                this.expandOnHover();
                $('body').addClass(ClassName.expandFeature);
            }
            $(Selector.contentWrapper).click((function () {
                if ($(window).width() <= _this.$menuOptions.collapseScreenSize &&
                    $('body').hasClass(ClassName.open)) {
                    _this.close();
                }
            }).bind(this.element));
            $(Selector.searchInput).click(function (e) {
                e.stopPropagation();
            });
        };
        MenuWrapper.prototype.toggle = function () {
            var windowWidth = $(window).width();
            var isOpen = !$('body').hasClass(ClassName.collapsed);
            if (windowWidth <= this.$menuOptions.collapseScreenSize) {
                isOpen = $('body').hasClass(ClassName.open);
            }
            if (!isOpen) {
                this.open();
            }
            else {
                this.close();
            }
        };
        MenuWrapper.prototype.open = function () {
            var windowWidth = $(window).width();
            if (windowWidth > this.$menuOptions.collapseScreenSize) {
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
        MenuWrapper.prototype.close = function () {
            var windowWidth = $(window).width();
            if (windowWidth > this.$menuOptions.collapseScreenSize) {
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
        MenuWrapper.prototype.expandOnHover = function () {
            var _this = this;
            $(Selector.mainSidebar).hover((function () {
                if ($('body').is(Selector.mini + Selector.collapsed) &&
                    $(window).width() > _this.$menuOptions.collapseScreenSize) {
                    _this.expand();
                }
            }).bind(this.element), (function () {
                if ($('body').is(Selector.expanded)) {
                    _this.collapse();
                }
            }).bind(this.element));
        };
        MenuWrapper.prototype.expand = function () {
            setTimeout(function () {
                $('body')
                    .removeClass(ClassName.collapsed)
                    .addClass(ClassName.expanded);
            }, this.$menuOptions.expandTransitionDelay);
        };
        MenuWrapper.prototype.collapse = function () {
            setTimeout(function () {
                $('body')
                    .removeClass(ClassName.expanded)
                    .addClass(ClassName.collapsed);
            }, this.$menuOptions.expandTransitionDelay);
        };
        return MenuWrapper;
    }());
    function directive($menuOptions) {
        return {
            replace: false,
            restrict: 'A',
            scope: {
                option: '@adMenuWrapper'
            },
            link: function (scope, instanceElement, instanceAttributes) {
                $(document).on('click', Selector.button, function (e) {
                    e.preventDefault();
                    $(this).each(function () {
                        new MenuWrapper($(this), $menuOptions, 'toggle');
                    });
                });
                new MenuWrapper(instanceElement.find(Selector.button), $menuOptions, scope.option);
            }
        };
    }
    directive.$inject = ['$menuOptions'];
    mod.directive('adMenuWrapper', directive);
});
//# sourceMappingURL=adMenuWrapper.js.map