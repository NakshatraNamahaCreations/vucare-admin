import { React, useEffect, useState } from "react";
import "../App.css";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Sidenav from "./Sidenav";
import Header from "./Header";
import axios from "axios";
import { Form } from "react-bootstrap";

const active1 = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive1 = { color: "black", backgroundColor: "white" };

function SubCateBanner() {
  // const [selected1, setSelected1] = useState(0);
  const [Video, setVideo] = useState("");
  const [banner, setBanner] = useState("");
  const [category, setcategory] = useState("");
  const [categorydata, setcategorydata] = useState([]);
  const [bannerdata, setBannerdata] = useState([]);
  const formdata = new FormData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postbanner = async (e) => {
    e.preventDefault();

    formdata.append("banner", banner);
    formdata.append("category", category);
    formdata.append("video", Video);
    try {
      const config = {
        url: "/addsubcatwebbanner",
        method: "post",
        baseURL: "https://api.thevucare.com/api",

        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/SubCateBanner");
        }
      });
    } catch (error) {
      console.error(error);
      alert("banner  Not Added");
    }
  };
  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get("https://api.thevucare.com/api/userapp/getappsubcat");
    if ((res.status = 200)) {
      setcategorydata(res.data?.subcategory);
    }
  };

  useEffect(() => {
    getbannerimg();
  }, []);

  const getbannerimg = async () => {
    let res = await axios.get(
      "https://api.thevucare.com/api/getallsubcatwebbanner"
    );
    if ((res.status = 200)) {
      setBannerdata(res?.data?.subcategoyrbanner);
      // console.log(res.data?.subcategoyrbanner);
    }
  };

  const deletebannerimg = async (id) => {
    axios({
      method: "post",
      url: "https://api.thevucare.com/api/deletesubcatwebbanner/" + id,
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
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />
        <div className="row  set_margin ">
          <div>
            <div className="d-flex  mt-3">
              <h4>Subcategory Images</h4>
            </div>
          </div>
        </div>

        <div className="row pt-3 m-auto" style={{ marginLeft: "-72px" }}>
          <div className="row  set_margin">
            <div>
              <div className="d-flex   mt-3 mb-3">
                <button className="vucare_btn  p-2 mx-2" onClick={handleShow}>
                  Add Subcategory img
                </button>
              </div>
            </div>
            <div>
              {/* first added image will reflected  first in home page remaining all
              below */}
            </div>
            <div className="row  justify-content-center mt-3">
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
                      <th>Subcategory</th>
                      <th>Banner Image</th>
                      <th>Video</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bannerdata?.map((element, i) => {
                      const getEmbedUrl = (url) => {
                        let embedUrl = "";
                        if (url?.includes("/shorts/")) {
                          embedUrl = url?.replace("/shorts/", "/embed/");
                        } else if (url?.includes("youtube.com/watch?v=")) {
                          const videoId = url?.split("v=")[1]?.split("&")[0];
                          embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        } else if (url?.includes("youtu.be/")) {
                          const videoId = url
                            ?.split("youtu.be/")[1]
                            ?.split("?")[0];
                          embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        }
                        return embedUrl;
                      };

                      const embedUrl = getEmbedUrl(element.video);

                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{element.category}</td>
                          <td>
                            <img
                              className="header_logo"
                              src={`https://api.thevucare.com/subcatwebBanner/${element.banner}`}
                              width={"100px"}
                              height={"50px"}
                            />
                          </td>
                          <td>
                            <iframe
                              width="200"
                              height="100"
                              src={embedUrl}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            ></iframe>
                          </td>
                          <td>
                            <Button
                              style={{
                                margin: "5px",
                                fontSize: "12px",
                                padding: "6px",
                              }}
                              onClick={() => deletebannerimg(element._id)}
                            >
                              Delete
                            </Button>
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
            <Modal.Title>Spotlight</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className=" vucare-input-label mt-3">
              Subcategory <span className="text-danger"> *</span>
            </div>
            <div className="group pt-1">
              <select
                className="col-md-6  vucare-input-value"
                onChange={(e) => setcategory(e.target.value)}
              >
                <option>-- Select Subcategory--</option>
                {categorydata.map((i) => (
                  <option value={i.subcategory}>{i.subcategory}</option>
                ))}
              </select>
              <div className="col-md-6 vucare-input-label mt-3">
                <Form.Control
                  className=""
                  type="text"
                  placeholder="Enter video"
                  onChange={(e) => setVideo(e.target.value)}
                />
              </div>
            </div>

            <div className=" vucare-input-label mt-3">
              <b>Select file </b> <span className="text-danger"> *</span>
            </div>
            <input type="file" onChange={(e) => setBanner(e.target.files[0])} />
            <div className="mt-3" style={{ fontSize: "13px" }}>
              <b>Note :</b> width=300px,height=150px
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={postbanner}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default SubCateBanner;
