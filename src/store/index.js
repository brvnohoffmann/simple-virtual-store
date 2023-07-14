import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  //dados/data
  state: {
    products : [],
    productsInBag: []
  },
  mutations: {
    loadProducts(state, products) {
      state.products = products
    },
    loadBag(state, products) {
      state.productsInBag = products
    },
    addToBag(state, product) {
      state.productsInBag.push(product)
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag))
    },
    removeFromBag(state, productId) {
      var updatedBag = state.productsInBag.filter(item => productId != item.id)
      state.productsInBag = updatedBag
      localStorage.setItem('productsInBag', JSON.stringify(state.productsInBag))
    },

  },
  actions: {

    loadProducts(context) {

      axios.get('https://fakestoreapi.com/products')
      .then(response => {
        context.commit('loadProducts', response.data)
      })

    },

    loadBag(context) {
      if(localStorage.getItem("productsInBag")) {
        context.commit('loadBag', JSON.parse(localStorage.getItem("productsInBag")))
      }

    },
    addToBag({ commit }, product) {
      commit('addToBag', product)
    },

    removeFromBag({ commit }, productId) {
      if(confirm('TEm certeza que quer remover o item?')) {
        commit('removeFromBag', productId)
      }
    }

  }

})
