import { React, useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Sidenav from "./Sidenav";
import Header from "./Header";
import axios from "axios";

const active1 = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive1 = { color: "black", backgroundColor: "white" };

function Homepagebanner() {
  const [selected1, setSelected1] = useState(0);

  const [banner, setBanner] = useState("");
  const [category, setcategory] = useState("");
  const [categorydata, setcategorydata] = useState([]);
  const [bannerdata, setBannerdata] = useState([]);
  const formdata = new FormData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(banner);
  const postbanner = async (e) => {
    e.preventDefault();
    console.log(banner);
    formdata.append("banner", banner);
    formdata.append("category", category);

    try {
      const config = {
        url: "/userapp/addhomebanner",
        method: "post",
        baseURL: "https://api.thevucare.com/api",

        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/homepagebanner");
        }
      });
    } catch (error) {
      console.error(error);
      alert("banner  Not Added");
    }
  };
  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get("https://api.thevucare.com/api/getcategory");
    if ((res.status = 200)) {
      setcategorydata(res.data?.category);
    }
  };

  useEffect(() => {
    getbannerimg();
  }, []);

  const getbannerimg = async () => {
    let res = await axios.get("https://api.thevucare.com/api/userapp/getallhomebanner");
    if ((res.status = 200)) {
      setBannerdata(res.data?.homebanner);
      console.log(res.data?.homebanner);
    }
  };

  const deletebannerimg = async (id) => {
    axios({
      method: "post",
      url: "https://api.thevucare.com/api/userapp/deletehomebanner/" + id,
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
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />
        <div className="row  set_margin ">
          <div>
            <div className="d-flex  mt-3">
              <h4 style={{ color: "#FF0060" }}>Banners </h4>
            </div>
          </div>
        </div>
        <div className="row pt-3 m-auto" style={{ marginLeft: "-72px" }}>
          <div className="row  set_margin">
            <div>
              <div className="d-flex  mt-3 mb-3">
                <Button
                  className="btn-primary-button mx-2"
                
                  onClick={handleShow}
                >
                  Add Banner img
                </Button>
              </div>
            </div>

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
                      <th>Category</th>

                      <th>Banner Images</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bannerdata.map((element, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{element.category}</td>

                          <td>
                            <img
                              className="header_logo"
                            src={`https://api.thevucare.com/homepagebanner/${element.banner}`}
                              width={"100px"}
                              height={"50px"}
                            />
                          </td>

                          <td>
                            <Button
                              style={{
                                margin: "5px",
                                fontSize: "12px",
                                padding: "6px",
                              }}
                              onClick={() => deletebannerimg(element._id)}
                            
                              key={i}
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
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Banners</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className=" vucare-input-label mt-3">
             <b>Select  file </b> <span className="text-danger"> *</span>
            </div>
            <input type="file" onChange={(e) => setBanner(e.target.files[0])} />
            <div className="mt-3" style={{ fontSize: "13px" }}>
              <b>Note :</b> width=300px,height=150px

            </div>

            <div className=" vucare-input-label mt-3">
              Catagory <span className="text-danger"> *</span>
            </div>
            <div className="group pt-1">
              <select
                className="col-md-6  vucare-input-value"
                onChange={(e) => setcategory(e.target.value)}
              >
                <option>-- Select category--</option>
                {categorydata.map((i) => (
                  <option value={i.category}>{i.category}</option>
                ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={postbanner}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default Homepagebanner;
