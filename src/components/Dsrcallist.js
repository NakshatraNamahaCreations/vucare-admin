import React, { useState, useEffect, useContext } from "react";
import Header from "../components/layout/Header";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useLocation, useParams, Link } from "react-router-dom";
import DSRnav from "./DSRnav";
import moment from "moment";

function Dsrcallist() {
  const [treatmentData, settreatmentData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [dsrdata, setdsrdata] = useState([]);
  const [searchJobCatagory, setSearchJobCatagory] = useState("");
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [searchTechName, setSearchTechName] = useState("");
  const [searchJobType, setSearchJobType] = useState("");
  const [searchDesc, setSearchDesc] = useState("");

  const apiURL = process.env.REACT_APP_API_URL;
  const { date, category } = useParams();
  console.log("selectedData", date, category);

  const today = new Date();
  useEffect(() => {
    getservicedata();
  }, [category]);

  useEffect(() => {}, [treatmentData]);

  const getservicedata = async () => {
    let res = await axios.get(apiURL + "/getrunningdata");
    if (res.status === 200) {
      const data = res.data?.runningdata;

      const filteredData = data.filter((item) => {
        const formattedDates = item.dividedDates.map((date) =>
          moment(date).format("YYYY-MM-DD")
        );
        return formattedDates.includes(date) && item.category === category;
      });

      console.log("mydata", filteredData);
      settreatmentData(filteredData);
      setSearchResults(filteredData);
      console.log(filteredData);
    }
  };
  console.log(treatmentData[0]?.cardNo);

  useEffect(() => {
    getAlldata();
  }, [treatmentData]);

  const getAlldata = async () => {
    let res = await axios.get(apiURL + "/getaggredsrdata");
    if (res.status === 200) {
      setdsrdata(
        res.data.addcall.filter(
          (i) => i.serviceDate === date && i.cardNo == treatmentData[0]?.cardNo
        )
      );
      console.log(
        res.data.addcall.filter(
          (i) => i.serviceDate === date && i.cardNo == treatmentData[0]?.cardNo
        )
      );
    }
  };

  console.log("dsrdata-----", dsrdata);
  // filter and search
  useEffect(() => {
    const filterResults = () => {
      let results = treatmentData;
      if (searchJobCatagory) {
        results = results.filter(
          (item) =>
            item.jobCategory &&
            item.jobCategory
              .toLowerCase()
              .includes(searchJobCatagory.toLowerCase())
        );
      }
      if (searchCustomerName) {
        results = results.filter(
          (item) =>
            item.customer[0]?.customerName &&
            item.customer[0]?.customerName
              .toLowerCase()
              .includes(searchCustomerName.toLowerCase())
        );
      }
      if (searchCity) {
        results = results.filter(
          (item) =>
            item.customer[0]?.city &&
            item.customer[0]?.city
              .toLowerCase()
              .includes(searchCity.toLowerCase())
        );
      }
      if (searchAddress) {
        results = results.filter(
          (item) =>
            (item.customer[0]?.cnap &&
              item.customer[0]?.cnap
                .toLowerCase()
                .includes(searchAddress.toLowerCase())) ||
            (item.customer[0]?.rbhf &&
              item.customer[0]?.rbhf
                .toLowerCase()
                .includes(searchAddress.toLowerCase()))
        );
      }
      if (searchContact) {
        results = results.filter((item) =>
          item.customer[0]?.mainContact &&
          typeof item.customer[0]?.mainContact === "string"
            ? item.mainContact
                .toLowerCase()
                .includes(searchContact.toLowerCase())
            : ""
        );
      }
      if (searchTechName) {
        results = results.filter(
          (item) =>
            item.techName && //no technician name
            item.techName.toLowerCase().includes(searchTechName.toLowerCase())
        );
      }
      if (searchJobType) {
        results = results.filter(
          (item) =>
            item.service &&
            item.service.toLowerCase().includes(searchJobType.toLowerCase())
        );
      }
      if (searchDesc) {
        results = results.filter(
          (item) =>
            item.customerFeedback &&
            item.customerFeedback
              .toLowerCase()
              .includes(searchDesc.toLowerCase())
        );
      }
      setSearchResults(results);
    };
    filterResults();
  }, [
    searchJobCatagory,
    searchCustomerName,
    searchCity,
    searchAddress,
    searchContact,
    searchJobType,
    searchDesc,
  ]);

  let i = 1;
  return (
    <div className="web">
      <Header />
      <DSRnav />

      <div className="row m-auto">
        <div className="col-md-12">
          <table
            class="table table-hover table-bordered mt-1"
            style={{ width: "113%" }}
          >
            <thead className="">
              <tr className="table-secondary">
                <th className="table-head" scope="col"></th>
                <th className="table-head" scope="col"></th>

                <th
                  className="table-head"
                  style={{ width: "13%" }}
                  scope="col"
                ></th>
                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchJobCatagory}
                    onChange={(e) => setSearchJobCatagory(e.target.value)}
                  />{" "}
                </th>

                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchCustomerName}
                    onChange={(e) => setSearchCustomerName(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="table-head">
                  <select
                    className="vhs-table-input"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  >
                    <option value="">Select</option>
                    {treatmentData.map((e) => (
                      <option
                        value={e.customer[0]?.city}
                        key={e.customer[0]?.city}
                      >
                        {e.customer[0]?.city}{" "}
                      </option>
                    ))}
                  </select>{" "}
                </th>
                <th scope="col" style={{ width: "15%" }} className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="table-head">
                  <select
                    className="vhs-table-input" //no Technician name
                    value={searchTechName}
                    onChange={(e) => setSearchTechName(e.target.value)}
                  >
                    <option value="">Select</option>
                    {treatmentData.map((e) => (
                      <option value={e.techName} key={e.techName}>
                        {e.techName}{" "}
                      </option>
                    ))}
                  </select>{" "}
                </th>
                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchJobType}
                    onChange={(e) => setSearchJobType(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchDesc}
                    onChange={(e) => setSearchDesc(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchDesc}
                    onChange={(e) => setSearchDesc(e.target.value)}
                  />{" "}
                </th>
                {/* 
                // <th scope="col" className="table-head"></th>
                <th scope="col" className="table-head"></th> */}
              </tr>
              <tr className="table-secondary">
                <th className="table-head" scope="col">
                  Sr.No
                </th>
                <th className="table-head" scope="col">
                  Category
                </th>
                <th className="table-head" scope="col">
                  Date
                </th>
                <th className="table-head" style={{ width: "13%" }} scope="col">
                  Time
                </th>

                <th scope="col" className="table-head">
                  Customer Name
                </th>
                <th scope="col" className="table-head">
                  City
                </th>
                <th scope="col" style={{ width: "15%" }} className="table-head">
                  Address
                </th>
                <th scope="col" className="table-head">
                  Contact No.
                </th>
                {dsrdata[0]?.techName === "PM" ? (
                  <th scope="col" className="table-head">
                    Project manager
                  </th>
                ) : (
                  <th scope="col" className="table-head">
                    Technician
                  </th>
                )}

                <th scope="col" className="table-head">
                  Worker Name
                </th>
                <th scope="col" className="table-head">
                  Job Type
                </th>
                <th scope="col" className="table-head">
                  Description
                </th>

                <th scope="col" className="table-head">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((selectedData) => (
                <tr className="user-tbale-body">
                  <Link
                    to="/dsrdetails "
                    className="tbl"
                    state={{ data: selectedData, data1: date }}
                  >
                    <td>{i++}</td>
                    <td>{selectedData.category}</td>
                    <td>{date}</td>
                    <td>{selectedData.time}</td>

                    <td>{selectedData.customer[0]?.customerName}</td>
                    <td>{selectedData.customer[0]?.city}</td>
                    <td>
                      {selectedData.customer[0]?.rbhf},
                      {selectedData.customer[0]?.cnap},
                      {selectedData.customer[0]?.lnf}
                    </td>
                    <td>{selectedData.customer[0]?.mainContact}</td>
                    <td>{dsrdata[0]?.techName}</td>

                    <td>{dsrdata[0]?.workerName}</td>
                    <td>{selectedData.service}</td>

                    <td>{selectedData.desc}</td>
                    <td>{selectedData.serviceCharge}</td>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default Dsrcallist;
