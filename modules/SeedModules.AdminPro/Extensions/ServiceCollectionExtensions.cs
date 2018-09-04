using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace SeedModules.AdminPro.Extensions
{
    public static class ServiceCollectionExtensions
    {
        const string LoginPath = "/SeedModules.AdminPro/Home/Login";

        public static IServiceCollection AddProAuthenticationServices(this IServiceCollection services,
            IDataProtectionProvider dataProtectionProvider,
            string tenantName,
            string prefix)
        {
            services
                .ConfigureApplicationCookie(options =>
                {
                    options.LoginPath = LoginPath;
                });

            return services;
        }
    }
}