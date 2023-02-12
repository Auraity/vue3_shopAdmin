<script setup>
</script>

<template>
  <router-view></router-view>
</template>

<style>
body {
  @apply bg-gray-100;
}
#nprogress .bar {
  background-color: #f4f4f4 !important;
  height: 3px !important;
}
/* 修改滚动条样式 */
/* 整体 */
::-webkit-scrollbar {
  width: 10px;
  height: 6px;
}
/* 边角 */
::-webkit-scrollbar-corner {
  display: block;
}
/* 小方块 */
::-webkit-scrollerbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}
/* 轨道 */
::-webkit-scrollerbar-thumb,
::-webkit-scrollerbar-track {
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
