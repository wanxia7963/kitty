<template>
    <div :id="randomId" style="width: 100%;height:300px;">
    </div>
</template>
<script>
import echart from 'echarts'
export default {
    name:'echarts',
    props:{
        randomId:{
            type:String
        },
        xAxisData:{
            type:Array
        },
        series:{
            type:Array
        },
        title:{
            type:String
        },
        legend:{
            type:Object
        },
    },
    data() {
        return {
            
        }
    },
    methods:{
        drawLine(){
            let myChart = this.$echarts.init(document.getElementById(this.randomId))
            myChart.setOption({
                title:{
                    text: this.title
                },
                tooltip:{},
                legend: this.legend,
                xAxis:{
                     axisTick: {
                        show: false
                    },
                    data: this.xAxisData
                },
                yAxis: {
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        formatter: function(){
                                return "";
                        }
                    },
                    splitLine:{ 
                      show:false 
                    },      
                },
                series: this.series
            })
        }
    },
    mounted(){
        this.drawLine()
    }
}
</script>

<style lang="scss" scoped>

</style>