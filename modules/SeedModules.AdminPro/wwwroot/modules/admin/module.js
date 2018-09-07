define(["require", "exports", "angular", "app/application", "angular-ui-router", "SeedModules.AdminPro/modules/admin/configs/admin", "SeedModules.AdminPro/modules/admin/configs/route", "SeedModules.AdminPro/modules/admin/directives/body"], function (require, exports, angular) {
    "use strict";
    var ModuleClass = (function () {
        function ModuleClass($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/admin/dashboard');
            $stateProvider.state('admin', {
                url: '/admin',
                title: '首页',
                subtitle: 'Version 0.1',
                templateUrl: '/SeedModules.AdminPro/modules/admin/components/layout/view.html',
                requires: [
                    'SeedModules.AngularUI/modules/requires',
                    'SeedModules.AdminPro/modules/admin/requires'
                ]
            });
            $stateProvider.state('admin.dashboard', {
                url: '/dashboard',
                title: '监控面板',
                subtitle: 'Dashboard',
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