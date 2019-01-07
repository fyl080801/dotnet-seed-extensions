using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Data;
using SeedModules.Security.Domain;

namespace SeedModules.AdminPro.Domain
{
    [Table("OAuth2Account")]
    public class OAuth2Account : JEntity
    {
        [Key]
        public int Id { get; set; }


        [JsonIgnore]
        public string Define { get; set; }

        [NotMapped]
        public override JObject Properties
        {
            get { return !string.IsNullOrEmpty(this.Define) ? JObject.Parse(this.Define) : new JObject(); }
            set { this.Define = value.ToString(); }
        }

        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}