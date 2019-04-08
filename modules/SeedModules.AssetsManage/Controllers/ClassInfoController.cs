using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Seed.Data;
using Seed.Mvc.Filters;
using SeedModules.AssetsManage.Domain;

namespace SeedModules.AssetsManage.Controllers
{
    [Route("api/ass/classinfo"), EnableCors("acc_cors")]
    public class ClassInfoController : Controller
    {
        readonly IDbContext _context;

        public ClassInfoController(IDbContext context)
        {
            _context = context;
        }

        [HttpGet("{parent?}"), HandleResult]
        public IEnumerable<ClassInfo> Categories(int? parent)
        {
            var query = _context.Set<ClassInfo>().AsQueryable();
            if (parent.HasValue)
            {
                query = query.Where(e => e.ParentId == parent);
            }

            return query.Select(e => new ClassInfo
            {
                Id = e.Id,
                Name = e.Name,
                Alias = e.Alias,
                CreateTime = e.CreateTime,
                CreatorId = e.CreatorId,
                Remark = e.Remark,
                UnitType = e.UnitType,
                UpdaterId = e.UpdaterId,
                UpdateTime = e.UpdateTime,
                ParentId = e.ParentId
            }).ToArray();
        }

        [HttpPost, HandleResult]
        public void Add([FromBody]ClassInfo model)
        {
            var set = _context.Set<ClassInfo>();
            model.CreateTime = DateTime.Now;
            model.UpdateTime = DateTime.Now;
            set.Add(model);
            _context.SaveChanges();
        }

        [HttpPut, HandleResult]
        public void Update([FromBody]ClassInfo model)
        {
            var set = _context.Set<ClassInfo>();
            var domain = set.Find(model.Id);
            domain.Alias = model.Alias;
            domain.Name = model.Name;
            domain.ParentId = model.ParentId;
            domain.Remark = domain.Remark;
            domain.UnitType = domain.UnitType;
            domain.UpdateTime = DateTime.Now;
            _context.SaveChanges();
        }

        [HttpDelete("{id}"), HandleResult]
        public void Delete(int id)
        {
            var set = _context.Set<ClassInfo>();
            var domain = set.Find(id);
            set.Remove(domain);
            _context.SaveChanges();
        }
    }
}
