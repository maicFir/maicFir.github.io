<template>
  <div class="footer-container">
    <p>MIT Licensed | Copyright © 2022-present Maic</p>
    <p>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
        >赣ICP备2022006850号</a
      >
    </p>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
export default defineComponent({
  name: "Footer",
  setup(props, ctx) {
    onMounted(() => {});
    onUnmounted(() => {});
    return {};
  },
});
</script>
<style lang="scss">
.footer-container {
  p {
    padding: 0;
    margin: 0;
  }
  text-align: center;
}
</style>
