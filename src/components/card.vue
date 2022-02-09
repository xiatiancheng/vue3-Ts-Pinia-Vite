<template>
  <a-row>
    <a-col :span="8" v-for="item in list" :key="item.id">
      <a-card hoverable style="width: 300px" @click="cartStore.addProductToCart(item)">
        <template #cover>
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </template>
        <!-- <template class="ant-card-actions" #actions>
            <setting-outlined key="setting" />
            <edit-outlined key="edit" />
            <ellipsis-outlined key="ellipsis" />
            </template> -->
        <a-card-meta :title="item.title">
          <template #avatar>
            <a-avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </template>
          <template #description>
            {{ item.title }} - {{ item.price }}￥ - 库存{{ item.inventory }}
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup >
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons-vue";
import { PropType } from "vue";
import { useCartStore } from "../store/cart";
const cartStore = useCartStore();
interface IProduct {
  id: number;
  title: string;
  price: number;
  inventory: number;
}
// 接收父组件传过来的值
const props = defineProps({
  list: {
    type: Array as PropType<IProduct[]>,
    default: () => [],
  },
});
</script>