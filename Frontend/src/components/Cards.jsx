import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ item }) {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle adding item to cart
  const addToCart = (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} has been added to the cart.`);
      navigate("/cart");
    } catch (err) {
      console.error("Error accessing localStorage:", err);
    }
  };

  // Function to handle "Buy Now" button click
  const handleBuyNow = (product) => {
    try {
      // Retrieve existing purchase products or initialize as empty array
      const purchaseProducts =
        JSON.parse(localStorage.getItem("purchaseProducts")) || [];
      purchaseProducts.push(product);
      localStorage.setItem(
        "purchaseProducts",
        JSON.stringify(purchaseProducts)
      );

      // Optionally, you can also remove the product from the cart here if needed
      // removeFromCart(product.productId);

      // Navigate to the Purchase page
      navigate("/purchase");
    } catch (err) {
      console.error("Error handling Buy Now:", err);
    }
  };

  return (
    <div className="mt-4 mb-4 p-3 dark:bg-slate-900 dark:text-white">
      <div className="card bg-base-100 w-92 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border-2 rounded-lg">
        <figure className="relative">
          <img className="rounded-t-lg" src={item.image} alt={item.name} />
        </figure>
        <div className="card-body dark:bg-slate-900 dark:text-white">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary dark:bg-slate-900 dark:text-white">
              {item.category}
            </div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions justify-between">
            <div
              onClick={() => addToCart(item)} // Add to Cart functionality
              className="hover:bg-green-500 hover:text-white duration-200 cursor-pointer px-2 py-1 rounded-full border-[2px] dark:border-white dark:bg-slate-900 dark:text-white"
            >
              Add to Cart
            </div>
            <div
              onClick={() => handleBuyNow(item)} // Buy Now functionality
              className="hover:bg-pink-500 hover:text-white duration-200 cursor-pointer px-2 py-1 rounded-full border-[2px] dark:border-white dark:bg-slate-900 dark:text-white"
            >
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
