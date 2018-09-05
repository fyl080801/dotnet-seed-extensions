define(["require", "exports", "SeedModules.AdminPro/modules/admin/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    boot.constant('$layoutOptions', {
        slimscroll: true,
        resetHeight: true
    });
    boot.constant('$menuOptions', {
        collapseScreenSize: 767,
        expandOnHover: false,
        expandTransitionDelay: 200
    });
});
//# sourceMappingURL=admin.js.map