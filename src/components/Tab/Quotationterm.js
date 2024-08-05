import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { da } from "date-fns/locale";
import numberToWords from 'number-to-words';

function Quotationterm() {
  const [tcdata, settcdata] = useState([]);
  const [headerimgdata, setheaderimgdata] = useState([]);
  const [footerimgdata, setfooterimgdata] = useState([]);
  const [bankdata, setbankdata] = useState([]);
  const [treatmentdata, settreatmentdata] = useState([]);
  const location = useLocation();
  const { data } = location.state ||null;
  console.log(data)
  const apiURL = process.env.REACT_APP_API_URL;
  const imgURL = process.env.REACT_APP_IMAGE_API_URL;

  const [section2data, setsection2data] = useState([]);

  
  useEffect(() => {
    gettermsgroup();
  }, []);

  const gettermsgroup = async () => {
    let res = await axios.get(apiURL + "/master/gettermgroup");
    if ((res.status = 200)) {
      settcdata(res.data?.termsgroup);
    }
  };
  const gettermsgroup2 = async () => {
    let res = await axios.get(apiURL + "/master/gettermgroup2");
    if ((res.status = 200)) {
      setsection2data(res.data?.termsgroup2);
    }
  };

  let i = 1;

  useEffect(() => {
    getheaderimg();
    getfooterimg();
    getbank();

    gettermsgroup2();
  }, []);

  const getheaderimg = async () => {
    let res = await axios.get(apiURL + "/master/getheaderimg");
    if ((res.status = 200)) {
      setheaderimgdata(res.data?.headerimg);
    }
  };

  const getfooterimg = async () => {
    let res = await axios.get(apiURL + "/master/getfooterimg");
    if ((res.status = 200)) {
      setfooterimgdata(res.data?.footerimg);
    }
  };

  const getbank = async () => {
    let res = await axios.get(apiURL + "/getbank");
    if ((res.status = 200)) {
      setbankdata(res.data?.bankacct);
    }
  };

 
  return (
    <div className="row">
      <Header />

      <div className="row justify-content-center mt-3">
        <div className="col-md-11">
          <div
            className="card shadow  bg-white rounded"
            style={{ border: "none" }}
          >
            {headerimgdata.map((item) => (
              <img
                src={
                  imgURL+"/quotationheaderimg/" + item.headerimg
                }
                height="200px"
                width="100%"
              />
            ))}
            {/* <div className="q-row1">VIJAY HOME SERVICES</div> */}
            <div className="q-row2">QUOTATION</div>

            <div className="row  mt-2">
              <div className="col-md-6 b-col">
                <div className="" style={{ fontWeight: "bold" }}>
                  TO
                </div>
                <div className="" style={{ fontWeight: "bold" }}>
                  {data[0]?.name}
                </div>
                <p>{data[0]?.address}</p>
                {/* <div className="" style={{ fontWeight: "bold" }}>
                  City :{" "}
                  <span style={{ color: "black", fontWeight: 400 }}>
                    Bangalore
                  </span>
                </div> */}
              </div>
              <div className="col-md-6 b-col" style={{ marginLeft: "9px" }}>
                <div className="" style={{ fontWeight: "bold" }}>
                  Quote#{" "}
                  <span style={{ color: "black", fontWeight: 400 }}> {data[0]?.quotedata[0]?.quoteId}</span>
                </div>

                <div className="" style={{ fontWeight: "bold" }}>
                  Date :{" "}
                  <span style={{ color: "black", fontWeight: 400 }}>
                    {moment().format("L")}
                  </span>
                </div>

                <div className="" style={{ fontWeight: "bold" }}>
                  Project Type :{" "}
                  <span style={{ color: "black", fontWeight: 400 }}>{data[0]?.quotedata[0]?.projectType}</span>
                </div>

                <div className="" style={{ fontWeight: "bold" }}>
                  Salse Manager :{" "}
                  <span style={{ color: "black", fontWeight: 400 }}>{}</span>
                </div>

                <div className="" style={{ fontWeight: "bold" }}>
                  Contact :{" "}
                  <span style={{ color: "black", fontWeight: 400 }}>
                 {data[0]?.contact1}
                  </span>
                </div>
              </div>
            </div>

            <div className="row m-auto mt-2 w-100">
              <div className="col-md-12">
                <table class="table table-bordered border-danger">
                  <thead
                    style={{
                      backgroundColor: "#a9042e",
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Category</th>
                      <th scope="col">Scope Of Job </th>
                      <th scope="col">Qty/Sqft</th>
                      <th scope="col">Rate</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[0]?.treatmentdetails.map((item) => (
                      <tr>
                        <th scope="row">{i++}</th>
                        <th scope="row">{item.category}</th>

                        <td>
                          <div className="" style={{ fontWeight: "bold" }}>
                            {item.material}
                          </div>

                          <div style={{ fontWeight: "bold" }}>{item.job}</div>

                          <p>{item.region}</p>
                        </td>
                        <td className="text-center">{item.qty}</td>
                        <td className="text-center">{item.rate}</td>
                        <td className="text-center"> {item.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="float-end">
                 
                  <h5>Total :{data[0]?.quotedata[0]?.netTotal}</h5>
                </div>

                <div
                  className="text-center"
                  style={{ fontWeight: "bold", paddingTop: "23px" }}
                >
                  In Words :{" "}
                  <span style={{ fontWeight: 400 }}>
                 {numberToWords.toWords(data[0]?.quotedata[0]?.netTotal)} 
                  </span>
                </div>

                <div
                  className="row m-auto mt-3"
                  style={{
                    backgroundColor: "#a9042e",
                    color: "white",
                    fontWeight: "bold",
                    justifyContent: "center",
                    padding: "8px",
                  }}
                >
                  Terms & Condition
                </div>
                <table class="table table-bordered border-danger">
                  <tbody>
                    {tcdata.map((item) => (
                      <tr>
                        <td scope="row">
                          <div class="form-check">
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              {item.content}
                            </label>
                          </div>
                        </td>
                        {/* <td className="">{item.content}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div
                  className="row m-auto mt-3"
                  style={{
                    backgroundColor: "#a9042e",
                    color: "white",
                    fontWeight: "bold",
                    justifyContent: "center",
                    padding: "8px",
                  }}
                >
                  Labour Compensation Insurance
                </div>
                <table class="table table-bordered border-danger">
                  <tbody>
                    {section2data.map((item) => (
                      <tr>
                        <td scope="row">
                         {item.content}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mx-5">
              <div>
                <div className="" style={{ fontWeight: "bold" }}>
                  BANK DETAILS
                </div>
              </div>

              {bankdata.map((item) => (
                <div>
                  <div className="pt-2" style={{ fontWeight: "bold" }}>
                    Account Name :{" "}
                    <span style={{ color: "black", fontWeight: 400 }}>
                      {item.accname}
                    </span>
                  </div>

                  <div className="" style={{ fontWeight: "bold" }}>
                    Account Number :{" "}
                    <span style={{ color: "black", fontWeight: 400 }}>
                      {item.accno}
                    </span>
                  </div>

                  <div className="" style={{ fontWeight: "bold" }}>
                    IFSC :{" "}
                    <span style={{ color: "black", fontWeight: 400 }}>
                      {item.ifsccode}
                    </span>
                  </div>

                  <div className="" style={{ fontWeight: "bold" }}>
                    BANK NAME :{" "}
                    <span style={{ color: "black", fontWeight: 400 }}>
                      {item.bankname}
                    </span>
                  </div>
                  <div className="" style={{ fontWeight: "bold" }}>
                    Branch Name :{" "}
                    <span style={{ color: "black", fontWeight: 400 }}>
                      {item.branch}
                    </span>
                  </div>

                  <div className="mt-3" style={{ fontWeight: "bold" }}>
                    Gpay / Phonepe Details
                  </div>

                  <div className="pb-3" style={{ fontWeight: "bold" }}>
                    Mobile No. :{" "}
                    <span style={{ color: "black", fontWeight: 400 }}>
                      {item.upinumber}
                    </span>
                  </div>
                </div>
              ))}

              <div className="row pt-3 pb-3 justify-content-center">
                {/* <div className="col-md-1">
                  <button className="vhs-button">Save</button>
                </div>
                <div className="col-md-1 mx-1">
                  <button className="vhs-button">Cancel</button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-3 mb-3">
        <div className="col-md-11">
          <div
            className="card shadow  bg-white rounded"
            style={{ border: "none" }}
          >
            {/* <div className="q-row0 text-center">
              Our Popular Services
              <br />
              <span
                style={{ color: "white", fontWeight: "bold", fontSize: "13px" }}
              >
                Residential & Commercial
              </span>
            </div>
            <div className="q-row1">
              We are Government Approved Chemicals Only
            </div> */}

            <div>
              {footerimgdata.map((item) => (
                <div className="col-md-12">
                  <img
                    src={
                      imgURL+
                      "/quotationfooterimg/" +
                      item.footerimg
                    }
                    height="700px"
                    width="100%"
                  />
                </div>
              ))}
            </div>

        
            <div className="row m-auto">
              <div className="mt-3 text-center" style={{ color: "#a9042e" }}>
                website : www.vijayhomeservices | mail :
                support@vijayhomeservices.com
              </div>

              <div className="mt-2 text-center" style={{ color: "black" }}>
                BANGALORE - HYDERABAD - CHENNAI - PUNE - MUMBAI - AHMEDABAD -
                VADODARA - SURAT - LUCKNOW - NCR - INDIA - GURGAON - FARIDABAD -
                GHAZIABAD - BHUVANESHWAR - KOCHI
              </div>

              <div
                className="mt-2 text-center pb-2"
                style={{ color: "#a9042e" }}
              >
                Customer Care : +91 845 374 8478
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quotationterm;
