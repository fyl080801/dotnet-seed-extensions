define(["require", "exports", "SeedModules.AdminPro/modules/admin/boot"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
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
        open: 'menu-open',
        tree: 'tree'
    };
    var Event = {
        collapsed: 'collapsed.tree',
        expanded: 'expanded.tree'
    };
    function directive($treeOptions) {
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
            }
            else {
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
            tree.slideDown($treeOptions.animationSpeed, (function () {
                $(element).trigger(expandedEvent);
            }).bind(element));
        }
        function collapse(tree, parentLi) {
            var collapsedEvent = $.Event(Event.collapsed);
            parentLi.removeClass(ClassName.open);
            tree.slideUp($treeOptions.animationSpeed, (function () {
                $(element).trigger(collapsedEvent);
            }).bind(element));
        }
        function _setUpListeners() {
            $(element).on('click', $treeOptions.trigger, function (event) {
                toggle($(this), event);
            });
        }
        var element;
        return {
            replace: false,
            restrict: 'EA',
            link: function (scope, instanceElement, instanceAttributes) {
                element = instanceElement;
                $(instanceElement).addClass(ClassName.tree);
                $(Selector.treeview + Selector.active, instanceElement).addClass(ClassName.open);
                _setUpListeners();
            }
        };
    }
    directive.$inject = ['$treeOptions'];
    mod.directive('adTree', directive);
});
//# sourceMappingURL=adTree.js.map