<!-- 深度思考开关 -->
<script setup lang="ts">
import { MagicStick } from '@element-plus/icons-vue';
import { useChatStore } from '@/stores/modules/chat';

const chatStore = useChatStore();

const isDeepThinking = computed(() => chatStore.isDeepThinking);

// 切换是否深度思考
function setIsDeepThinking() {
  chatStore.setDeepThinking(!chatStore.isDeepThinking);
}
</script>

<template>
  <div
    :class="{ 'is-select': isDeepThinking }"
    class="deep-thinking-btn flex items-center cursor-pointer font-size-12px border-1px border-solid rounded-15px hover:bg-[rgba(0,0,0,.04)]"
    :title="isDeepThinking ? '关闭深度思考' : '开启深度思考（模型将先输出思维链）'"
    @click="setIsDeepThinking"
  >
    <el-icon class="mr-4px">
      <MagicStick />
    </el-icon>
    <span>深度思考</span>
  </div>
</template>

<style scoped lang="scss">
.deep-thinking-btn {
  gap: 2px;
  padding: 3px 10px;
  color: var(--el-text-color-regular, #606266);
  border-color: var(--el-border-color-lighter, #e4e7ed);
  background: var(--el-bg-color, #fff);
  transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.deep-thinking-btn.is-select {
  color: var(--el-color-primary, #409eff);
  border-color: var(--el-color-primary, #409eff);
  background: var(--el-color-primary-light-9, #ecf5ff);
}
</style>
