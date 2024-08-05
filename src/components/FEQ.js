import { React, useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Sidenav from "./Sidenav";
import Header from "./Header";
import axios from "axios";
import { Title } from "@mui/icons-material";

const active1 = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive1 = { color: "black", backgroundColor: "white" };

function FEQ() {
  const [selected1, setSelected1] = useState(0);

  const [banner, setBanner] = useState([]);
  const [bannerdata, setBannerdata] = useState([]);
  const [images, setImages] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const formdata = new FormData();
  const apiURL = process.env.REACT_APP_API_URL;
  const imgURL = process.env.REACT_APP_IMAGE_API_URL;
  const [show, setShow] = useState(false);
  const [title, settitle] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fileSelectedHandler = (e) => {
    setBanner([...banner, ...e.target.files]);
  };

  const postbanner = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const file of banner) {
      formData.append("img", file);
    }
    formData.append("title", title);
    formData.append("category", selectCategory);
    try {
      const response = await axios.post(
        "https://api.thevucare.com/api/userapp/addfeq",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Successfully Added");
        window.location.assign("/feq");
      }
    } catch (error) {
      console.error(error);
      alert("Title Not Added");
    }
  };

  useEffect(() => {
    getbannerimg();
  }, []);

  const getbannerimg = async () => {
    let res = await axios.get("https://api.thevucare.com/api/userapp/getallfeq");
    if (res.status === 200) {
      setBannerdata(res.data?.feq);
      console.log(res.data?.feq);
      setImages(
        res.data?.feq.map((element) => {
          return `https://api.thevucare.com/api/userbanner/${element.img[0].contentType}`;
        })
      );
    }
  };

  const deletebannerimg = async (id) => {
    axios({
      method: "post",
      url: "https://api.thevucare.com/api/userapp/deletefeq/" + id,
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

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get("https://api.thevucare.com/api/getcategory");
    if (res.status === 200) {
      setCategoryData(res.data?.category);
    }
  };

  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />
        <div className="row  set_margin ">
          <div>
            <div className="d-flex  mt-3">
              <h4 style={{ color: "#FF0060" }}>why need  vucare</h4>
            </div>
          </div>
        </div>
        <div className="row pt-3 m-auto" style={{ marginLeft: "-72px" }}>
          <div className="row  set_margin">
            <div>
              <div className="d-flex  mt-3 mb-3">
                <Button
                  className="btn-primary-button mx-2"
                
                  onClick={handleShow}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="row  justify-content-center ">
              <div className="col-md-12">
                <Table
                  className="table_container table_data text-center"
                  bordered
                  size="sm"
                  centered
                  variant
                >
                  <thead>
                    <tr>
                      <th>SI.No</th>
                      <th>Category</th>
                      <th>Title</th>
                      <th> Images</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bannerdata.map((element, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{element.category}</td>
                          <td>{element.title}</td>
                          <td>
                            {element.img.map((image, j) => (
                              <img
                                className="header_logo"
                              src={`https://api.thevucare.com/feq/${image.data}`}
                                width={"100px"}
                                height={"50px"}
                                alt={`Image ${j + 1}`}
                                key={j}
                              />
                            ))}
                          </td>

                          <td>
                            <Button
                              style={{
                                margin: "5px",
                                fontSize: "12px",
                                padding: "6px",
                              }}
                              onClick={() => deletebannerimg(element._id)}
                            
                              key={i}
                            >
                              Delete
                            </Button>{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Add </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className=" vucare-input-label">
              Select Category <span className="text-danger"> *</span>
            </div>
            <div className="group pt-1 ">
              <select
                className="col-md-12  vucare-input-value"
                onChange={(e) => setSelectCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {categoryData?.map((item) => (
                  <option value={item.category}>{item.category}</option>
                ))}
              </select>
            </div>
            <div className=" vucare-input-label mt-4">
              Title <span className="text-danger"> *</span>
            </div>
            <div className="group pt-1 ">
              <input
                type="text"
                className="col-md-12  vucare-input-value"
                onChange={(e) => settitle(e.target.value)}
              />
            </div>

            <div className=" vucare-input-label mt-4">
              icons <span className="text-danger"> *</span>
            </div>
            <div className="mt-3">
              <input
                type="file"
                name="img"
                onChange={fileSelectedHandler}
                multiple
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button className="vucare_btn" onClick={postbanner}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default FEQ;
