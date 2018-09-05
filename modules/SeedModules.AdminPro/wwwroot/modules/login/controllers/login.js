define(["require", "exports", "SeedModules.AdminPro/modules/login/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope, $location, requestService, popupService) {
            this.$scope = $scope;
            this.$location = $location;
            this.requestService = requestService;
            this.popupService = popupService;
            $scope.vm = this;
            $scope.data = {};
        }
        Controller.prototype.login = function () {
            this.requestService
                .url('/api/account/login?ReturnUrl=' + this.$location.search().ReturnUrl)
                .post(this.$scope.data)
                .result.then(function (result) {
                if (result.success) {
                    window.location = result.returnUrl;
                }
            });
        };
        Controller.prototype.enterlogin = function ($event, form) {
            if ($event.keyCode !== 13 || form.$invalid)
                return;
            this.login();
        };
        Controller.prototype.buildinginfo = function () {
            this.popupService.information('我就晚上有时间，辣么多功能得一点点来呀');
        };
        Controller.$inject = [
            '$scope',
            '$location',
            'SeedModules.AngularUI/modules/services/requestService',
            'app/services/popupService'
        ];
        return Controller;
    }());
    mod.controller('SeedModules.AdminPro/modules/login/controllers/login', Controller);
});
//# sourceMappingURL=login.js.map