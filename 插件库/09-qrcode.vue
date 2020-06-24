<template>
<div class="qrcode">
    <!-- 二维码 -->
    <canvas id="qrcode-stage"></canvas>
</div>
</template>
<script>
export default{
    methods:{
        getInfo(){
            // 请求完成数据获取到订单号后
            // toCanvas(canvasElement, text, [options], [cb(error)])
            const canvas = document.querySelector("#qrcode-stage");
            QRCode.toCanvas(canvas, 需要转化的URL, {
                width: 200
            })
        }
    }
}
</script>