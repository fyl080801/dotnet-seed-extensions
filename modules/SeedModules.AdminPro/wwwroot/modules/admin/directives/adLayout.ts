import mod = require('SeedModules.AdminPro/modules/admin/module');
import 'SeedModules.AdminPro/lib/jquery-slimscroll/jquery.slimscroll.min';

var DataKey = 'lte.layout';

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

function directive($layoutOptions): ng.IDirective {
  function fix() {
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
    if ($('body').hasClass(ClassName.fixed)) {
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

  function fixSidebar() {
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
    if ($layoutOptions.slimscroll) {
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

  function activate(instanceElement: JQLite) {
    fix();
    fixSidebar();

    $('body').removeClass(ClassName.holdTransition);

    if ($layoutOptions.resetHeight) {
      $('body, html, ' + Selector.wrapper).css({
        height: 'auto',
        'min-height': '100%'
      });
    }

    if (!bindedResize) {
      $(window).resize(
        function() {
          fix();
          fixSidebar();

          $(Selector.logo + ', ' + Selector.sidebar).one(
            'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function() {
              fix();
              fixSidebar();
            }.bind(instanceElement)
          );
        }.bind(instanceElement)
      );

      bindedResize = true;
    }

    $(Selector.sidebarMenu).on(
      'expanded.tree',
      function() {
        fix();
        fixSidebar();
      }.bind(instanceElement)
    );

    $(Selector.sidebarMenu).on(
      'collapsed.tree',
      function() {
        fix();
        fixSidebar();
      }.bind(instanceElement)
    );
  }

  var bindedResize = false;

  return {
    link: {
      post: (
        scope: any,
        instanceElement: JQLite,
        instanceAttributes: ng.IAttributes
      ) => {
        activate(instanceElement);
      }
    }
  };
}

directive.$inject = ['$layoutOptions'];

mod.directive('adLayout', directive);
