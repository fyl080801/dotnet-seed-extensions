define(["require", "exports", "angular", "app/application", "angular-ui-router"], function (require, exports, angular) {
    "use strict";
    var ModuleClass = (function () {
        function ModuleClass($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/login');
            $stateProvider.state('login', {
                url: '/login',
                templateUrl: '/SeedModules.AdminPro/modules/login/views/login.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.AdminPro/modules/login/requires'
                ]
            });
        }
        ModuleClass.$inject = ['$stateProvider', '$urlRouterProvider'];
        return ModuleClass;
    }());
    return angular.module('modules.prologin', ['ui.router']).config(ModuleClass);
});
//# sourceMappingURL=module.js.map