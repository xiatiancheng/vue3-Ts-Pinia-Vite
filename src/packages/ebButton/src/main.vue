<template>
  <button
    class="my-button"
    :class="['my-button-size-'+size]"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
  import { PropType } from "vue";
  const props = defineProps({
    size: {
        type: String,
        default: () => 'big',
    },
  });
  const emit = defineEmits(["click"]);
  const handleClick = () => {
    emit("click", "Tom");
  };
</script>

<style scoped>
/* 初始化 button 的样式 */
.my-button {
  display: inline-block;
  line-height: 1;
  cursor: pointer;
  background: #fff;
  border: 1px solid #ddd;
  color: #000;
  text-align: center;
  outline: none;
  font-size: 14px;
  border-radius: 4px;
}
​
  /* button big 的样式 */
.my-button-size-big {
  padding: 12px 20px;
}
​
  /* button mid 的样式 */
  .my-button.my-button-size-mid {
  padding: 10px 20px;
}
​
  /* button small 的样式 */
  .my-button.my-button-size-small {
  padding: 10px 10px;
}
</style>