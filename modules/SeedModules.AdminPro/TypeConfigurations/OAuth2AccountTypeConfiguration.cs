using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SeedModules.AdminPro.Domain;

namespace SeedModules.AdminPro.TypeConfigurations
{
    public class OAuth2AccountTypeConfiguration : IEntityTypeConfiguration<OAuth2Account>
    {
        public void Configure(EntityTypeBuilder<OAuth2Account> builder)
        {

        }
    }
}
