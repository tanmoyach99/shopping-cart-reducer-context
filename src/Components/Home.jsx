import React from "react";
import { CartState } from "../Context/Context";
import ProductDetails from "./ProductDetails";
import "./home.css";
import Filter from "./Filter";

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((pr) => pr.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((pr) => pr.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((pr) => pr.ratings >= byRating);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((pr) =>
        pr.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filter />
      <div className="productContainer">
        {transformProducts().map((pr) => (
          <ProductDetails key={pr.id} pr={pr}></ProductDetails>
        ))}
      </div>
    </div>
  );
};

export default Home;
