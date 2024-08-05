import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import Sidenav from "./Sidenav";
import Header from "./Header";

function Homepagetitle() {
  const [title, settitle] = useState("");

  const [titledata, settitledata] = useState([]);

  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);
  const [title1, settitle1] = useState(data.title);

  const formdata = new FormData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const posttitle = async (e) => {
    e.preventDefault();
    if (!title) {
      alert("Please select all fields");
    } else {
      try {
        const config = {
          url: "/userapp/addtitle",
          method: "post",
          baseURL: "https://api.thevucare.com/api",
          data: {
            title: title,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            alert("Successfully Added");
            window.location.assign("/homepagetitle");
          }
        });
      } catch (error) {
        console.error(error);
        alert("title  Not Added");
      }
    }
  };

  useEffect(() => {
    gettitle();
  }, []);

  const gettitle = async () => {
    let res = await axios.get("https://api.thevucare.com/api/userapp/gettitle");
    if ((res.status = 200)) {
      settitledata(res.data?.homepagetitle);
      setfilterdata(res.data?.homepagetitle);
    }
  };


  const edittitle = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/userapp/edittitle/${data._id}`,
        method: "post",
        baseURL: "https://api.thevucare.com/api",
        headers: { "content-type": "application/json" },
        data: {
          title: title1,
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
      alert("title  Not Added");
    }
  };
  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "title",
      selector: (row) => row.title,
    },

    {
      name: "Action",
      cell: (row) => (
        <div>
          {/* <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a> */}
          <a onClick={() => deletetitle(row._id)} className="hyperlink mx-1">
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
    const result = titledata.filter((item) => {
      return item.title.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deletetitle = async (id) => {
    axios({
      method: "post",
      url: "https://api.thevucare.com/api/userapp/deletetitle/" + id,
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

        <div className="row m-auto">
          <h3>Home Page Title</h3>
          <div className="col-md-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">
                <div>
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className=" vucare-input-label">
                         Home Page Title <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12  vucare-input-value"
                            onChange={(e) => settitle(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-md-4"></div>

                      <div className="col-md-4"></div>
                    </div>

                    <div className="row pt-3">
                      <div className="col-md-2">
                        <button className=" vu-button vucare_btn" onClick={posttitle}>
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
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

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-body p-3">
              <form>
                <div className="col-md-4">
                  <div className=" vucare-input-label">
                    title <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12  vucare-input-value"
                      onChange={(e) => settitle1(e.target.value)}
                      defaultValue={data.title}
                    />
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className=" vu-button" onClick={edittitle}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Homepagetitle;
