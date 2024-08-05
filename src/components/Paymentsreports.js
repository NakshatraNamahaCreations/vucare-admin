import React, { useState } from "react";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Button from "react-bootstrap/Button";

function Paymentsreports() {


  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />

        <div className="row " >
          <div className="col-md-12 mt-5">
            <table class="table table-hover table-bordered ">
              <thead>
                <tr className="table-secondary">
                  <th className="table-head" scope="col">
                    S.No
                  </th>
                  <th className="table-head" scope="col">
                    Customer Name
                  </th>
                  <th className="table-head" scope="col">
                    Customer Address
                  </th>
                  <th className="table-head" scope="col">
                    Service Type
                  </th>
                  <th className="table-head" scope="col">
                    Order Date
                  </th>
                  <th className="table-head" scope="col">
                    End date
                  </th>
                  <th scope="col" className="table-head">
                    Service Price
                  </th>

                  <th scope="col" className="table-head">
                    Offer
                  </th>

                  <th scope="col" className="table-head">
                    Payment Status
                  </th>
                  <th scope="col" className="table-head">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="user-tbale-body text-center">
                  <td>1</td>
                  <td>Salman Blr VV</td>
                  <td>Banglore R.T.Nagar</td>
                  <td>Home cleaning</td>
                  <td>14-04-2023</td>
                  <td>05-06-2023</td>
                  <td>1000</td>
                  <td>10%</td>
                  <td>Paid</td>
                  <td>
                  <Button variant="success">Edit</Button>{" "}
                    <Button variant="danger">Delete</Button>{" "}
                  </td>
                </tr>
              </tbody>
            </table>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paymentsreports;
