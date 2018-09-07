define(["require", "exports", "SeedModules.AdminPro/modules/admin/boot", "angular"], function (require, exports, mod, angular) {
    "use strict";
    exports.__esModule = true;
    function directive() {
        return {
            restrict: 'A',
            scope: {
                handler: '&ngRepeated'
            },
            link: function (scope, instanceElement, instanceAttributes) {
                (scope.handler || angular.noop)();
            }
        };
    }
    mod.directive('ngRepeated', directive);
});
//# sourceMappingURL=ngRepeated.js.map