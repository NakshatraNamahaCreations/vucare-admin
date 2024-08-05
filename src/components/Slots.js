import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import Sidenav from "./Sidenav";
import Header from "./Header";

function Slots() {
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");

  const [categorydata, setcategorydata] = useState([]);

  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);

  const postcategory = async (e) => {
    e.preventDefault();
    if (!startTime ) {
      alert("Please TYPE SLOT");
    } else {
      try {
        const config = {
          url: "/userapp/addslots",
          method: "post",
          baseURL: "https://api.thevucare.com/api",
          data: {
            startTime: startTime,
            endTime: endTime,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            alert("Successfully Added");
            window.location.assign("/slots");
          }
        });
      } catch (error) {
        console.error(error);
        alert("SLots  Not Added");
      }
    }
  };

  useEffect(() => {
    getslots();
  }, []);

  const getslots = async () => {
    let res = await axios.get("https://api.thevucare.com/api/userapp/getslots");
    if ((res.status = 200)) {
      setcategorydata(res.data?.slots);
      setfilterdata(res.data?.slots);
    }
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Slots",
      selector: (row) => row.startTime,
      cell: (row) => (
        <div>
          {row.startTime}
        </div>
      ),
    },

    {
      name: "Action",
      cell: (row) => (
        <div>
          {/* <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a> */}
          <a onClick={() => deletecategory(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];



  const deletecategory = async (id) => {
    axios({
      method: "post",
      url: "https://api.thevucare.com/api/userapp/deleteslots/" + id,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };

  let i = 0;
  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        <div className="row m-auto p-2">
          <h3>Slots</h3>
          <div className="col-md-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">
                <div>
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className=" vucare-input-label">
                          Slots <span className="text-danger"> *</span>
                        </div>
                        
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12  vucare-input-value"
                            onChange={(e) => setstartTime(e.target.value)}
                          />
                        </div>
                        <a style={{fontSize:"12px"}}>(EX:10AM-12PM)</a>
                      </div>
                      {/* <div className="col-md-4">
                        <div className=" vucare-input-label">
                          EndTime <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12  vucare-input-value"
                            onChange={(e) => setendTime(e.target.value)}
                          />
                        </div>
                      </div> */}

                      <div className="col-md-4"></div>

                      <div className="col-md-4"></div>
                    </div>

                    <div className="row pt-3">
                      <div className="col-md-2">
                        <button className=" vu-button vucare_btn" onClick={postcategory}>
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <div className="mt-5">
              <input
                type="text"
                placeholder="Search here.."
                className="w-25 form-control"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </div> */}
            <div className="mt-1 border">
              <DataTable
                columns={columns}
                data={filterdata}
                pagination
                fixedHeader
                selectableRowsHighlight
                subHeaderAlign="left"
                highlightOnHover
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slots;
