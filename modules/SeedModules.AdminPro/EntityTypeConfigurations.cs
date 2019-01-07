using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Seed.Data;
using SeedModules.AdminPro.Domain;
using SeedModules.AdminPro.TypeConfigurations;

namespace SeedModules.AdminPro
{
    public class EntityTypeConfigurations : IEntityTypeConfigurationProvider
    {
        public async Task<IEnumerable<object>> GetEntityTypeConfigurationsAsync()
        {
            return await Task.FromResult(new object[]
            {
                new OAuth2AccountTypeConfiguration()
            });
        }
    }
}