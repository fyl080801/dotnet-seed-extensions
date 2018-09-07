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
          id: '1',
          icon: 'fa fa-tachometer-alt',
          title: '监控台'
        },
        {
          id: '11',
          parentId: '1',
          title: '监控台1',
          click: () => {
            this.$state.go('admin.dashboard');
          }
        },
        {
          id: '2',
          icon: 'fa fa-tachometer-alt',
          title: '分组1'
        },
        {
          id: '22',
          parentId: '2',
          title: '监控台2'
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
