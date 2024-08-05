import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Sidenav from "./Sidenav";
import Header from "./Header";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const active1 = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive1 = { color: "black", backgroundColor: "white" };

function CreateSubcategory() {
  const [selected1, setSelected1] = useState(0);
  const handleClick1 = (divNum) => () => {
    setSelected1(divNum);
  };
  const [banner, setBanner] = useState([
    {
      id: 1,
      category: "Painting",
      "SI.No": 1,
      img: "https://media.istockphoto.com/id/1413205702/photo/abstract-blue-neon-stadium-background-illuminated-with-lamps-on-ground-science-product-and.jpg?b=1&s=170667a&w=0&k=20&c=LX1fWdx2ZkX5YMJlfSb3s3x3beT5ZJhC-Ghqxcf_nJ4=",
    },
    {
      id: 2,
      category: "Home cleaning",
      "SI.No": 2,
      img: "https://media.istockphoto.com/id/1357767557/photo/search-find-web-online-technology-internet-website-concept.jpg?b=1&s=170667a&w=0&k=20&c=27aNVKvJ--PiaK3upZQKWxhbLzVNWn-hSWKT6lN0iaM=",
    },
  ]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handeleDelete = (id) => {
    const filteredData = banner.filter((ele, i) => {
      return i !== id;
    });
    setBanner(filteredData);
  };

  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />

        <div className="row pt-3 m-auto" style={{ marginLeft: "-72px" }}>
         
            <div className="row  set_margin">
              <div>
                <div className="d-flex  mt-3 mb-3">
                  <Button
                    className="btn-primary-button mx-2"
                  
                    onClick={handleClick1(0)}
                  >
                    Add Category
                  </Button>
                </div>
              </div>
              <Modal
                show={show}
                onHide={handleClose}
                centered
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input type="file" />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>

              <div className="row  justify-content-center ">
              <div className="col-md-12">
                  <Table
                    className="table_container table_data text-center"
                    bordered
                    size="sm"
                    centered
                    variant
                  >
                    <thead>
                      <tr>
                        <th>SI.No</th>
                        <th>Category Name</th>
                        <th>Product Icon</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {banner.map((element, i) => {
                        return (
                          <tr key={i}>
                            <td>{element["SI.No"]}</td>
                            <td>{element.category}</td>
                            <td>
                              <img
                                className="header_logo"
                                src={element.img}
                                width={"50px"}
                                height={"50px"}
                              />
                            </td>
                            <td>
                              <Button
                              
                                style={{ margin: "5px" }}
                              >
                                Edit
                              </Button>
                              <Button
                                style={{ margin: "5px" }}
                              
                                key={i}
                                onClick={() => handeleDelete(i)}
                              >
                                Delete
                              </Button>{" "}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
       
            <div className="row  set_margin ">
              <div>
                <div className="d-flex  mt-3">
                  <h4 style={{ color: "#FF0060" }}> Category Management</h4>
                </div>
              </div>

              <Form className=" shadow p-3 mb-5 bg-body rounded">
                <Row className="mb-3">
                  <Form.Group
                    md="6"
                    className="mb-3 "
                    required
                    as={Col}
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column>Category Name</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter category name"
                    />
                  </Form.Group>
                  <Form.Group
                    md="6"
                    className="mb-3 "
                    required
                    as={Col}
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column>Category </Form.Label>
                    <Form.Select
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    >
                      <option>Home Painting</option>
                      <option>Bathroom Cleaning</option>
                      <option>Home Painting</option>
                      <option>Bathroom Cleaning</option>
                      <option>Home Painting</option>
                      <option>Bathroom Cleaning</option>
                      <option>Home Painting</option>
                      <option>Bathroom Cleaning</option>
                    </Form.Select>
                  </Form.Group>
                
                </Row>
                <Row className="mb-3">
                
                <Form.Group
                    md="6"
                    className="mb-3 "
                    required
                    as={Col}
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column>Category Banner</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                  <Form.Group
                    md="6"
                    className="mb-3 "
                    required
                    as={Col}
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column>Category icon </Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Row>
                <Button
                  className="btn-primary-button mx-2"
                
             
                >
                  Save Category
                </Button>
              </Form>
            </div>

        </div>
      </div>
    </div>
  );
}

export default CreateSubcategory;
