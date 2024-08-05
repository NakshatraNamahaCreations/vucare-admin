import React, { useState, useEffect, useContext } from "react";
import Header from "../components/layout/Header";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useLocation, useParams, Link, NavLink } from "react-router-dom";
import DSRnav from "./DSRnav";
import moment from "moment";
import { Button } from "react-bootstrap";

function Paymentfilterlist() {
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
  const { date } = useParams();
  console.log("selectedData", date);

  useEffect(() => {
    getservicedata();
  }, []);

  useEffect(() => {}, [treatmentData]);

  const getservicedata = async () => {
    let res = await axios.get(apiURL + "/getrunningdata");
    if (res.status === 200) {
      const data = res.data?.runningdata;
      console.log(data);

      const filteredData = data.filter((item) => {
        const formattedDates = item.dividedamtDates.map((date) =>
          moment(date).format("YYYY-MM-DD")
        );
        return formattedDates.includes(date);
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
  // const targetDate=date;

  const findAmountForDate = (searchResults, date) => {
    const formattedTargetDate = moment(date).toISOString();
    console.log(searchResults);
    console.log(formattedTargetDate);


    const matchedData = (searchResults, formattedTargetDate) => {
      try {
        const matchedItem = searchResults.find((item) =>
          item.dividedDates.includes(formattedTargetDate)
        );

        if (matchedItem) {
          console.log("Match found:", matchedItem);
          return matchedItem;
        } else {
          console.log("No match found for", formattedTargetDate);
          return null; // or any other value to indicate no match
        }
      } catch (error) {
        console.error("Error occurred:", error);
        return null; // or throw an error based on your error handling strategy
      }
    };

    const result = matchedData(searchResults, formattedTargetDate);
    console.log(result)

    console.log(matchedData);
    if (matchedData) {
      const targetDateIndex =
        matchedData.dividedDates.indexOf(formattedTargetDate);
      return matchedData.dividedamtCharges[targetDateIndex];
    }

    return "N/A";
  };

  return (
    <div className="web">
      <Header />
      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/paymentcalender" activeClassName="active">
              Payment calendar view
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        {/* {amtCharges !== null ? (
        <p>The amount for {targetDate} is {amtCharges}.</p>
      ) : (
        <p>No amount found for {targetDate}.</p> */}
        {/* )} */}
      </div>
      <div className="row m-auto">
        <div className="col-md-12">
          <table
            class="table table-hover table-bordered mt-1"
            style={{ width: "113%" }}
          >
            <thead className="">
              <tr className="table-secondary">
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
                <th className="table-head" scope="col"></th>
                <th className="table-head" scope="col"></th>
                <th className="table-head" scope="col"></th>

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
                  Payment Date
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

                <th scope="col" className="table-head">
                  Job Type
                </th>
                <th scope="col" className="table-head">
                  Description
                </th>

                <th scope="col" className="table-head">
                  Amount
                </th>
                <th scope="col" className="table-head">
                  Status
                </th>
                <th scope="col" className="table-head">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((selectedData) => (
                <tr className="user-tbale-body">
                  <Link
                    to="/paymentfulldetails"
                    className="tbl"
                    state={{ data: selectedData, data1: date }}
                  >
                    <td>{i++}</td>
                    <td>{selectedData.category}</td>
                    <td>{date}</td>

                    <td>{selectedData.customer[0]?.customerName}</td>
                    <td>{selectedData.customer[0]?.city}</td>
                    <td>
                      {selectedData.customer[0]?.rbhf},
                      {selectedData.customer[0]?.cnap},
                      {selectedData.customer[0]?.lnf}
                    </td>
                    <td>{selectedData.customer[0]?.mainContact}</td>
                    {/* <td>{dsrdata[0]?.techName}</td>

                    <td>{dsrdata[0]?.workerName}</td> */}
                    <td>{selectedData.service}</td>

                    <td>{selectedData.desc}</td>
                    <td>{findAmountForDate(searchResults, date)}</td>
                    <td>Payment collected</td>
                    <td>
                      <button> Raise Invoice</button>
                    </td>
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

export default Paymentfilterlist;
