define(["require", "exports", "SeedModules.AdminPro/modules/admin/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope, $state, $stateParams, $window, treeUtility, requestService, popupService) {
            var _this = this;
            this.$scope = $scope;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.$window = $window;
            this.treeUtility = treeUtility;
            this.requestService = requestService;
            this.popupService = popupService;
            $scope.vm = this;
            $scope.menus = [];
            treeUtility
                .toTree([
                {
                    id: '1',
                    icon: 'fa fa-tachometer-alt',
                    title: '监控台',
                    click: function () {
                        _this.$state.go('admin.dashboard');
                    }
                },
                {
                    id: '2',
                    icon: 'fa fa-briefcase',
                    title: '分组1'
                },
                {
                    id: '22',
                    parentId: '2',
                    title: '表格示例',
                    click: function () {
                        _this.$state.go('admin.tabletest');
                    }
                }
            ])
                .key('id')
                .parentKey('parentId')
                .result.then(function (result) {
                $scope.menus = result.$children;
            });
        }
        Controller.prototype.routeTo = function (route) {
            this.$state.go(route.name, this.$stateParams);
        };
        Controller.prototype.logout = function () {
            var _this = this;
            this.popupService.confirm('是否退出？').ok(function () {
                _this.requestService
                    .url('/api/account/logout')
                    .options({
                    dataOnly: true
                })
                    .post()
                    .result.then(function () {
                    _this.$window.location.reload();
                });
            });
        };
        Controller.$inject = [
            '$scope',
            '$state',
            '$stateParams',
            '$window',
            'app/services/treeUtility',
            'SeedModules.AngularUI/modules/services/requestService',
            'app/services/popupService'
        ];
        return Controller;
    }());
    mod.controller('SeedModules.AdminPro/modules/admin/components/layout/view', Controller);
});
//# sourceMappingURL=view.js.map