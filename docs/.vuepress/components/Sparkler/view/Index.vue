<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { Popper, PopperShape, MAX_Z_INDEX } from "@moefy-canvas/theme-popper";
const weakMap = new WeakMap();

export default defineComponent({
  name: "Spakler",
  setup(props, ctx) {
    const themeConfig = {
      shape: PopperShape.Star,
      size: 1.75,
      numParticles: 10,
    };
    const canvasOptions = {
      opacity: 1,
      zIndex: MAX_Z_INDEX,
    };
    const canvansEl = ref(null);
    const sparkler = new Popper(themeConfig, canvasOptions);
    const installSpakler = () => {
      const curentCanvansDom = document.getElementById("canvas");
      canvansEl.value = curentCanvansDom;
      weakMap.set(curentCanvansDom, curentCanvansDom);
      sparkler.mount(weakMap.get(curentCanvansDom));
    };
    onMounted(() => {
      // 点击鼠标烟花效果
      installSpakler();
    });
    onUnmounted(() => {
      sparkler.unmount(weakMap.get(canvansEl.value));
    });
    return {};
  },
});
</script>
