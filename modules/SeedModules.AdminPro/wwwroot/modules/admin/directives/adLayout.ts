import mod = require('SeedModules.AdminPro/modules/admin/module');

function directive(): ng.IDirective {
  return {
    link: {
      post: (
        scope: any,
        instanceElement: JQLite,
        instanceAttributes: ng.IAttributes
      ) => {
          
      }
    }
  };
}

directive.$inject = [];

mod.directive('adLayout', directive);
