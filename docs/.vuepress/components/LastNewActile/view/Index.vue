<template>
  <div class="last-new-actile">
    <el-table :data="data" stripe style="width: 100%">
      <el-table-column
        v-for="(item, index) in columns"
        :key="item.key"
        :prop="item.dataKey"
        :label="item.label"
      >
        <template #default="scope">
          <a
            href="javascript:void(0)"
            @click="handleToPage(scope.row)"
            v-if="item.dataKey === 'title'"
            >{{ scope.row[item.dataKey] }}</a
          >
          <span v-else>{{ scope.row[item.dataKey] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from "vue";
import { tableData } from "./data";
export default defineComponent({
  name: "last-new-actile",
  setup() {
    const tableConfig = reactive({
      width: 700,
      height: 400,
      columns: [
        {
          key: "title",
          dataKey: "title",
          label: "文章标题",
        },
        {
          key: "time",
          dataKey: "time",
          label: "发布时间",
        },
        {
          key: "tag",
          dataKey: "tag",
          label: "标签",
        },
      ],
      data: tableData,
    });
    const instance = getCurrentInstance();
    const handleToPage = (item) => {
      window.location.href = `${item.path}.html`;
    };
    return {
      ...toRefs(tableConfig),
      handleToPage,
    };
  },
});
</script>

<style lang="scss">
.last-new-actile {
  > div {
    margin-top: 10px;
  }
  table {
    margin: 0 !important;
  }
}
</style>
