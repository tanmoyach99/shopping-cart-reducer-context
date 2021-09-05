import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../Context/Context";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((pr) => (
            <ListGroup.Item key={pr.id}>
              <Row>
                <Col md={2}>
                  <Image src={pr.image} alt={pr.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{pr.name}</span>
                </Col>
                <Col md={2}>₹ {pr.price}</Col>
                <Col md={2}>
                  <Rating rating={pr.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={pr.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: pr.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(pr.inStock).keys()].map((qty) => (
                      <option key={qty + 1}> {qty + 1} </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: pr,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: $ {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
