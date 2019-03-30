using Seed.Data;
using SeedModules.Acc.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.Acc
{
    public class EntityTypeConfigurations : IEntityTypeConfigurationProvider
    {
        public Task<IEnumerable<object>> GetEntityTypeConfigurationsAsync()
        {
            return Task.FromResult(new object[]
            {
                new EquipmentTypeConfiguration(),
                new EquipmentCategoryTypeConfiguration(),
                new EquipmentTypeTypeConfiguration(),
                new LocationTypeConfiguration(),
                new TeamTypeConfiguration(),
                new ConstructionApplyTypeConfiguration(),
                new ConstructionReportTypeConfiguration(),
                new ConstructionApplyJobareaTypeConfiguration(),
                new ConstructionPersonTypeConfiguration(),
                new ExternalPersonalTypeConfiguration(),
                new CompanyTypeConfiguration(),
                new AgreementTypeConfiguration(),
                new CompanyAccountTypeConfiguration()
            }.AsEnumerable());
        }
    }
}
