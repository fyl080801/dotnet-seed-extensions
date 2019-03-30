using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.Acc.Domain
{
    [Table("Acc_ConstructionReport")]
    public class ConstructionReport
    {
        [Key]
        public int Id { get; set; }

        [Description("报告编号"), MaxLength(50)]
        public string ReportCode { get; set; }

        public DateTime OverTime { get; set; }

        [Description("管线单位报告事项")]
        public string ReportContent { get; set; }

        [Description("监控中心报告事项")]
        public string McContent { get; set; }

        [Description("监控中心审核意见")]
        public string McOpinion { get; set; }

        [Description("中心主任审核意见")]
        public string McMasterOpinion { get; set; }

        [Description("管廊公司审核意见")]
        public string PgCompanyOpinion { get; set; }

        [Description("流程实例ID")]
        public int ProcessInstanceId { get; set; }

        [Description("审批状态")]
        public int ApprovalState { get; set; }

        public int CreatorId { get; set; }

        public DateTime CreateTime { get; set; }

        public int UpdaterId { get; set; }

        public DateTime UpdateTime { get; set; }

        public int ApplyId { get; set; }

        [ForeignKey("ApplyId")]
        public virtual ConstructionApply ConstructionApply { get; set; }
    }

    public class ConstructionReportTypeConfiguration : IEntityTypeConfiguration<ConstructionReport>
    {
        public void Configure(EntityTypeBuilder<ConstructionReport> builder)
        {

        }
    }
}