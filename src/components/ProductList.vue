<template>
  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="(product, index) in products" :key="index">{{ product.title }} ({{ product.price }})</li>
    </ul>
  </div>
</template>

<script>
import shop from '@/api/shop';
import store from '@/store';

export default {
  computed: {
    products () {
      return store.state.products;
    }
  },
  created () {
    shop.getProducts((products) => {
      store.commit('setProducts', products);
    });
  }
};
</script>
