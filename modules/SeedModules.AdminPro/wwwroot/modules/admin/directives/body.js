define(["require", "exports", "SeedModules.AdminPro/modules/admin/boot", "SeedModules.AdminPro/lib/jquery-slimscroll/jquery.slimscroll.min"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var Default = {
        slimscroll: true,
        resetHeight: true
    };
    var Selector = {
        wrapper: '.wrapper',
        contentWrapper: '.content-wrapper',
        layoutBoxed: '.layout-boxed',
        mainFooter: '.main-footer',
        mainHeader: '.main-header',
        sidebar: '.sidebar',
        controlSidebar: '.control-sidebar',
        fixed: '.fixed',
        sidebarMenu: '.sidebar-menu',
        logo: '.main-header .logo'
    };
    var ClassName = {
        fixed: 'fixed',
        holdTransition: 'hold-transition'
    };
    var Layout = (function () {
        function Layout(options) {
            this.options = options;
            this.element = $('body');
            this.bindedResize = false;
        }
        Layout.prototype.activate = function () {
            var $this = this;
            this.fix();
            this.fixSidebar();
            this.element.removeClass(ClassName.holdTransition);
            if (this.options.resetHeight) {
                $('body, html, ' + Selector.wrapper).css({
                    height: 'auto',
                    'min-height': '100%'
                });
            }
            if (!this.bindedResize) {
                $(window).resize(function () {
                    $this.fix();
                    $this.fixSidebar();
                    $(Selector.logo + ', ' + Selector.sidebar).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                        $this.fix();
                        $this.fixSidebar();
                    }.bind($this.element));
                }.bind($this.element));
                this.bindedResize = true;
            }
            $(Selector.sidebarMenu).on('expanded.tree', function () {
                $this.fix();
                $this.fixSidebar();
            }.bind(this.element));
            $(Selector.sidebarMenu).on('collapsed.tree', function () {
                $this.fix();
                $this.fixSidebar();
            }.bind(this.element));
        };
        Layout.prototype.fix = function () {
            $(Selector.layoutBoxed + ' > ' + Selector.wrapper).css('overflow', 'hidden');
            var footerHeight = $(Selector.mainFooter).outerHeight() || 0;
            var headerHeight = $(Selector.mainHeader).outerHeight() || 0;
            var neg = headerHeight + footerHeight;
            var windowHeight = $(window).height();
            var sidebarHeight = $(Selector.sidebar).height() || 0;
            if (this.element.hasClass(ClassName.fixed)) {
                $(Selector.contentWrapper).css('min-height', windowHeight - footerHeight);
            }
            else {
                var postSetHeight;
                if (windowHeight >= sidebarHeight) {
                    $(Selector.contentWrapper).css('min-height', windowHeight - neg);
                    postSetHeight = windowHeight - neg;
                }
                else {
                    $(Selector.contentWrapper).css('min-height', sidebarHeight);
                    postSetHeight = sidebarHeight;
                }
                var $controlSidebar = $(Selector.controlSidebar);
                if (typeof $controlSidebar !== 'undefined') {
                    if ($controlSidebar.height() > postSetHeight)
                        $(Selector.contentWrapper).css('min-height', $controlSidebar.height());
                }
            }
        };
        Layout.prototype.fixSidebar = function () {
            if (!$('body').hasClass(ClassName.fixed)) {
                if (typeof $.fn['slimScroll'] !== 'undefined') {
                    $(Selector.sidebar)['slimScroll']({ destroy: true })
                        .height('auto');
                }
                return;
            }
            if (this.options.slimscroll) {
                if (typeof $.fn['slimScroll'] !== 'undefined') {
                    $(Selector.sidebar)['slimScroll']({
                        height: $(window).height() - $(Selector.mainHeader).height() + 'px'
                    });
                }
            }
        };
        return Layout;
    }());
    function directive($layoutOptions) {
        return {
            replace: false,
            restrict: 'E',
            link: function (scope, instanceElement, instanceAttributes) {
                instanceElement.addClass('hold-transition skin-blue sidebar-mini fixed');
                new Layout($.extend(Default, $layoutOptions)).activate();
            }
        };
    }
    directive.$inject = ['$layoutOptions'];
    mod.directive('body', directive);
});
//# sourceMappingURL=body.js.map