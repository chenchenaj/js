/**
需要传入的值： modalType【弹框类型】；title【弹窗标题】；showModal：【控制弹窗显示】
动态传：（btnType【弹框的按钮】；sureText【成功按钮文字】；cancelText【失败按钮文字】；@cancelModal @submit @cancel）
*/
<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <div class="mask" @click="cancelModal"></div>
      <div class="modal-dialog" :class="[modalType]">
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="cancelModal"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <!-- 传递成功 -->
          <a
            href="javascript:;"
            class="btn"
            v-if="btnType===1"
            @click="$emit('submit')"
          >{{sureText}}</a>
          <!-- 传递取消 -->
          <a
            href="javascript:;"
            class="btn"
            v-if="btnType===2"
            @click="$emit('cancel')"
          >{{cancelText}}</a>

          <!-- 传递成功取消 -->
          <div class="btn-group" v-if="btnType===3">
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default" @click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  data () {
    return {

    };
  },
  props: {
    // 弹框类型：小->small、中->middle、大->large、表单form
    modalType: {
      type: String,
      default: "form"
    },

    // 弹窗标题
    title: {
      type: String,
    },
    //弹框的按钮:1:确定按钮 2:取消按钮 3:确定取消都有
    btnType: {
      type: String,
    },

    // 成功按钮文字
    sureText: {
      type: String,
      default: "确定"
    },

    // 失败按钮文字
    cancelText: {
      type: String,
      default: "取消"
    },
    // 控制弹窗显示：
    showModal: Boolean
  },
  methods: {
    // 取消弹框
    cancelModal () {
      this.$emit('cancelModal')
    },
    // 确定
    submit () {
      this.$emit('submit')
    },
    // 取消
    cancel () {
      this.$emit('cancel')
    }
  },
}

</script>
<style lang='less' scoped>
.modal {
  .position(fixed);
  z-index: 99;
  .tf5;

  &.slide-enter-active {
    top: 0;
  }

  &.slide-leave-active {
    top: -100%;
  }

  &.slide-enter {
    top: -100%;
  }

  .mask {
    .position(fixed);
    background-color: #000000;
    opacity: 0.5;
  }

  .modal-dialog {
    .position(absolute, 40%, 50%, 660px, auto);
    background-color: #ffffff;
    .posc;

    .modal-header {
      height: 60px;
      background-color: #f5f5f5;
      padding: 0 25px;
      line-height: 60px;
      font-size: 16px;

      .icon-close {
        .posImg(absolute, 23px, 25px, 14px, 14px, '/imgs/icon-close.png');

        &:hover {
          transform: scale(1.5);
        }
      }
    }

    .modal-body {
      padding: 42px 40px 54px;
      font-size: 14px;
    }
    .modal-footer {
      height: 82px;
      line-height: 82px;
      text-align: center;
      background-color: #f5f5f5;
    }
  }
}
</style>