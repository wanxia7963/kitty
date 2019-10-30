<template>
    <div>
        <script :id=id type="text/plain"></script>
    </div>
</template>
<script>

export default {
    name:'UE',
    data() {
        return {
            editor:null
        }
    },
    props:{
        config:{
            type:Object
        },
        id:{
            type:String
        },
        content:{
            type:String
        }
    },
    mounted() {
        this._initEditor()
    },methods:{
        _initEditor(){
            this.editor = window.UE.getEditor(this.id,this.config)
        },
         getUEContent () { // 获取含标签内容方法
            return this.editor.getContent()
        }
        ,setContent (content){
            this.execCommand()
            console.log(content)
            this.editor.setContent(content,true)
        },
        execCommand(){
            this.editor.execCommand('cleardoc');
        }
    },
     destroyed () {
        this.editor.destroy()
    }

}
</script>
<style lang="scss" >

</style>
