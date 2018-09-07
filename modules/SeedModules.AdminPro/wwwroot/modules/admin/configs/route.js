define(["require", "exports", "SeedModules.AdminPro/modules/admin/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    var Run = (function () {
        function Run($rootScope, $state, $appEnvironment, $routeMap) {
            $appEnvironment.$routeMap = $routeMap;
            $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
                var stateArray = toState.name.split('.');
                $appEnvironment.$routeMap = [];
                for (var i = 0; i < stateArray.length; i++) {
                    $appEnvironment.$routeMap.push($state.get(stateArray.slice(0, i + 1).join('.')));
                }
            });
        }
        Run.$inject = ['$rootScope', '$state', '$appEnvironment', '$routeMap'];
        return Run;
    }());
    boot.constant('$routeMap', []).run(Run);
});
//# sourceMappingURL=route.js.map