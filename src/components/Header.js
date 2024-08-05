import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import moment from "moment";
export default function Header() {
  return (
    <div className="row m-auto">
      <div style={{ background: "#03b162", padding: "10px" }}>
        <div className="row ">
          <div className="col-md-4">
            <p
              style={{
                color: "white",
                fontSize: "18px",
                padding: "3px",
                marginBottom: "0",
              }}
            >
              THE VU CARE
            </p>
          </div>
          <div className="col-md-4">
            <p
              style={{
                color: "white",
                fontSize: "18px",
                padding: "3px",
                marginBottom: "0",
                textAlign: "center",
              }}
            >
              {" "}
              {moment().format("MMMM Do YYYY, h:mm:ss a")}
            </p>
          </div>
          <div className="col-md-4" style={{ textAlign: "end" }}>
            {/* <img
              src="/images/ vucare.png"
              className="img-fluid"
              style={{ width: "40px", textAlign: "end" }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
