import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/layout/Header";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Surveynav from "../components/Surveynav";
import Quotenav from "../components/Quotenav";
import moment from "moment";

function Createquote() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const { EnquiryId } = useParams();
  console.log(EnquiryId);
  const navigate = useNavigate();
  // const location = useLocation();
  // const data = location.state?.data || null;

  // const [techniciandata, settechniciandata] = useState([]);
  const [materialdata, setmaterialdata] = useState([]);
  const [regiondata, setregiondata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  const [ajobdata, setajobdata] = useState([]);
  const [ajobdatarate, setajobdatarate] = useState([]);
  const [desc, setdesc] = useState("");
  const [region, setregion] = useState("");
  const [material, setmaterial] = useState("");
  const [qty, setqty] = useState("");
  const [job, setjob] = useState("");
  const [rate, setrate] = useState("");
  // const [treatmentdata, setfilterdata] = useState([]);
  const [quoteflowdata, setquoteflowdata] = useState([]);
  const [quotenxtfoll, setquotenxtfoll] = useState("");
  const [staffname, setstaffname] = useState("");
  const [folldate, setfolldate] = useState("");
  const [response, setresponse] = useState([]);
  const [response1, setresponse1] = useState("");
  const [quotedata, setquotedata] = useState([]);
  const [descrption, setdescrption] = useState("");
  const [category, setcategory] = useState("");
  const [treatmentdata, settreatmentdata] = useState([]);
  const [categorydata, setcategorydata] = useState([]);
  const [Gst, setGST] = useState(false);

  const [adjustment, setadjustment] = useState("");
  const [SUM, setSUM] = useState("");
  const [quotepagedata, setquotepagedata] = useState([]);
  const [enquirydata, setenquirydata] = useState([]);
  const [projecttype, setprojecttype] = useState(
    quotepagedata[0]?.quotedata[0]?.projectType
  );
  // console.log("data", quotepagedata);

  const [netTotal, setnetTotal] = useState("");

  const nearte = parseInt(ajobdatarate.map((i) => i.rate));

  useEffect(() => {
    getresponse();
    getcategory();
    getenquiryadd();
  }, []);

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      setcategorydata(res.data?.category);
    }
  };

  const getresponse = async () => {
    let res = await axios.get(apiURL + "/getresponse");
    if ((res.status = 200)) {
      setresponse(res.data?.response);
    }
  };
  const getenquiryadd = async () => {
    let res = await axios.get(apiURL + "/getenquiry");
    if ((res.status = 200)) {
      setenquirydata(
        res.data?.enquiryadd.filter((item) => item.EnquiryId == EnquiryId)
      );
    }
  };

  const addquotefollowup = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: `/addquotefollowup`,
        method: "post",
        baseURL: apiURL,
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          EnquiryId: EnquiryId,
          category: quotepagedata[0]?.category,
          staffname: admin.displayname,
          folldate: moment().format("L"),
          folltime: moment().format("LT"),
          response: response1,
          nxtfoll: quotenxtfoll,
          desc: descrption,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert(" Added");
          window.location.assign(`/quotedetails/${EnquiryId}`);
        }
      });
    } catch (error) {
      console.error(error);
      alert(" Not Added");
    }
  };

  const addtreatment = async (e) => {
    e.preventDefault();
    if (!region | !material | !qty | !job) {
      alert("Fill all fields");
    } else {
      try {
        const config = {
          url: "/addtreatment",
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            // userid: data._id,
            category: category,
            region: region,
            material: material,
            job: job,
            qty: qty,
            rate: nearte,
            subtotal: qty * nearte,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert(" Added");
            window.location.reload();
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  const getquotepage = async () => {
    let res = await axios.get(apiURL + "/getenquiryquote");
    if ((res.status = 200)) {
      // console.log("getenquiryquote--", res);
      setquotepagedata(
        res.data?.enquiryadd.filter((item) => item.EnquiryId == EnquiryId)
      );
    }
  };
  const gettreatment = async () => {
    let res = await axios.get(apiURL + "/gettreatment");
    if ((res.status = 200)) {
      settreatmentdata(
        res.data?.treatment.filter((i) => i.EnquiryId == EnquiryId)
      );
    }
  };

  const getmaterial = async () => {
    let res = await axios.get(apiURL + "/master/getamaterial");
    if ((res.status = 200)) {
      setmaterialdata(res.data?.amaterial);
    }
  };
  const getquote = async () => {
    let res = await axios.get(apiURL + "/getquote");
    if ((res.status = 200)) {
      setquotedata(res.data?.quote.filter((i) => i.EnquiryId == EnquiryId));
    }
  };

  const getregion = async () => {
    let res = await axios.get(apiURL + "/master/getaregion");
    if ((res.status = 200)) {
      console.log(res);
      setregiondata(res.data?.aregion);
    }
  };
  useEffect(() => {
    // gettechnician();
    getmaterial();
    getregion();
    getquote();
    getquotepage();
    gettreatment();
  }, []);

  useEffect(() => {
    if (quotedata.length > 0) {
      setGST(quotedata[0]?.GST || false);
    }
  }, [quotedata]);

  useEffect(() => {
    postallajob();
  }, [material]);

  const postallajob = async () => {
    let res = await axios.post(apiURL + "/master/postajob", {
      material: material,
    });
    if ((res.status = 200)) {
      setajobdata(res.data?.ajob);
    }
  };

  useEffect(() => {
    postallajobrate();
  }, [job]);

  const postallajobrate = async () => {
    let res = await axios.post(apiURL + "/master/postajobrate", {
      desc: job,
    });
    if ((res.status = 200)) {
      setajobdatarate(res.data?.ajob);
    }
  };

  var i = 1;

  const deletetreatment = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/deletetreatment/" + id,
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

  function calculateTotalPrice(data) {
    let totalPrice = 0;
    for (let i = 0; i < data.length; i++) {
      totalPrice += parseInt(data[i].subtotal);
    }
    return totalPrice;
  }

  const total = calculateTotalPrice(treatmentdata);
  const GSTAmount = total * 0.05;
  const totalWithGST = total + GSTAmount;

  console.log("total", total);
  console.log("totalWithGST", totalWithGST);

  const handleChange = (event) => {
    // setGst(event.target.value);
    // if (Gst) {
    //   window.location.reload();
    // }
  };
  const savequote = async (e) => {
    e.preventDefault();

    if (!total) {
      alert("something went wrong");
    } else {
      try {
        const config = {
          url: "/addquote",
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            GST: Gst,
            projectType: projecttype,
            qamt: Gst ? totalWithGST : total,
            adjustment: adjustment,
            SUM: total,
            total: total,
            netTotal: Gst ? totalWithGST : total,
            date: moment().format("L"),
            time: moment().format("LT"),
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert(" Added");
            window.location.assign(`/quotedetails/${EnquiryId}`);
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  const updatequote = async (e) => {
    e.preventDefault();

    if (!total) {
      alert("something went wrong");
    } else {
      try {
        const config = {
          url: `/updatequotedetails/${quotedata[0]?._id}`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            GST: Gst,
            projectType: projecttype,
            qamt: Gst ? totalWithGST : total,
            adjustment: adjustment,
            SUM: total,
            total: total,
            netTotal: Gst ? totalWithGST : total,
            date: quotedata[0]?.date,
            time: quotedata[0]?.time,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert(" Added");
            window.location.assign(`/quotedetails/${EnquiryId}`);
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  const editdetails = (EnquiryId) => {
    navigate(`/editenquiry/${EnquiryId}`);
  };

  console.log("arrayLenght", quotedata.length);
  return (
    <div className="web">
      <Header />
      <Quotenav />

      <div className="row m-auto pb-4 mb-5">
        {" "}
        <div style={{ background: "white", color: "black" }}>
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <form>
                <h5>Billing Details</h5>
                <hr />
                <div className="row">
                  <div className="col-md-4">
                    <b>Enquiry Id : </b>
                    {enquirydata[0]?.EnquiryId}
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <b>Mobile No : </b>
                      {enquirydata[0]?.contact1}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="">
                      <b>Customer Name : </b>
                      {enquirydata[0]?.name}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="">
                      <b>Email : </b>
                      {enquirydata[0]?.email}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <b>Address : </b>
                      {enquirydata[0]?.address}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <b>Interested for : </b>
                      {enquirydata[0]?.intrestedfor}
                    </div>
                  </div>
                </div>
                <div className="row pt-3 justify-content-end">
                  <div className="col-md-3 ">
                    <button
                      className="vhs-button"
                      style={{ width: "120px" }}
                      onClick={() => editdetails(EnquiryId)}
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="card-body p-4">
              <h5>Treatment Details</h5>
              <hr />
              <form>
                <div className="row">
                  <div className="col-md-4 ">
                    <div className="vhs-input-label">
                      Category<span className="text-danger">*</span>
                    </div>
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setcategory(e.target.value)}
                      name="region"
                    >
                      <option>--select--</option>
                      {categorydata.map((item) => (
                        <option value={item.category}>{item.category}</option>
                      ))}
                    </select>
                  </div>{" "}
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Select Region
                      <span className="text-danger">*</span>
                    </div>
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setregion(e.target.value)}
                      name="region"
                    >
                      <option>--select--</option>
                      {regiondata.map((item) => (
                        <option value={item.aregion}>{item.aregion}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Select material
                      <span className="text-danger">*</span>
                    </div>
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setmaterial(e.target.value)}
                      name="material"
                    >
                      <option>--select--</option>
                      {materialdata.map((item) => (
                        <option value={item.material}>{item.material}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Select Job</div>
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setjob(e.target.value)}
                      name="job"
                    >
                      <option>--select--</option>
                      {ajobdata.map((item) => (
                        <option value={item.desc}>{item.desc}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Enter Qty <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="number"
                        name="qty"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setqty(e.target.value)}
                      />
                    </div>
                  </div>{" "}
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Enter Rate </div>
                    <div className="group pt-1">
                      {ajobdatarate.map((item) => (
                        <input
                          type="text"
                          name="rate"
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => setrate(e.target.value)}
                          value={item.rate}
                        />
                      ))}
                    </div>
                  </div>{" "}
                  <div className="col-md-4 pt-3 mt-4 justify-content-center">
                    <div className="col-md-2 ">
                      <button className="vhs-button" onClick={addtreatment}>
                        Add Item
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="mt-5">
                <table class="table table-hover table-bordered mt-1">
                  <thead className="">
                    <tr className="table-secondary">
                      <th className="table-head" scope="col">
                        Sr
                      </th>
                      <th className="table-head" scope="col">
                        Category
                      </th>
                      <th className="table-head" scope="col">
                        Region
                      </th>
                      <th className="table-head" scope="col">
                        Material
                      </th>
                      <th className="table-head" scope="col">
                        Job
                      </th>
                      <th className="table-head" scope="col">
                        Qty
                      </th>
                      <th className="table-head" scope="col">
                        Rate
                      </th>
                      <th className="table-head" scope="col">
                        Amount
                      </th>
                      <th className="table-head" scope="col">
                        action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <div></div>
                    {quotepagedata[0]?.treatmentdetails.map((item) => (
                      <tr>
                        <td>{i++}</td>
                        <td>{item.category}</td>
                        <td>{item.region}</td>
                        <td>{item.material}</td>
                        <td>{item.job}</td>
                        <td>{item.qty}</td>
                        <td>{item.rate}</td>
                        <td style={{ textAlign: "center" }}>{item.subtotal}</td>
                        <td style={{ textAlign: "center" }}>
                          {" "}
                          <a onClick={() => deletetreatment(item._id)}>
                            <img
                              src="/images/delete.png"
                              style={{ width: "30px", height: "30px" }}
                            />
                          </a>
                        </td>
                      </tr>
                    ))}

                    <tr style={{ background: "lightgray" }}>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td style={{ textAlign: "center" }}> {total}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Project Type </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      defaultValue={
                        quotepagedata[0]?.quotedata[0]?.projectType
                          ? quotepagedata[0]?.quotedata[0]?.projectType
                          : ""
                      }
                      onChange={(e) => setprojecttype(e.target.value)}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">SUM </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      value={total}
                      onChange={(e) => setSUM(e.target.value)}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">GST(5%) </div>
                  <div>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={Gst}
                      // checked={(quotedata[0]?.GST)?(quotedata[0]?.GST):false}
                      onChange={(e) => setGST(e.target.checked)}
                      // onChange={handleChange}
                    />
                    <label class="vhs-sub-heading mx-3" for="flexCheckDefault">
                      YES / NO
                    </label>
                  </div>
                </div>{" "}
              </div>
              <div className="row">
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Total </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      value={total}

                      // onChange={(e)=>settotal(e.target.value)}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Adjustments </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setadjustment(e.target.value)}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Net Total </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      value={Gst ? totalWithGST : total}
                    />
                  </div>
                </div>{" "}
              </div>

              <div className="row pt-3 justify-content-center">
                <div className="col-md-2 ">
                  {quotepagedata[0]?.quotedata.length <= 0 ? (
                    <button
                      className="vhs-button "
                      style={{ width: "150px" }}
                      onClick={savequote}
                    >
                      Save Quote
                    </button>
                  ) : (
                    <button
                      className="vhs-button "
                      style={{ width: "150px" }}
                      onClick={updatequote}
                    >
                      Save quote
                    </button>
                  )}
                </div>
                <div className="col-md-2 ">
                  <Link to="/quotationterm" state={{ data: quotepagedata }}>
                    <button className="vhs-button " style={{ width: "150px" }}>
                      Print Quote
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h6>Followup Details</h6>
            <table class="table table-hover table-bordered mt-1">
              <thead className="">
                <tr className="table-secondary">
                  <th className="table-head" scope="col">
                    Sr
                  </th>
                  <th className="table-head" scope="col">
                    Foll Date
                  </th>
                  <th className="table-head" scope="col">
                    staffname
                  </th>
                  <th className="table-head" scope="col">
                    Response
                  </th>
                  <th className="table-head" scope="col">
                    Desc
                  </th>
                  <th className="table-head" scope="col">
                    Nxt foll
                  </th>
                </tr>
              </thead>
              <tbody>
                {quotepagedata[0]?.quotefollowup.map((item, index) => (
                  <div className="tbl">
                    <div className="tbl">
                      <tr className="user-tbale-body tbl1">
                        <td>{index + 1}</td>
                        <td>{item.folldate}</td>
                        <td>{item.staffname}</td>
                        <td>{item.response}</td>
                        <td>{item.desc}</td>
                        <td>{item.nxtfoll}</td>
                      </tr>
                    </div>
                  </div>
                ))}
              </tbody>
            </table>
          </div>
          <p>Take Follow-up</p>
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Foll .Date </div>
                  <div className="group pt-1">
                    {moment().format("L")} {moment().format("LT")}
                    {/* <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      value=
                      onChange={(e) => setfolldate(e.traget.value)}
                    /> */}
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Staff Name </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      value={admin.displayname}
                      onChange={(e) => setstaffname(e.target.value)}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">
                    Response
                    <span className="text-danger">*</span>
                  </div>
                  <div className="group pt-1">
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setresponse1(e.target.value)}
                    >
                      <option>--select--</option>
                      {response.map((item) => (
                        <option>{item.response}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Description </div>
                  <div className="group pt-1">
                    <textarea
                      rows={5}
                      type="text"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setdescrption(e.target.value)}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Nxt Foll</div>
                  <div className="group pt-1">
                    <input
                      type="date"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setquotenxtfoll(e.target.value)}
                    />
                  </div>
                </div>{" "}
              </div>

              <div className="row pt-3 justify-content-center">
                <div className="col-md-3 ">
                  <button className="vhs-button " onClick={addquotefollowup}>
                    Save Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createquote;
