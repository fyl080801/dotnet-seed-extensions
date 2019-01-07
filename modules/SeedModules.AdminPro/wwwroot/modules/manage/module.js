define(["require", "exports", "angular", "app/application"], function (require, exports, angular) {
    "use strict";
    var Config = (function () {
        function Config($stateProvider) {
            $stateProvider.state('admin.adminpro_menu', {
                url: '/adminpro_menu',
                title: '菜单管理',
                templateUrl: '/SeedModules.AdminPro/modules/manage/views/menu.html',
                requires: ['SeedModules.AngularUI/modules/requires', 'SeedModules.AdminPro/modules/manage/requires']
            });
        }
        Config.$inject = ['$stateProvider'];
        return Config;
    }());
    var Run = (function () {
        function Run($state, nav) {
            nav.add({
                text: '高级管理设置',
                icon: 'fas fa-brain fa-fw',
                order: 50,
                children: [
                    {
                        text: '菜单管理',
                        itemClicked: function (evt) {
                            $state.go('admin.adminpro_menu');
                        }
                    }
                ]
            });
        }
        Run.$inject = ['$state', 'SeedModules.Admin/modules/admin/configs/nav'];
        return Run;
    }());
    return angular
        .module('modules.adminpro.manage', ['ui.router'])
        .config(Config)
        .run(Run);
});
//# sourceMappingURL=module.js.map