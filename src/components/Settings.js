import React, { useState, useEffect } from "react";
import Sidenav from "./Sidenav";
import Header from "./Header";
import axios from "axios";

function Settings() {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newcPassword, setnewcPassword] = useState("");
  const admin=JSON.parse(sessionStorage.getItem("admin"));
  console.log(admin)

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/super/changepassword/${admin?._id}`,
        method: "post",
        baseURL: "https://api.thevucare.com/api",
        headers: { "content-type": "application/json" },
        data: {
          oldPassword: oldPassword,
          newPassword: newPassword,
          newcPassword: newcPassword,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("New password updated");

          window.location.assign("/settings");
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
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />
        <h4 style={{ color: "#03b162" }}>Setting</h4>
        <div
          className="shadow-lg p-3 mb-5 bg-white rounded"
          style={{ marginTop: "20px", width: "500px" }}
        >
          <div
            className="card-body p-4"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <form>
              <div className=" vucare-sub-heading">Change Password</div>
              <div className="col-md-12 pt-2">
                <div className=" vucare-input-label">Old Password</div>
                <div className="group pt-1">
                  <input
                    type="text"
                    className="col-md-12  vucare-input-value"
                    onChange={(e) => setoldPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className=" pt-2 mt-3">
                <div className=" vucare-input-label">New Password</div>
                <div className="group pt-1">
                  <input
                    type="text"
                    onChange={(e) => setnewPassword(e.target.value)}
                    className="col-md-12  vucare-input-value"
                  />
                </div>
              </div>
              <div className="pt-2 mt-3">
                <div className=" vucare-input-label">New Password Confirmed</div>
                <div className="group pt-1">
                  <input
                    type="text"
                    onChange={(e) => setnewcPassword(e.target.value)}
                    className="col-md-12  vucare-input-value"
                  />
                </div>
              </div>

              <div className="row pt-3 justify-content-center">
                <div className="">
                  <button
                    className=" vu-button vucare_btn"
                    style={{ width: "140px", }}
                    onClick={changePassword}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
