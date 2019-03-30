using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.Acc.Domain
{
    [Table("Acc_ConstructionApplyJobarea"), Description("作业区域记录")]
    public class ConstructionApplyJobarea
    {
        [Key]
        public int Id { get; set; }

        [Description("管廊Id")]
        public int PgId { get; set; }

        [Description("舱室Id")]
        public int CabinId { get; set; }

        [Description("区段起始ID")]
        public int RegionBeginId { get; set; }

        [Description("区段结束ID")]
        public int RegionEndId { get; set; }

        public int CreatorId { get; set; }

        public DateTime CreateTime { get; set; }

        public int UpdaterId { get; set; }

        public DateTime UpdateTime { get; set; }

        public int ApplyId { get; set; }

        [ForeignKey("ApplyId")]
        public virtual ConstructionApply ConstructionApply { get; set; }
    }

    public class ConstructionApplyJobareaTypeConfiguration : IEntityTypeConfiguration<ConstructionApplyJobarea>
    {
        public void Configure(EntityTypeBuilder<ConstructionApplyJobarea> builder)
        {

        }
    }
}