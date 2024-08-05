import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  ProSidebar,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Sidenav() {
  const location = useLocation();
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Logout = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/super/logout/${admin?._id}`,
        method: "post",
        baseURL: "https://api.thevucare.com/api",
        headers: { "content-type": "application/json" },
        data: {},
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Signout succesfully");

          window.location.assign("/");
          sessionStorage.removeItem("admin");
        } else {
          // alert(data.response);
          alert(response.data.error);
        }
      });
    } catch (error) {
      alert("something went wrong");
    }
  };
  return (
    <div>
      <ProSidebar>
        <div className="row justify-content-center mt-2">
          <img
            src="../images/vucare.png"
            className="img-fluid"
            style={{ width: "200px" }}
          />
          <h6
            className="text-center pt-1"
            style={{ color: "black", fontWeight: "bold", fontSize: "21px" }}
          >
            VU CARE
          </h6>
        </div>
        <Menu iconShape="square">
          <MenuItem className={location.pathname === "/home" ? "active" : ""}>
            <Link to="/home">
              <span
                style={{
                  color: location.pathname === "/home" ? "white" : "",
                }}
              >
                Dashboard
              </span>
            </Link>
          </MenuItem>

          <SubMenu title="Banners">
            <MenuItem
              className={location.pathname === "/spotlight" ? "active" : ""}
            >
              <Link to="/spotlight">
                <span
                  style={{
                    color: location.pathname === "/spotlight" ? "white" : "",
                  }}
                >
                  Spotlight Banner
                </span>
              </Link>
            </MenuItem>
            <MenuItem
              className={location.pathname === "/websitebanner" ? "active" : ""}
            >
              <Link to="/websitebanner">
                <span
                  style={{
                    color:
                      location.pathname === "/websitebanner" ? "white" : "",
                  }}
                >
                  Website Banner
                </span>
              </Link>
            </MenuItem>

            <MenuItem
              className={location.pathname === "/SubCateBanner" ? "active" : ""}
            >
              <Link to="/SubCateBanner">
                <span
                  style={{
                    color:
                      location.pathname === "/SubCateBanner" ? "white" : "",
                  }}
                >
                  Subcategory Banner
                </span>
              </Link>
            </MenuItem>
          </SubMenu>

          <MenuItem className={location.pathname === "/slots" ? "active" : ""}>
            <Link to="/slots">
              <span
                style={{
                  color: location.pathname === "/slots" ? "white" : "",
                }}
              >
                Slots
              </span>
            </Link>
          </MenuItem>
          <MenuItem className={location.pathname === "/promo" ? "active" : ""}>
            <Link to="/promo">
              <span
                style={{
                  color: location.pathname === "/promo" ? "white" : "",
                }}
              >
                Promo Code
              </span>
            </Link>
          </MenuItem>
          <MenuItem className={location.pathname === "/city" ? "active" : ""}>
            <Link to="/city">
              <span
                style={{
                  color: location.pathname === "/city" ? "white" : "",
                }}
              >
                City
              </span>
            </Link>
          </MenuItem>

          <MenuItem
            className={location.pathname === "/userManagement" ? "active" : ""}
          >
            <Link to="/userManagement">
              <span
                style={{
                  color: location.pathname === "/userManagement" ? "white" : "",
                }}
              >
                UserManagement
              </span>
            </Link>
          </MenuItem>
          <SubMenu title="Category Management">
            <MenuItem
              className={location.pathname === "/category" ? "active" : ""}
            >
              <Link to="/category">
                <span
                  style={{
                    color: location.pathname === "/category" ? "white" : "",
                  }}
                >
                  Category
                </span>
              </Link>
            </MenuItem>
            <MenuItem
              className={location.pathname === "/subcategory" ? "active" : ""}
            >
              <Link to="/subcategory">
                <span
                  style={{
                    color: location.pathname === "/subcategory" ? "white" : "",
                  }}
                >
                  Subcategory
                </span>
              </Link>
            </MenuItem>
          </SubMenu>
          <SubMenu
            title="Services Management"
            className={location.pathname === "/Service" ? "active" : ""}
          >
            <MenuItem
              className={location.pathname === "/Service" ? "active1" : ""}
            >
              <Link to="/Service">
                <span
                  style={{
                    color: location.pathname === "/Service" ? "white" : "",
                  }}
                >
                  Add Service
                </span>
              </Link>
            </MenuItem>
            <MenuItem
              className={
                location.pathname === "/service-add-ons" ? "active1" : ""
              }
            >
              <Link to="/service-add-ons">
                <span
                  style={{
                    color:
                      location.pathname === "/service-add-ons" ? "white" : "",
                  }}
                >
                  Service Add-on's
                </span>
              </Link>
            </MenuItem>
          </SubMenu>

          <MenuItem
            className={location.pathname === "/ServiceBooking" ? "active" : ""}
          >
            <Link to="/ServiceBooking">
              <span
                style={{
                  color: location.pathname === "/ServiceBooking" ? "white" : "",
                }}
              >
                Services Booking
              </span>
            </Link>
          </MenuItem>

          <MenuItem
            className={location.pathname === "/Paymentsreports" ? "active" : ""}
          >
            <Link to="/Paymentsreports">
              <span
                style={{
                  color:
                    location.pathname === "/Paymentsreports" ? "white" : "",
                }}
              >
                Payments and Reports
              </span>
            </Link>
          </MenuItem>

          <MenuItem
            className={location.pathname === "/settings" ? "active" : ""}
          >
            <Link to="/settings">
              <span
                style={{
                  color: location.pathname === "/settings" ? "white" : "",
                }}
              >
                Settings
              </span>
            </Link>
          </MenuItem>
          <MenuItem>
            <a onClick={handleShow}>Logout</a>
          </MenuItem>
        </Menu>
      </ProSidebar>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body style={{ fontSize: "20px", textAlign: "center" }}>
            Are you sure you wnat to logout
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              NO
            </Button>
            <Button variant="primary" onClick={Logout}>
              YES
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Sidenav;
