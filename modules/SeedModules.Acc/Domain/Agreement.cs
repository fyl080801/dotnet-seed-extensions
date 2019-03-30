using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.Acc.Domain
{
    [Table("Acc_Agreement"), Description("合同信息")]
    public class Agreement
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string AgreeCode { get; set; }

        public int AgreeType { get; set; }

        [MaxLength(50)]
        public string Title { get; set; }

        [Description("内容摘要")]
        public string Summary { get; set; }

        [Description("原件")]
        public string Content { get; set; }

        [Description("金额")]
        public double Amount { get; set; }

        [Description("生效日期")]
        public DateTime ActiveDate { get; set; }

        [Description("截止日期")]
        public DateTime ExpireDate { get; set; }

        [Description("签字日期")]
        public DateTime SignDate { get; set; }

        [Description("执行情况")]
        public int AgreeState { get; set; }

        public bool IsEnabled { get; set; }

        public bool IsDeleted { get; set; }

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

        [MaxLength(50)]
        public string ContactEmail { get; set; }

        public string Remark { get; set; }

        public int CreatorId { get; set; }

        public DateTime CreateTime { get; set; }

        public int UpdaterId { get; set; }

        public DateTime UpdateTime { get; set; }

        public int CompanyId { get; set; }

        [ForeignKey("CompanyId")]
        public virtual Company Company { get; set; }
    }

    public class AgreementTypeConfiguration : IEntityTypeConfiguration<Agreement>
    {
        public void Configure(EntityTypeBuilder<Agreement> builder)
        {

        }
    }
}