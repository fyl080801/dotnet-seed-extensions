define(["require", "exports", "SeedModules.AdminPro/modules/admin/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    function directive() {
        return {
            link: {
                post: function (scope, instanceElement, instanceAttributes) {
                }
            }
        };
    }
    directive.$inject = [];
    mod.directive('adLayout', directive);
});
//# sourceMappingURL=adLayout.js.map