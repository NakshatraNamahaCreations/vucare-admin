import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidenav from "./Sidenav";
import Header from "./Header";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

function WhatsappAndPhone() {
  const [data1, setdata1] = useState([]);
  const [category, setCategory] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [filterdata, setfilterData] = useState([]);

  const [numbersData, setNumbersData] = useState([]);

  const [editCategoryName, setEditCategoryName] = useState("");
  const [editWhatsAppNumber, setEditWhatsAppNumber] = useState("");
  const [editMobileNumber, setEditMobileNumber] = useState("");

  const [editNumberData, setEditNumberData] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (subcategory) => {
    setEditNumberData(subcategory);
    handleShow(true);
  };

  useEffect(() => {
    getcategory();
    getAllNumbers();
  }, []);

  const getcategory = async () => {
    let res = await axios.get("https://api.thevucare.com/api/getcategory");
    if (res.status === 200) {
      setdata1(res.data?.category);
      console.log(res.data?.category);
    }
  };
  const addNumbers = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/userapp/addNumbers",
        method: "post",
        baseURL: "https://api.thevucare.com/api",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          numbersCategory: category,
          whatsappNumber: whatsAppNumber,
          phoneNumber: mobileNumber,
        },
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

  const getAllNumbers = async () => {
    let res = await axios.get(
      "https://api.thevucare.com/api/userapp/getwhatsNumbers"
    );
    if (res.status === 200) {
      console.log(res);
      setNumbersData(res.data?.numbersData);
      setfilterData(res.data?.numbersData);
    }
  };
  console.log("numbersData", numbersData);

  const editNumbers = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/userapp/updateWhatsAppNumber/${editNumberData._id}`,
        method: "put",
        baseURL: "https://api.thevucare.com/api",
        headers: { "Content-Type": "application/json" },
        data: {
          numbersCategory: editCategoryName,
          whatsappNumber: editWhatsAppNumber,
          phoneNumber: editMobileNumber,
        },
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

  const deleteNumbers = async (id) => {
    axios({
      method: "delete",
      url: "https://api.thevucare.com/api/userapp/deletenumbers/" + id,
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
      selector: (row) => row.numbersCategory,
    },
    {
      name: "WhatsApp",
      selector: (row) => row.whatsappNumber,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.phoneNumber,
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
            onClick={() => deleteNumbers(row._id)}
            className="hyperlink mx-1"
            style={{ cursor: "pointer" }}
          >
            Delete
          </span>
        </div>
      ),
    },
  ];

  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        <div className="row m-auto mt-3">
          <h3>WhatsApp & Mobile Number</h3>
          <div className="col-md-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">
                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className=" vucare-input-label">
                        Category <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <select
                          className="col-md-12  vucare-input-value"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option>---SELECT---</option>
                          {data1.map((i) => (
                            <option value={i.category}>{i.category}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className=" vucare-input-label">Whatsapp Number</div>
                      <div className="group pt-1">
                        <input
                          type="tel"
                          className=" vucare-input-value col-md-12"
                          onChange={(e) => setWhatsAppNumber(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className=" vucare-input-label">Mobile Number </div>
                      <div className="group pt-1">
                        <input
                          type="tel"
                          className="col-md-12  vucare-input-value"
                          onChange={(e) => setMobileNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row pt-3 justify-content-center">
                    <div className="col-md-2">
                      <button className=" vu-button vucare_btn" onClick={addNumbers}>
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
            <Modal.Title>Edit</Modal.Title>
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
                    <div className=" vucare-input-label">WhatsApp Number</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12  vucare-input-value"
                        onChange={(e) => setEditWhatsAppNumber(e.target.value)}
                        defaultValue={
                          editWhatsAppNumber || editNumberData
                            ? editNumberData.whatsappNumber
                            : ""
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className=" vucare-input-label">Mobile Number </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12  vucare-input-value"
                        onChange={(e) => setEditMobileNumber(e.target.value)}
                        defaultValue={
                          editMobileNumber || editNumberData
                            ? editNumberData.phoneNumber
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className=" vu-button vucare_btn" onClick={editNumbers}>
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

export default WhatsappAndPhone;
