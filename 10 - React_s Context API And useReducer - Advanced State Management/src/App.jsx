// import { useState } from "react";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import Product from "./components/Product.jsx";
// import { CartContext } from "./store/shopping-cart-context.jsx";
import CartContextProvider from "./store/shopping-cart-context.jsx";

function App() {
  /*
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });
  */

  // "If the item is found in the cart, increase the quantity. If it's not found, look it up from DUMMY_PRODUCTS using the id and add it to the cart."

  /*
  function handleAddItemToCart(id) {
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
  }
    */

  /*
  🔧 Purpose of the Function
      ✅ Update the quantity of an item in the cart.

      ➕ Increase if amount is positive.

      ➖ Decrease if amount is negative.

      ❌ Remove the item if the resulting quantity is 0 or less.
*/

  /*
  function handleUpdateCartItemQuantity(productId, amount) {
    
      // productId: the id of the item to update

      // amount: the number to add or subtract from the current quantity (can be positive or negative)

    

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
  }
*/

  // const ctxValue = {
  //   items: shoppingCart.items,
  //   addItemToCart: handleAddItemToCart,
  //   updateItemQuantity: handleUpdateCartItemQuantity,
  // };

  return (
    // <CartContext.Provider value={{ items: [] }}>
    // <CartContext.Provider value={shoppingCart}>
    // <CartContext.Provider value={ctxValue}>
    <CartContextProvider>
      {/* <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      /> */}
      {/* <Shop onAddItemToCart={handleAddItemToCart}> */}
      <Header />
      <Shop>
        {/* Component Composition */}
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            {/* <Product {...product} onAddToCart={handleAddItemToCart} /> */}
            <Product {...product} />
          </li>
        ))}
      </Shop>
      {/* </CartContext.Provider> */}
    </CartContextProvider>
  );
}

export default App;
