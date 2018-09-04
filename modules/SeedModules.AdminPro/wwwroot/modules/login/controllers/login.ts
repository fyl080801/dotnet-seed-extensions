import mod = require('SeedModules.AdminPro/modules/login/module');

class Controller {
  static $inject = ['$scope'];

  constructor(private $scope) {}
}

mod.controller(
  'SeedModules.AdminPro/modules/login/controllers/login',
  Controller
);
