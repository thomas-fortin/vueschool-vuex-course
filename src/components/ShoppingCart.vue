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
      <button @click="checkout">Checkout</button>
      <p v-if="checkoutStatus ">
        {{ checkoutStatus }}
      </p>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      checkoutStatus: 'checkoutStatus'
    }),
    ...mapGetters({
      products: 'cartProducts',
      total: 'cartTotal'
    })
  },
  methods: {
    // For every ...mapXXX function
    // We can put an object, or a simple array if the names are the same
    // To tell which actions we want
    ...mapActions(['checkout'])
  }
};
</script>

<style scoped>
h2,
p {
  text-align: center;
}
</style>
