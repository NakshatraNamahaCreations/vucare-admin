import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidenav from "./Sidenav";
import Header from "./Header";
import { Button, ButtonToolbar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function Vendordetails() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();
  console.log(id);
  const [techniciandata, settechniciandata] = useState([]);
  useEffect(() => {
    gettechnician();
  }, []);

  const gettechnician = async () => {
    let res = await axios.get("https://api.thevucare.com/api/getalltechnician");
    if ((res.status = 200)) {
      settechniciandata(
        res.data?.technician.filter((i) => i.Type === "Vendor" && i._id == id)
      );
    }
  };
  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />

        <div>
          <h3 style={{ color: "#03b162" }}>Vendor Details</h3>
        </div>
        <div className="row">
          <div className="col-6">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              className="img"
            />
            <p className="vp">
              Name:
              <b>{techniciandata[0]?. vucarename}</b>
            </p>
            <p className="vp">
              Number:
              <b>{techniciandata[0]?.number}</b>
            </p>
            <p className="vp">
              Experiance:
              <b>{techniciandata[0]?.experiance}</b>
            </p>
            <p className="vp">
              Language:
              <b>{techniciandata[0]?.languagesknow}</b>
            </p>
            <p className="vp">
              Password:
              <b>{techniciandata[0]?.password}</b>
            </p>
          </div>
          <div className="mt-5 col-6">
            <div className="wallet">
              <div>
                <i
                  class="fa-solid fa-wallet fa-beat"
                  style={{ color: "rgb(139, 20, 20)", fontSize: "60px" }}
                ></i>
              </div>
              <div>
                <h3>
                  <b>Wallet Balance</b>
                </h3>
                <div>
                  <b style={{ fontSize: "25px" }}>
                    <i class="fa-solid fa-indian-rupee-sign"></i>12000
                  </b>
                </div>

                <Button
                  style={{
                    background: "rgb(176, 39, 39)",
                    marginTop: "10px",
                    border: "none",
                  }}
                  onClick={handleShow}
                >
                  Recharge{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Recharge to vendor wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="password"
              class="form-control mt-4"
              placeholder="100"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{
                width: "100%",
      
                borderRadius: "3px",
                borderLeft: "2px solid #a9042e",
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              CANCLE
            </Button>
            <Button variant="primary" onClick={handleClose}>
              ADD
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Vendordetails;
