import shop from '@/api/shop';

export default {
  namespaced: true,
  state: { // = data
    items: [], // {id, quantity}
    checkoutStatus: null
  },
  getters: { // = computed properties
    cartProducts(state, getters, rootState) {
      return state.items.map((cartItem) => {
        const product = rootState.products.items.find(product => product.id === cartItem.id);

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
    }
  },
  mutations: { // = setting and updating the state
    pushProductToCart(state, productId) {
      state.items.push({
        id: productId,
        quantity: 1
      });
    },
    incrementCartItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },
    emptyCart(state) {
      state.items = [];
    }
  },
  actions: { // = methods (never update the state!)
    addProductToCart({ state, getters, commit, rootState, rootGetters }, product) {
      if (rootGetters['products/productIsInStock'](product)) {
        const cartItem = state.items.find((item) => item.id === product.id);
        if (!cartItem) {
          // If we don't already have this kind of product in the cart, push new
          commit('pushProductToCart', product.id);
        } else {
          // Otherwise, we just increment the quantity of it
          commit('incrementCartItemQuantity', cartItem);
        }
        // We add the third argument because otherwise,
        // Vue will stack the namespaces and look for the mutation at 'cart/products/decrementProductInventory'
        // Because by default, it's looking in the current namespace, because we are inside a module
        commit('products/decrementProductInventory', product, { root: true });
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
  }
}
;
