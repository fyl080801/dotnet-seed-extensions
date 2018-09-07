import mod = require('SeedModules.AdminPro/modules/admin/module');

class Controller {
  static $inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$window',
    'app/services/treeUtility',
    'SeedModules.AngularUI/modules/services/requestService',
    'app/services/popupService'
  ];

  constructor(
    private $scope,
    private $state: ng.ui.IStateService,
    private $stateParams: ng.ui.IStateParamsService,
    private $window: ng.IWindowService,
    private treeUtility: app.services.ITreeUtility,
    private requestService: AngularUI.services.IRequestService,
    private popupService: app.services.IPopupService
  ) {
    $scope.vm = this;

    $scope.menus = [];

    treeUtility
      .toTree([
        {
          id: '1',
          icon: 'fa fa-tachometer-alt',
          title: '监控台',
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
      .result.then(result => {
        $scope.menus = result.$children;
      });
  }

  routeTo(route) {
    this.$state.go(route.name, this.$stateParams);
  }

  logout() {
    this.popupService.confirm('是否退出？').ok(() => {
      this.requestService
        .url('/api/account/logout')
        .options({
          dataOnly: true
        })
        .post()
        .result.then(() => {
          this.$window.location.reload();
        });
    });
  }
}

mod.controller(
  'SeedModules.AdminPro/modules/admin/components/layout/view',
  Controller
);
