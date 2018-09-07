define(["require", "exports", "SeedModules.AdminPro/modules/admin/boot", "jquery-slimscroll"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
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
        function fix(element) {
            $(Selector.layoutBoxed + ' > ' + Selector.wrapper).css('overflow', 'hidden');
            var footerHeight = $(Selector.mainFooter).outerHeight() || 0;
            var headerHeight = $(Selector.mainHeader).outerHeight() || 0;
            var neg = headerHeight + footerHeight;
            var windowHeight = $(window).height();
            var sidebarHeight = $(Selector.sidebar).height() || 0;
            if (element.hasClass(ClassName.fixed)) {
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
        var bindedResize = false;
        return {
            replace: false,
            restrict: 'E',
            link: function (scope, instanceElement, instanceAttributes) {
                instanceElement.addClass('skin-blue sidebar-mini fixed');
                fix(instanceElement);
                fixSidebar();
                if ($layoutOptions.resetHeight) {
                    $('body, html, ' + Selector.wrapper).css({
                        height: 'auto',
                        'min-height': '100%'
                    });
                }
                if (!bindedResize) {
                    $(window).resize((function () {
                        fix(instanceElement);
                        fixSidebar();
                        $(Selector.logo + ', ' + Selector.sidebar).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', (function () {
                            fix(instanceElement);
                            fixSidebar();
                        }).bind(instanceElement));
                    }).bind(instanceElement));
                    bindedResize = true;
                }
                $(Selector.sidebarMenu).on('expanded.tree', (function () {
                    fix(instanceElement);
                    fixSidebar();
                }).bind(instanceElement));
                $(Selector.sidebarMenu).on('collapsed.tree', (function () {
                    fix(instanceElement);
                    fixSidebar();
                }).bind(instanceElement));
            }
        };
    }
    directive.$inject = ['$layoutOptions'];
    mod.directive('body', directive);
});
//# sourceMappingURL=body.js.map