<template>
  <div class="cart">
    <h2>你的购物车</h2>
    <p><i>请添加一些商品到购物车</i></p>
    <ul>
      <li v-for="item in cartStore.cartProducts" :key="item.id">
        {{ item.title }} - ￥{{ item.price }} × 数量{{ item.quantity }}
      </li>
    </ul>
    <p>商品总价：{{ cartStore.totalPrice }}</p>
    <a-button danger @click="cartStore.checkout">结算</a-button>
    <p v-show="cartStore.checkutStatus">结算{{ cartStore.checkutStatus }}</p>
  </div>
</template>

<script setup lang="ts">
    import { useCartStore } from "@/store/cart";
    const cartStore = useCartStore();
</script>

<style lang="scss" scoped></style>
