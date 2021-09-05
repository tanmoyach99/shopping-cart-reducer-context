import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import "./products.css";
import { CartState } from "../Context/Context";

const ProductDetails = ({ pr }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <div className="product">
      <Card>
        <Card.Img variant="top" src={pr.image} alt={pr.name} />
        <Card.Body>
          <Card.Title>{pr.name}</Card.Title>
          <Card.Subtitle>
            <span>$ {pr.price.split(".")[0]}</span>
            {pr.fastDelivery ? (
              <div>Fast delivery</div>
            ) : (
              <div> 5 Days Delivery</div>
            )}
            <Rating rating={pr.ratings} />
          </Card.Subtitle>
          {cart.some((p) => p.id === pr.id) ? (
            <Button
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: pr,
                });
              }}
              variant="danger"
            >
              remove from cart
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: pr,
                });
              }}
              disabled={!pr.inStock}
            >
              {" "}
              {!pr.inStock ? "out of stock" : "add to cart"}{" "}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductDetails;
