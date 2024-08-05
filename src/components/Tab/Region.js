import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../layout/Header";
import Nav1 from "../Nav1";
import Quotationnav from "../Quotationnav";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Contentnav from "../Contentnav";
import DataTable from "react-data-table-component";

function Quotationformat1() {
  const [user, setUser] = useState(false);

  const category=sessionStorage.getItem("category");
  const [region, setregion] = useState("");
  const [regiondata, setqfdata] = useState([]);
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data1, setdata1] = useState([]);
  const [newqtdata, setnewqtdata] = useState([]);

  const apiURL = process.env.REACT_APP_API_URL;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // getcategory();
    getqf();
    // getsubcategory();
  }, []);

  const postqf = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/master/addaregion",
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          category: category,
          aregion: region,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert("Region added successfuly");
          window.location.assign("/region");
        }
      });
    } catch (error) {
      console.error(error);
      alert("category Name Not Added");
    }
  };
  const getqf = async () => {
    let res = await axios.get(apiURL + "/master/getaregion");
    if ((res.status = 200)) {
      console.log(res);
      setqfdata(res.data?.aregion);
      setfilterdata(res.data?.aregion);
    }
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "category",
      selector: (row) => row.category,
    },
    {
      name: "Region",
      selector: (row) => row.aregion,
    },

    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a>
          <a
            onClick={() => deleteregion(row._id)}
            className="hyperlink mx-1"
          >
            Delete
          </a>
        </div>
      ),
    },
  ];

  const edit = (data) => {
    setnewqtdata(data);
    handleShow(true);
  };
  useEffect(() => {
    const result = regiondata.filter((item) => {
      return item.category.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deleteregion = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/master/deletearegion/" + id,
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

  return (
    <div className="web">
      <Header />
      <Nav1 />
      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <Contentnav />

              <form className="mt-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Region <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setregion(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div className="row pt-3 ">
                <div className="col-md-1">
                  <button className="vhs-button" onClick={postqf}>Save</button>
                </div>
              </div>
              
            </div>
          </div>
          <div className="mt-5">
                <input
                  type="text"
                  placeholder="Search here.."
                  className="w-25 form-control"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                />
              </div>
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
  );
}

export default Quotationformat1;
