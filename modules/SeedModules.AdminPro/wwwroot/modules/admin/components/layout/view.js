define(["require", "exports", "SeedModules.AdminPro/modules/admin/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope) {
            this.$scope = $scope;
            $scope.vm = this;
        }
        Controller.$inject = ['$scope'];
        return Controller;
    }());
    mod.controller('SeedModules.AdminPro/modules/admin/components/layout/view', Controller);
});
//# sourceMappingURL=view.js.map