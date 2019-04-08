using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SeedModules.AssetsManage.Domain
{
    [Table("Ass_AssetBook"), Description("合同信息")]
    public class AssetBook
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50), Required]
        public string AssetCode { get; set; }

        [MaxLength(50), Description("别名")]
        public string Alias { get; set; }


        //登记项目编码

        //PRJ_CODE

        //品牌名称

        //BRAND

        //生产厂商

        //VENDOR

        //供货商

        //SUPPLIER

        //型号规格

        //MODEL

        //数量

        //AMOUNT

        //增加方式

        //SOURCE

        //运营部门

        //DEPT_OPER

        //权属单位

        //DEPT_OWNER

        //管廊ID

        //PG_ID

        //舱室ID

        //CABIN_ID

        //分区ID

        //REGION_ID

        //库房ID

        //STORE_ID

        //安装位置

        //POSITION

        //详细位置描述

        //POSITION_DETAIL

        //运维部门

        //OPERATION_DEPT

        //维修部门

        //MAINTAIN_DEPT

        //使用状态

        //INUSE_STATUS

        //投用日期

        //INUSE_DATE

        //使用年限

        //INUSE_YEARS

        //维护周期（月）

        //MAINTENANCE

        //更改期限（月）

        //DEADLINE

        //质保期限（月）

        //WARRANTY

        //质保开始日期

        //WARRANTY_BEGIN_DATE

        //合同编码

        //AGR_CODE

        //资产单价

        //PRICE

        //币种

        //CURRENCY

        //币种单位

        //CURRENCY_UNIT

        //安装费用

        //INSTALLATION_FEE

        //分摊费用

        //SHARING_FEE

        //折旧方法

        //DEPRECIATION_METHOD

        //残值率

        //RESIDUAL_RATE

        //折旧开始日期

        //DEPRECIATION_DATE

        //折旧期数

        //DEPRECIATION_NUM

        //已提折旧

        //DEPRECIATION

        //资产原值

        //INITIAL_VALUE

        //资产净值

        //NET_VALUE

        //移交状态

        //HANDOVER_STATUS

        //移交日期

        //HANDOVER_DATE

        //转固状态

        //SOLID_STATUS

        //转固日期

        //SOLID_DATE

        //报废日期

        //RETIREMENT_DATE

        //运行时长(小时)

        //RUNNING_TIME

        //使用率（%）

        //USAGE_RATE

        //备注

        //REMARK

        //创建人

        //CREATOR

        //创建时间

        //CREATE_TIME


    }

    public class AssetBookTypeConfiguration : IEntityTypeConfiguration<AssetBook>
    {
        public void Configure(EntityTypeBuilder<AssetBook> builder)
        {

        }
    }
}
