import mod = require('SeedModules.AdminPro/modules/admin/module');

class Controller {
  static $inject = ['$scope'];

  constructor(private $scope) {
    $scope.vm = this;
  }
}

mod.controller(
  'SeedModules.AdminPro/modules/admin/components/layout/view',
  Controller
);
