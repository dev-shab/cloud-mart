import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId!);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let errMsg = "";
  if (error) {
    if ("status" in error) {
      errMsg = "error" in error ? error.error : JSON.stringify(error.data);
    } else {
      errMsg = error.message ? error.message : "";
    }
  }

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <>{errMsg}</>
        </Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product?.rating!}
                  text={`${product?.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ₹{product?.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product?.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>₹{product?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      <strong>
                        {product?.countInStock! > 0
                          ? "In Stock"
                          : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product?.countInStock! > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(parseInt(e.target.value))}
                        >
                          {[...Array(product?.countInStock!).keys()].map(
                            (x: number) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product?.countInStock! === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
