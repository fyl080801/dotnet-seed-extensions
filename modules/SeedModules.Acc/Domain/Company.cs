using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.Acc.Domain
{
    [Table("Acc_Company")]
    public class Company
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string CompanyName { get; set; }

        [MaxLength(50)]
        public string CompanyAddress { get; set; }

        [MaxLength(50)]
        public string CompanyTel { get; set; }

        [Description("公司性质(管线，监理，设计，其他)")]
        public int CompanyType { get; set; }

        [MaxLength(50)]
        public string ContactMan { get; set; }

        [MaxLength(50)]
        public string ContactEmail { get; set; }

        [Description("联系人电话"), MaxLength(50)]
        public string ContactTel { get; set; }

        public string Remark { get; set; }

        public bool IsDeleted { get; set; }

        public int CreatorId { get; set; }

        public DateTime CreateTime { get; set; }

        public int UpdaterId { get; set; }

        public DateTime UpdateTime { get; set; }
    }

    public class CompanyTypeConfiguration : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {

        }
    }
}