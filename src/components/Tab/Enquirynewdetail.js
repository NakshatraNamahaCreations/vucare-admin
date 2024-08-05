import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useNavigate, useParams } from "react-router-dom";
import Enquiryadd from "./Enquiryadd";
import Enquirysearch from "./Enquirysearch";
import Enquirynew from "./Enquirynew";
import Header from "../layout/Header";
import { Link, json, useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";

function Enquirynewdetail() {
  const { EnquiryId } = useParams();

  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const navigate = useNavigate();

  const [staffname, setstaffname] = useState("pankaj");
  const [folldate, setfolldate] = useState("");
  const [response, setresponse] = useState("");
  const [desc, setdesc] = useState("");
  const [colorcode, setcolorcode] = useState("");
  const [nxtfoll, setnxtfoll] = useState("00/00/0000");
  const [value, setvalue] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [responsedata, setresponsedata] = useState([]);
  const [flwdata, setflwdata] = useState([]);

  const apiURL = process.env.REACT_APP_API_URL;

  console.log("color code", colorcode);

  useEffect(() => {
    getresponse();
  }, []);

  const getresponse = async () => {
    let res = await axios.get(apiURL + "/getresponse");
    if ((res.status = 200)) {
      console.log(res.data.response);
      setresponsedata(res.data?.response);
    }
  };

  useEffect(() => {
    getenquiryadd();
    getenquiryfollowup();
  }, []);

  const getenquiryadd = async () => {
    let res = await axios.get(apiURL + "/getenquiry");
    if ((res.status = 200)) {
      setfilterdata(
        res.data?.enquiryadd.filter((item) => item.EnquiryId == EnquiryId)
      );
    }
  };

  const getenquiryfollowup = async () => {
    let res = await axios.get(apiURL + "/getenquiryfollowup");
    if ((res.status = 200)) {
      setflwdata(
        res.data?.enquiryfollowup.filter((item) => item.EnquiryId == EnquiryId)
      );
    }
  };
  let i = 1;

  const addenquiryfollowup1 = async (e) => {
    e.preventDefault();

    if (!desc || !response) {
      alert("Fill all feilds");
    } else {
      try {
        const config = {
          url: `/addenquiryfollowup`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            staffname: admin.displayname,
            category: filterdata[0]?.category,
            folldate: moment().format("llll"),
            response: response,
            desc: desc,
            value: value,
            colorcode: colorcode,
            nxtfoll: nxtfoll,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert(" Added");

            window.location.assign(`/enquirydetail/${EnquiryId}`);
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  const addcalllater = async (e) => {
    e.preventDefault();

    if (!desc || !response || !nxtfoll || !colorcode) {
      alert("Fill all feilds");
    } else {
      try {
        const config = {
          url: `/addenquiryfollowup`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            staffname: admin.displayname,
            category: filterdata[0]?.category,
            folldate: moment().format("llll"),
            response: response,
            desc: desc,
            value: value,
            colorcode: colorcode,
            nxtfoll: nxtfoll,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert(" Added");

            window.location.assign(`/enquirydetail/${EnquiryId}`);
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };
  const addsurvey = async (e) => {
    e.preventDefault();

    if (!desc || !nxtfoll) {
      alert("Fill all feilds");
    } else {
      try {
        const config = {
          url: `/addenquiryfollowup`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            staffname: admin.displayname,
            category: filterdata[0]?.category,
            folldate: moment().format("llll"),
            response: response,
            desc: desc,
            value: value,
            colorcode: colorcode,
            nxtfoll: nxtfoll,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert(" Added");

            window.location.assign(`/enquirydetail/${EnquiryId}`);
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  const postconvertcustomer = async (e) => {
    e.preventDefault();

    if (!desc || !value) {
      alert("fill all fields");
    } else {
      try {
        const config = {
          url: `/addenquiryfollowup`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            category: filterdata[0]?.category,
            staffname: admin.displayname,
            folldate: moment().format("llll"),
            response: response,
            desc: desc,
            value: value,
            nxtfoll: nxtfoll,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert(" Added");
            navigate(`/convertcustomer/${EnquiryId}`);
            // window.location.assign("/convertcustomer",{data});
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  const deleteenquiry = async () => {
    let Ask = window.confirm("Are you sure you want to delete this message?");
    // alert("Are you sure want delete")
    if (Ask === true) {
      axios({
        method: "post",
        url: apiURL + "/deleteteenquiry/" + filterdata[0]?._id,
      })
        .then(function (response) {
          //handle success
          console.log(response);
          window.alert("Deleted successfully");
          window.location.assign("/enquirynew");
        })
        .catch(function (error) {
          //handle error
          console.log(error.response.data);
        });
    } else {
      window.location.assign("/enquirynew");
    }
  };
  const editdetails = (data) => {
    navigate(`/editenquiry/${data}`);
  };
  const createQuote = (data) => {
    navigate(`/createquote/${data}`);
  };

  function getColor(colorcode) {
    if (colorcode === "easy") {
      return "#ffb9798f";
    } else if (colorcode === "medium") {
      return "#0080002e";
    } else if (colorcode === "different") {
      return '#ffb9798f"';
    } else {
      return "transparent";
    }
  }

  return (
    <div className="row">
      <Header />

      <div className="row m-auto">
        <div className="col-md-12">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={12}>
                <Nav variant="pills" className="flex-row">
                  <Nav.Item>
                    <Nav.Link eventKey="">
                      <Link to="/enquiryadd"> Enquiry Add</Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">
                      <Link to="/enquirynew">New</Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">
                      <Link to="/enquirysearch">Enquiry Search</Link>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first"></Tab.Pane>
                  <Tab.Pane eventKey="second"></Tab.Pane>
                  <Tab.Pane eventKey="third"></Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>

      <div className="row m-auto">
        <div className="col-md-12">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row mt-3">
                          <div className="col-md-5">
                            <div className="vhs-sub-heading">
                              Enquiry Detail
                            </div>
                            <div className="mt-1">
                              <div
                                className="row m-auto"
                                style={{
                                  backgroundColor: "#e2e3e5",
                                  padding: "8px",
                                }}
                              >
                                <div
                                  className="text-center "
                                  style={{ color: "black" }}
                                >
                                  <span onClick={() => editdetails(EnquiryId)}>
                                    Modify
                                  </span>
                                  |<Link onClick={deleteenquiry}>Delete |</Link>
                                  <span onClick={() => createQuote(EnquiryId)}>
                                    Create Quote
                                  </span>
                                </div>
                              </div>
                              <table class="table table-hover table-bordered">
                                <tbody>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">Enquiry ID</td>
                                    <td>{filterdata[0]?.EnquiryId}</td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">Category</td>
                                    <td> {filterdata[0]?.category}</td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">
                                      Enquiry Date
                                    </td>
                                    <td> {filterdata[0]?.enquirydate}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Executive</td>
                                    <td>{filterdata[0]?.executive}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Name</td>
                                    <td>{filterdata[0]?.name}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Contact 1</td>
                                    <td>{filterdata[0]?.contact1}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Contact 2</td>
                                    <td>{filterdata[0]?.contact2}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Email Id</td>
                                    <td>{filterdata[0]?.email}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Address</td>
                                    <td>{filterdata[0]?.address}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Reference</td>
                                    <td>{filterdata[0]?.reference1}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Reference 2</td>
                                    <td>{filterdata[0]?.reference2}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">
                                      Interested For
                                    </td>
                                    <td>{filterdata[0]?.intrestedfor}</td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">Comment</td>
                                    <td>{filterdata[0]?.comment}</td>
                                  </tr>
                                </tbody>
                              </table>{" "}
                              <div
                                className="row"
                                style={{
                                  backgroundColor: "#e2e3e5",
                                  padding: "8px",
                                  marginTop: "-17px",
                                  marginLeft: "0px",
                                  marginRight: "0px",
                                }}
                              >
                                <div className="text-center"></div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-7">
                            <div className="vhs-sub-heading">
                              Follow-Up Detail
                            </div>
                            <table class=" mt-1">
                              <thead className="">
                                <tr className="bg">
                                  <th className="bor" scope="col">
                                    Sr
                                  </th>
                                  <th className="bor" scope="col">
                                    Date
                                  </th>
                                  <th className="bor" scope="col">
                                    Staff
                                  </th>
                                  <th className="bor" scope="col">
                                    Response
                                  </th>
                                  <th className="bor" scope="col">
                                    Description
                                  </th>
                                  <th className="bor" scope="col">
                                    Value
                                  </th>
                                  <th className="bor" scope="col">
                                    Next Foll.
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {flwdata.map((item) => (
                                  <tr
                                    key={item.id}
                                    className="user-tbale-body tbl1"
                                    style={{
                                      backgroundColor: getColor(item.colorcode),
                                      color: "black",
                                    }}
                                  >
                                    <td>{i++}</td>
                                    <td>{item.folldate}</td>
                                    <td>{item.staffname}</td>
                                    <td>{item.response}</td>
                                    <td>{item.desc}</td>
                                    <td>{item.value}</td>
                                    <td>{item.nxtfoll}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            <div className="card" style={{ marginTop: "20px" }}>
                              <div className="card-body p-4">
                                <form>
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div className="vhs-input-label">
                                        Staff Name
                                      </div>
                                      <div className="group pt-1 vhs-non-editable">
                                        {admin.displayname}
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="vhs-input-label">
                                        Foll. Date
                                      </div>
                                      <div className="group pt-1 vhs-non-editable">
                                        {moment().format("llll")}
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="vhs-input-label">
                                        Response
                                        <span className="text-danger">*</span>
                                      </div>
                                      <div className="group pt-1">
                                        <select
                                          className="col-md-12 vhs-input-value"
                                          onChange={(e) =>
                                            setresponse(e.target.value)
                                          }
                                        >
                                          <option>--select--</option>
                                          {responsedata.map((i) => (
                                            <option value={i.response}>
                                              {i.response}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row pt-3">
                                    <div className="col-md-4">
                                      <div className="vhs-input-label">
                                        Description
                                        <span className="text-danger"> *</span>
                                      </div>
                                      <div className="group pt-1">
                                        <textarea
                                          rows={20}
                                          cols={20}
                                          className="col-md-12 vhs-input-value"
                                          onChange={(e) =>
                                            setdesc(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {response == "New" ? (
                                    <>
                                      <div className="row pt-3">
                                        <div className="col-md-4"></div>
                                        <div className="col-md-1">
                                          <button
                                            className="vhs-button mx-5"
                                            onClick={addenquiryfollowup1}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  {response == "Not Intrested" ? (
                                    <>
                                      <div className="row pt-3">
                                        <div className="col-md-4"></div>
                                        <div className="col-md-1">
                                          <button
                                            className="vhs-button mx-5"
                                            onClick={addenquiryfollowup1}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  {response == "Survey" ? (
                                    <>
                                      <div className="row pt-3">
                                        <div className="col-md-4">
                                          <div className="vhs-input-label">
                                            Nxt Foll date
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </div>
                                          <div className="group pt-1">
                                            <input
                                              type="date"
                                              className="col-md-12 vhs-input-value"
                                              onChange={(e) =>
                                                setnxtfoll(e.target.value)
                                              }
                                              placeholder={moment().format("L")}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-1">
                                          <button
                                            className="vhs-button mx-5"
                                            onClick={addsurvey}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {response == "Call Later" ? (
                                    <>
                                      {" "}
                                      <div className="row pt-3">
                                        <div className="col-md-4">
                                          <div className="vhs-input-label">
                                            color code
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </div>
                                          <div className="group pt-1">
                                            <select
                                              className="col-md-12 vhs-input-value"
                                              onChange={(e) =>
                                                setcolorcode(e.target.value)
                                              }
                                            >
                                              <option>--select--</option>
                                              <option value="easy">Easy</option>
                                              <option value="medium">
                                                Medium
                                              </option>
                                              <option value="different">
                                                Different
                                              </option>
                                            </select>
                                          </div>

                                          <div className="col-md-12 mt-2">
                                            <div className="vhs-input-label">
                                              Nxt Foll date
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </div>
                                            <div className="group pt-1">
                                              <input
                                                type="date"
                                                className="col-md-12 vhs-input-value"
                                                onChange={(e) =>
                                                  setnxtfoll(e.target.value)
                                                }
                                                placeholder={moment().format(
                                                  "L"
                                                )}
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-1">
                                          <button
                                            className="vhs-button mx-5"
                                            onClick={addcalllater}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                 
                                    {response === "Confirmed" ? (
                                      <div className="col-md-12 mt-2">
                                        <div className="vhs-input-label">
                                          Value
                                          <span className="text-danger">*</span>
                                        </div>
                                        <div className="group pt-1">
                                          <input
                                            type="text"
                                            className="col-md-4 vhs-input-value"
                                            onChange={(e) =>
                                              setvalue(e.target.value)
                                            }
                                          />
                                        </div>

                                        <div className="col-md-1 mt-2">
                                          <button
                                            className="vhs-button mx-5"
                                            style={{ width: "150px" }}
                                            onClick={postconvertcustomer}
                                          >
                                            Convert to Customer{" "}
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="col-md-1">
                                        {/* <button
                                          className="vhs-button mx-5"
                                          onClick={addenquiryfollowup1}
                                        >
                                          Save
                                        </button> */}
                                      </div>
                                    )}
                                 
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="vhs-sub-heading pb-2 mt-3">
                          Send SMS
                        </div>
                        <div className="card mb-5" style={{}}>
                          <div className="card-body p-3">
                            <form>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="vhs-input-label">
                                    SMS Template{" "}
                                    <span className="text-danger"> *</span>
                                  </div>
                                  <div className="group pt-1">
                                    <select className="col-md-12 vhs-input-value">
                                      <option>--select--</option>
                                      <option>After Payment (use this)</option>
                                      <option>
                                        After Service Booked (use this)
                                      </option>
                                      <option>
                                        After Service Schedule (use this)
                                      </option>
                                      <option>Bindu Followup</option>
                                      <option>Enquiry (use this)</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="col-md-4">
                                  <div className="vhs-input-label">
                                    Template ID
                                  </div>
                                  <div className="group pt-1">
                                    <input
                                      type="text"
                                      className="col-md-12 vhs-input-value"
                                    />
                                  </div>
                                </div>

                                <div className="col-md-4">
                                  <div className="vhs-input-label">
                                    SMS Text
                                    <span className="text-danger"> *</span>
                                  </div>
                                  <div className="group pt-1">
                                    <textarea
                                      rows={4}
                                      cols={6}
                                      className="col-md-12 vhs-input-value"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row pt-3 justify-content-center">
                                <div className="col-md-1">
                                  <button className="vhs-button">
                                    Send SMS
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="second">
                    <Enquiryadd />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Enquirynew />
                  </Tab.Pane>
                  <Tab.Pane eventKey="four">
                    <Enquirysearch />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
}

export default Enquirynewdetail;
