import mod = require('SeedModules.AdminPro/modules/admin/module');

var DataKey = 'lte.pushmenu';

var Default = {
  collapseScreenSize: 767,
  expandOnHover: false,
  expandTransitionDelay: 200
};

var Selector = {
  collapsed: '.sidebar-collapse',
  open: '.sidebar-open',
  mainSidebar: '.main-sidebar',
  contentWrapper: '.content-wrapper',
  searchInput: '.sidebar-form .form-control',
  button: '[data-toggle="push-menu"]',
  mini: '.sidebar-mini',
  expanded: '.sidebar-expanded-on-hover',
  layoutFixed: '.fixed'
};

var ClassName = {
  collapsed: 'sidebar-collapse',
  open: 'sidebar-open',
  mini: 'sidebar-mini',
  expanded: 'sidebar-expanded-on-hover',
  expandFeature: 'sidebar-mini-expand-feature',
  layoutFixed: 'fixed'
};

var Event = {
  expanded: 'expanded.pushMenu',
  collapsed: 'collapsed.pushMenu'
};

class Menu {
  constructor(private element: JQLite, private options) {}

  init() {
    var $this = this;

    if (
      this.options.expandOnHover ||
      $('body').is(Selector.mini + Selector.layoutFixed)
    ) {
      this.expandOnHover();
      $('body').addClass(ClassName.expandFeature);
    }

    $(Selector.contentWrapper).click(
      function() {
        // Enable hide menu when clicking on the content-wrapper on small screens
        if (
          $(window).width() <= $this.options.collapseScreenSize &&
          $('body').hasClass(ClassName.open)
        ) {
          $this.close();
        }
      }.bind(this.element)
    );

    // __Fix for android devices
    $(Selector.searchInput).click(function(e) {
      e.stopPropagation();
    });
  }

  toggle() {
    var windowWidth = $(window).width();
    var isOpen = !$('body').hasClass(ClassName.collapsed);

    if (windowWidth <= this.options.collapseScreenSize) {
      isOpen = $('body').hasClass(ClassName.open);
    }

    if (!isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    var windowWidth = $(window).width();

    if (windowWidth > this.options.collapseScreenSize) {
      $('body')
        .removeClass(ClassName.collapsed)
        .trigger($.Event(Event.expanded));
    } else {
      $('body')
        .addClass(ClassName.open)
        .trigger($.Event(Event.expanded));
    }
  }

  close() {
    var windowWidth = $(window).width();
    if (windowWidth > this.options.collapseScreenSize) {
      $('body')
        .addClass(ClassName.collapsed)
        .trigger($.Event(Event.collapsed));
    } else {
      $('body')
        .removeClass(ClassName.open + ' ' + ClassName.collapsed)
        .trigger($.Event(Event.collapsed));
    }
  }

  expandOnHover() {
    var $this = this;

    $(Selector.mainSidebar).hover(
      function() {
        if (
          $('body').is(Selector.mini + Selector.collapsed) &&
          $(window).width() > $this.options.collapseScreenSize
        ) {
          $this.expand();
        }
      }.bind(this.element),
      function() {
        if ($('body').is(Selector.expanded)) {
          $this.collapse();
        }
      }.bind(this.element)
    );
  }

  expand() {
    setTimeout(function() {
      $('body')
        .removeClass(ClassName.collapsed)
        .addClass(ClassName.expanded);
    }, this.options.expandTransitionDelay);
  }

  collapse() {
    setTimeout(function() {
      $('body')
        .removeClass(ClassName.expanded)
        .addClass(ClassName.collapsed);
    }, this.options.expandTransitionDelay);
  }
}

function directive($menuOptions): ng.IDirective {
  return {
    replace: false,
    restrict: 'A',
    link: (
      scope: any,
      instanceElement: JQLite,
      instanceAttributes: ng.IAttributes
    ) => {
      new Menu(instanceElement, $.extend(Default, $menuOptions)).init();
    }
  };
}

directive.$inject = ['$menuOptions'];

mod.directive('adMenu', directive);
