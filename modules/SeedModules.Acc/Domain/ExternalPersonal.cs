using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.Acc.Domain
{
    [Table("Acc_ExternalPersonal")]
    public class ExternalPersonal
    {
        [Key]
        public int Id { get; set; }

        public int CompanyId { get; set; }

        [ForeignKey("CompanyId")]
        public virtual Company Company { get; set; }

        [MaxLength(50)]
        public string PersonalName { get; set; }

        [MaxLength(50)]
        public string PersonalRole { get; set; }

        [MaxLength(50)]
        public string PersonalTel { get; set; }

        [MaxLength(50)]
        public string PeraonslIdCode { get; set; }

        public string PersonalIdImage { get; set; }

        public string PersonalImage { get; set; }

        public string Remark { get; set; }

        public int CreatorId { get; set; }

        public DateTime CreateTime { get; set; }

        public int UpdaterId { get; set; }

        public DateTime UpdateTime { get; set; }
    }

    public class ExternalPersonalTypeConfiguration : IEntityTypeConfiguration<ExternalPersonal>
    {
        public void Configure(EntityTypeBuilder<ExternalPersonal> builder)
        {

        }
    }
}