<template>
  <div>
    <h2>Shopping Cart</h2>
    <ul>
      <li v-for="(product, index) in products" :key="index">
        {{ product.title }} - {{ product.price | currency }} ({{ product.quantity }})
      </li>
    </ul>
    <p>
      <b>Total:</b> {{ total | currency }}
      <button @click="$store.dispatch('checkout')">Checkout</button>
      <p v-if="$store.state.checkoutStatus ">
        {{ $store.state.checkoutStatus }}
      </p>
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.getters.cartProducts;
    },
    total() {
      return this.$store.getters.cartTotal;
    }
  }
};
</script>

<style scoped>
h2,
p {
  text-align: center;
}
</style>
