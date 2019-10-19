<template>
    <div class="rolePage">
        <div style="display:flex;justify-content: space-between;">
            <div class="toolBar" style="padding-top:10px;padding-left:15px;">
                <el-form :inline="true" :model="filters" size="mini" >
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" >查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" >刷新</el-button>
                </el-form-item>
                </el-form>
            </div>
            <div class="toolbar" style="padding-top:10px;padding-right:15px;">
                <el-button class="addbtn" size="mini" type="primary" @click="dialogFormVisible = true">+新增</el-button>
            </div>
        </div>
        <div class="table">
            <el-table border :data="roletable" style="width: 100%"  max-height="450">
                <el-table-column  type="selection"  width="60">
                </el-table-column>
                <el-table-column prop="id" label="编号" width="60">
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称" >
                </el-table-column>
                <el-table-column prop="desc" label="角色说明" >
                </el-table-column>
                <el-table-column prop="creatTime" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" width="245" fixed="right"  header-align="center" align="center">
                    <el-button size="small" >编辑</el-button>
                    <el-button size="small" type="danger" >删除</el-button>
                    <el-button size="small" @click="dialogSetRole = true">权限设置</el-button>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="角色名称" >
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色说明" >
                    <el-input v-model="form.desc" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="权限设置" :visible.sync="dialogSetRole" class="setRole">
            <el-tree
                :data="roles"
                show-checkbox
                ref="roleTree">
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSetRole = false">取 消</el-button>
                <el-button type="primary" @click="dialogSetRole = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            filters:{
                name:''
            },
            form:{},
            roletable:[{
                id:1,
                roleName:'超级管理员',
                desc:'初始化人物角色',
                creatTime:'2019-10-18 10:23:33'
            }],
            dialogFormVisible: false,
            dialogSetRole:false,
            roles: [{
                id: 1,
                label: '首页',
                }, {
                id: 2,
                label: '提案建议',
                children: [{
                    id: 5,
                    label: '提案建议统计'
                }, {
                    id: 6,
                    label: '新建提案建议'
                },{
                    id: 7,
                    label: '全部工作'
                },
                {
                    id: 8,
                    label: '提案办理日志'
                },
                {
                    id: 9,
                    label: '警示牌日期设置'
                },
                {
                    id: 10,
                    label: '预警'
                },
                {
                    id: 11,
                    label: '黄牌'
                },
                {
                    id: 12,
                    label: '红牌'
                }]
                }, {
                id: 3,
                label: '系统管理',
                children: [{
                    id: 13,
                    label: '部门管理'
                }, {
                    id: 14,
                    label: '用户管理'
                },{
                    id: 15,
                    label: '角色管理'
                },
                {
                    id: 16,
                    label: '政协提案录入开关'
                }]
            }],
        }
    },
}
</script>
<style lang="scss" >
.rolePage{
    padding: 30px;


    .setRole{
        .el-dialog{
            width: 345px ;
        }
    }
}
</style>