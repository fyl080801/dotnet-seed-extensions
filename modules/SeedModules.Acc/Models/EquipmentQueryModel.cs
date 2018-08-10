using Seed.Mvc.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Acc.Models
{
    public class EquipmentQueryModel : ListQueryModel
    {
        public int? TypeId { get; set; }

        public string Search { get; set; }
    }
}
