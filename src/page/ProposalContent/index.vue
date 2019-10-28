<template>
    <div class="prCoPage">
      <div class="prcoTable">
        <div class="prTitle">
          <div class="top">
            <div>提案标题：<span style="color: #a8a8a9">提案标题内容</span></div>
            <div>提案分类：<span style="color: #a8a8a9">民主法制，社会治理，民生保障</span></div>
          </div>
          <div>提案人：<span style="color: #a8a8a9">张三</span></div>
        </div>
        <div class="prContent">
         <div> 提案内容：</div>
          <div style="line-height: 32px;font-size: 14px;color: #a8a8a9">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长大了，会觉得自己越来越累，有时累的不是我们的身体，而是那颗承受外界的各种压力的心，有的是对事业的追求，有的是对
            爱情的悔恨，有的是对亲情的误解，在形形色色的生活里，你痛了。受伤了。所以你就爱逃避，逃避眼前的困难，逃避曾经伤害过你的他，逃避那段令人不堪回首的往事，经历的多了，就看得很淡
            很淡，最终你笑着让自己学会平淡，当自己内心的脆弱承受不住的时候，你就失去了真的自我，你就会怀念，那过去的岁月，那过去曾经陪伴过你的人，回忆也只能是你逃避的一种方式，因为有些
            是注定是回不去的遗憾.<br/>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现实就是那么的残酷，他不会因为你的特殊而怜悯你，往事也只能是过去，过去的东西是找不会来的，失去了就要学会淡忘，
            失去了才会懂得以后的珍惜，失去的才会让你怀念，生活中没有真正的错对之分，有些事是我们不能左右的，命运就是很奇怪，谁也不知道下一个捉弄的会是谁。所以无所谓伤害不伤害，无所谓自
            责和悔恨，既然今生有缘相遇，那就是上天给我们最好的礼物，所以一颗平常心去感悟生活吧，当拥有时好好珍惜，失去时也不要抱怨，因为有些事已开始就注定没结局，一开始举注定回不去<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回不去，小时候曾经的童真，回不去，上学时那开心的笑脸，回不去，恋爱时幸福的瞬间，回不去，曾经那扯不断的亲情，回不
            去，与你的相遇，回不去，漫步的惬意，回不去，那曾经的执着，回不去，那曾经傻傻的自己，回不去，第一次为他流泪的伤心。回不去，那曾经的甜言蜜语，回不去，那一瞬莫名的的感动，回不
            去，回不去，已经回不去了……<br/>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
.prCoPage{
  padding:20px 30px;
  .prcoTable{
    border-radius: 10px;
    background: #ffffff;
    padding: 10px;
    .prTitle{
      border: 1px solid #ccc;
      display: flex;
      flex-direction: column;
      text-align: left;
      padding: 15px 10px;
      .top{
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
      }
    }
    .prContent{
      text-align: left;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 15px 10px;
    }
  }
}
</style>
