<!-- 联网搜索开关 -->
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { useChatStore } from '@/stores/modules/chat';

const chatStore = useChatStore();

const isWebSearch = computed(() => chatStore.isWebSearch);

function toggleWebSearch() {
  chatStore.setWebSearch(!chatStore.isWebSearch);
}
</script>

<template>
  <div
    :class="{ 'is-select': isWebSearch }"
    class="web-search-btn flex items-center cursor-pointer font-size-12px border-1px border-solid rounded-15px hover:bg-[rgba(0,0,0,.04)]"
    :title="isWebSearch ? '关闭联网搜索' : '开启联网搜索（模型将自主检索网页并附引用作答）'"
    @click="toggleWebSearch"
  >
    <el-icon class="mr-4px">
      <Search />
    </el-icon>
    <span>联网搜索</span>
  </div>
</template>

<style scoped lang="scss">
.web-search-btn {
  gap: 2px;
  padding: 3px 10px;
  color: var(--el-text-color-regular, #606266);
  border-color: var(--el-border-color-lighter, #e4e7ed);
  background: var(--el-bg-color, #fff);
  transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.web-search-btn.is-select {
  color: var(--el-color-primary, #409eff);
  border-color: var(--el-color-primary, #409eff);
  background: var(--el-color-primary-light-9, #ecf5ff);
}
</style>
