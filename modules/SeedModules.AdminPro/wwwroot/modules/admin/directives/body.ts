import mod = require('SeedModules.AdminPro/modules/admin/boot');
import 'SeedModules.AdminPro/lib/jquery-slimscroll/jquery.slimscroll.min';

//var DataKey = 'lte.layout';

var Default = {
  slimscroll: true,
  resetHeight: true
};

var Selector = {
  wrapper: '.wrapper',
  contentWrapper: '.content-wrapper',
  layoutBoxed: '.layout-boxed',
  mainFooter: '.main-footer',
  mainHeader: '.main-header',
  sidebar: '.sidebar',
  controlSidebar: '.control-sidebar',
  fixed: '.fixed',
  sidebarMenu: '.sidebar-menu',
  logo: '.main-header .logo'
};

var ClassName = {
  fixed: 'fixed',
  holdTransition: 'hold-transition'
};

class Layout {
  private element = $('body');
  private bindedResize: boolean = false;
  constructor(private options) {}

  activate() {
    var $this = this;

    this.fix();
    this.fixSidebar();

    this.element.removeClass(ClassName.holdTransition);

    if (this.options.resetHeight) {
      $('body, html, ' + Selector.wrapper).css({
        height: 'auto',
        'min-height': '100%'
      });
    }

    if (!this.bindedResize) {
      $(window).resize(
        function() {
          $this.fix();
          $this.fixSidebar();

          $(Selector.logo + ', ' + Selector.sidebar).one(
            'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function() {
              $this.fix();
              $this.fixSidebar();
            }.bind($this.element)
          );
        }.bind($this.element)
      );

      this.bindedResize = true;
    }

    $(Selector.sidebarMenu).on(
      'expanded.tree',
      function() {
        $this.fix();
        $this.fixSidebar();
      }.bind(this.element)
    );

    $(Selector.sidebarMenu).on(
      'collapsed.tree',
      function() {
        $this.fix();
        $this.fixSidebar();
      }.bind(this.element)
    );
  }

  fix() {
    // Remove overflow from .wrapper if layout-boxed exists
    $(Selector.layoutBoxed + ' > ' + Selector.wrapper).css(
      'overflow',
      'hidden'
    );

    // Get window height and the wrapper height
    var footerHeight = $(Selector.mainFooter).outerHeight() || 0;
    var headerHeight = $(Selector.mainHeader).outerHeight() || 0;
    var neg = headerHeight + footerHeight;
    var windowHeight = $(window).height();
    var sidebarHeight = $(Selector.sidebar).height() || 0;

    // Set the min-height of the content and sidebar based on
    // the height of the document.
    if (this.element.hasClass(ClassName.fixed)) {
      $(Selector.contentWrapper).css('min-height', windowHeight - footerHeight);
    } else {
      var postSetHeight;

      if (windowHeight >= sidebarHeight) {
        $(Selector.contentWrapper).css('min-height', windowHeight - neg);
        postSetHeight = windowHeight - neg;
      } else {
        $(Selector.contentWrapper).css('min-height', sidebarHeight);
        postSetHeight = sidebarHeight;
      }

      // Fix for the control sidebar height
      var $controlSidebar = $(Selector.controlSidebar);
      if (typeof $controlSidebar !== 'undefined') {
        if ($controlSidebar.height() > postSetHeight)
          $(Selector.contentWrapper).css(
            'min-height',
            $controlSidebar.height()
          );
      }
    }
  }

  fixSidebar() {
    // Make sure the body tag has the .fixed class
    if (!$('body').hasClass(ClassName.fixed)) {
      if (typeof $.fn['slimScroll'] !== 'undefined') {
        $(Selector.sidebar)
          ['slimScroll']({ destroy: true })
          .height('auto');
      }
      return;
    }

    // Enable slimscroll for fixed layout
    if (this.options.slimscroll) {
      if (typeof $.fn['slimScroll'] !== 'undefined') {
        // Destroy if it exists
        // $(Selector.sidebar).slimScroll({ destroy: true }).height('auto')

        // Add slimscroll
        $(Selector.sidebar)['slimScroll']({
          height: $(window).height() - $(Selector.mainHeader).height() + 'px'
        });
      }
    }
  }
}

function directive($layoutOptions): ng.IDirective {
  return {
    replace: false,
    restrict: 'E',
    link: (
      scope: any,
      instanceElement: JQLite,
      instanceAttributes: ng.IAttributes
    ) => {
      instanceElement.addClass('hold-transition skin-blue sidebar-mini fixed');
      new Layout($.extend(Default, $layoutOptions)).activate();
    }
  };
}

directive.$inject = ['$layoutOptions'];

mod.directive('body', directive);
