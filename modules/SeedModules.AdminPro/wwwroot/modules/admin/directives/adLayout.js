define(["require", "exports", "SeedModules.AdminPro/modules/admin/module", "SeedModules.AdminPro/lib/jquery-slimscroll/jquery.slimscroll.min"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var DataKey = 'lte.layout';
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
    function directive($layoutOptions) {
        function fix() {
            $(Selector.layoutBoxed + ' > ' + Selector.wrapper).css('overflow', 'hidden');
            var footerHeight = $(Selector.mainFooter).outerHeight() || 0;
            var headerHeight = $(Selector.mainHeader).outerHeight() || 0;
            var neg = headerHeight + footerHeight;
            var windowHeight = $(window).height();
            var sidebarHeight = $(Selector.sidebar).height() || 0;
            if ($('body').hasClass(ClassName.fixed)) {
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
        }
        function fixSidebar() {
            if (!$('body').hasClass(ClassName.fixed)) {
                if (typeof $.fn['slimScroll'] !== 'undefined') {
                    $(Selector.sidebar)['slimScroll']({ destroy: true })
                        .height('auto');
                }
                return;
            }
            if ($layoutOptions.slimscroll) {
                if (typeof $.fn['slimScroll'] !== 'undefined') {
                    $(Selector.sidebar)['slimScroll']({
                        height: $(window).height() - $(Selector.mainHeader).height() + 'px'
                    });
                }
            }
        }
        function activate(instanceElement) {
            fix();
            fixSidebar();
            $('body').removeClass(ClassName.holdTransition);
            if ($layoutOptions.resetHeight) {
                $('body, html, ' + Selector.wrapper).css({
                    height: 'auto',
                    'min-height': '100%'
                });
            }
            if (!bindedResize) {
                $(window).resize(function () {
                    fix();
                    fixSidebar();
                    $(Selector.logo + ', ' + Selector.sidebar).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                        fix();
                        fixSidebar();
                    }.bind(instanceElement));
                }.bind(instanceElement));
                bindedResize = true;
            }
            $(Selector.sidebarMenu).on('expanded.tree', function () {
                fix();
                fixSidebar();
            }.bind(instanceElement));
            $(Selector.sidebarMenu).on('collapsed.tree', function () {
                fix();
                fixSidebar();
            }.bind(instanceElement));
        }
        var bindedResize = false;
        return {
            link: {
                post: function (scope, instanceElement, instanceAttributes) {
                    activate(instanceElement);
                }
            }
        };
    }
    directive.$inject = ['$layoutOptions'];
    mod.directive('adLayout', directive);
});
//# sourceMappingURL=adLayout.js.map