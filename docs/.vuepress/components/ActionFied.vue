<template>
  <div class="global-action-fixed">
    <div :class="['fold-button', onOff === true ? 'fold-button' : 'close-fold-btn']" @click="handleFoldBtn(onOff)">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <transition name="el-zoom-in-center">
      <div class="fixed-container" v-show="fixContainerShow">
        <div v-for="item in pcslides" :key="item.title">
          <div class="tile">{{ item.title }}</div>
          <div class="desc">{{ item.desc }}</div>
          <img class="medium-zoom lazy" loading="lazy" :src="item.imgUrl" alt />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { rightBar } from '../public/js/actionfixed';

export default {
  name: 'ActionFied',
  data() {
    return {
      onOff: true, // 默认开关,开启
      fixContainerShow: true, // 默认显示
      pcslides: rightBar.pcslides
    };
  },
  methods: {
    handleFoldBtn(onOff) {
      if (onOff) {
        this.fixContainerShow = false;
        this.onOff = false;
      } else {
        this.fixContainerShow = true;
        this.onOff = true;
      }
    }
  }
};
</script>
<style lang="scss">
.close-fold-btn {
  transform: rotate(90deg);
  transition: all 0.5s ease;
}

.fold-button {
  display: none;
  background: #42b983;
  transition: all 0.5s ease;

  span {
    display: block;
    cursor: pointer;
    width: 1.25rem;
    height: 1px;
    margin-top: 4px;
    background: #fff;
  }
}

@media (min-width: 960px) {
  .fold-button {
    display: block;
    position: fixed;
    top: 73px;
    right: 100px;
    cursor: pointer;
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
      right: 18px;
      top: 90px;
      width: 200px;
      text-align: center;
      background-color: #fff;
      box-shadow: -1px 0 2px 0.5px #42b983;
      color: #42b983;
      padding: 10px 0;
      font-size:13px;

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
}
</style>
