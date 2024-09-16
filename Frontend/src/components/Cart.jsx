import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Fetch cart items from localStorage
  useEffect(() => {
    const fetchCart = () => {
      try {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(cartItems);
      } catch (err) {
        console.error("Error fetching cart from localStorage:", err);
      }
    };
    fetchCart();
  }, []);

  // Function to handle removal of items from the cart
  const removeFromCart = (productId) => {
    try {
      const updatedCart = cart.filter((item) => item.productId !== productId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  };

  // Function to handle "Buy Now" functionality
  const handleBuyNow = (item) => {
    try {
      // Store the item in localStorage for the purchase page
      const purchaseProducts =
        JSON.parse(localStorage.getItem("purchaseProducts")) || [];
      purchaseProducts.push(item);
      localStorage.setItem(
        "purchaseProducts",
        JSON.stringify(purchaseProducts)
      );

      // Remove item from cart
      removeFromCart(item.productId);

      // Navigate to the Purchase page
      navigate("/purchase");
    } catch (err) {
      console.error("Error handling buy now action:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white">
        <div className="container mx-auto pt-20 p-4 flex-grow">
          <h1 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h1>
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="card bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border-2 rounded-lg"
                >
                  <figure className="relative">
                    <img
                      className="rounded-t-lg w-full h-48 object-cover md:h-64"
                      src={item.image}
                      alt={item.name}
                    />
                  </figure>
                  <div className="card-body dark:bg-slate-900 dark:text-white">
                    <h2 className="card-title text-lg font-semibold">
                      {item.name}
                      <div className="badge badge-secondary dark:bg-slate-900 dark:text-white ml-2">
                        {item.category}
                      </div>
                    </h2>
                    <p className="text-sm md:text-base">{item.title}</p>
                    <div className="card-actions justify-between mt-2">
                      <div className="badge badge-outline dark:bg-slate-900 dark:text-white">
                        ${item.price}
                      </div>
                      <div
                        onClick={() => removeFromCart(item.productId)}
                        className="hover:bg-red-500 hover:text-white duration-200 cursor-pointer px-3 py-1 rounded-full border-[2px] dark:border-white dark:bg-slate-900 dark:text-white"
                      >
                        Remove
                      </div>
                      <div
                        onClick={() => handleBuyNow(item)}
                        className="hover:bg-green-500 hover:text-white duration-200 cursor-pointer px-3 py-1 rounded-full border-[2px] dark:border-white dark:bg-slate-900 dark:text-white"
                      >
                        Buy Now
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">Your cart is empty</div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Cart;
