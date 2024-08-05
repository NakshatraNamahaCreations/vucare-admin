import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { CreateToggle } from "./TogglerProvider";

import { Link } from "react-router-dom";

function Signup() {
  const { toggle, handleshow, handlehide } = useContext(CreateToggle);
  const [image, setImage] = useState([]);


  const handleImage = (e) => {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
    setImage(url);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        className="row justify-content-center"
        style={{ alignItems: "center" }}
      >
        <div className="col-5" style={{ marginTop: "5%" }}>
          <Card
            style={{ boxShadow: "0px 0px 5px 2px lightgray", padding: "10px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {" "}
              <h2>SIGN UP</h2>
              <i
                class="fa-solid fa-circle-user"
                style={{ fontSize: "55px", zIndex: "100px" }}
              >
                <img
                  src={image}
                  alt="uploaded image"
                  style={{
                    width: "50px",
                    height: "50px",
                    position: "absolute",
                    top: "3%",
                    right: "1.7%",
                    borderRadius: "100%",
                  }}
                />
              </i>
            </div>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>
                    First name<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control required type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>
                    First name<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control required type="text" placeholder="Last Name" />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label>
                    Email <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control required type="text" placeholder="Email" />
                </Form.Group>
                <div className="col-md-6" style={{ marginTop: "30px" }}>
                  {!toggle ? (
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Control type="text" placeholder="Password" />
                      <i
                        class="fa-regular fa-eye "
                        style={{
                          position: "absolute",
                          left: "94%",
                          top: "46.5%",
                        }}
                        onClick={handlehide}
                      ></i>
                    </Form.Group>
                  ) : (
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Control type="password" placeholder="Password" />

                      <i
                        class="fa-solid fa-eye-slash "
                        style={{
                          position: "absolute",
                          left: "94%",
                          top: "46.5%",
                        }}
                        onClick={handleshow}
                      ></i>
                    </Form.Group>
                  )}
                </div>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>
                    Upload Image<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    onChange={handleImage}
                    required
                    type="file"
                    placeholder="Upload Image"
                  />
                </Form.Group>
                <Form.Group as={Col} Col="6" controlId="validationCustom01">
                  <Form.Label>
                    Contact No.<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Contact no"
                  />
                </Form.Group>
              </Row>

              <div class="form-check">
                <Form.Group className="mb-3" id="formGridCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="ACCEPT TERMS AND CONDITIONS"
                  />
                </Form.Group>
              </div>
              <div style={{ textAlign: "center" }}>
                <Link to="/">
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ width: "300px" }}
                  >
                    SIGN UP
                  </Button>
                </Link>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Signup;
