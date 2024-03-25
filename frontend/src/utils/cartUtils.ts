import { CartDetailsType } from "../types";

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state: CartDetailsType) => {
  // Calculate Items Price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate Shipping Price (If order is above 5000 free shipping, else 300 shipping price)
  state.shippingPrice = addDecimals(
    parseFloat(state.itemsPrice) > 100 ? 0 : 100
  );

  // Calculate Tax Price (15% tax)
  state.taxPrice = addDecimals(parseFloat(state.itemsPrice) * 0.15);

  // Calculate Total Price
  state.totalPrice = addDecimals(
    parseFloat(state.itemsPrice) +
      parseFloat(state.shippingPrice) +
      parseFloat(state.taxPrice)
  );

  localStorage.setItem("cart", JSON.stringify(state));
};
