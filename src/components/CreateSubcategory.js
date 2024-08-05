import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Sidenav from "./Sidenav";
import Header from "./Header";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";

function Subcategory() {
  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setsubcategory] = useState("");
  const [search, setsearch] = useState("");
  const [sub_subcategory, setsub_subcategory] = useState("");
  const [subcategoryImg, setsubcategoryImg] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);

  const [editSubcategoryList, setEditSubcategoryList] = useState({});
  const [subcategoryName, setSubcayegoryName] = useState("");
  const [subcategoryList, seSubcategoryList] = useState("");
  const [subcategoryListImage, setSubcategoryListImage] = useState("");
  const [subcategorydata, setsubcategorydata] = useState([]);
  const formdata = new FormData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (subcategory) => {
    setEditSubcategoryList(subcategory);
    handleShow(true);
  };

  useEffect(() => {
    getAllSubcategory();
    getsubcategory();
  }, []);

  const getAllSubcategory = async () => {
    let res = await axios.get("https://api.thevucare.com/api/userapp/getappsubcat");
    if (res.status === 200) {
      setSubcategories(res.data?.subcategory);
      console.log("subcategories", res.data?.subcategory);
    }
  };
  const postsubcategory = async (e) => {
    e.preventDefault();

    if (!sub_subcategory || !subcategory || !subcategoryImg) {
      alert("Please Select all fields");
    } else {
      formdata.append("sub_subcategory", sub_subcategory);
      formdata.append("subcategory", subcategory);
      formdata.append("resubcatimg", subcategoryImg);

      try {
        const config = {
          url: "/userapp/addappresubcat",
          method: "post",
          baseURL: "https://api.thevucare.com/api",
          data: formdata,
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            alert("Successfully Added");
            window.location.reload();
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };
  const getsubcategory = async () => {
    let res = await axios.get(
      "https://api.thevucare.com/api/userapp/getappresubcat"
    );
    if (res.status === 200) {
      console.log("All list---", res);
      setsubcategorydata(res.data?.subcategory);
      setfilterdata(res.data?.subcategory);
    }
  };

  const editservices = async (e) => {
    e.preventDefault();
    try {
      formdata.append("sub_subcategory", subcategoryList);
      formdata.append("subcategory", subcategoryName);
      formdata.append("resubcatimg", subcategoryListImage);

      const config = {
        url: `/userapp/editappresubcat/${editSubcategoryList._id}`,
        method: "post",
        baseURL: "https://api.thevucare.com/api",
        headers: { "content-type": "multipart/form-data" },
        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Updated Successfully");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      alert("Not Added");
    }
  };
  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Subcategory ",
      selector: (row) => row.subcategory,
    },
    {
      name: "Sub-subcategory  ",
      selector: (row) => row.sub_subcategory,
    },
    {
      name: "Image",
      cell: (row) => (
        <div>
          <img
            className="header_logo"
          src={`https://api.thevucare.com/resubcat/${row.resubcatimg}`}
            width={"50px"}
            height={"50px"}
          />
        </div>
      ),
    },

    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => handleEdit(row)}>
            Edit |
          </a>
          <a onClick={() => deleteservices(row._id)} className="hyperlink mx-1">
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
    const result = subcategorydata.filter((item) => {
      return item.subcategory.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deleteservices = async (id) => {
    axios({
      method: "post",
      url: "https://api.thevucare.com/api/userapp/deleteappresubcat/" + id,
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
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        <div className="row m-auto">
          <h3>SUB-Subcategory</h3>
          <div className="col-md-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">
                {/* <div className=" vucare-sub-heading pb-2">Add New Record</div> */}
                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className=" vucare-input-label">
                        Subcategory <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <select
                          className="col-md-12  vucare-input-value"
                          onChange={(e) => setsubcategory(e.target.value)}
                        >
                          <option>---SELECT---</option>
                          {subcategories.map((i) => (
                            <option value={i.subcategory}>
                              {i.subcategory}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className=" vucare-input-label">
                        Sub-subcategory <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className=" vucare-input-value col-md-12"
                          onChange={(e) => setsub_subcategory(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className=" vucare-input-label">Image</div>
                      <div className="group pt-1">
                        <input
                          type="file"
                          className="col-md-12  vucare-input-value"
                          onChange={(e) => setsubcategoryImg(e.target.files[0])}
                        />
                        <p style={{ fontSize: "12px" }}>
                          <b>Width:50px ,Height:50px</b>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row pt-3 justify-content-center">
                    <div className="col-md-2">
                      <button className=" vu-button vucare_btn" onClick={postsubcategory}>
                        Save
                      </button>
                    </div>
                  </div>
                </form>
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

        {/* edit modal */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit SUB-Subcategory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-body p-3">
              <form>
                <div className="col-md-12">
                  <div className=" vucare-input-label">
                    Subcategory <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <div className="group pt-1">
                      <select
                        className="col-md-12  vucare-input-value"
                        onChange={(e) => setSubcayegoryName(e.target.value)}
                      >
                        {/* <option value={data.category}>{data.category}</option> */}
                        {subcategories.map((item) => (
                          <option value={item.subcategory}>
                            {item.subcategory}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-4">
                  <div className=" vucare-input-label">
                    Service name <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12  vucare-input-value"
                      onChange={(e) => seSubcategoryList(e.target.value)}
                      // placeholder={data.subcategory}
                      defaultValue={
                        sub_subcategory || editSubcategoryList
                          ? editSubcategoryList.sub_subcategory
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12 m-4">
                  <div className=" vucare-input-label">
                    Subcategory image <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="file"
                      className="col-md-12  vucare-input-value"
                      onChange={(e) =>
                        setSubcategoryListImage(e.target.files[0])
                      }
                    />
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className=" vu-button vucare_btn" onClick={editservices}>
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

export default Subcategory;
