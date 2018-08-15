using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Seed.Data;
using Seed.Mvc.Extensions;
using Seed.Mvc.Filters;
using Seed.Mvc.Models;
using SeedModules.Acc.Domain;
using SeedModules.Acc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SeedModules.Acc.Controllers
{
    [Route("api/acc/equipment"), EnableCors("acc_cors")]
    public class EquipmentController : Controller
    {
        readonly IDbContext _db;

        public EquipmentController(IDbContext db)
        {
            _db = db;
        }

        [HttpGet("allcategories"), HandleResult]
        public IEnumerable<EquipmentCategory> AllCategory()
        {
            var query = _db.Set<EquipmentCategory>().Select(e => new EquipmentCategory
            {
                EquipmentTypes = e.EquipmentTypes.Select(t => new EquipmentType()
                {
                    CategoryId = t.CategoryId,
                    Id = t.Id,
                    Name = t.Name
                }).ToList(),
                Name = e.Name,
                ParentId = e.ParentId
            });

            return query.ToList();
        }

        [HttpGet("categories/{parent?}"), HandleResult]
        public IEnumerable<EquipmentCategory> Categories(int? parent)
        {
            var query = _db.Set<EquipmentCategory>().AsQueryable();
            if (parent.HasValue)
            {
                query = query.Where(e => e.ParentId == parent);
            }

            return query.Select(e => new EquipmentCategory()
            {
                Id = e.Id,
                Name = e.Name,
                ParentId = e.ParentId
            }).ToArray();
        }

        [HttpDelete("categories/{id}"), HandleResult]
        public void DeleteCategory(int id)
        {
            var set = _db.Set<EquipmentCategory>();
            var domain = set.Find(id);
            if (domain != null)
            {
                set.Remove(domain);
            }
            _db.SaveChanges();
        }

        [HttpGet("categories/{category}/types"), HandleResult]
        public IEnumerable<EquipmentType> EquipmentTypes(int category)
        {
            return _db.Set<EquipmentType>().Where(e => e.CategoryId == category)
                .Select(e => new EquipmentType()
                {
                    CategoryId = e.CategoryId,
                    Description = e.Description,
                    Id = e.Id,
                    Name = e.Name
                })
                .ToArray();
        }

        [HttpGet("types/{id}"), HandleResult]
        public EquipmentType GetType(int id)
        {
            return _db.Set<EquipmentType>().Find(id);
        }

        [HttpPut("types"), HandleResult]
        public void SaveType([FromBody]EquipmentType model)
        {
            var set = _db.Set<EquipmentType>();
            var domain = set.Find(model.Id);
            if (domain == null)
            {
                domain = model;
                set.Add(domain);
            }
            else
            {
                set.Update(model);
            }
            _db.SaveChanges();
        }

        [HttpDelete("types/{id}"), HandleResult]
        public void DeleteType(int id)
        {
            var set = _db.Set<EquipmentType>();
            var domain = set.Find(id);
            if (domain != null)
            {
                set.Remove(domain);
                _db.SaveChanges();
            }
        }

        [HttpPut("categories"), HandleResult]
        public void SaveCategory([FromBody]EquipmentCategory model)
        {
            var set = _db.Set<EquipmentCategory>();
            var domain = set.Find(model.Id);
            if (domain == null)
            {
                domain = model;
                set.Add(domain);
            }
            else
            {
                domain.Name = model.Name;
                domain.ParentId = model.ParentId;
                set.Update(domain);
            }
            _db.SaveChanges();
        }

        //[HttpPost("{id}/location"), HandleResult]
        //public void SetLocation(int id, [FromBody]LocationInfo model)
        //{
        //    var domain = _db.Set<Equipment>().Find(id);

        //}

        [HttpPost, HandleResult]
        public void Add([FromBody]Equipment model)
        {
            var set = _db.Set<Equipment>();
            var count = set.Count(e => e.Code == model.Code);
            if (count > 0)
            {
                throw this.Exception("编号重复");
            }
            set.Add(model);
            _db.SaveChanges();
        }

        [HttpPut, HandleResult]
        public void Edit([FromBody]Equipment model)
        {
            var set = _db.Set<Equipment>();
            var count = set.Count(e => e.Code == model.Code && e.Id != model.Id);
            if (count > 0)
            {
                throw this.Exception("编号重复");
            }
            var domain = set.Find(model.Id);
            if (domain != null)
            {
                domain.CabinCode = model.CabinCode;
                domain.CabinName = model.CabinName;
                domain.TypeId = model.TypeId;
                domain.Code = model.Code;
                domain.Name = model.Name;
            }
            _db.SaveChanges();
        }

        [HttpGet("{id}"), HandleResult]
        public object GetById(int id)
        {
            return _db.Set<Equipment>().Where(e => e.Id == id).Select(e => new
            {
                CabinCode = e.CabinCode,
                CabinName = e.CabinName,
                Code = e.Code,
                Id = e.Id,
                Name = e.Name,
                Properties = e.Properties,
                TypeName = e.Type.Name,
                TypeId = e.TypeId
            }).FirstOrDefault();
        }

        [HttpDelete("{id}"), HandleResult]
        public void Delete(int id)
        {
            var domain = _db.Set<Equipment>().Find(id);
            if (domain != null)
            {
                _db.Set<Equipment>().Remove(domain);
                _db.SaveChanges();
            }
        }

        [HttpGet("types/{type}/equipments"), HandleResult]
        public IEnumerable<Equipment> ListByType(int type)
        {
            return _db.Set<Equipment>().Where(e => e.TypeId == type).ToArray();
        }

        [HttpPost("query"), HandleResult]
        public PagedResult<Equipment> List([FromBody]EquipmentQueryModel model, [FromQuery]int page, [FromQuery]int count)
        {
            var set = _db.Set<Equipment>().AsQueryable();
            if (model.TypeId.HasValue)
            {
                set = set.Where(e => e.TypeId == model.TypeId);
            }
            if (!string.IsNullOrEmpty(model.Search))
            {
                set = set.Where(e => e.Code.Contains(model.Search) || e.Name.Contains(model.Search));
            }

            var result = set.OrderBy(e => e.Id).Select(e => new Equipment()
            {
                Id = e.Id,
                CabinCode = e.CabinCode,
                CabinName = e.CabinName,
                TypeId = e.TypeId,
                Type = new EquipmentType() { Name = e.Type.Name },
                Code = e.Code,
                Name = e.Name
            });

            return new PagedResult<Equipment>(result, page, count);
        }

        //[HttpGet("query/type/{code}"), HandleResult]
        //public IEnumerable<Equipment> ListByType(int code)
        //{
        //    var set = _db.Set<Equipment>().AsQueryable();
        //    if (!string.IsNullOrEmpty(code))
        //    {
        //        set = set.Where(e => e.CategoryCode == code);
        //        return set.OrderBy(e => e.Name).Select(e => new Equipment()
        //        {
        //            Id = e.Id,
        //            CabinCode = e.CabinCode,
        //            CabinName = e.CabinName,
        //            CategoryCode = e.CategoryCode,
        //            CategoryName = e.CategoryName,
        //            Code = e.Code,
        //            Name = e.Name
        //        });
        //    }
        //    else
        //    {
        //        return new List<Equipment>();
        //    }
        //}
    }
}
