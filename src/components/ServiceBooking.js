import React, { useState } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../App.css";

function ServiceBooking() {
  const [allBookedServices, setallBookedServices] = useState();
  const [Serivid, setSerivid] = useState([]);
  const [BookedId, setBookedId] = useState([]);
  // const [editSubcategoryData, seteditSubcategoryData] = useState(null);

  useEffect(() => {
    getServiceDetails();
    getAllServices();
  }, []);
  const getServiceDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.thevucare.com/api/getservicedetails`
      );
      if (response.status === 200) {
        let filteredData = response.data.servicedetails;
        setallBookedServices(filteredData);
        let idd = filteredData.map((ele) => ele.serviceID);
        setBookedId(idd);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllServices = async () => {
    try {
      let res = await axios.get(
        "https://api.thevucare.com/api/userapp/getservices"
      );
      if (res.status === 200) {
        let BookedIDD = BookedId.map((ele) => ele);
        let filteredData = res.data.service.filter((ele) =>
          ele._id.includes(BookedIDD)
        );
        setSerivid(filteredData);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  const editservices = async (e, data) => {
    e.preventDefault();

    try {
      const config = {
        url: `/editservicedetails/${data}`,
        method: "post",
        baseURL: "https://api.thevucare.com/api",
        headers: { "Content-Type": "application/json" },
        data: { ServiceStatus: "Completed" },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Service Completed ");
          window.location.reload("");
          // onupdate();
          // handleClose();
        }
      });
    } catch (error) {
      console.error(error);
      alert("Not Added");
    }
  };

  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />

        <div className="row m-auto">
          <table class=" mt-5">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">User Name</th>
                <th scope="col">User Email</th>
                <th scope="col">User Address</th>
                <th scope="col">User Contact No.</th>
                <th scope="col">Service Name</th>
                <th scope="col">Service Price</th>
                <th scope="col">Service Image</th>
                <th scope="col">Discount Percentage(%)</th>
                <th scope="col">Service booked date</th>

                <th scope="col">Service validity date</th>
                <th scope="col">Service delivery address</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {allBookedServices?.map((ele, index) => {
                let userData;
                let ServiceData;
                ele.customerData.flatMap((user) => {
                  userData = user;
                });
                Serivid?.map((Ele) => (ServiceData = Ele));

                const deliveryAddressObj = JSON?.parse(ele?.deliveryAddress);
                return (
                  <tr
                    className={`trstly p-2 ${
                      ele?.ServiceStatus?.includes("Completed") ? "clrgren" : ""
                    }`}
                  >
                    <td>{index + 1}</td>
                    <td>{userData.customerName}</td>
                    <td>{userData.email}</td>
                    <td className="tds">
                      {" "}
                      <span> {deliveryAddressObj?.landmark}</span>
                      <span>{deliveryAddressObj?.streetName}</span>
                      <span>{deliveryAddressObj?.address}</span>
                      <span>{deliveryAddressObj?.city}</span>
                      <span>{deliveryAddressObj?.state}</span>
                      <span>{deliveryAddressObj?.zipcode}</span>
                    </td>
                    <td>{userData.contactPerson}</td>
                    <td>{ele.service}</td>
                    <td>{ele.TotalAmt}</td>
                    <td>
                      <img
                       src={`https://api.thevucare.com/service/${ServiceData?.serviceImg}`}
                        alt=""
                        height={"30px"}
                        width={"30px"}
                      />
                    </td>
                    <td>5%</td>
                    <td>
                      {" "}
                      {moment(ServiceData?.updatedAt).format(
                        "dddd, MMMM D, YYYY"
                      )}
                    </td>
                    <td>
                      {moment(ServiceData?.expiryDate).format(
                        "dddd, MMMM D, YYYY"
                      )}
                    </td>
                    <td>{ele.city}</td>
                    <td>
                      <Button
                        onClick={(e) => editservices(e, ele._id)}
                        variant="success"
                      >
                        Completed
                      </Button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default ServiceBooking;
