<template>
  <div>
    <h1>Product List</h1>
    <img class="d-block m-auto" v-if="loading" src="https://i.imgur.com/JfPpwOA.gif"/>
    <ul v-else>
      <li v-for="(product, index) in products" :key="index">{{ product.title }} ({{ product.price }})</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    products() {
      return this.$store.getters.availableProducts;
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch('fetchProducts').then(() => {
      this.loading = false;
    });
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.d-block {
  display: block;
}
.m-auto {
  margin: auto;
}
</style>
