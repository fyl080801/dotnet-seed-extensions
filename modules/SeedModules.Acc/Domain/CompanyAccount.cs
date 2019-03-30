using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SeedModules.Security.Domain;

namespace SeedModules.Acc.Domain
{
    [Table("Acc_CompanyAccount")]
    public class CompanyAccount
    {
        public int Id { get; set; }

        public virtual User User { get; set; }

        public int CompanyId { get; set; }

        [ForeignKey("CompanyId")]
        public virtual Company Company { get; set; }
    }

    public class CompanyAccountTypeConfiguration : IEntityTypeConfiguration<CompanyAccount>
    {
        public void Configure(EntityTypeBuilder<CompanyAccount> builder)
        {
            builder.HasKey(e => e.Id);
            builder.HasOne(e => e.User).WithOne().HasForeignKey<CompanyAccount>(e => e.Id).HasPrincipalKey<User>(e => e.Id);
        }
    }
}