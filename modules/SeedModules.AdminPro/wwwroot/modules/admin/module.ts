import angular = require('angular');
import 'app/application';
import 'angular-ui-router';
import 'SeedModules.AdminPro/modules/admin/configs/admin';
import 'SeedModules.AdminPro/modules/admin/directives/body';

class ModuleClass {
  static $inject = ['$stateProvider', '$urlRouterProvider'];
  constructor(
    $stateProvider: app.configs.IRequireStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {
    $urlRouterProvider.otherwise('/admin/dashboard');

    $stateProvider.state('admin', {
      url: '/admin',
      templateUrl:
        '/SeedModules.AdminPro/modules/admin/components/layout/view.html',
      requires: [
        'SeedModules.AngularUI/modules/requires',
        'SeedModules.AdminPro/modules/admin/requires'
      ]
    });

    $stateProvider.state('admin.dashboard', {
      url: '/dashboard',
      templateUrl:
        '/SeedModules.AdminPro/modules/admin/components/dashboard/view.html',
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
