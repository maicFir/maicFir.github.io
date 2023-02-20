<template>
  <div class="last-new-actile">
    <el-table :data="newTableData" stripe style="width: 100%">
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
    <el-pagination
      small
      layout="prev, pager, next"
      :page-count="pageCount"
      :total="newTableData.length"
      @current-change="handleChangePageIndex"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  computed,
  onMounted,
} from "vue";
import { tableData } from "./data";
export default defineComponent({
  name: "last-new-actile",
  setup() {
    const tableConfig = reactive({
      width: 700,
      height: 400,
      pageSize: 6,
      pageIndex: 1,
      pageCount: 5,
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
      data: [],
    });
    const instance = getCurrentInstance();
    const cacheData = JSON.parse(JSON.stringify(tableData));
    const filterDataByPage = () => {
      const index = (tableConfig.pageIndex - 1) * tableConfig.pageSize;
      const ndata = cacheData.slice(index, index + tableConfig.pageSize);
      return ndata;
    };
    onMounted(() => {
      tableConfig.pageCount = Math.ceil(
        cacheData.length / tableConfig.pageSize
      );
      tableConfig.data = filterDataByPage();
    });
    const newTableData = computed(() => {
      tableConfig.data = filterDataByPage();
      return tableConfig.data;
    });

    const handleToPage = (item) => {
      window.location.href = `${item.path}.html`;
    };
    const handleChangePageIndex = (pageIndex) => {
      tableConfig.pageIndex = pageIndex;
    };
    return {
      ...toRefs(tableConfig),
      handleToPage,
      newTableData,
      handleChangePageIndex,
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
