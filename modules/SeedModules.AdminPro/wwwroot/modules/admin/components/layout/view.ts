import mod = require('SeedModules.AdminPro/modules/admin/module');
import 'SeedModules.AdminPro/modules/admin/extends/admin';
import 'SeedModules.AdminPro/lib/jquery-slimscroll/jquery.slimscroll.min';

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
