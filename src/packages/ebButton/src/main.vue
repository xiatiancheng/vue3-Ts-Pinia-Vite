<template>
  <button
    class="my-button"
    :class="['my-button-size-' + size,type]"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>


<script setup lang="ts"  name="ebButton">

const props = defineProps({
  size: {
    type: String,
    default: () => "big",
  },
  type: {
    type: String,
    default: () => "default",
  },
});
const emit = defineEmits(["click"]);
const handleClick = () => {
  emit("click", "Tom");
};
</script>

<style lang="scss" scoped>

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
  &.my-button-size-big {
    padding: 12px 20px;
  }
  &.my-button-size-mid {
    padding: 10px 20px;
  }
  &.my-button-size-small {
    padding: 10px 10px;
  }
  &.default{
    &:hover{
      color: $main_color;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }
  &.primary{
    &:hover{
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
  }
}
</style>