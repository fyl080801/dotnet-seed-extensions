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

class MenuWrapper {
  constructor(private element, private $menuOptions, option) {
    if (option === 'toggle') this.toggle();
    this.init();
  }

  init() {
    if (
      this.$menuOptions.expandOnHover ||
      $('body').is(Selector.mini + Selector.layoutFixed)
    ) {
      this.expandOnHover();
      $('body').addClass(ClassName.expandFeature);
    }

    $(Selector.contentWrapper).click(
      (() => {
        // Enable hide menu when clicking on the content-wrapper on small screens
        if (
          $(window).width() <= this.$menuOptions.collapseScreenSize &&
          $('body').hasClass(ClassName.open)
        ) {
          this.close();
        }
      }).bind(this.element)
    );

    // __Fix for android devices
    $(Selector.searchInput).click(e => {
      e.stopPropagation();
    });
  }

  toggle() {
    var windowWidth = $(window).width();
    var isOpen = !$('body').hasClass(ClassName.collapsed);

    if (windowWidth <= this.$menuOptions.collapseScreenSize) {
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

    if (windowWidth > this.$menuOptions.collapseScreenSize) {
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
    if (windowWidth > this.$menuOptions.collapseScreenSize) {
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
    $(Selector.mainSidebar).hover(
      (() => {
        if (
          $('body').is(Selector.mini + Selector.collapsed) &&
          $(window).width() > this.$menuOptions.collapseScreenSize
        ) {
          this.expand();
        }
      }).bind(this.element),
      (() => {
        if ($('body').is(Selector.expanded)) {
          this.collapse();
        }
      }).bind(this.element)
    );
  }

  expand() {
    setTimeout(() => {
      $('body')
        .removeClass(ClassName.collapsed)
        .addClass(ClassName.expanded);
    }, this.$menuOptions.expandTransitionDelay);
  }

  collapse() {
    setTimeout(() => {
      $('body')
        .removeClass(ClassName.expanded)
        .addClass(ClassName.collapsed);
    }, this.$menuOptions.expandTransitionDelay);
  }
}

function directive($menuOptions): ng.IDirective {
  return {
    replace: false,
    restrict: 'A',
    scope: {
      option: '@adMenuWrapper'
    },
    link: (
      scope: any,
      instanceElement: JQLite,
      instanceAttributes: ng.IAttributes
    ) => {
      $(document).on('click', Selector.button, function(e) {
        e.preventDefault();
        $(this).each(function() {
          new MenuWrapper($(this), $menuOptions, 'toggle');
        });
      });

      new MenuWrapper(
        instanceElement.find(Selector.button),
        $menuOptions,
        scope.option
      );
    }
  };
}

directive.$inject = ['$menuOptions'];

mod.directive('adMenuWrapper', directive);
