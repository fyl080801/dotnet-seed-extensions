define(["require", "exports", "SeedModules.AdminPro/modules/admin/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    function filter() {
        return function (val) {
            return $.grep(val, function (elm) {
                return elm['title'] && elm['title'].length > 0;
            });
        };
    }
    mod.filter('routeMap', filter);
});
//# sourceMappingURL=routeMap.js.map