import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // = data
    products: []
  },
  getters: { // = computed properties
    productsCount () {
      // ...
    }
  },
  actions: { // = methods (never update the state!)
    fetchProducts () {
      // make the call
    }
  },
  mutations: { // = setting and updating the state
    setProducts (state, products) {
      state.products = products;
    }
  }
});
