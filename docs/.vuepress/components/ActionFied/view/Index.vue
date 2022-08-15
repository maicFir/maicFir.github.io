<template>
  <div class="global-action-fixed">
    <transition name="el-zoom-in-center">
      <div
        :class="{ 'fixed-container': true, 'fixed-container-close': !onOff }"
      >
        <div
          :class="{ 'fold-button': true, 'close-fold-btn': !onOff }"
          @click="handleFoldBtn"
        >
          <span class="right" v-if="onOff"></span>
          <span class="left" v-else></span>
        </div>
        <template v-if="fixContainerShow">
          <div v-for="item in pcslides" :key="item.title">
            <div class="tile">{{ item.title }}</div>
            <div class="desc">{{ item.desc }}</div>
            <img
              class="medium-zoom lazy medium-zoom-image"
              :src="item.imgUrl"
              alt
            />
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  getCurrentInstance,
} from "vue";
import { globalActionConfig } from "@public/js/actionfixed";

export default defineComponent({
  name: "ActionFied",
  setup(props, ctx) {
    const instance = getCurrentInstance();
    const dataObj = reactive({
      onOff: true, // 默认开关,开启
      fixContainerShow: true, // 默认显示
      pcslides: globalActionConfig.pcslides,
    });
    // 获取全局的实例$sakura
    const sakura = instance.appContext.config.globalProperties.$sakura;
    const handleFoldBtn = () => {
      if (dataObj.onOff) {
        dataObj.onOff = false;
        // 关闭雪花背景
        sakura.stop();
      } else {
        // 打开雪花背景
        sakura.start();
        dataObj.onOff = true;
      }
      dataObj.fixContainerShow = dataObj.onOff;
    };
    const isHome = computed(() => {
      const { pathname } = window.location;
      //return pathname !== "/";
      return true;
    });

    return {
      ...toRefs(dataObj),
      handleFoldBtn,
      isHome,
    };
  },
});
</script>
<style lang="scss">
.fold-button {
  transition: all 0.5s ease;
  span {
    display: block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    background: transparent;
    border: 4px solid #e5e5e5;
    border-top: none;
    border-left: none;
    transform: rotate(-45deg) scale(0.8) skewY(-8deg);
  }
}

.fixed-container {
  display: none;
}

@media (min-width: 960px) {
  .fixed-container {
    background: #fff;
    display: block;
    position: fixed;
    z-index: 0;
    right: 30px;
    top: 45%;
    transform: translateY(-50%);
    min-width: 200px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0px 0 2px 0.5px #c9d6d0;
    color: #42b983;
    padding: 10px 10px;
    font-size: 13px;
    .fold-button {
      display: block;
      position: fixed;
      top: 50%;

      right: -20px;
      cursor: pointer;
      span.right {
        transform: translateY(-50%) rotate(-45deg);
      }
    }
    .close-fold-btn {
      span.left {
        transform: rotate(135deg);
      }
    }
    h4 {
      font-size: 15px;
      color: #42b983;
      margin-bottom: 8px;
    }

    p {
      font-size: 12px;
      margin: 0;
    }

    img {
      cursor: pointer;
      width: 90px;
    }
  }
  .fixed-container-close {
    box-shadow: none;
    padding: 0;
  }
}
</style>
