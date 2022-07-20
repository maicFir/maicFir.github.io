<template>
  <div class="table-content">目录</div>
</template>

<script>
// import { sidebar } from '../configs/themeConfig/slidebar';
const getfleName = (pathName, callback) => {
  const fileName = /\d{4}-\d{2}-\d{2}$/;
  const map = new Map([
    ['ts', require.context('../../front/ts', true, /\d{4}-\d{2}-\d{2}.md$/).keys()],
    ['css', require.context('../../front/css', false, /\d{4}-\d{2}-\d{2}.md$/).keys()]
  ]);
  const ret = map.get(pathName).map((v) => v.replace('./', '').replace('.md', '.html'));
  callback(ret);
  // console.log(sidebar);
};

export default {
  name: 'TableContent',
  props: {
    path: {
      type: String,
      default: 'ts'
    }
  },
  mounted() {
    // const { path } = this;
    // console.log(this.path);
    // getfleName(path, (file) => {
    //   console.log(file);
    // });
  }
};
</script>

<style lang="styl"></style>
