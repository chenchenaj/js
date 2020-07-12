/** 可参考：mimall的登录页面
  使用：<ver-code ref="vercode"></ver-code>
  获取验证码的值：this.$refs['vercode'].show_num.join('')
  重置验证码：this.$refs.vercode.Refresh();
 */
<template >
  <canvas class="canvas" ref="cav" @click="Refresh"></canvas>
</template>
<script>
export default {
  name: "ver_code",
  data () {
    return {
      show_num: []
    };
  },
  mounted () {
    this.draw();
  },
  methods: {
    draw () {
      var Canvas_DOM = this.$refs.cav;
      var cav_width = Canvas_DOM.clientWidth;
      var cav_height = Canvas_DOM.clientHeight;
      var context = Canvas_DOM.getContext("2d");
      Canvas_DOM.width = cav_width;
      Canvas_DOM.height = cav_height;
      var sCode =
        // "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        "a,b,c,e,f,g,h,j,k,l,m,n,p,q,r,s,t,w,x,y,z,1,2,3,4,5,6,7,8,9,0";
      var aCode = sCode.split(",");
      var aLength = aCode.length; //获取到数组的长度

      for (var i = 0; i <= 3; i++) {
        var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
        var deg = (Math.random() * 30 * Math.PI) / 180; //产生0~30之间的随机弧度
        var txt = aCode[j]; //得到随机的一个内容
        this.show_num[i] = txt.toLowerCase();
        var x = 10 + i * 20; //文字在canvas上的x坐标
        var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = this._randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
      }
      for (var i = 0; i <= 5; i++) {
        //验证码上显示随机线条
        context.strokeStyle = this._randomColor();
        context.beginPath();
        context.moveTo(
          Math.random() * Canvas_DOM.width,
          Math.random() * Canvas_DOM.height
        );
        context.lineTo(
          Math.random() * Canvas_DOM.width,
          Math.random() * Canvas_DOM.height
        );
        context.stroke();
      }
      for (var i = 0; i <= 30; i++) {
        //验证码上显示随机小点
        context.strokeStyle = this._randomColor();
        context.beginPath();
        var x = Math.random() * Canvas_DOM.width;
        var y = Math.random() * Canvas_DOM.height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
      }
    },
    _randomColor () {
      //得到随机的颜色值
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    Refresh () {
      this.draw();
      this.$emit("refresh_yzm", this.show_num);
    }
  }
};
</script>
<style lang="less" scoped>
.canvas {
  width: 100px;
  height: 40px;
  display: inline-block;
  margin-left: 12px;
  cursor: pointer;
}
</style>