import Vuex from 'vuex';
import Vue from 'vue';
import shop from '@/api/shop';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // = data
    products: [],
    cart: [], // {id, quantity}
    checkoutStatus: null
  },
  getters: { // = computed properties
    availableProducts(state, getters) {
      return state.products.filter((product) => product.inventory > 0);
    },
    cartProducts(state) {
      return state.cart.map((cartItem) => {
        const product = state.products.find(product => product.id === cartItem.id);

        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        };
      });
    },
    cartTotal(state, getters) {
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
      // Same as :
      // let total = 0;
      // getters.cartProducts.forEach((product) => {
      //   total += product.price * product.quantity;
      // });

      // return total;
    },
    productIsInStock() {
      return (product) => {
        return product.inventory > 0;
      };
    }
  },
  actions: { // = methods (never update the state!)
    fetchProducts({ commit }) {
      return new Promise((resolve, reject) => {
        shop.getProducts((products) => {
          commit('setProducts', products);
          resolve();
        });
      });
    },
    addProductToCart({ state, getters, commit }, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.cart.find((item) => item.id === product.id);
        if (!cartItem) {
          // If we don't already have this kind of product in the cart, push new
          commit('pushProductToCart', product.id);
        } else {
          // Otherwise, we just increment the quantity of it
          commit('incrementCartItemQuantity', cartItem);
        }
        commit('decrementProductInventory', product);
      }
    },
    checkout({ state, commit }) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart');
          commit('setCheckoutStatus', 'success');
        },
        () => {
          commit('setCheckoutStatus', 'fail');
        }
      );
    }
  },
  mutations: { // = setting and updating the state
    setProducts(state, products) {
      state.products = products;
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      });
    },
    incrementCartItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    decrementProductInventory(state, product) {
      product.inventory--;
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
    emptyCart(state) {
      state.cart = [];
    }
  }
});
