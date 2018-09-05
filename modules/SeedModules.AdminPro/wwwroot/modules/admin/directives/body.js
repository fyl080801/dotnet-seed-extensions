define(["require", "exports", "SeedModules.AdminPro/modules/admin/boot", "SeedModules.AdminPro/modules/admin/extends/admin"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    function directive() {
        return {
            replace: false,
            restrict: 'E',
            link: function (scope, instanceElement, instanceAttributes) {
                instanceElement.addClass('hold-transition skin-blue sidebar-mini fixed');
            }
        };
    }
    mod.directive('body', directive);
});
//# sourceMappingURL=body.js.map