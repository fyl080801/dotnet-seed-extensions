import boot = require('SeedModules.AdminPro/modules/admin/boot');

class Run {
  static $inject = ['$rootScope', '$state', '$appEnvironment', '$routeMap'];
  constructor(
    $rootScope: ng.IRootScopeService,
    $state: ng.ui.IStateService,
    $appEnvironment,
    $routeMap
  ) {
    $appEnvironment.$routeMap = $routeMap;
    $rootScope.$on('$stateChangeSuccess', (evt, toState: ng.ui.IState) => {
      var stateArray = toState.name.split('.');
      $appEnvironment.$routeMap = [];
      for (var i = 0; i < stateArray.length; i++) {
        $appEnvironment.$routeMap.push(
          $state.get(stateArray.slice(0, i + 1).join('.'))
        );
      }
    });
  }
}

boot.constant('$routeMap', []).run(Run);
