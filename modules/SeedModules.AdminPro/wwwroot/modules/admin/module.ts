import angular = require('angular');
import 'app/application';
import 'angular-ui-router';
import 'SeedModules.AdminPro/modules/admin/configs/admin';
import 'SeedModules.AdminPro/modules/admin/configs/route';
import 'SeedModules.AdminPro/modules/admin/directives/body';

class ModuleClass {
  static $inject = ['$stateProvider', '$urlRouterProvider'];
  constructor(
    $stateProvider: admin.configs.IRequireStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {
    $urlRouterProvider.otherwise('/admin/dashboard');

    $stateProvider.state('admin', {
      url: '/admin',
      title: '首页',
      subtitle: 'Version 0.1',
      templateUrl:
        '/SeedModules.AdminPro/modules/admin/components/layout/view.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.AdminPro/modules/admin/requires'
      ]
    });

    $stateProvider.state('admin.dashboard', {
      url: '/dashboard',
      title: '监控面板',
      subtitle: 'Dashboard',
      templateUrl:
        '/SeedModules.AdminPro/modules/admin/components/dashboard/view.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.AdminPro/modules/admin/requires'
      ]
    });

    $stateProvider.state('admin.tabletest', {
      url: '/tabletest',
      title: '表格',
      subtitle: '看看表格样式是否自动适应',
      templateUrl:
        '/SeedModules.AdminPro/modules/admin/components/tabletest/view.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.AdminPro/modules/admin/requires'
      ]
    });
  }
}

export = angular
  .module('modules.adminpro', ['modules.adminpro.boot'])
  .config(ModuleClass);
