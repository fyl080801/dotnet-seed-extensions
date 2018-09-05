define(["require", "exports", "SeedModules.AdminPro/modules/admin/module", "SeedModules.AdminPro/modules/admin/extends/admin", "SeedModules.AdminPro/lib/jquery-slimscroll/jquery.slimscroll.min"], function (require, exports, mod) {
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