import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Nav1 from "../Nav1";
import DataTable from "react-data-table-component";
import axios from "axios";

import Formatnav from "../Formatnav";
import { Modal,  } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Termsgroup() {
  const [serno, setserno] = useState("");
  const category = sessionStorage.getItem("category");
  const [newqtdata, setnewqtdata] = useState([]);
  const [header, settermsgroup] = useState("");
  const [content, setterms] = useState("");
  const apiURL = process.env.REACT_APP_API_URL;
  const [search, setsearch] = useState("");
  const [data, setdata] = useState([]);

  const [header1, setheader1] = useState(data.header);
  const [content1, setcontent1] = useState(data.content);
  const [filterdata, setfilterdata] = useState([]);
  const [categorydata, setcategorydata] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const posttermsgroup = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/master/addtermgroup",
        method: "post",
        baseURL: apiURL,
        data: {
          category: category,
          header: header,
          content: content,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/termsgroup");
        }
      });
    } catch (error) {
      console.error(error);
      alert("category  Not Added");
    }
  };

  useEffect(() => {
    gettermsgroup();
    getcategory();
  }, []);

  const gettermsgroup = async () => {
    let res = await axios.get(apiURL + "/master/gettermgroup");
    if ((res.status = 200)) {
      setnewqtdata(res.data?.termsgroup);
      setfilterdata(res.data?.termsgroup);
    }
  };
  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      setcategorydata(res.data?.category);
      console.log(res.data?.category);
    }
  };

  const edittermsgroup = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/master/edittermgroup/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          category: data.category,
          header: header1,
          content: content1,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      alert("  Not Added");
    }
  };
  const columns = [
    {
      name: "Sections",
      cell: (row, index) => (
        <div>
          <p>{index + 1}</p>
        </div>
      ),
    },
    {
      name: "category",
      selector: (row) => row.category,
    },

    {
      name: "Header ",
      selector: (row) => "Terms & Condition",
    },
    {
      name: "Content",
      selector: (row) => row.content,
    },

    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a>
          <a
            onClick={() => deletetermsgroup(row._id)}
            className="hyperlink mx-1"
          >
            Delete
          </a>
        </div>
      ),
    },
  ];

  const edit = (data) => {
    setdata(data);
    handleShow(true);
  };
  useEffect(() => {
    const result = newqtdata.filter((item) => {
      return item.category.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deletetermsgroup = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/master/deletetermgroup/" + id,
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
    <div className="web">
      <Header />
      <Nav1 />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <Formatnav />
              <ul className="nav-tab-ul">
                <li>
                  <NavLink to="/termsgroup" activeClassName="active">
                 Section1
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/section2" activeClassName="active">
                  Section2
                  </NavLink>
                </li>
              </ul>
              <form className="mt-5">
                <div className="row mt-5">
                  {/* <div className="col-md-4">
                    <div className="vhs-input-label">
                      Seq No <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setserno(e.target.value)}
                      />
                    </div>
                  </div> */}

                  {/* <div className="col-md-4">
                    <div className="vhs-input-label">
                      Header <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => settermsgroup(e.target.value)}
                      />
                    </div>
                  </div> */}

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Content <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <textarea
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setterms(e.target.value)}
                        rows={5}
                        cols={40}
                      />
                    </div>
                  </div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-1">
                    <button className="vhs-button" onClick={posttermsgroup}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-4 border">
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Terms Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  {/* <div className="col-md-4">
                    <div className="vhs-input-label">
                      Header <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setheader1(e.target.value)}
                        defaultValue={data.header}
                      />
                    </div>
                  </div> */}

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Content <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        defaultValue={data.content}
                        onChange={(e) => setcontent1(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-1">
                    <button className="vhs-button" onClick={edittermsgroup}>
                      Save
                    </button>
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

export default Termsgroup;
