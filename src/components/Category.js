import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import Sidenav from "./Sidenav";
import Header from "./Header";

function Category() {
  const [category, setcategory] = useState("");
  const [catagoryImage, setCatagoryImage] = useState("");
  const [categorydata, setcategorydata] = useState([]);
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [editCatagoryData, setEditCatagoryData] = useState({});
  const [editCatagoryName, setEditCatagoryName] = useState(
    ""
  );
  const [editCatagoryImg, setEditCatagoryImage] = useState("");
  const formdata = new FormData();
// console.log("editCatagoryData._id",editCatagoryData._id)
  const [show, setShow] = useState(false);

  const handleEdit = (subcategory) => {
    setEditCatagoryData(subcategory);
    handleShow(true);
  };
  const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

  const postcategory = async (e) => {
    e.preventDefault();
    if (!category || !catagoryImage) {
      alert("Please select all fields");
    } else {
      formdata.append("category", category);
      formdata.append("categoryImg", catagoryImage);
      try {
        const config = {
          url: "/addcategory",
          method: "post",
          baseURL: "https://api.thevucare.com/api",
          data: formdata,
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            alert("Successfully Added");
            window.location.assign("/category");
          }
        });
      } catch (error) {
        console.error(error);
        alert("category  Not Added");
      }
    }
  };

  // const onUpdate = () => {
  //   // Function to update your data when editing is successful
  //   // You can call this function after updating the category data
  //   getcategory(); // For example, re-fetch the data after an update
  // };

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get("https://api.thevucare.com/api/getcategory");
    if ((res.status = 200)) {
      setcategorydata(res.data?.category);
      setfilterdata(res.data?.category);
    }
  };

  const editcategory = async (e) => {
    e.preventDefault();
    try {
      formdata.append("category", editCatagoryName);
      if (editCatagoryImg) {
        formdata.append("categoryImg", editCatagoryImg);
      }

      const catagoryId = editCatagoryData._id;
      const config = {
        url: `/editcategory/${catagoryId}`,
        method: "put",
        baseURL: "https://api.thevucare.com/api",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert("Successfully Updated");
        window.location.reload();
        // onUpdate();
        // handleClose();
      } else {
        alert("Category not updated"); // Handle other status codes appropriately
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Category image",
      selector: (row) => (
        <div>
          <img
           src={`https://api.thevucare.com/category/${row.categoryImg}`}
            width="50px"
            height="50px"
          />
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <span>

      
          <i className="hyperlink" onClick={() => handleEdit(row)}>
            Edit |
          </i>    </span>
          <a onClick={() => deletecategory(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const result = categorydata.filter((item) => {
      return item.category.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deletecategory = async (id) => {
    axios({
      method: "post",
      url: "https://api.thevucare.com/api/deletecategory/" + id,
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
          <h3>Category</h3>
          <div className="col-md-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">
                <div>
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="vucare-input-label">
                          Category <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vucare-input-value"
                            onChange={(e) => setcategory(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="vucare-input-label">
                          Category Icon <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="file"
                            className="col-md-12 vucare-input-value"
                            onChange={(e) =>
                              setCatagoryImage(e.target.files[0])
                            }
                          />
                          <b style={{ fontSize: "12px" }}>
                            Please select the dimensions Width=50px,Height=50px
                          </b>
                        </div>
                      </div>

                      <div className="col-md-4"></div>

                      <div className="col-md-4"></div>
                    </div>

                    <div className="row pt-3">
                      <div className="col-md-2">
                        <button className="vu-button" onClick={postcategory}>
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
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-body p-3">
              <form>
                <div className="col-md-12">
                  <div className="vucare-input-label">
                    Category <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vucare-input-value"
                      onChange={(e) => setEditCatagoryName(e.target.value)}
                      defaultValue={editCatagoryData?.category}
                    />
                  </div>
                </div>
                <div className="col-md-12 mt-3">
                  <div className="vucare-input-label">
                    Category Icon<span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    {/* <input type="file" onChange={(e) => setNewImg(e.target.files[0])} /> */}
                    <input
                      type="file"
                      className="col-md-12 vucare-input-value"
                      onChange={(e) => setEditCatagoryImage(e.target.files[0])}
                      // defaultValue={data.categoryImg}
                    />
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vu-button" onClick={editcategory}>
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

export default Category;
