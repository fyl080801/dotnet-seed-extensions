import boot = require('SeedModules.AdminPro/modules/admin/boot');

boot.constant('$layoutOptions', {
  slimscroll: true,
  resetHeight: true
});

boot.constant('$menuOptions', {
  collapseScreenSize: 767,
  expandOnHover: false,
  expandTransitionDelay: 200
});

boot.constant('$treeOptions', {
  animationSpeed: 500,
  accordion: true,
  followLink: false,
  trigger: '.treeview a'
});
