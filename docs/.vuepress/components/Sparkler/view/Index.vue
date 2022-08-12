<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import { installSakura } from "../../Sakura/index";
import { defineComponent, onMounted, onUnmounted } from "vue";
import { Sparkler, MAX_Z_INDEX } from "@moefy-canvas/theme-sparkler";
const weakMap = new WeakMap();

export default defineComponent({
  name: "Spakler",
  setup() {
    const sparkler = new Sparkler(
      {
        size: 90,
      },
      {
        opacity: 0.3,
        zIndex: MAX_Z_INDEX,
      }
    );
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
