import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";
import Modal from "react-bootstrap/Modal";

function Login() {
  const [emailOrName, setEmailOrName] = useState("");
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const apiURL = process.env.REACT_APP_API_URL;

  const Login = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/super/loginSuperAdmin",
        method: "post",
        baseURL: "http://localhost:8008/api",
        headers: { "content-type": "application/json" },
        data: { emailorphone: emailOrName, password: password },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          // alert("Login Success");
          sessionStorage.setItem("admin", JSON.stringify(response.data.user));

          window.location.assign("/home");
        } else {
          // alert(data.response);
          alert(response.data.error);
        }
      });
    } catch (error) {
      alert("Invalid email and password");
    }
  };

  return (
    <div  style={{
      height: "100vh",
      backgroundImage: `url('./images/bg1.png')`,
      backgroundSize: 'cover', // This property ensures the image covers the entire div.
      backgroundPosition: 'center', // This property centers the image.
    }}>
      <div
        className="row justify-content-center"
        style={{ alignItems: "center", height: "100vh" }}
      >
        <div className="col-10" style={{ marginTop: "" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{}} className="">
             
              <Card
                style={{
                  boxShadow: "0px 0px 5px 1px lightgreen",
                  backgroundColor: "lightgreen",
                  padding: 50,
                  width: 600,
                }}
              >
                 <h1
                style={{
                  color: "green",
                  fontSize: "50px",
                  textAlign: "center",
                }}
              >
              Admin
              </h1>
                <div>
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {/* <img src="/images/ vucare.png" style={{ width: "80px" }} /> */}

                    <h4 className="mt-3">LOGIN TO YOUR ACCOUNT</h4>
                  </div>
                  <div className="inputlogin " style={{ marginTop: "50px" }}>
                    <div
                      class="input-group mb-4 mt-3"
                      style={{ display: "block", width: "100%" }}
                    >
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email/Name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        style={{
                          width: "60%",
                          marginLeft: "20%",
                          borderRadius: "3px",
                         
                          marginTop: "10px",
                        }}
                        onChange={(e) => setEmailOrName(e.target.value)}
                      />
                      <input
                        type="password"
                        class="form-control mt-4"
                        placeholder="Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        style={{
                          width: "60%",
                          marginLeft: "20%",
                          borderRadius: "3px",
                          
                        }}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </div>
                  </div>
                

                  <div className="text-center pt-3">
                    <Button
                      style={{
                        width: "60%",
                        padding: "8px",
                        backgroundColor: "gold",
                        border: "none",
                        fontWeight: "bold",
                        color:"green",
                        fontSize:"18px"
                      }}
                      onClick={Login}
                    >
                      Login
                    </Button>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      marginTop: "10px",
                      textAlign: "center",
                    }}
                  >
                    <b>Never share your login details with anyone.</b>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
