<template>
    <div class="cal-wrap">
        <div class="cal-top">
                <div class="cal-YM">
                    <div class="YM-text">
                        <div title='上一月' class="cal-left hand fl" @click="getPrevMonth"></div>
                        {{calendar.year}}年 / {{calendar.month}}月<span @click="backToday" class='hand' title="返回今天" v-if='showToday'>今</span>
                        <div title='下一月' class="cal-right hand fr"  @click="getNextMonth"></div>
                    </div>
                </div>
                <div class="cal-week-wrap">
                    <div class="cal-week" v-for="(item,index) in calendar.weeks" :key="index">{{item}}</div>    
                </div>
        </div>

        <table class="cal-table calWidth">
            <tr v-for="(item,itemIndex) in calendar.dayList" :key='itemIndex'>
                <td v-for="(key) in item" :key='key.date' :class="{'bg-grey':key.disable}">
                    <div class="cal-item" :class="{'cal-active':calendar.isDay == key.date}">
                        <span>{{key.day}}</span>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default{
    mounted(){
        this.backToday();
    },
    data(){
        return {
            calLoading:false,
            calendar:{//日历
                dayList:[],//二维数组，循环行，循环列
                prev:[],
                current:[],
                next:[],
                year:'',
                month:'',
                weeks:['日','一','二','三','四','五','六'],
                isDay:''//判断是否是'今天'
            }
        }
    },
    props:{
        showToday:{
            type:Boolean,
            default:false//是否显示返回今天按钮
        }
    },
    methods:{
        initDate(val){
            if(val < 10){
                return '0'+val;
            }else{
                return val;
            }
        },
        getLastDate(year,month){
            return new Date(year,month,0);
        },
        getmonthDays(){//获取上月 当前月和下月天数
            let that=this;
            let y=that.calendar.year;
            let m=that.calendar.month;
            let preYear;//上一年
            let preMonth;//上一月
            let nextYear;//下一年
            let nextMonth;//下一月
            that.calendar.current=[];
            that.calendar.prev=[];
            that.calendar.next=[];

            // 当前月天数
            for(let i=1; i<=that.getLastDate(y,m).getDate(); i++){
                //date用于日期判断，day用于显示，flag用于状态判断
                that.calendar.current.push({date:y+'-'+m+'-'+that.initDate(i),day:i,timeList:[],disable:true});
            }

            /*上月*/
            let d=that.getLastDate(y,m - 1).getDate();//上月一共多少天
            preYear= m == 1 ?  y-1 : y;//当前月是1月，那么上一月的年份要-1
            preMonth= m == 1 ?  12 : that.initDate(parseInt(m)-1);//当前月是1月，那么上一月是12月
            for(let j=(that.getLastDate(y,m - 1).getDay()); j >= 0; j--){
                that.calendar.prev.push({date:preYear+'-'+preMonth+'-'+(d-j),day:d-j,timeList:[],disable:true});
            }

            /*下月*/
            nextYear= m == 12 ?  y+1 : y;//当前月是12月，那么下一月的年份要+1
            nextMonth= m == 12 ? '01' : that.initDate(parseInt(m)+1);//当前月是12月，那么下一月是1月
            for(let k=1; k <= 35- that.calendar.current.length - that.calendar.prev.length; k++){
                that.calendar.next.push({date:nextYear+'-'+nextMonth+'-'+that.initDate(k),day:k,timeList:[],disable:true});
            }
            that.calendar.dayList=[];

            // 数组合并
            let tempArr=that.calendar.prev.concat(that.calendar.current,that.calendar.next);
            // 数组分组，每7个一组
            for(let i = 0;i < tempArr.length; i+=7){
                that.calendar.dayList.push(tempArr.slice(i, i+7));
            }
        },
        getPrevMonth(){//上一月
            if(this.calendar.month != 1){
                this.calendar.month = this.initDate(--this.calendar.month);
            }else{
                this.calendar.month = 12;
                this.calendar.year = --this.calendar.year;
            }   
            this.getmonthDays();
            this.currentDay();
            this.$emit('on-click',0);
        },
        getNextMonth(){//下一月
            if(this.calendar.month < 12){
                this.calendar.month = this.initDate(++this.calendar.month);
            }else{
                this.calendar.month = '01';
                this.calendar.year = ++this.calendar.year;
            } 
            this.getmonthDays();
            this.currentDay();
            this.$emit('on-click',1);
        },
        currentDay(){//获取今天,高亮显示今天
            let that=this;
            let date=new Date();
            let y=that.calendar.year;
            let m =that.calendar.month;

            if(y === date.getFullYear() && m == date.getMonth()+1){//如果是当年当月
                that.calendar.isDay = y+'-'+m+'-'+that.initDate(date.getDate());//获取到今天的号数
            }else{
                that.calendar.isDay=-1;
            }
        },
        backToday(){//返回今天
            let that=this;
            let d=new Date();
            that.calendar.year=d.getFullYear();
            that.calendar.month=that.initDate(d.getMonth()+1);
            that.currentDay();
            that.getmonthDays();
        }
    }
}
</script>
<style>
.ivu-affix{background: #fff;}
.fl{float: left;}
.fr{float: right;}
.hand{cursor: pointer;}
.cal-wrap{height: 250px;}
.cal-wrap,.perconsult .cert-title + p{font-family:'SimSun';}
.cal-YM{text-align:center;font-size:28px;line-height:35px; width: 260px; margin:0 auto;}
.cal-body{ border-right:1px solid #eee; border-left:1px solid #eee;}
.cal-week{width:14.28%;text-align:center;line-height:40px; font-size: 16px; float: left;}
.YM-text{ font-size: 18px;}
.YM-text span{display:inline-block;margin:-10px 0 0 10px;width:26px;height:26px;border-radius:3px;background:#f17437;line-height:26px;color:#fff; font-size: 14px;}
.cal-left,.cal-right{font-size: 22px; width: 20px; text-align: center;}
.cal-left:hover > i,.cal-right:hover > i{color:#3583f7};
.cal-table{width: 100% !important; border: 1px solid #eee; text-align: center; border-collapse: collapse;}
.calWidth{width: 100%}
.cal-table td{ cursor: pointer; vertical-align: top;}
.cal-table td:hover{background: #f5f5ed;}
.cal-item{min-height: 30;height: 30px;line-height: 30px}
.cal-item > span{display:block;width: 30px; height: 30px;border-radius: 50%; margin:0 auto; font-size: 16px;font-weight: 600;letter-spacing: 1px;}
.cal-active > span{ color:#fff!important; background: #3583f7;}
.cal-time-list{font-size: 12px; text-align: left;}
.cal-time-list > p{ width:100px;margin:0 auto; padding-left: 8px; height: 18px; line-height:18px;}
.cal-time-list > p >span{display:block; overflow: hidden;}
</style>