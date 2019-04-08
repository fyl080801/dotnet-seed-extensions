using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Seed.Data;
using SeedModules.AssetsManage.Domain;

namespace SeedModules.AssetsManage
{
    public class EntityTypeConfigurations : IEntityTypeConfigurationProvider
    {
        public Task<IEnumerable<object>> GetEntityTypeConfigurationsAsync()
        {
            return Task.FromResult(new object[]
            {
                new AssetBookTypeConfiguration(),
                new ClassInfoTypeConfiguration()
            }.AsEnumerable());
        }
    }
}
