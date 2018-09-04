define(["require", "exports", "angular", "app/application", "angular-ui-router"], function (require, exports, angular) {
    "use strict";
    var ModuleClass = (function () {
        function ModuleClass($stateProvider, $urlRouterProvider) {
        }
        ModuleClass.$inject = ['$stateProvider', '$urlRouterProvider'];
        return ModuleClass;
    }());
    return angular.module('modules.proadmin', ['ui.router']).config(ModuleClass);
});
//# sourceMappingURL=module.js.map