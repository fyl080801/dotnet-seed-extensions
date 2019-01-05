using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Data;
using Seed.Modules;
using SeedModules.Acc.Hubs;
using SeedModules.Acc.Internals;
using System;

namespace SeedModules.Acc
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            //services.AddSingleton<IApplicationLifetime, AccApplicationLifetime>();
            //services.AddTransient<IModuleTenantEvents>(sp => (AccApplicationLifetime)sp.GetService<IApplicationLifetime>());

            services.AddCors(options =>
            {
                options.AddPolicy("acc_cors", b =>
                {
                    b.AllowAnyOrigin();
                    b.AllowAnyHeader();
                    b.AllowAnyMethod();
                });
            });
            services.AddScoped<IEntityTypeConfigurationProvider, EntityTypeConfigurations>();

            //services.AddSignalR();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            //((AccApplicationLifetime)app.ApplicationServices.GetService<IApplicationLifetime>()).OnTenantStarted();

            app.UseCors("acc_cors");

            //app.UseSignalR(cfg =>
            //{
            //    cfg.MapHub<TestHub>("/chatHub");
            //});
        }
    }
}
