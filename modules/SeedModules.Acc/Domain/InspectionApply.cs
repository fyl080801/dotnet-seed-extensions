using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.Acc.Domain
{
    [Table("Acc_InspectionApply")]
    public class InspectionApply
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string ApplyCode { get; set; }

        [MaxLength(50)]
        public string ProjectName { get; set; }

        [MaxLength(50)]
        public string AgreeCode { get; set; }

        public int PlanType { get; set; }

        [MaxLength(50)]
        public string CompanyName { get; set; }

        [MaxLength(50)]
        public string CompanyAddress { get; set; }

        [MaxLength(50)]
        public string CompanyTel { get; set; }

        [MaxLength(50)]
        public string ContactMan { get; set; }

        [MaxLength(50)]
        public string ContactTel { get; set; }

        public int PgId { get; set; }

        public int CabinId { get; set; }

        [Description("巡检类型(日常,专项)")]
        public int InspectionType { get; set; }

        [MaxLength(50)]
        public string InspectionContent { get; set; }

        public int InspectionState { get; set; }

        [Description("计划起始时间")]
        public DateTime ExpectStartTime { get; set; }

        public DateTime ExpectEndTime { get; set; }

        [Description("实际起始时间")]
        public DateTime ActualStartTime { get; set; }

        public DateTime ActualEndTime { get; set; }

        public int ProcessInstanceId { get; set; }


        public int CreatorId { get; set; }

        public DateTime CreateTime { get; set; }

        public int UpdaterId { get; set; }

        public DateTime UpdateTime { get; set; }

        public int ApproverId { get; set; }

        public DateTime ApproveTime { get; set; }

        public int ApproveState { get; set; }

        public int CompanyId { get; set; }

        [ForeignKey("CompanyId")]
        public virtual Company Company { get; set; }
    }

    public class InspectionApplyTypeConfiguration : IEntityTypeConfiguration<InspectionApply>
    {
        public void Configure(EntityTypeBuilder<InspectionApply> builder)
        {

        }
    }
}