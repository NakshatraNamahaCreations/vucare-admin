import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import Sidenav from "./Sidenav";
import Header from "./Header";

function City() {
  const [city, setCity] = useState("");

  const [Citydata, setCitydata] = useState([]);
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [editCityData, seteditCityData] = useState({});
  const [editCityName, seteditCityName] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (subCity) => {
    seteditCityData(subCity);
    handleShow(true);
  };

  const postCity = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/master/addcity",
        method: "post",
        baseURL: "https://api.thevucare.com/api",
        data: { city: city },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/city");
        }
      });
    } catch (error) {
      console.error(error);
      alert("City  Not Added");
    }
  };

  const onUpdate = () => {
    // Function to update your data when editing is successful
    // You can call this function after updating the City data
    getCity(); // For example, re-fetch the data after an update
  };

  useEffect(() => {
    getCity();
  }, []);

  const getCity = async () => {
    let res = await axios.get("https://api.thevucare.com/api/master/getcity");
    if ((res.status = 200)) {
      setCitydata(res.data?.mastercity);
      setfilterdata(res.data?.mastercity);
    }
  };
  console.log(editCityData, editCityData);
  const editCity = async (e) => {
    e.preventDefault();
    try {
      const catagoryId = editCityData._id;
      const config = {
        url: `/master/editcity/${catagoryId}`,
        method: "post",
        baseURL: "https://api.thevucare.com/api",
        data: { city: editCityName },
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert("Successfully Updated");
        console.log(response.data);
        window.location.reload();
        onUpdate();
        handleClose();
      } else {
        alert("City not updated");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },

    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => handleEdit(row)}>
            Edit |
          </a>
          <a onClick={() => deleteCity(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const result = Citydata.filter((item) => {
      return item.city.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deleteCity = async (id) => {
    axios({
      method: "post",
      url: "https://api.thevucare.com/api/master/deletecity/" + id,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };

  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        <div className="row m-auto">
          <h3>City</h3>
          <div className="col-md-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">
                <div>
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="vucare-input-label">
                          City <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vucare-input-value"
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row pt-3">
                      <div className="col-md-2">
                        <button className="vu-button" onClick={postCity}>
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <input
                type="text"
                placeholder="Search here.."
                className="w-25 form-control"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
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

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit City</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-body p-3">
              <form>
                <div className="col-md-12">
                  <div className="vucare-input-label">
                    City <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vucare-input-value"
                      onChange={(e) => seteditCityName(e.target.value)}
                      defaultValue={
                        editCityName || editCityData ? editCityData.city : ""
                      }
                    />
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vu-button" onClick={editCity}>
                      Save
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

export default City;
