<template>
  <div class="registerLogin">
    <form>
      <div class="face-wapper">
        <img src="icon/default-face.png" class="face" />
      </div>

      <div class="info-wapper">
        <label class="words-lbl">账号</label>
        <input
          name="username"
          type="text"
          value
          class="input"
          placeholder="请输入用户名"
          placeholder-class="graywords"
        />
      </div>

      <div class="info-wapper" style="margin-top: 40rpx;">
        <label class="words-lbl">密码</label>
        <input
          name="password"
          type="text"
          value
          password="true"
          class="input"
          placeholder="请输入密码"
          placeholder-class="graywords"
        />
      </div>

      <button type="primary" form-type="submit" style="margin-top: 60rpx;width: 90%;">注册/登录</button>
    </form>

    <div class="third-wapper">
      <div class="third-line">
        <div class="single-line">
          <div class="line"></div>
        </div>

        <div class="third-words">第三方账号登录</div>

        <div class="single-line">
          <div class="line"></div>
        </div>
      </div>

      <div class="third-icos-wapper">
        <img src="icon/weixin.png" data-logintype="weixin" class="third-ico" />
        <img src="icon/QQ.png" data-logintype="qq" class="third-ico" style="margin-left: 80upx;" />
        <img
          src="icon/weibo.png"
          data-logintype="sinaweibo"
          class="third-ico"
          style="margin-left: 80upx;"
        />
        <button open-type="getUserInfo" class="third-btn-ico"></button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.registerLogin {
  border-top: solid 1px #dbdbda;
  padding: 0 40rpx;

  /* 头像 start */
  .face-wapper {
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin-top: 120rpx;
    margin-bottom: 120rpx;

    .face {
      width: 160rpx;
      height: 160rpx;
    }
    /* 头像 end */
  }

  /* 注册登录 start */
  .info-wapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-bottom: solid 1px #dbdbda;
    padding-bottom: 20rpx;

    .words-lbl {
      color: #808080;
      line-height: 26px;
    }

    .input {
      width: 500rpx;
      margin-left: 40rpx;
    }

    .graywords {
      color: #eaeaea;
    }
  }
  /* 注册登录 end */

  /* 第三方登录 start */
  .third-wapper {
    width: 100%;
    margin-top: 60rpx;

    .third-line {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    .third-words {
      color: #a9a9a9;
      font-size: 13px;

      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .single-line {
      padding: 15rpx 20rpx;
      width: 25%;
      align-items: center;
      .line {
        height: 1px;
        background-color: #ccc;
      }
    }

    .third-icos-wapper {
      margin-top: 30rpx;

      display: flex;
      flex-direction: row;
      justify-content: center;

      .third-ico {
        width: 60rpx;
        height: 60rpx;
      }

      .third-btn-ico {
        background: url(http://122.152.205.72:88/group1/M00/00/05/CpoxxFxFO-yAOjTaAAATCIZEzRU503.png);
        width: 60rpx;
        height: 60rpx;
        background-color: white;
        background-size: 60rpx 60rpx;
        background-repeat: no-repeat;
        border: none;
        padding: 0;
      }
      button::after {
        border: none;
      }
    }
  }
  /* 第三方登录 end */
}
</style>
