using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.AssetsManage.Domain
{
    [Table("Ass_ClassInfo"), Description("资产分类")]
    public class ClassInfo
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50), Required]
        public string Name { get; set; }

        [MaxLength(50)]
        public string Alias { get; set; }

        public int UnitType { get; set; }

        public string Remark { get; set; }

        public int? ParentId { get; set; }

        [ForeignKey("ParentId")]
        public virtual ClassInfo Parent { get; set; }

        public int CreatorId { get; set; }

        public DateTime CreateTime { get; set; }

        public int UpdaterId { get; set; }

        public DateTime UpdateTime { get; set; }
    }

    public class ClassInfoTypeConfiguration : IEntityTypeConfiguration<ClassInfo>
    {
        public void Configure(EntityTypeBuilder<ClassInfo> builder)
        {

        }
    }
}
