define(["require", "exports", "SeedModules.AdminPro/modules/admin/module", "angular"], function (require, exports, mod, angular) {
    "use strict";
    exports.__esModule = true;
    var ClassNames = {
        treeview: 'treeview'
    };
    var Controller = (function () {
        function Controller($scope) {
            this.$scope = $scope;
            $scope.getTitle = function (item) {
                return item.$data.title;
            };
            $scope.getIcon = function (item) {
                return item.$data.icon || 'fa';
            };
            $scope.getChildren = function (item) {
                return item.$children || [];
            };
            $scope.hasChildren = function (item) {
                return item.$children && item.$children.length > 0;
            };
            $scope.hasLabel = function (item) {
                return item.$data.labels && item.$data.labels.length > 0;
            };
            $scope.getLabels = function (item) {
                return item.$data.labels || [];
            };
            $scope.itemHandler = function (handler, item, $event) {
                ($scope[handler] || item.$data[handler] || angular.noop)({
                    $item: item,
                    $event: $event
                });
            };
        }
        Controller.$inject = ['$scope'];
        return Controller;
    }());
    function directive() {
        return {
            restrict: 'AE',
            replace: false,
            templateUrl: '/SeedModules.AdminPro/modules/admin/directives/adMenuItem.html',
            link: function (scope, instanceElement, instanceAttributes) {
                if (scope.hasChildren(scope.item)) {
                    instanceElement.addClass(ClassNames.treeview);
                }
                else {
                    instanceElement.removeClass(ClassNames.treeview);
                }
            },
            controller: Controller
        };
    }
    mod.directive('adMenuItem', directive);
});
//# sourceMappingURL=adMenuItem.js.map