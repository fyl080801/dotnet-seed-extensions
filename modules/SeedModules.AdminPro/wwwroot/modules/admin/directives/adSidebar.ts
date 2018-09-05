import mod = require('SeedModules.AdminPro/modules/admin/module');

var DataKey = 'lte.controlsidebar';

var Default = {
  slide: true
};

var Selector = {
  sidebar: '.control-sidebar',
  data: '[data-toggle="control-sidebar"]',
  open: '.control-sidebar-open',
  bg: '.control-sidebar-bg',
  wrapper: '.wrapper',
  content: '.content-wrapper',
  boxed: '.layout-boxed'
};

var ClassName = {
  open: 'control-sidebar-open',
  fixed: 'fixed'
};

var Event = {
  collapsed: 'collapsed.controlsidebar',
  expanded: 'expanded.controlsidebar'
};

// ControlSidebar Class Definition
// ===============================
var ControlSidebar = function(element, options) {
  this.element = element;
  this.options = options;
  this.hasBindedResize = false;

  this.init();
};

function directive(): ng.IDirective {
  function init(instanceElement: JQLite) {
    // Add click listener if the element hasn't been
    // initialized using the data API
    if (!$(instanceElement).is(Selector.data)) {
      $(this).on('click', this.toggle);
    }

    this.fix();
    $(window).resize(
      function() {
        this.fix();
      }.bind(this)
    );
  }

  return {
    replace: false,
    restrict: 'A',
    link: {
      post: (
        scope: any,
        instanceElement: JQLite,
        instanceAttributes: ng.IAttributes
      ) => {
        init(instanceElement);
      }
    }
  };
}

directive.$inject = [];

mod.directive('adSidebar', directive);
