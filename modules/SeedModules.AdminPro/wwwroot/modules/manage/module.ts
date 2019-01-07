import angular = require('angular');
import 'app/application';

class Config {
  static $inject = ['$stateProvider'];
  constructor($stateProvider: app.configs.IRequireStateProvider) {
    $stateProvider.state('admin.adminpro_menu', {
      url: '/adminpro_menu',
      title: '菜单管理',
      templateUrl: '/SeedModules.AdminPro/modules/manage/views/menu.html',
      requires: ['SeedModules.AngularUI/modules/requires', 'SeedModules.AdminPro/modules/manage/requires']
    });
  }
}

class Run {
  static $inject = ['$state', 'SeedModules.Admin/modules/admin/configs/nav'];
  constructor($state: ng.ui.IStateService, nav) {
    nav.add({
      text: '高级管理设置',
      icon: 'fas fa-brain fa-fw',
      order: 50,
      children: [
        {
          text: '菜单管理',
          itemClicked: evt => {
            $state.go('admin.adminpro_menu');
          }
        }
      ]
    });
  }
}

export = angular
  .module('modules.adminpro.manage', ['ui.router'])
  .config(Config)
  .run(Run);
