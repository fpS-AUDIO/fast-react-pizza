import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //  >>>EXAMPLE:
  // cart: [
  //   {
  //     pizzaId: 124232,
  //     name: `Margherita`,
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],

  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload should be new item
      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },

    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },

    decreseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;

      // featureSlice.caseReducers helps to manually call a reducer
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
  },

  clearCart(state) {
    state.cart = [];
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (store) => store.cart.cart;

export const getTotalCartQuantity = (store) =>
  store.cart.cart.reduce((accum, item) => accum + item.quantity, 0);

export const getTotalCartPrice = (store) =>
  store.cart.cart.reduce((accum, item) => accum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
