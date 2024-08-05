import React, { useState } from "react";
import Header from "./layout/Header";
import Sidenav from "../Sidenav";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };
function Order() {
  const [selected, setSelected] = useState(0);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };
  const [data, setData] = useState({});
   const [storeData,setStoreData] = useState([])
  const handleData = (e) => {
    const { name, value } = e.target;
    setData((previousData) => ({ ...previousData, [name]: value }));
  };
  const hadleSave = () => {setStoreData([...storeData,data])};

  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />

        <div className="d-flex float-end mt-3 mb-3">
          <button
            className="btn-primary-button mx-2 "
            style={selected == 1 ? active : inactive}
            onClick={handleClick(1)}
          >
            Order
          </button>

          <button
            style={selected == 0 ? active : inactive}
            onClick={handleClick(0)}
            className="btn-secondary-button"
          >
            All Order
          </button>
        </div>

        <div style={{ marginLeft: "-32px" }}>
          <div>
            {selected == 0 ? (
              <>
                {" "}
                <table class="table table-hover table-bordered mt-5">
                  <thead className="text-align-center">
                    <tr className="table-secondary ">
                      <th className="table-head" scope="col">
                        S.No
                      </th>
                      <th className="table-head" scope="col">
                        User Name
                      </th>
                      <th className="table-head" scope="col">
                        User Email
                      </th>
                      <th className="table-head" scope="col">
                        User Address
                      </th>
                      <th className="table-head" scope="col">
                        User Contact No.
                      </th>
                      <th className="table-head" scope="col">
                        Product Name
                      </th>
                      <th className="table-head" scope="col">
                        Product Price
                      </th>
                      <th className="table-head" scope="col">
                        Product Brand
                      </th>
                      <th className="table-head" scope="col">
                        Product Size
                      </th>
                      <th className="table-head" scope="col">
                        Product Volume
                      </th>
                      <th className="table-head" scope="col">
                        Product Image
                      </th>
                      <th className="table-head" scope="col">
                        Discount Percentage(%)
                      </th>
                      <th className="table-head" scope="col">
                        Category
                      </th>{" "}
                      <th className="table-head" scope="col">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="justify-content-center">
              {
                storeData?.map((ele,i)=>{
                  return(
                    <tr className="user-tbale-body">
                    <td className="text-center">{ele.i}</td>
                    <td className="text-center">{ele.firstname}</td>
                    <td className="text-center">{ele.email}</td>
                    <td className="text-center">
                    {ele.address}
                    </td>
                    <td className="text-center">{ele.phone}</td>
                    <td className="text-center">{ele.ProductName}</td>
                    <td className="text-center">{ele.price}</td>
                    <td className="text-center">{ele.brand}</td>
                    <td>{ele.size}</td>
                    <td>12 {ele.volume}</td>
                    <td>
                      <img
                        src={ele.image}
                        width={"30px"}
                        height={"30px"}
                      />
                    </td>
                    <td>{ele.discount}</td>
                    <td>{ele.category}</td>
                    <td>{ele.discription}</td>
                  </tr>
                  )
                })
              }
                  </tbody>
                </table>{" "}
              </>
            ) : (
              <>
                {" "}
                <div
                  className="row w-100 float-center
        card mt-4"
                >
                  <div className="row m-auto card-body p-6">
                    {/* <div className=" vucare-sub-heading pb-2">Add New Record</div> */}

                    <Form className=" shadow p-3 mb-5 bg-body rounded">
                      <h3>DELIVERY ADDRESS</h3>
                      <Row className="mb-3">
                        {" "}
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Control
                            placeholder="First Name"
                            name="firstname"
                            value={data.firstname}
                            onChange={handleData}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Control
                            placeholder="Last Name"
                            name="lastname"
                            value={data.lastname}
                            onChange={handleData}
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Control
                            placeholder="Company Name"
                            name="companyname"
                            value={data.companyname}
                            onChange={handleData}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Control
                            placeholder="Address"
                            name="address"
                            value={data.address}
                            onChange={handleData}
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            onChange={handleData}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Control
                            type="number"
                            placeholder="Phone no"
                            name="phone"
                            value={data.phone}
                            onChange={handleData}
                          />
                        </Form.Group>
                      </Row>

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          name="textarea"
                          onChange={handleData}
                          as="textarea"
                          rows={3}
                          placeholder="Additional Information"
                        />
                      </Form.Group>

                      <Button
                        onClick={hadleSave}
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Save
                      </Button>
                    </Form>
                    {/* <Form className=" shadow p-3 mb-5 bg-body rounded">
                      <h3>Product Details</h3>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Product Name</Form.Label>
                          <Form.Control
                            name="ProductName"
                            value={data.ProductName}
                            onChange={handleData}
                            type="email"
                            placeholder="Enter Product"
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>Product Price</Form.Label>
                          <Form.Control
                            name="price"
                            value={data.price}
                            onChange={handleData}
                            type="Product Price"
                            placeholder="Enter Price"
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>Price</Form.Label>
                          <Form.Select
                            defaultValue="Choose..."
                            name="price"
                            value={data.price}
                            onChange={handleData}
                          >
                            <option>Choose...</option>
                            <option>1000-5000</option>
                            <option>5000-10000</option>
                            <option>10000-15000</option>
                            <option>15000-30000</option>
                            <option>30000-above</option>
                          </Form.Select>
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label>Product Brand</Form.Label>
                          <Form.Control
                            name="brand"
                            placeholder="Product Brand"
                            value={data.brand}
                            onChange={handleData}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label>Product Size</Form.Label>
                          <Form.Select
                            name="size"
                            defaultValue="Choose..."
                            value={data.size}
                            onChange={handleData}
                          >
                            <option>Choose...</option>
                            <option>38x 28x 18cm</option>
                            <option>12Lx 12Wx 11H cm</option>
                            <option>28 x20x7.6 cm </option>
                            <option>22.5x 11 x10.5cm</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label>Choose Image</Form.Label>
                          <Form.Control
                          name='image'
                            type="file"
                            multiple
                            value={data.image}
                            onChangeIm={handleData}
                          
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridZip">
                          <Form.Label>
                            Customer Discount Percentage(%){" "}
                          </Form.Label>
                          <Form.Control
                            name="discount"
                            placeholder="Customer Discount Percentage"
                            value={data.discount}
                            onChange={handleData}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridZip">
                          <Form.Label>Category</Form.Label>
                          <Form.Control
                            name="category"
                            placeholder="Category"
                            value={data.category}
                            onChange={handleData}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridZip">
                          <Form.Label>Product Volume</Form.Label>
                          <Form.Control
                            name="volume"
                            type="number"
                            placeholder="Product Volume"
                            value={data.volume}
                            onChange={handleData}
                          />
                        </Form.Group>
                      </Row>

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Discription</Form.Label>
                        <Form.Control
                        name='discription'
                          as="textarea"
                          rows={3}
                          value={data.discription}
                          onChange={handleData}
                        />
                      </Form.Group>

                      <Button
                        onClick={hadleSave}
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Save
                      </Button>
                    </Form> */}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Order;
