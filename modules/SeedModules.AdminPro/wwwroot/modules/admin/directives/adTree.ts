import mod = require('SeedModules.AdminPro/modules/admin/boot');

var DataKey = 'lte.tree';

var Selector = {
  tree: '.tree',
  treeview: '.treeview',
  treeviewMenu: '.treeview-menu',
  open: '.menu-open, .active',
  li: 'li',
  data: '[data-widget="tree"]',
  active: '.active'
};

var ClassName = {
  active: 'active',
  open: 'menu-open',
  tree: 'tree'
};

var Event = {
  collapsed: 'collapsed.tree',
  expanded: 'expanded.tree'
};

function directive($treeOptions): ng.IDirective {
  function toggle(link, event) {
    var treeviewMenu = link.next(Selector.treeviewMenu);
    var parentLi = link.parent();
    var isOpen = parentLi.hasClass(ClassName.open);

    if (!parentLi.is(Selector.treeview)) {
      return;
    }

    if (!$treeOptions.followLink || link.attr('href') === '#') {
      event.preventDefault();
    }

    if (isOpen) {
      collapse(treeviewMenu, parentLi);
    } else {
      expand(treeviewMenu, parentLi);
    }
  }

  function expand(tree, parent) {
    var expandedEvent = $.Event(Event.expanded);

    if ($treeOptions.accordion) {
      var openMenuLi = parent.siblings(Selector.open);
      var openTree = openMenuLi.children(Selector.treeviewMenu);
      collapse(openTree, openMenuLi);
    }

    parent.addClass(ClassName.open);
    tree.slideDown(
      $treeOptions.animationSpeed,
      (() => {
        $(element).trigger(expandedEvent);
        parent.addClass(ClassName.active);
      }).bind(element)
    );
  }

  function collapse(tree, parentLi) {
    var collapsedEvent = $.Event(Event.collapsed);

    //tree.find(Selector.open).removeClass(ClassName.open);

    parentLi.removeClass(ClassName.open);
    tree.slideUp(
      $treeOptions.animationSpeed,
      (() => {
        //tree.find(Selector.open + ' > ' + Selector.treeview).slideUp();
        $(element).trigger(collapsedEvent);
        parentLi.removeClass(ClassName.active);
      }).bind(element)
    );
  }

  function _setUpListeners() {
    $(element).on('click', $treeOptions.trigger, function(event) {
      toggle($(this), event);
    });
  }

  var element;

  return {
    replace: false,
    restrict: 'EA',
    link: (
      scope: any,
      instanceElement: JQLite,
      instanceAttributes: ng.IAttributes
    ) => {
      element = instanceElement;

      $(instanceElement).addClass(ClassName.tree);
      $(Selector.treeview + Selector.active, instanceElement).addClass(
        ClassName.open
      );

      _setUpListeners();
    }
  };
}

directive.$inject = ['$treeOptions'];

mod.directive('adTree', directive);
