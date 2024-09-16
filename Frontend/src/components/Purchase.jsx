import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Purchase() {
  const [products, setProducts] = useState([]);

  // Fetch product details from localStorage
  useEffect(() => {
    const fetchProducts = () => {
      try {
        const purchaseProducts =
          JSON.parse(localStorage.getItem("purchaseProducts")) || [];
        setProducts(purchaseProducts);
      } catch (err) {
        console.error("Error fetching products from localStorage:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 pt-20 dark:bg-slate-900 dark:text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Purchase
        </h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 pt-12 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border-2 rounded-lg"
              >
                <figure className="relative">
                  <img
                    className="rounded-t-lg w-full h-48 md:h-64 object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                </figure>
                <div className="card-body dark:bg-slate-900 dark:text-white p-4">
                  <h2 className="card-title text-lg md:text-xl font-semibold">
                    {product.name}
                    <div className="badge badge-secondary dark:bg-slate-900 dark:text-white ml-2">
                      {product.category}
                    </div>
                  </h2>
                  <p className="text-sm md:text-base">{product.title}</p>
                  <div className="card-actions justify-between mt-2">
                    <div className="badge badge-outline dark:bg-slate-900 dark:text-white">
                      ${product.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">No products to display</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Purchase;
