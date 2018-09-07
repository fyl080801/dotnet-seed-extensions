import mod = require('SeedModules.AdminPro/modules/admin/module');

class Controller {
  static $inject = [
    '$scope',
    '$state',
    '$stateParams',
    'app/services/treeUtility',
    'app/services/popupService'
  ];

  constructor(
    private $scope,
    private $state: ng.ui.IStateService,
    private $stateParams: ng.ui.IStateParamsService,
    private treeUtility: app.services.ITreeUtility,
    private popupService: app.services.IPopupService
  ) {
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
          click: () => {
            this.$state.go('admin.dashboard');
          }
        }
      ])
      .key('id')
      .parentKey('parentId')
      .onEach(item => {
        console.log(item);
      })
      .result.then(result => {
        $scope.menus = result.$children;
      });
  }

  routeTo(route) {
    this.$state.go(route.name, this.$stateParams);
  }

  logout() {
    this.popupService.confirm('是否退出？').ok(() => {});
  }
}

mod.controller(
  'SeedModules.AdminPro/modules/admin/components/layout/view',
  Controller
);
