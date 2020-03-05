<template>
  <div>
    <h1>Product List</h1>
    <img class="d-block m-auto" v-if="loading" src="https://i.imgur.com/JfPpwOA.gif"/>
    <ul v-else>
      <li v-for="(product, index) in products" :key="index">
        {{ product.title }} - {{ product.price | currency }} ({{ product.inventory }})
        <button
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)"
        >Add to cart</button>
      </li>
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
      return this.$store.state.products;
    },
    productIsInStock() {
      return this.$store.getters.productIsInStock;
    }
  },
  methods: {
    addProductToCart(product) {
      this.$store.dispatch('addProductToCart', product);
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
li {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
}
button {
  margin-left: 0.5em;
}
</style>
