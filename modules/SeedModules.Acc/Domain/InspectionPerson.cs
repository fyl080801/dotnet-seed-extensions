using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.Acc.Domain
{
    [Table("Acc_InspectionPerson")]
    public class InspectionPerson
    {
        public int ApplyId { get; set; }

        public int PersonalId { get; set; }

        [ForeignKey("ApplyId")]
        public virtual InspectionApply InspectionApply { get; set; }

        [ForeignKey("PersonalId")]
        public virtual ExternalPersonal ExternalPersonal { get; set; }

        public int CreatorId { get; set; }

        public DateTime CreateTime { get; set; }

        public int UpdaterId { get; set; }

        public DateTime UpdateTime { get; set; }
    }

    public class InspectionPersonTypeConfiguration : IEntityTypeConfiguration<InspectionPerson>
    {
        public void Configure(EntityTypeBuilder<InspectionPerson> builder)
        {
            builder.HasKey(e => new { e.ApplyId, e.PersonalId });
        }
    }
}