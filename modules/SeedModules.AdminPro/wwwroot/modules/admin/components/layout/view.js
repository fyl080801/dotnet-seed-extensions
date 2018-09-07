define(["require", "exports", "SeedModules.AdminPro/modules/admin/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope, $state, $stateParams, treeUtility, popupService) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.treeUtility = treeUtility;
            this.popupService = popupService;
            $scope.vm = this;
            $scope.menus = [];
            treeUtility
                .toTree([
                {
                    id: 'aaaa',
                    icon: 'fa fa-tachometer-alt',
                    title: '监控台'
                },
                {
                    id: 'bbb',
                    parentId: 'aaaa',
                    title: '监控台1',
                    click: function () {
                        _this.$state.go('admin.dashboard');
                    }
                }
            ])
                .key('id')
                .parentKey('parentId')
                .onEach(function (item) {
                console.log(item);
            })
                .result.then(function (result) {
                $scope.menus = result.$children;
            });
        }
        Controller.prototype.routeTo = function (route) {
            this.$state.go(route.name, this.$stateParams);
        };
        Controller.prototype.logout = function () {
            this.popupService.confirm('是否退出？').ok(function () { });
        };
        Controller.$inject = [
            '$scope',
            '$state',
            '$stateParams',
            'app/services/treeUtility',
            'app/services/popupService'
        ];
        return Controller;
    }());
    mod.controller('SeedModules.AdminPro/modules/admin/components/layout/view', Controller);
});
//# sourceMappingURL=view.js.map