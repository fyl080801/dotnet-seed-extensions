using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seed.Mvc.Filters;
using SeedModules.AngularUI.Extensions;
using SeedModules.AngularUI.Filters;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.AdminPro.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        [GenerateAntiforgeryTokenCookie]
        [RouteRequires(
            "rcss!SeedModules.Admin/less/seed-admin.css",
            "rcss!SeedModules.AdminPro/lib/googleapis-fonts/fonts.css",
            "rcss!SeedModules.AdminPro/lib/Ionicons/css/ionicons.min.css",
            "rcss!SeedModules.AdminPro/css/AdminLTE.min.css",
            "rcss!SeedModules.AdminPro/css/skins/_all-skins.min.css"
        )]
        public IActionResult Index()
        {
            return this.UI();
        }

        [GenerateAntiforgeryTokenCookie]
        [RouteRequires(
            "rcss!SeedModules.Admin/less/seed-admin.css",
            "rcss!SeedModules.AdminPro/lib/googleapis-fonts/fonts.css",
            "rcss!SeedModules.AdminPro/lib/Ionicons/css/ionicons.min.css",
            "rcss!SeedModules.AdminPro/css/AdminLTE.min.css",
            "SeedModules.AdminPro/modules/login/module"
        )]
        public IActionResult Login()
        {
            return this.UI();
        }
    }
}
