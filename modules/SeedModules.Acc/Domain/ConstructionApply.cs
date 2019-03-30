using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.Acc.Domain
{
    /// <summary>
    /// 入廊申请
    /// </summary>
    [Table("Acc_ConstructionApply")]
    public class ConstructionApply
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string ApplyCode { get; set; }

        [MaxLength(50)]
        public string CompanyId { get; set; }

        [Description("项目名称"), MaxLength(50)]
        public string ProjectName { get; set; }

        [Description("合同编码"), MaxLength(50)]
        public string ContractCode { get; set; }

        [Description("单位名称"), MaxLength(50)]
        public string CompanyName { get; set; }

        [Description("单位地址"), MaxLength(50)]
        public string CompanyAddress { get; set; }

        [Description("单位电话"), MaxLength(50)]
        public string CompanyTel { get; set; }

        [Description("单位联系人"), MaxLength(50)]
        public string CompanyContact { get; set; }

        [Description("联系人电话"), MaxLength(50)]
        public string ContactTel { get; set; }

        [Description("施工单位"), MaxLength(50)]
        public string ConstructionCompany { get; set; }

        [Description("施工主管"), MaxLength(50)]
        public string ConstructionChief { get; set; }

        [Description("主管电话"), MaxLength(50)]
        public string ChiefTel { get; set; }

        [Description("作业项目"), MaxLength(50)]
        public string JobItems { get; set; }

        [Description("作业目的"), MaxLength(50)]
        public string JobPurpose { get; set; }

        [Description("申请作业起始日期")]
        public DateTime WorkingBeginDate { get; set; }

        [Description("申请作业结束日期")]
        public DateTime WorkingEndDate { get; set; }

        [Description("是否动电")]
        public bool HasElectricity { get; set; }

        [Description("是否动火")]
        public bool HasFire { get; set; }

        [Description("申请审批状态")]
        public int ApplyState { get; set; }

        [Description("申请审批人"), MaxLength(50)]
        public string Approver { get; set; }

        [Description("申请审批时间")]
        public DateTime ApplyTime { get; set; }

        [Description("准予作业起始日期")]
        public DateTime GrantBeginDate { get; set; }

        [Description("准予作业结束日期")]
        public DateTime GrantEndDate { get; set; }

        [Description("详细作业位置描述")]
        public string GrantWorkArea { get; set; }

        [Description("竣工审批状态")]
        public int OverState { get; set; }

        [Description("竣工审批人"), MaxLength(50)]
        public string OverApprover { get; set; }

        [Description("竣工审批时间")]
        public DateTime OverApprovalTime { get; set; }

        [Description("备注")]
        public string Remark { get; set; }

        [Description("流程实例ID")]
        public int ProcessInstanceId { get; set; }

        [Description("创建人")]
        public int CreatorId { get; set; }

        [Description("创建时间")]
        public DateTime CreateTime { get; set; }

        public int UpdaterId { get; set; }

        public DateTime UpdateTime { get; set; }

        [Description("项目描述")]
        public string ProjectDescription { get; set; }

        [Description("建议入口"), MaxLength(50)]
        public string DoorIn { get; set; }

        [Description("建议出口"), MaxLength(50)]
        public string DoorOut { get; set; }
    }

    public class ConstructionApplyTypeConfiguration : IEntityTypeConfiguration<ConstructionApply>
    {
        public void Configure(EntityTypeBuilder<ConstructionApply> builder)
        {

        }
    }
}