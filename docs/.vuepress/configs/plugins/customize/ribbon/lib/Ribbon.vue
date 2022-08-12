<template>
  <canvas id="vuepress-canvas-ribbon"></canvas>
</template>

<script>
import { Ribbon } from "@moefy-canvas/theme-ribbon";
export default {
  name: "Ribbon",
  data() {
    return {
      ribbon: new Ribbon(
        {
          size: 90,
        },
        {
          opacity: 0.3,
          zIndex: -1,
        }
      ),
    };
  },
  mounted() {
    this.ribbon.mount(this.$el);
  },
  beforeDestroy() {
    this.ribbon.unmount();
  },
};
</script>
