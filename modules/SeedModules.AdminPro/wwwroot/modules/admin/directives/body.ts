import mod = require('SeedModules.AdminPro/modules/admin/boot');
import 'SeedModules.AdminPro/modules/admin/extends/admin';

function directive(): ng.IDirective {
  return {
    replace: false,
    restrict: 'E',
    link: (
      scope: any,
      instanceElement: JQLite,
      instanceAttributes: ng.IAttributes
    ) => {
      instanceElement.addClass('hold-transition skin-blue sidebar-mini fixed');
    }
  };
}

mod.directive('body', directive);
