define(["require", "exports", "SeedModules.AdminPro/modules/admin/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var DataKey = 'lte.controlsidebar';
    var Default = {
        slide: true
    };
    var Selector = {
        sidebar: '.control-sidebar',
        data: '[data-toggle="control-sidebar"]',
        open: '.control-sidebar-open',
        bg: '.control-sidebar-bg',
        wrapper: '.wrapper',
        content: '.content-wrapper',
        boxed: '.layout-boxed'
    };
    var ClassName = {
        open: 'control-sidebar-open',
        fixed: 'fixed'
    };
    var Event = {
        collapsed: 'collapsed.controlsidebar',
        expanded: 'expanded.controlsidebar'
    };
    var ControlSidebar = function (element, options) {
        this.element = element;
        this.options = options;
        this.hasBindedResize = false;
        this.init();
    };
    function directive() {
        function init(instanceElement) {
            if (!$(instanceElement).is(Selector.data)) {
                $(this).on('click', this.toggle);
            }
            this.fix();
            $(window).resize(function () {
                this.fix();
            }.bind(this));
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
    directive.$inject = [];
    mod.directive('adSidebar', directive);
});
//# sourceMappingURL=adSidebar.js.map