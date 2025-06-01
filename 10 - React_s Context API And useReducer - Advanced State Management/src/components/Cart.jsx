import { useContext } from "react";

import { CartContext } from "../store/shopping-cart-context";

export default function Cart(/*{ items, onUpdateItemQuantity }*/) {
  const { items, updateItemQuantity } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  /*
let totalPrice = 0;

for (let i = 0; i < items.length; i++) {
  const item = items[i];
  totalPrice += item.price * item.quantity;
}
*/

  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  {/* <button onClick={() => onUpdateItemQuantity(item.id, -1)}> */}
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  {/* <button onClick={() => onUpdateItemQuantity(item.id, 1)}> */}
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
