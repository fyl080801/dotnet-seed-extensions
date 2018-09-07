import mod = require('SeedModules.AdminPro/modules/admin/boot');
import angular = require('angular');

function directive(): ng.IDirective {
  return {
    restrict: 'A',
    scope: {
      handler: '&ngRepeated'
    },
    link: (
      scope: any,
      instanceElement: JQLite,
      instanceAttributes: ng.IAttributes
    ) => {
      (scope.handler || angular.noop)();
    }
  };
}

mod.directive('ngRepeated', directive);
