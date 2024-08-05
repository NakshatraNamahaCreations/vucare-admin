import React, { useState } from "react";
import Header from "../layout/Header";
import Nav from "../Nav1";
import Modal from "react-bootstrap/Modal";
function Whatsapptemplate() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Header />
      <Nav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="mt-4">
            Page{" "}
            <span>
              <select className="vh-user-select">
                <option>1</option>
              </select>
            </span>{" "}
            of 1
          </div>{" "}
          <table class="table table-hover table-bordered mt-2">
            <thead className="">
              <tr>
                <th style={{ width: "10%" }} scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th style={{ width: "20%" }} scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>

                <th style={{ width: "40%" }} scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th style={{ width: "20%" }} scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th style={{ width: "10%" }} scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
              </tr>

              <tr className="table-secondary">
                <th style={{ width: "10%" }} className="table-head" scope="col">
                  Sr
                </th>
                <th style={{ width: "20%" }} className="table-head" scope="col">
                  Template Name
                </th>
                <th style={{ width: "40%" }} className="table-head" scope="col">
                  WhatsApp Template
                </th>
                <th style={{ width: "20%" }} className="table-head" scope="col">
                  Variables
                </th>
                <th style={{ width: "10%" }} className="table-head" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="user-tbale-body">
                <td className="text-center">1</td>
                <td>Call Added (Cleaning)</td>
                <td>
                  <p>
                    Dear <b>Customer_name</b>
                  </p>
                  <p>
                    This Is Confirmation That Your <b>Job_type</b> Service Is
                    Booked On <b>Call_date</b> Technician Will Be Arriving For
                    Delivering The Service,
                  </p>
                  <p>Team Profile</p>
                  <p>
                    Name : <b>Technician_name</b>{" "}
                  </p>
                  <p>
                    Experience : <b>Technician_experiance</b>{" "}
                  </p>
                  <p>
                    Languages Known : <b>Technician_name</b>
                  </p>
                  <p>
                    Safety
                    <br />
                    Temperature Checked
                    <br />
                    Team Will Wear Mask
                    <br />
                    Equipments Are Completely Sanitized
                  </p>
                  <p>
                    If You Need Any Clarification On Schedule Please Call Our
                    Operational Manager <b>Staff_name</b> Contact Number{" "}
                    <b>Staff_contact </b>
                  </p>
                  <p>*Newly Launched Services*</p>
                  <p>
                    *Commercial Housekeeping* | Security Services | *Facility
                    Management* | Payroll Management | *Corporate Pest
                    Management*
                  </p>
                  <p>
                    Thank You
                    <br />
                    Www.Vijayhomeservices.Com
                  </p>
                </td>
                <td>
                  <p>Customer_name</p>
                  <p>Job_type</p>
                  <p>Call_date</p>
                  <p>Technician_name</p>
                  <p>Technician_experiance</p>
                  <p>Technician_languages_known</p>
                  <p>Staff_name</p>
                  <p>Staff_contact</p>
                </td>

                <td>
                  <div className="d-flex">
                    <a href="#" className="hyperlink" onClick={handleShow}>
                      Edit
                    </a>
                  </div>
                </td>
              </tr>

              <tr className="user-tbale-body">
                <td className="text-center">2</td>
                <td>Call Added (Painting)</td>
                <td>
                  <p>
                    Dear <b>Customer_name</b>
                  </p>
                  <p>
                    This Is Confirmation That Your <b>Job_type</b> Service Is
                    Booked On <b>Call_date</b> Technician Will Be Arriving For
                    Delivering The Service,
                  </p>
                  <p>Team Profile</p>
                  <p>
                    Name : <b>Technician_name</b>{" "}
                  </p>
                  <p>
                    Experience : <b>Technician_experiance</b>{" "}
                  </p>
                  <p>
                    Languages Known : <b>Technician_name</b>
                  </p>
                  <p>
                    Safety
                    <br />
                    Temperature Checked
                    <br />
                    Team Will Wear Mask
                    <br />
                    Equipments Are Completely Sanitized
                  </p>
                  <p>
                    If You Need Any Clarification On Schedule Please Call Our
                    Operational Manager <b>Staff_name</b> Contact Number{" "}
                    <b>Staff_contact </b>
                  </p>
                  <p>*Newly Launched Services*</p>
                  <p>
                    *Commercial Housekeeping* | Security Services | *Facility
                    Management* | Payroll Management | *Corporate Pest
                    Management*
                  </p>
                  <p>
                    Thank You
                    <br />
                    Www.Vijayhomeservices.Com
                  </p>
                </td>
                <td>
                  <p>Customer_name</p>
                  <p>Job_type</p>
                  <p>Call_date</p>
                  <p>Technician_name</p>
                  <p>Technician_experiance</p>
                  <p>Technician_languages_known</p>
                  <p>Staff_name</p>
                  <p>Staff_contact</p>
                </td>

                <td>
                  <div className="d-flex">
                    <a href="#" className="hyperlink" onClick={handleShow}>
                      Edit
                    </a>
                  </div>
                </td>
              </tr>

              <tr className="user-tbale-body">
                <td className="text-center">3</td>
                <td>Enquiry Save (Cleaning)</td>
                <td>
                  <p>
                    Dear <b>Customer_name</b>
                  </p>
                  <p>
                    This Is Confirmation That Your <b>Job_type</b> Service Is
                    Booked On <b>Call_date</b> Technician Will Be Arriving For
                    Delivering The Service,
                  </p>
                  <p>Team Profile</p>
                  <p>
                    Name : <b>Technician_name</b>{" "}
                  </p>
                  <p>
                    Experience : <b>Technician_experiance</b>{" "}
                  </p>
                  <p>
                    Languages Known : <b>Technician_name</b>
                  </p>
                  <p>
                    Safety
                    <br />
                    Temperature Checked
                    <br />
                    Team Will Wear Mask
                    <br />
                    Equipments Are Completely Sanitized
                  </p>
                  <p>
                    If You Need Any Clarification On Schedule Please Call Our
                    Operational Manager <b>Staff_name</b> Contact Number{" "}
                    <b>Staff_contact </b>
                  </p>
                  <p>*Newly Launched Services*</p>
                  <p>
                    *Commercial Housekeeping* | Security Services | *Facility
                    Management* | Payroll Management | *Corporate Pest
                    Management*
                  </p>
                  <p>
                    Thank You
                    <br />
                    Www.Vijayhomeservices.Com
                  </p>
                </td>
                <td>
                  <p>Customer_name</p>
                  <p>Job_type</p>
                  <p>Call_date</p>
                  <p>Technician_name</p>
                  <p>Technician_experiance</p>
                  <p>Technician_languages_known</p>
                  <p>Staff_name</p>
                  <p>Staff_contact</p>
                </td>

                <td>
                  <div className="d-flex">
                    <a href="#" className="hyperlink">
                      Edit
                    </a>
                  </div>
                </td>
              </tr>

              <tr className="user-tbale-body">
                <td className="text-center">4</td>
                <td>Enquiry Save (Painting)</td>
                <td>
                  <p>
                    Dear <b>Customer_name</b>
                  </p>
                  <p>
                    This Is Confirmation That Your <b>Job_type</b> Service Is
                    Booked On <b>Call_date</b> Technician Will Be Arriving For
                    Delivering The Service,
                  </p>
                  <p>Team Profile</p>
                  <p>
                    Name : <b>Technician_name</b>{" "}
                  </p>
                  <p>
                    Experience : <b>Technician_experiance</b>{" "}
                  </p>
                  <p>
                    Languages Known : <b>Technician_name</b>
                  </p>
                  <p>
                    Safety
                    <br />
                    Temperature Checked
                    <br />
                    Team Will Wear Mask
                    <br />
                    Equipments Are Completely Sanitized
                  </p>
                  <p>
                    If You Need Any Clarification On Schedule Please Call Our
                    Operational Manager <b>Staff_name</b> Contact Number{" "}
                    <b>Staff_contact </b>
                  </p>
                  <p>*Newly Launched Services*</p>
                  <p>
                    *Commercial Housekeeping* | Security Services | *Facility
                    Management* | Payroll Management | *Corporate Pest
                    Management*
                  </p>
                  <p>
                    Thank You
                    <br />
                    Www.Vijayhomeservices.Com
                  </p>
                </td>
                <td>
                  <p>Customer_name</p>
                  <p>Job_type</p>
                  <p>Call_date</p>
                  <p>Technician_name</p>
                  <p>Technician_experiance</p>
                  <p>Technician_languages_known</p>
                  <p>Staff_name</p>
                  <p>Staff_contact</p>
                </td>

                <td>
                  <div className="d-flex">
                    <a href="#" className="hyperlink">
                      Edit
                    </a>
                  </div>
                </td>
              </tr>

              <tr className="user-tbale-body">
                <td className="text-center">5</td>
                <td>Painting API</td>
                <td>
                  <p>
                    Dear <b>Customer_name</b>
                  </p>
                  <p>
                    This Is Confirmation That Your <b>Job_type</b> Service Is
                    Booked On <b>Call_date</b> Technician Will Be Arriving For
                    Delivering The Service,
                  </p>
                  <p>Team Profile</p>
                  <p>
                    Name : <b>Technician_name</b>{" "}
                  </p>
                  <p>
                    Experience : <b>Technician_experiance</b>{" "}
                  </p>
                  <p>
                    Languages Known : <b>Technician_name</b>
                  </p>
                  <p>
                    Safety
                    <br />
                    Temperature Checked
                    <br />
                    Team Will Wear Mask
                    <br />
                    Equipments Are Completely Sanitized
                  </p>
                  <p>
                    If You Need Any Clarification On Schedule Please Call Our
                    Operational Manager <b>Staff_name</b> Contact Number{" "}
                    <b>Staff_contact </b>
                  </p>
                  <p>*Newly Launched Services*</p>
                  <p>
                    *Commercial Housekeeping* | Security Services | *Facility
                    Management* | Payroll Management | *Corporate Pest
                    Management*
                  </p>
                  <p>
                    Thank You
                    <br />
                    Www.Vijayhomeservices.Com
                  </p>
                </td>
                <td>
                  <p>Customer_name</p>
                  <p>Job_type</p>
                  <p>Call_date</p>
                  <p>Technician_name</p>
                  <p>Technician_experiance</p>
                  <p>Technician_languages_known</p>
                  <p>Staff_name</p>
                  <p>Staff_contact</p>
                </td>

                <td>
                  <div className="d-flex">
                    <a href="#" className="hyperlink">
                      Edit
                    </a>
                  </div>
                </td>
              </tr>

              <tr
                className="user-tbale-body"
                style={{ backgroundColor: "#eee", height: "40px" }}
              >
                <td className="text-center"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>{" "}
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Whatsapptemplate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Template Name <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">WhatsApp Template</div>
                    <div className="group pt-1">
                      <textarea
                        rows={6}
                        cols={6}
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Double Click On Below VARIABLE
                    </div>
                    <div className="vhs-input-label">
                      To Add In Message Text
                    </div>
                    <div className="group pt-1">
                      <p>Customer_name</p>
                      <p>Executive_name</p>
                      <p>Executive_contact</p>
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-1">
                    <button className="vhs-button">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default Whatsapptemplate;
