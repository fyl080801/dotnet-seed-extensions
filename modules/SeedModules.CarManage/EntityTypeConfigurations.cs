using Seed.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.CarManage
{
    public class EntityTypeConfigurations : IEntityTypeConfigurationProvider
    {
        public Task<IEnumerable<object>> GetEntityTypeConfigurationsAsync()
        {
            return Task.FromResult(new object[]
            {

            }.AsEnumerable());
        }
    }
}
