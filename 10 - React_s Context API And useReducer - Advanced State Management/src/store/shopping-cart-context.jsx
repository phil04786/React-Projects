//React Context API-> Means Sharing data to multiple components instead of passing through multiple props.
//CartContext will actually be an object that contains React Component.
// Initial value will be provided to multiple components which are wrap by by CartContext Component.

import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }
    return {
      // ...state;
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    // ✅ If item is not in the cart, do nothing
    if (updatedItemIndex === -1) {
      console.warn(
        `Item with ID ${action.payload.productId} not found in cart.`
      );
      return prevShoppingCart; // Return the cart unchanged
    }

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    // - Increase (or decrease) the item’s quantity by the specified `amount`.

    // ✅ Example:
    // - If `amount = 1`, you're adding one.
    // - If `amount = -1`, you're removing one.

    // ### ❌ **If the Quantity Drops to 0 or Less** The item is removed from the cart if its quantity is now zero or negative.

    // if (updatedItem.quantity <= 0) {
    // updatedItems.splice(updatedItemIndex, 1);
    // }

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem; //Update the item in the array with the new quantity.
    }

    return {
      // ...state;
      items: updatedItems,
    };
  }
  return state;
}

export default function CartContextProvider({ children }) {
  // const [shoppingCart, setShoppingCart] = useState({
  //   items: [],
  // });

  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  // "If the item is found in the cart, increase the quantity. If it's not found, look it up from DUMMY_PRODUCTS using the id and add it to the cart."

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
    /*
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      // {
      // items: [
      // { id: 'p1', name: 'Laptop', price: 1000, quantity: 2 },
      // { id: 'p2', name: 'Phone', price: 500, quantity: 1 }
      // ]
      // }

      return {
        items: updatedItems,
      };
    });
    */
  }

  /*
  🔧 Purpose of the Function
      ✅ Update the quantity of an item in the cart.

      ➕ Increase if amount is positive.

      ➖ Decrease if amount is negative.

      ❌ Remove the item if the resulting quantity is 0 or less.
*/

  function handleUpdateCartItemQuantity(productId, amount) {
    // productId: the id of the item to update
    // amount: the number to add or subtract from the current quantity (can be positive or negative)
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        amount,
      },
    });
    /*
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      // ✅ If item is not in the cart, do nothing
      if (updatedItemIndex === -1) {
        console.warn(`Item with ID ${productId} not found in cart.`);
        return prevShoppingCart; // Return the cart unchanged
      }

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      // - Increase (or decrease) the item’s quantity by the specified `amount`.

      // ✅ Example:
      // - If `amount = 1`, you're adding one.
      // - If `amount = -1`, you're removing one.

      // ### ❌ **If the Quantity Drops to 0 or Less** The item is removed from the cart if its quantity is now zero or negative.

      // if (updatedItem.quantity <= 0) {
      // updatedItems.splice(updatedItemIndex, 1);
      // }

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem; //Update the item in the array with the new quantity.
      }

      return {
        items: updatedItems,
      };
    });
    */
  }

  const ctxValue = {
    // items: shoppingCart.items,
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
