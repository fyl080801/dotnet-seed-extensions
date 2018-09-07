import mod = require('SeedModules.AdminPro/modules/admin/module');

function filter(): ng.IFilterFilter {
  return val => {
    return $.grep(val, elm => {
      return elm['title'] && elm['title'].length > 0;
    });
  };
}

mod.filter('routeMap', filter);
