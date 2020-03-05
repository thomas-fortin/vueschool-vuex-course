import shop from '@/api/shop';

export default {
  state: { // = data
    items: []
  },
  getters: { // = computed properties
    availableProducts(state, getters) {
      return state.items.filter((product) => product.inventory > 0);
    },
    productIsInStock() {
      return (product) => {
        return product.inventory > 0;
      };
    }
  },
  mutations: { // = setting and updating the state
    setProducts(state, products) {
      state.items = products;
    },
    decrementProductInventory(state, product) {
      product.inventory--;
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
    }
  }
};
