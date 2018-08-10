using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SeedModules.Acc.Domain
{
    [Table("Acc_EquipmentType")]
    public class EquipmentType : JEntity
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50), Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public virtual EquipmentCategory Category { get; set; }

        [JsonIgnore]
        public string Extends { get; private set; }

        [NotMapped]
        public override JObject Properties
        {
            get { return !string.IsNullOrEmpty(this.Extends) ? JObject.Parse(this.Extends) : new JObject(); }
            set { this.Extends = value.ToString(); }
        }
    }

    public class EquipmentTypeTypeConfiguration : IEntityTypeConfiguration<EquipmentType>
    {
        public void Configure(EntityTypeBuilder<EquipmentType> builder)
        {

        }
    }
}
