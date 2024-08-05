import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "./Sidenav";
import Header from "./Header";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

function ServiceAddOns() {
  const [data1, setdata1] = useState([]);
  const [category, setCategory] = useState("");
  const [addOnsName, setAddOnsName] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [description, setDescription] = useState("");
  const [addonImage, setAddonImage] = useState("");

  const [filterdata, setfilterData] = useState([]);

  const [addOnsData, setAddOnsData] = useState([]);

  const [editCategoryName, setEditCategoryName] = useState("");
  const [editAddonsName, setEditAddonsName] = useState("");
  const [editAddOnsImage, setEditAddOnsImage] = useState("");
  const [editAddOnsOfferPrice, setEditAddOnsOfferPrice] = useState("");
  const [editAddOnsPrice, setEditAddOnsPrice] = useState("");
  const [editAddOnsDescription, setEditAddOnsDescription] = useState("");
  const [editAddOnsData, setEditAddOnsData] = useState({});
  const [servicedata, setServicedata] = useState([]);

  const formdata = new FormData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (subcategory) => {
    setEditAddOnsData(subcategory);
    handleShow(true);
  };

  useEffect(() => {

    getAllAddOns();
  }, []);

 
  const addAddOns = async (e) => {
    e.preventDefault();
    formdata.append("addOnsCategory", category);
    formdata.append("addOnsName", addOnsName);
    formdata.append("addOnsPrice", price);
    formdata.append("addOnsOfferPrice", offerPrice);
    formdata.append("addOnsDescription", description);
    formdata.append("addOnsImage", addonImage);
    try {
      const config = {
        url: "/userapp/addServiceAddOns",
        method: "post",
        baseURL: "https://api.thevucare.com/api",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert(response.data.success);
          window.location.reload();
        }
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
        console.log("Error response data:", error.response.data);
      } else if (error.request) {
        alert("Network error. Please try again later.");
      } else {
        alert("An unexpected error occurred. Please try again later.");
        console.log("Error:", error.message);
      }
    }
  };

  const getAllAddOns = async () => {
    let res = await axios.get(
      "https://api.thevucare.com/api/userapp/getServiceAddOns"
    );
    if (res.status === 200) {
      console.log(res);
      setAddOnsData(res.data?.AddOns);
      setfilterData(res.data?.AddOns);
    }
  };

  const editAddons = async (e) => {
    e.preventDefault();
    try {
      formdata.append("addOnsCategory", editCategoryName);
      formdata.append("addOnsName", editAddonsName);
      formdata.append("addOnsPrice", editAddOnsPrice);
      formdata.append("addOnsOfferPrice", editAddOnsOfferPrice);
      formdata.append("addOnsDescription", editAddOnsDescription);
      if (editAddOnsImage) {
        formdata.append("addOnsImage", editAddOnsImage);
      }
      const config = {
        url: `/userapp/updateServiceAddOns/${editAddOnsData._id}`,
        method: "put",
        baseURL: "https://api.thevucare.com/api",
        headers: { "Content-Type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert(response.data.message);
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      console.log("error", error);
      alert("Unable to update the addon's");
    }
  };

  const deleteAddOns = async (id) => {
    axios({
      method: "delete",
      url: "https://api.thevucare.com/api/userapp/deleteServiceAddOns/" + id,
    })
      .then(function (response) {
        console.log(response);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Category ",
      selector: (row) => row.addOnsCategory,
    },
    {
      name: "Add-On's Name ",
      selector: (row) => row.addOnsName,
    },
    {
      name: "Price  ",
      selector: (row) => row.addOnsPrice,
    },
    {
      name: "Offer Price",
      cell: (row) => row.addOnsOfferPrice,
    },
    {
      name: "Description",
      cell: (row) => row.addOnsDescription.substring(0, 50),
    },
    {
      name: "Add-Ons Image",
      cell: (row) => (
        <div>
          <img
          src={`https://api.thevucare.com/addOns/${row.addOnsImage}`}
            width="50px"
            height="50px"
            alt=""
          />
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <span
            className="hyperlink"
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(row)}
          >
            Edit |
          </span>
          <span
            onClick={() => deleteAddOns(row._id)}
            className="hyperlink mx-1"
            style={{ cursor: "pointer" }}
          >
            Delete
          </span>
        </div>
      ),
    },
  ];


  useEffect(() => {
    getservicemanagement();
  }, []);

  const getservicemanagement = async () => {
    let res = await axios.get("https://api.thevucare.com/api/userapp/getservices");
    if ((res.status = 200)) {
      setServicedata(res.data?.service);

    }
  };
  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        <div className="row m-auto mt-3">
          <h3>Service Add-on's</h3>
          <div className="col-md-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">
                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className=" vucare-input-label">
                        Service Name<span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <select
                          className="col-md-12  vucare-input-value"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option>---SELECT---</option>
                          {servicedata.map((i) => (
                            <option value={i.serviceName}>{i.serviceName}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className=" vucare-input-label">
                        Add-On's Name <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className=" vucare-input-value col-md-12"
                          onChange={(e) => setAddOnsName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className=" vucare-input-label">Price </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12  vucare-input-value"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 mt-4">
                      <div className=" vucare-input-label">Offering Price </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12  vucare-input-value"
                          onChange={(e) => setOfferPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 mt-4">
                      <div className=" vucare-input-label">Description </div>
                      <div className="group pt-1">
                        <Form.Control
                          as="textarea"
                          placeholder="Exclude description"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 mt-4">
                      <div className=" vucare-input-label">Upload Image </div>
                      <div className="group pt-1">
                        <input
                          type="file"
                          className="col-md-12  vucare-input-value"
                          onChange={(e) => setAddonImage(e.target.files[0])}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row pt-3 justify-content-center">
                    <div className="col-md-2">
                      <button className=" vu-button vucare_btn" onClick={addAddOns}>
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-5">
              {/* <input
                type="text"
                placeholder="Search here.."
                className="w-25 form-control"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              /> */}
            </div>
            <div className="mt-1 border">
              <DataTable
                columns={columns}
                data={filterdata}
                pagination
                fixedHeader
                selectableRowsHighlight
                subHeaderAlign="left"
                highlightOnHover
              />
            </div>
          </div>
        </div>

        {/* edit addons */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Add-On's</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className=" vucare-input-label">Category</div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12  vucare-input-value"
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        value={data1.id}
                      >
                        {data1.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className=" vucare-input-label">Add-On's Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12  vucare-input-value"
                        onChange={(e) => setEditAddonsName(e.target.value)}
                        defaultValue={
                          editAddonsName || editAddOnsData
                            ? editAddOnsData.addOnsName
                            : ""
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className=" vucare-input-label">Price </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12  vucare-input-value"
                        onChange={(e) => setEditAddOnsPrice(e.target.value)}
                        defaultValue={
                          editAddOnsPrice || editAddOnsData
                            ? editAddOnsData.addOnsPrice
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-4">
                    <div className=" vucare-input-label">Offering Price </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12  vucare-input-value"
                        onChange={(e) =>
                          setEditAddOnsOfferPrice(e.target.value)
                        }
                        defaultValue={
                          editAddOnsOfferPrice || editAddOnsData
                            ? editAddOnsData.addOnsOfferPrice
                            : ""
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-4">
                    <div className=" vucare-input-label">Upload Image </div>
                    <div className="group pt-1">
                      <input
                        type="file"
                        className="col-md-12  vucare-input-value"
                        onChange={(e) => setEditAddOnsImage(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
                <div className="col mt-4">
                  <div className=" vucare-input-label">Description </div>
                  <div className="group pt-1">
                    <Form.Control
                      as="textarea"
                      className="col-md-12  vucare-input-value"
                      style={{ height: "fit-content" }}
                      onChange={(e) => setEditAddOnsDescription(e.target.value)}
                      defaultValue={
                        editAddOnsDescription || editAddOnsData
                          ? editAddOnsData.addOnsDescription
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className=" vu-button vucare_btn"  onClick={editAddons}>
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default ServiceAddOns;
