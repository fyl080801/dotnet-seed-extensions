import mod = require('SeedModules.AdminPro/modules/admin/module');
import angular = require('angular');

var ClassNames = {
  treeview: 'treeview'
};

class Controller {
  static $inject = ['$scope'];
  constructor(private $scope) {
    $scope.getTitle = item => {
      return item.$data.title;
    };

    $scope.getIcon = item => {
      return item.$data.icon || 'fa';
    };

    $scope.getChildren = item => {
      return item.$children || [];
    };

    $scope.hasChildren = item => {
      return item.$children && item.$children.length > 0;
    };

    $scope.hasLabel = item => {
      return item.$data.labels && item.$data.labels.length > 0;
    };

    $scope.getLabels = item => {
      return item.$data.labels || [];
    };

    $scope.itemHandler = (handler, item, $event) => {
      ($scope[handler] || item.$data[handler] || angular.noop)({
        $item: item,
        $event: $event
      });
    };
  }
}

function directive(): ng.IDirective {
  return {
    restrict: 'AE',
    replace: false,
    templateUrl:
      '/SeedModules.AdminPro/modules/admin/directives/adMenuItem.html',
    link: (
      scope: any,
      instanceElement: JQLite,
      instanceAttributes: ng.IAttributes
    ) => {
      if (scope.hasChildren(scope.item)) {
        instanceElement.addClass(ClassNames.treeview);
      } else {
        instanceElement.removeClass(ClassNames.treeview);
      }
    },
    controller: Controller
  };
}

mod.directive('adMenuItem', directive);
