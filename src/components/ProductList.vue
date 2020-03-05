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
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    // For mapState and mapGetters
    // This could only be ...mapState() and ...mapGetters()
    // Because the states and getters have the same names
    // I have written them here for example
    // And in case of change in the future, it is more secure
    ...mapState('products', {
      products: (state) => state.items
    }),
    ...mapGetters('products', {
      productIsInStock: 'productIsInStock'
    })
  },
  methods: {
    ...mapActions({
      fetchProducts: 'products/fetchProducts',
      addProductToCart: 'cart/addProductToCart'
    })
  },
  created() {
    this.loading = true;
    this.fetchProducts().then(() => {
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
