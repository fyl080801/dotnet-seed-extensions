using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.Acc.Domain
{
    [Table("Acc_ConstructionPerson")]
    public class ConstructionPerson
    {
        public int ApplyId { get; set; }

        public int PersonalId { get; set; }

        [ForeignKey("ApplyId")]
        public virtual ConstructionApply ConstructionApply { get; set; }

        [ForeignKey("PersonalId")]
        public virtual ExternalPersonal ExternalPersonal { get; set; }

        public int CreatorId { get; set; }

        public DateTime CreateTime { get; set; }

        public int UpdaterId { get; set; }

        public DateTime UpdateTime { get; set; }
    }

    public class ConstructionPersonTypeConfiguration : IEntityTypeConfiguration<ConstructionPerson>
    {
        public void Configure(EntityTypeBuilder<ConstructionPerson> builder)
        {
            builder.HasKey(e => new { e.ApplyId, e.PersonalId });
        }
    }
}

