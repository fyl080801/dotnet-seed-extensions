﻿using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Seed.Environment.Hosting;
using Seed.Environment.Logging;

namespace SeedExtensions
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Build(args).Run();
        }

        public static IWebHost Build(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseArgs(args)
                .UseNLogWeb()
                .UseStartup<Startup>()
                .Build();
        }
    }
}
