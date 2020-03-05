import shop from '@/api/shop';

export default {
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
    addProductToCart({ state, getters, commit, rootState }, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.items.find((item) => item.id === product.id);
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
  }
}
;
