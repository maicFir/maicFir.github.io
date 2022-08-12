<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import { installSakura } from "../../Sakura/index";
import { defineComponent, onMounted, onUnmounted } from "vue";
import { Popper, PopperShape, MAX_Z_INDEX } from "@moefy-canvas/theme-popper";
const weakMap = new WeakMap();

export default defineComponent({
  name: "Spakler",
  setup() {
    const themeConfig = {
      shape: PopperShape.Star,
      size: 1.75,
      numParticles: 10,
    };
    const canvasOptions = {
      opacity: 1,
      zIndex: MAX_Z_INDEX,
    };
    const sparkler = new Popper(themeConfig, canvasOptions);
    const installSpakler = () => {
      const curentCanvansDom = document.getElementById("canvas");
      weakMap.set(curentCanvansDom, curentCanvansDom);
      sparkler.mount(weakMap.get(curentCanvansDom));
    };
    onMounted(() => {
      // 鼠标烟花效果
      installSpakler();
      // 背景飘花效果
      const Sakura = installSakura;
      Sakura();
    });
    onUnmounted(() => {
      sparkler.unmount(weakMap.get(curentCanvansDom));
    });
    return {};
  },
});
</script>
