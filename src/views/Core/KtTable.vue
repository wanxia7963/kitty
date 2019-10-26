<template>
    <div>
        <el-table
            :data="data.content" :highlight-current-row="highlightCurrentRow" :border='border' :height="height" :max-height="maxHeight"
            :size="size" :align="align" style="width: 100%">
            <el-table-column v-for="column in columns" :key="column.prop" header-align="center" align="center" :min-width="column.minWidth"
                :prop="column.prop"
                :label="column.label"
                :width="column.width">
            </el-table-column>
            <el-table-column label="操作"  fixed="right" v-if="showOperation" header-align="center" align="center">
                <el-button icon="fa fa-edit" label="编辑"  :size="size" />
                <el-button icon="fa fa-trash" label="删除" :size="size" type="danger"  />
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props:{
        columns:Array,//表格列配置
        data:Object,//表格数据
        size:{//尺寸
            type:String,
            default:'mini'
        },
        align:{//对齐方式
            type:String,
            default:'left'
        },
        maxHeight:{//最大高度
            type:Number,
            default:420
        },
        height:{//高度
            type:Number,
            default:250
        },
        showOperation:{//是否显示操作栏
            type:Boolean,
            default:true
        },
        border:{//边框
            type:Boolean,
            default:true
        },
        highlightCurrentRow: {  // // 是否高亮当前行
            type: Boolean,
            default: true
        },
        showOverflowTooltip: {  // 是否单行显示
            type: Boolean,
            default: true
        }
    }
    
}
</script>
<style lang="scss" scoped>

</style>