define(["require", "exports", "angular", "app/application", "angular-ui-router", "SeedModules.AdminPro/modules/admin/configs/admin", "SeedModules.AdminPro/modules/admin/directives/body"], function (require, exports, angular) {
    "use strict";
    var ModuleClass = (function () {
        function ModuleClass($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/admin/dashboard');
            $stateProvider.state('admin', {
                url: '/admin',
                templateUrl: '/SeedModules.AdminPro/modules/admin/components/layout/view.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.AdminPro/modules/admin/requires'
                ]
            });
            $stateProvider.state('admin.dashboard', {
                url: '/dashboard',
                templateUrl: '/SeedModules.AdminPro/modules/admin/components/dashboard/view.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.AdminPro/modules/admin/requires'
                ]
            });
        }
        ModuleClass.$inject = ['$stateProvider', '$urlRouterProvider'];
        return ModuleClass;
    }());
    return angular
        .module('modules.adminpro', ['modules.adminpro.boot'])
        .config(ModuleClass);
});
//# sourceMappingURL=module.js.map