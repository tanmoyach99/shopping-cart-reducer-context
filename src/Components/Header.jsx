import React from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../Context/Context";
import "./header.css";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar bg="dark" variant="dark" style={{ height: "80" }}>
      <Container>
        <Navbar.Brand>
          <Link to="/" className="shopping-link">
            Shopping Cart{" "}
          </Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: "500" }}
            placeholder="search a product"
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart
                color="white"
                fontSize="25px"
                className="shoppingCart"
              />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdownMenu">
              {cart.length > 0 ? (
                <>
                  {cart.map((pr) => (
                    <div key={pr.id} className="cartItem">
                      <img
                        src={pr.image}
                        alt={pr.name}
                        className="cartItemImg"
                      />
                      <span className="cartItemDetail">
                        <p>${pr.price.split(".")[0]} </p>
                        <p>{pr.name}</p>
                        <AiFillDelete
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: pr,
                            });
                          }}
                        />
                      </span>
                      <Link to="/cart">
                        <Button> Go to cart</Button>
                      </Link>
                    </div>
                  ))}
                </>
              ) : (
                <span style={{ padding: 10 }}> cart is empty</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
