import mod = require('SeedModules.AdminPro/modules/admin/boot');

var DataKey = 'lte.tree';

var Default = {
  animationSpeed: 500,
  accordion: true,
  followLink: false,
  trigger: '.treeview a'
};

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
  open: 'menu-open',
  tree: 'tree'
};

var Event = {
  collapsed: 'collapsed.tree',
  expanded: 'expanded.tree'
};

class Tree {
  constructor(private element: JQLite, private options) {
    $(element).addClass(ClassName.tree);

    $(Selector.treeview + Selector.active, element).addClass(ClassName.open);

    this._setUpListeners();
  }

  private _setUpListeners() {
    var $this = this;
    $(this.element).on('click', this.options.trigger, function(event) {
      $this.toggle($(this), event);
    });
  }

  toggle(link, event) {
    var treeviewMenu = link.next(Selector.treeviewMenu);
    var parentLi = link.parent();
    var isOpen = parentLi.hasClass(ClassName.open);

    if (!parentLi.is(Selector.treeview)) {
      return;
    }

    if (!this.options.followLink || link.attr('href') === '#') {
      event.preventDefault();
    }

    if (isOpen) {
      this.collapse(treeviewMenu, parentLi);
    } else {
      this.expand(treeviewMenu, parentLi);
    }
  }

  expand(tree, parent) {
    var expandedEvent = $.Event(Event.expanded);

    if (this.options.accordion) {
      var openMenuLi = parent.siblings(Selector.open);
      var openTree = openMenuLi.children(Selector.treeviewMenu);
      this.collapse(openTree, openMenuLi);
    }

    parent.addClass(ClassName.open);
    tree.slideDown(
      this.options.animationSpeed,
      function() {
        $(this.element).trigger(expandedEvent);
      }.bind(this.element)
    );
  }

  collapse(tree, parentLi) {
    var collapsedEvent = $.Event(Event.collapsed);

    //tree.find(Selector.open).removeClass(ClassName.open);
    parentLi.removeClass(ClassName.open);
    tree.slideUp(
      this.options.animationSpeed,
      function() {
        //tree.find(Selector.open + ' > ' + Selector.treeview).slideUp();
        $(this.element).trigger(collapsedEvent);
      }.bind(this.element)
    );
  }
}

function directive($treeOptions): ng.IDirective {
  return {
    replace: false,
    restrict: 'EA',
    link: (
      scope: any,
      instanceElement: JQLite,
      instanceAttributes: ng.IAttributes
    ) => {
      new Tree(instanceElement, $.extend(Default, $treeOptions));
    }
  };
}

directive.$inject = ['$treeOptions'];

mod.directive('adTree', directive);
