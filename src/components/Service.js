import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import DataTable from "react-data-table-component";
import Table from "react-bootstrap/Table";
import Multiselect from "multiselect-react-dropdown";

import { useNavigate } from "react-router-dom";

const onChange = (time, timeString) => {
  console.log(time, timeString);
};

function Services() {
  const existingData = JSON.parse(localStorage.getItem("Store_Slots")) || [];
  const plandata = JSON.parse(localStorage.getItem("plans")) || [];
  const homepagetitleData =
    JSON.parse(localStorage.getItem("homepagetitle")) || [];
  const morepriceData = JSON.parse(localStorage.getItem("plansprice")) || [];

  const navigate = useNavigate();
  const [postsubdata, setpostsubdata] = useState([]);
  const [citydata, setcitydata] = useState([]);
  const [selected, setSelected] = useState(false);
  const [categorydata, setcategorydata] = useState([]);
  const [Servicedata, setServicedata] = useState([]);
  const [postservicename, setpostservicename] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [ServiceImg, setServiceImg] = useState("");
  const [sub_subcategory, setsub_subcategory] = useState("");
  const [ServiceHour, setServiceHour] = useState("");
  const [ServiceName, setServiceName] = useState("");
  const [ServiceDesc, setServiceDesc] = useState("");
  const [ServicePrice, setServicePrice] = useState("");
  const [ServiceGst, setServiceGst] = useState("");
  const [NofServiceman, setNofServiceman] = useState("");
  const [Subcategory, setSubcategory] = useState("");
  const [category, setcategory] = useState("");
  // const [Servicesno, setServicesno] = useState("");
  const [sAddons, setsAddons] = useState("");
  const [pricecity, setpricecity] = useState("");

  const [Icon, setIcon] = useState("");
  const [Desc, setDesc] = useState("");

  const [slotsdata, setslotsdata] = useState([]);
  const [titledata, settitledata] = useState([]);
  const [slotCity, setslotcity] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState([]);
  const [servicePeriod, setservicePeriod] = useState("");

  const [Image, setImage] = useState("");
  const [Plans, setPlans] = useState("");
  const [homepagetitle, sethomePagetitle] = useState("");
  const [serviceDirection, setserviceDirection] = useState("");
  const [searchItems, setSearchItems] = useState("");
  const [serID, setserID] = useState("");
  const [serviceIncludes, setserviceIncludes] = useState("");
  const [serviceExcludes, setserviceExcludes] = useState("");
  const [quantity, setquantity] = useState("");
  const [pName, setpName] = useState("");
  const [pPrice, setpPrice] = useState("");
  const [pofferprice, setpofferprice] = useState("");
  const [pservices, setpservices] = useState("");
  const [servicetitle, setServicetitle] = useState("");

  const [Inimg, setInimg] = useState("");
  const [Eximg, setEximg] = useState("");
  const [Desimg, setDesimg] = useState("");
  const [servicebelow, setServicebelow] = useState("");
  const [titleName, settitleName] = useState("");
  const [catdata, setcatdata] = useState([]);
  const formdata = new FormData();
  const [data, setdata] = useState([]);
  const [rating, setrating] = useState("");

  const [editCatagoryName, setEditCatagoryName] = useState("");
  const [editSubcategoryName, setEditSubcategoryName] = useState("");
  const [editSubCategoryList, setEditSubCategoryList] = useState("");
  const [editServiceName, setEditServiceName] = useState("");
  const [editServiceDescription, setEditServiceDescription] = useState("");
  const [editServiceHour, setEditServiceHour] = useState("");
  const [editServiceImage, setEditServiceImage] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [editSubcategory, setEditSubcategory] = useState({});
  const [Servicesno, setServicesno] = useState(
    new Array(slotsdata.length).fill("")
  );
  const handleEdit = (subcategory) => {
    setEditSubcategory(subcategory);
    handleShowPopUp(true);
  };

  const handleShowPopUp = () => {
    setShowEdit(true);
  };
  const handleClosePopup = () => {
    setShowEdit(false); // Hide the edit form after submitting it or canceling it by pressing
  };

  const [includes, setIncludes] = useState([]); // State to store includes items
  const [newInclude, setNewInclude] = useState(""); // State to store the new include text
  const [desc, setdesc] = useState([]); // State to store includes items
  const [newdesc, setNewdesc] = useState("");

  const [excludes, setExcludes] = useState([]); // State to store includes items
  const [newEncludes, setNewExclude] = useState(""); // State to store the new include text

  const [showAddedData, setShowAddedData] = useState(false);
  const [showAddedData1, setShowAddedData1] = useState(false);
  const [showAddedData2, setShowAddedData2] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null); // State to store the selected image
  const [selectedImage2, setSelectedImage2] = useState(null); // State to store the selected image

  const handleAddInclude = () => {
    if (newInclude.trim() !== "" || selectedImage !== null) {
      const newIncludeItem = { text: newInclude, image: selectedImage };
      setIncludes([...includes, newIncludeItem]);
      setNewInclude(""); // Clear the input fields
      setShowAddedData(true); // Show the added data below the modal
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL); // Store the selected image
    }
  };

  const handleAddExclude = () => {
    if (newEncludes.trim() !== "" || selectedImage1 !== null) {
      const newExcludeItem = { text: newEncludes, image: selectedImage1 };
      setExcludes([...excludes, newExcludeItem]);
      setNewExclude(""); // Clear the input fields
      setShowAddedData1(true); // Show the added data below the modal
    }
  };

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage1(imageURL); // Store the selected image
    }
  };

  const handleAdddesc = () => {
    if (newdesc.trim() !== "" || selectedImage2 !== null) {
      const newDESCItem = { text: newdesc, image: selectedImage2 };
      setdesc([...desc, newDESCItem]);
      setNewdesc(""); // Clear the input fields
      setShowAddedData2(true); // Show the added data below the modal
    }
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage2(imageURL); // Store the selected image
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setServiceImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleactive1 = () => {
    setSelected(true);
  };
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [toggle, setToggel] = useState(true);
  const [toggle1, setToggel1] = useState(false);
  const [toggle2, setToggel2] = useState(true);

  const handelgeneralbtn = () => {
    setToggel1(true);
  };
  const handeladvancebtn = () => {
    setToggel1(false);
  };
  const handelsavebtn = () => {
    setToggel(true);
  };
  const handelAddbtn = () => {
    setToggel(false);
  };

  useEffect(() => {
    getslots();
    gettitle();
  }, []);

  const getslots = async () => {
    let res = await axios.get("https://api.thevucare.com/api/userapp/getslots");
    if ((res.status = 200)) {
      setslotsdata(res.data?.slots);
    }
  };

  const gettitle = async () => {
    let res = await axios.get("https://api.thevucare.com/api/userapp/gettitle");
    if ((res.status = 200)) {
      settitledata(res.data?.homepagetitle);
    }
  };

  useEffect(() => {
    getallsubcategory();
    getcategory();
  }, []);

  const getallsubcategory = async () => {
    let res = await axios.get("https://api.thevucare.com/api/userapp/getappsubcat");
    if ((res.status = 200)) {
      setcategorydata(res.data?.subcategory);
    }
  };
  const getcategory = async () => {
    let res = await axios.get("https://api.thevucare.com/api/getcategory");
    if ((res.status = 200)) {
      setcatdata(res.data?.category);
    }
  };

  useEffect(() => {
    getsubcategory();
  }, [Subcategory]);

  const getsubcategory = async () => {
    let res = await axios.post(
      `https://api.thevucare.com/api/userapp/postappresubcat/`,
      {
        subcategory: Subcategory,
      }
    );

    if ((res.status = 200)) {
      setpostservicename(res.data?.subcategory);
    }
  };

  const postformat = async (e) => {
    if (!ServiceName || !desc || !category) {
      alert("Please fill all mandatory fields");
    } else {
      e.preventDefault();
      formdata.append("serviceImg", Image);
      // formdata.append("sub_subcategory", sub_subcategory);
      formdata.append("serviceName", ServiceName);
      formdata.append("serviceDirection", serviceDirection);
      formdata.append("category", category);
      formdata.append("Inimg", Inimg);
      formdata.append("Eximg", Eximg);
      formdata.append("Desimg", Desimg);
      formdata.append("Subcategory", Subcategory);
      formdata.append("serviceIncludes", JSON.stringify(includes));
      formdata.append("serviceExcludes", JSON.stringify(excludes));
      formdata.append("quantity", quantity);
      // formdata.append("servicetitle", servicetitle);
      formdata.append("servicebelow", servicebelow);

      formdata.append("serviceHour", ServiceHour);
      formdata.append("serviceDesc", JSON.stringify(desc));
      formdata.append("serviceGst", ServiceGst);

      formdata.append("NofServiceman", NofServiceman);
      formdata.append("sAddons", JSON.stringify(sAddons));

      try {
        const config = {
          url: "/userapp/addservices",
          method: "post",
          baseURL: "https://api.thevucare.com/api",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formdata,
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            alert("Successfully Added");
            const { success, service } = response.data;

            setserID(service._id);
            // Handle the s
            localStorage.removeItem("plansprice");
            handelgeneralbtn();
          }
        });
      } catch (error) {
        console.error(error);
        alert("category  Not Added");
      }
    }
  };

  useEffect(() => {
    getservicemanagement();
  }, []);

  const getservicemanagement = async () => {
    let res = await axios.get("https://api.thevucare.com/api/userapp/getservices");
    if ((res.status = 200)) {
      setServicedata(res.data?.service);
      setfilterdata(res.data?.service);
      console.log(res.data?.service);
    }
  };

  const deletecategory = async (id) => {
    axios({
      method: "post",
      url: "https://api.thevucare.com/api/userapp/deleteservices/" + id,
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
    const filteredData = Servicedata.filter((item) => {
      const searchString = searchItems.toLowerCase();
      const categoryMatch = item.category?.toLowerCase().includes(searchString);
      const subcategoryMatch =
        item.Subcategory?.toLowerCase().includes(searchString);
      const ServiceNameMatch = item.serviceName
        ?.toLowerCase()
        .includes(searchString);
      return categoryMatch || subcategoryMatch || ServiceNameMatch;
    });

    setfilterdata(filteredData);
  }, [searchItems, Servicedata]);
  // setSearchItems
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
      name: "Subcategory",
      selector: (row) => row.Subcategory,
    },
    // {
    //   name: "Sub-subcategory",
    //   selector: (row) => row.sub_subcategory,
    // },
    {
      name: "Service Name",
      selector: (row) => row.serviceName,
    },
    // {
    //   name: "Service Price",
    //   selector: (row) => row.servicePrice,
    // },
    // {
    //   name: "Service Desc",
    //   selector: (row) => row.serviceDesc,
    // },
    {
      name: "Service Hours",
      selector: (row) => row.serviceHour,
    },
    {
      name: "Service Img",
      cell: (row) => (
        <div>
          <img
           src={`https://api.thevucare.com/service/${row.serviceImg}`}
            width="50px"
            height="50px"
          />
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          {/* <a className="hyperlink" onClick={() => handleEdit(row)}>
            Edit |
          </a> */}
          <a onClick={() => deletecategory(row._id)} className="hyperlink mx-1">
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
    postsubcategory();
  }, [category]);

  const postsubcategory = async () => {
    let res = await axios.post(
      `https://api.thevucare.com/api/userapp/postappsubcat/`,
      {
        category: category,
      }
    );

    if ((res.status = 200)) {
      setpostsubdata(res.data?.subcategory);
    }
  };
  useEffect(() => {
    getcity();
  }, []);

  const getcity = async () => {
    let res = await axios.get("https://api.thevucare.com/api/master/getcity");
    if ((res.status = 200)) {
      setcitydata(res.data?.mastercity);
      console.log(res.data?.mastercity);
    }
  };
  const addadvacedata = async (e) => {
    e.preventDefault();

    console.log("existingData", existingData);
    try {
      const config = {
        url: `/userapp/updateadvanceddata/${serID}`,
        method: "post",
        baseURL: "https://api.thevucare.com/api",
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          // cardno: cardno,
          plans: plandata,

          morepriceData: morepriceData,
          store_slots: existingData,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          // localStorage.removeItem("Store_Slots");
          localStorage.removeItem("plansprice");
          localStorage.removeItem("plansdeatils");

          setserID("");
          handelsavebtn();
          window.location.reload();
        }
      });
    } catch (error) {
      console.error(error);
      alert(" Not Added");
    }
  };

  const updateService = async (e) => {
    e.preventDefault();
    try {
      const serviceId = editSubcategory._id;
      const formdata = new FormData();
      formdata.append("category", editCatagoryName);
      formdata.append("Subcategory", editSubcategoryName);
      formdata.append("sub_subcategory", editSubCategoryList);
      formdata.append("serviceName", editServiceName);
      formdata.append("serviceDesc", editServiceDescription);
      formdata.append("serviceHour", editServiceHour);

      if (editServiceImage) {
        formdata.append("serviceImg", editServiceImage);
      }

      const config = {
        url: `/userapp/updateservices/${serviceId}`,
        method: "put",
        baseURL: "https://api.thevucare.com/api",
        data: formdata,
      };
      const response = await axios(config);
      if (response.status === 200) {
        console.log("success");
        alert(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert("Unable to complete the request");
    }
  };

  const handleSaveChanges = () => {
    const existingData = JSON.parse(localStorage.getItem("Store_Slots")) || [];

    // Create an array of objects to store row data and checkbox states
    const updatedData = slotsdata
      .map((item, index) => ({
        id: Date.now() + index, // Unique ID for each row
        startTime: item.startTime,
        endTime,
        slotCity,
        Servicesno: Servicesno[index],
        isChecked: checkboxStates[index], // Include the checkbox state
      }))
      .filter((item) => item.isChecked);

    // Add the updated data to the existing data
    existingData.push(...updatedData);

    // Update local storage with the combined data
    localStorage.setItem("Store_Slots", JSON.stringify(existingData));

    handleClose();
  };

  const handleIncludes = () => {
    // Assuming you have already uploaded the image and obtained a URL
    const imageUrl = "https://example.com/path/to/your/image.jpg";

    const sIncludeData = JSON.parse(localStorage.getItem("sInclude")) || [];

    const newData = { Icon: imageUrl, Desc };
    sIncludeData.push(newData);

    localStorage.setItem("sInclude", JSON.stringify(sIncludeData));
    handleClose1();
  };

  const handleSaveplans2 = () => {
    // const homepagetitleData =
    //   JSON.parse(localStorage.getItem("homepagetitle")) || [];
    // console.log("Existing Data:", existingData);

    // // Add new data to the array
    // const newData = { titleName };
    // homepagetitleData.push(newData);

    // // Update local storage with the updated array
    // localStorage.setItem("homepagetitle", JSON.stringify(homepagetitleData));
    handleClose2();
  };

  const handleSaveplanprice = () => {
    const morepriceData = JSON.parse(localStorage.getItem("plansprice")) || [];
    const newId = Date.now(); // You can use a more robust ID generation method if needed

    // Add new data to the array
    const newData = {
      id: newId,
      pricecity,
      pName,
      pofferprice,
      pPrice,
      pservices,
      servicePeriod,
    };
    morepriceData.push(newData);
    console.log("New Data:", newData);

    // Update local storage with the updated array
    localStorage.setItem("plansprice", JSON.stringify(morepriceData));
    handleClose3();
  };

  const handleRowClick = (row) => {
    navigate(`/servicedetails/${row._id}`);
  };

  const dataByCity = {};

  existingData.forEach((item) => {
    const { id, slotCity, startTime, endTime, Servicesno } = item;

    if (!dataByCity[slotCity]) {
      dataByCity[slotCity] = [];
    }

    dataByCity[slotCity].push({ id, startTime, endTime, Servicesno });
  });

  const handleDeleteCity = (id) => {
    console.log("id----", id);
    // Retrieve the existing data from local storage
    const existingData = JSON.parse(localStorage.getItem("Store_Slots")) || [];

    // Find the index of the item with the specified id
    const indexToDelete = existingData.findIndex((item) => item.id === id);

    if (indexToDelete !== -1) {
      // Remove the item at the specified index
      existingData.splice(indexToDelete, 1);

      // Update local storage with the updated array
      localStorage.setItem("Store_Slots", JSON.stringify(existingData));

      window.location.reload();
    }
  };

  const onSelectCatagory = (selectedList, selectedItem) => {
    // Handle select event
    setsAddons(selectedList);
  };
  console.log("sAddons", sAddons);

  const onRemoveCatagory = (selectedList, removedItem) => {
    // Handle remove event
    setsAddons(selectedList);
  };

  const [isChecked, setIsChecked] = useState(false);

  const [checkboxStates, setCheckboxStates] = useState(
    Array(slotsdata.length).fill(false)
  );

  const checkHandler = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };
  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        {toggle ? (
          <div className="row ">
            <div className="col-md-12">
              <h4 style={{ color: "green" }}>Services </h4>
            </div>

            <div className="col-md-12">
              <div className="d-flex float-end mt-3 mb-3">
                <Button
                  type="button"
                  className="btn btn-secondary float-end"
                  onClick={handelAddbtn}
                  style={{ background: "gold", color: "green" }}
                >
                  <i class="fa-regular fa-plus"></i>
                  Add Service
                </Button>
              </div>

              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Search by category, subcategory, service"
                  className="w-25 form-control"
                  value={searchItems}
                  onChange={(e) => setSearchItems(e.target.value)}
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
                  onRowClicked={handleRowClick}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="row w-100 float-center card mt-4">
            <h3>Add Service</h3>
            <div className="row m-auto card-body p-6">
              <div className="col-md-3">
                <Card
                  style={{
                    width: "",
                    height: "",
                    padding: "15px",
                    margin: "15px",
                  }}
                >
                  <Card.Title>
                    Service Icon <span className="text-danger"> *</span>
                  </Card.Title>
                  <InputGroup className="mb-3">
                    <Form.Control
                      height="100px"
                      type="file"
                      aria-label="Username"
                      onChange={onImageChange}
                    />
                  </InputGroup>
                  <img src={ServiceImg} height="150px" />
                  <Card.Body>
                    <Card.Text>
                      <p style={{ fontSize: "12px" }}>
                        {" "}
                        Preferred images size must be less than 5MB
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card
                  style={{
                    width: "",

                    padding: "15px",
                    margin: "15px",
                  }}
                >
                  <Card.Title>Service details</Card.Title>
                  <Form.Label className="mt-3">
                    Category <span className="text-danger"> *</span>
                  </Form.Label>
                  <InputGroup className="mb-2">
                    <Form.Select
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setcategory(e.target.value)}
                    >
                      <option>-Select category-</option>
                      {catdata.map((item) => (
                        <option value={item.category}>{item.category}</option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                  <Form.Label className="mt-3">Subcategory</Form.Label>
                  <InputGroup className="mb-2">
                    <Form.Select
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setSubcategory(e.target.value)}
                    >
                      <option>-Select Subcategory-</option>
                      {postsubdata.map((item) => (
                        <option value={item.subcategory}>
                          {item.subcategory}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                  {/* <Form.Label className="mt-3">Sub-subcategory</Form.Label>
                  <InputGroup className="mb-2">
                    <Form.Select
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setsub_subcategory(e.target.value)}
                    >
                      <option>-Select Subcategory-</option>
                      {postservicename.map((item) => (
                        <option value={item.sub_subcategory}>
                          {item.sub_subcategory}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup> */}

                  <Form.Label className="mt-3">Service duration</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-label="max_hrbook"
                      aria-describedby="basic-addon1"
                      type="text"
                      placeholder="3-5hr"
                      onChange={(e) => setServiceHour(e.target.value)}
                    ></Form.Control>
                  </InputGroup>

                  <Form.Label className="mt-3">
                    Number of Servicemen{" "}
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-label="maxhr"
                      aria-describedby="basic-addon1"
                      type="number"
                      placeholder="15"
                      onChange={(e) => setNofServiceman(e.target.value)}
                    ></Form.Control>
                  </InputGroup>
                </Card>
              </div>
              <div className="col-md-9 shadow p-3 mb-5 bg-body rounded">
                <div className="d-flex ">
                  <p
                    className={!toggle1 ? "gr mr" : "mr"}
                    onClick={handeladvancebtn}
                  >
                    {" "}
                    General
                  </p>
                  <p
                    className={toggle1 ? "gr mr" : "mr"}
                    onClick={handelgeneralbtn}
                  >
                    Advanced
                  </p>
                </div>

                {toggle1 ? (
                  <div>
                    <Form>
                      <Button
                        variant="light"
                        className="mb-3"
                        style={{ color: "skyblue" }}
                        onClick={handleShow}
                      >
                        {" "}
                        <i
                          class="fa-regular fa-plus"
                          style={{ color: "rgb(7, 170, 237)" }}
                        ></i>
                        Add Slot's
                      </Button>{" "}
                      <div
                        style={{
                          // display: "flex",
                          gap: "20px",
                          // flexWrap: "wrap",
                        }}
                      >
                        <table>
                          <tbody>
                            {Object.entries(dataByCity).map(([city, data]) => (
                              <tr key={city}>
                                <td>{city}</td>
                                <td>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      flexWrap: "wrap",
                                      // border:"1px solid gray",
                                      padding: 10,
                                      marginTop: 20,
                                    }}
                                  >
                                    {data.map((item) => (
                                      <div
                                        key={item.id}
                                        style={{
                                          marginRight: "20px",
                                          display: "flex",
                                        }}
                                      >
                                        <p className="slots">
                                          {item.startTime}
                                        </p>
                                        <p
                                          style={{
                                            backgroundColor: "lightblue",
                                            padding: "5px",
                                            width: "35px",
                                          }}
                                        >
                                          {item.Servicesno}
                                        </p>
                                        <i
                                          className="fa-solid fa-trash"
                                          style={{
                                            color: "red",
                                            padding: "10px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleDeleteCity(item.id)
                                          }
                                        ></i>
                                      </div>
                                    ))}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <Button
                        variant="light"
                        className="mb-3"
                        style={{ color: "skyblue" }}
                        onClick={() => handleShow3()}
                      >
                        {" "}
                        <i
                          class="fa-regular fa-plus"
                          style={{ color: "rgb(7, 170, 237)" }}
                        ></i>
                        Add more price
                      </Button>{" "}
                      <div>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              {/* <th>City</th> */}
                              <th>PlanName</th>
                              <th>Price</th>
                              <th>OfferPrice</th>
                              <th>Services</th>
                              {/* <th>servicePeriod</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {morepriceData.map((i) => (
                              <tr>
                                {/* <td>{i.pricecity}</td> */}
                                <td>{i.pName}</td>

                                <td>{i.pPrice}</td>
                                <td>{i.pofferprice}</td>
                                <td>{i.pservices}</td>

                                {/* <th>{i.servicePeriod}</th> */}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Form>

                    <Button type="button" variant="outline-primary">
                      Cancel
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      className="btn btn-secondary float-end"
                      onClick={addadvacedata}
                    >
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Form>
                      <h1>Service Information</h1>

                      <Row className="mb-3">
                        {" "}
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>
                            Service Name <span className="text-danger"> *</span>
                          </Form.Label>

                          <InputGroup className="mb-3">
                            <Form.Control
                              aria-label="max_hrbook"
                              aria-describedby="basic-addon1"
                              type="text"
                              placeholder="Service Name"
                              onChange={(e) => setServiceName(e.target.value)}
                            ></Form.Control>
                          </InputGroup>
                        </Form.Group>
                        {/* <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>For title</Form.Label>

                          <InputGroup className="mb-3">
                            <Form.Control
                              aria-label="max_hrbook"
                              aria-describedby="basic-addon1"
                              type="text"
                              placeholder="Essential"
                              onChange={(e) => setServicetitle(e.target.value)}
                            ></Form.Control>
                          </InputGroup>
                        </Form.Group> */}
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>For below the service </Form.Label>

                          <InputGroup className="mb-3">
                            <Form.Control
                              aria-label="max_hrbook"
                              aria-describedby="basic-addon1"
                              type="text"
                              placeholder="nearby 120 bookings"
                              onChange={(e) => setServicebelow(e.target.value)}
                            ></Form.Control>
                          </InputGroup>
                        </Form.Group>
                      </Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Service Description</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => setDesimg(e.target.files[0])}
                        />
                        <a style={{ fontSize: "12px" }}>
                          (Width:20px height:20px)
                        </a>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          className="mt-3"
                          placeholder="Include description"
                          value={newdesc}
                          onChange={(e) => setNewdesc(e.target.value)}
                        />

                        <Button
                          className="mt-3 vu-btn"
                          style={{
                            background: "gold",
                            color: "green",
                            border: "none",
                            padding: "3px",
                          }}
                          onClick={handleAdddesc}
                        >
                          Add Desc
                        </Button>

                        <div>
                          {desc.map((desc1, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                padding: 10,
                                gap: "10px",
                              }}
                            >
                              {desc1.image ? (
                                <img
                                  src={desc1.image}
                                  alt={`desc ${index + 1}`}
                                  style={{ width: "20px", height: "20px" }}
                                />
                              ) : (
                                ""
                              )}

                              <p> {desc1.text}</p>
                            </div>
                          ))}
                        </div>
                      </Form.Group>
                      <Row className="mt-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Includes</Form.Label>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => setInimg(e.target.files[0])}
                          />
                          <a style={{ fontSize: "12px" }}>
                            (Width:20px height:20px)
                          </a>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            className="mt-3"
                            placeholder="Include description"
                            value={newInclude}
                            onChange={(e) => setNewInclude(e.target.value)}
                          />

                          <Button
                            className="mt-3 vu-btn"
                            style={{
                              background: "gold",
                              color: "green",
                              border: "none",
                              padding: "3px",
                            }}
                            onClick={handleAddInclude}
                          >
                            Add Include
                          </Button>

                          <div>
                            {includes.map((include, index) => (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  padding: 10,
                                  gap: "10px",
                                }}
                              >
                                <img
                                  src={include.image}
                                  alt={`Include ${index + 1}`}
                                  style={{ width: "20px", height: "20px" }}
                                />
                                <p> {include.text}</p>
                              </div>
                            ))}
                          </div>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Excludes</Form.Label>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => setEximg(e.target.files[0])}
                          />
                          <a style={{ fontSize: "12px" }}>
                            (Width:20px height:20px)
                          </a>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            className="mt-3"
                            placeholder="Include description"
                            value={newEncludes}
                            onChange={(e) => setNewExclude(e.target.value)}
                          />

                          <Button
                            className="mt-3 vu-btn"
                            onClick={handleAddExclude}
                            style={{
                              background: "gold",
                              color: "green",
                              border: "none",
                              padding: "3px",
                            }}
                          >
                            Add Excludes
                          </Button>

                          <div>
                            {excludes.map((exclude, index) => (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  padding: 10,
                                  gap: "10px",
                                }}
                              >
                                <img
                                  src={exclude.image}
                                  alt={`Include ${index + 1}`}
                                  style={{ width: "20px", height: "20px" }}
                                />
                                <p> {exclude.text}</p>
                              </div>
                            ))}
                          </div>
                        </Form.Group>
                      </Row>

                      <Row>
                        {/* <Form.Group as={Col} controlId="formGridState">
                          <Form.Label className="mt-3">
                            Select Services redirection{" "}
                            <span className="text-danger"> *</span>
                          </Form.Label>

                          <InputGroup className="mb-2 col-3">
                            <Form.Select
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              onChange={(e) =>
                                setserviceDirection(e.target.value)
                              }
                            >
                              <option>-Select-</option>

                              <option value="Enquiry">Enquiry</option>
                              <option value="Survey">Survey</option>
                              <option value="DSR">DSR single service</option>
                              <option value="AMC">AMC Service</option>
                            </Form.Select>
                          </InputGroup>
                        </Form.Group> */}
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label className="mt-3">
                            GST Percentage
                          </Form.Label>

                          <Form.Select
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => setServiceGst(e.target.value)}
                          >
                            <option>---Select GST---</option>

                            <option value="5%">5%</option>
                            <option value="18%">18%</option>
                            <option value="22%">22%</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          controlId="formGridEmail"
                          className="mt-3"
                        >
                          {/* <Form.Label>Rating</Form.Label>
                          <Form.Control
                            type="text"
                            name="Price"
                            onChange={(e) => setrating(e.target.value)}
                          /> */}
                        </Form.Group>
                      </Row>
                    </Form>
                    <Button type="button" variant="outline-primary">
                      Cancel
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      className="btn btn-secondary float-end"
                      onClick={postformat}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Slots</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Select City </Form.Label>

            <InputGroup className="mb-2 col-3">
              <Form.Select
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setslotcity(e.target.value)}
              >
                <option>-Select-</option>
                {citydata.map((i) => (
                  <option value={i.city}>{i.city}</option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group> */}

          <div className="row">
            <div
              className="col-6"
              style={{
                marginTop: 20,
              }}
            >
              <h6>Slots</h6>
              {slotsdata.map((item, index) => (
                <div style={{ display: "flex" }}>
                  <div>
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`} // Add a unique identifier (e.g., index) for each checkbox
                      checked={checkboxStates[index]} // Use checkboxStates[index] for the checked state
                      onChange={() => checkHandler(index)} // Pass the index for identifying which checkbox was changed
                      style={{ width: "30px", height: "50px", padding: "30px" }}
                      className="custom-checkbox"
                    />
                  </div>

                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                    }}
                  >
                    <p className="slots">{item.startTime}</p>
                  </div>
                  {/* <input
                    style={{ width: "80px", height: "35px" }}
                    type="number"
                    name="Price"
                    value={Servicesno[index]} // Use Servicesno[index] for each row
                    onChange={(e) => {
                      const newServicesno = [...Servicesno];
                      newServicesno[index] = e.target.value;
                      setServicesno(newServicesno);
                    }}
                  /> */}
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Add includes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>
              Icon <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Control
              type="file"
              name="icon"
              onChange={(e) => setIcon(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail" className="mt-3">
            <Form.Label>
              Desc <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleIncludes}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Title Name</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => settitleName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveplans2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Select City </Form.Label>

            <InputGroup className="mb-2 col-3">
              <Form.Select
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setpricecity(e.target.value)}
              >
                <option>-Select-</option>
                {citydata.map((i) => (
                  <option value={i.city}>{i.city}</option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group> */}
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Plan name</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setpName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setpPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>OfferPrice</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setpofferprice(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>How many services</Form.Label>
            <Form.Control
              type="text"
              name="Price"
              onChange={(e) => setpservices(e.target.value)}
            />
          </Form.Group>
          {/* <Form.Label className="mt-3">Period frequency</Form.Label>

          <InputGroup className="mb-2 col-3">
            <Form.Select
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setservicePeriod(e.target.value)}
            >
              <option>-Select-</option>

              <option value="monthly">Monthly</option>
              <option value="quart">Quartly</option>
              <option value="half">Half year</option>
              <option value="year">Year</option>
            </Form.Select>
          </InputGroup> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveplanprice}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal for edit */}
      <Modal
        show={showEdit}
        onHide={handleClosePopup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body p-3">
            <form>
              <div className="col-md-12">
                <div className="vucare-input-label">
                  Category <span className="text-danger"> *</span>
                </div>
                <div className="group pt-1">
                  {/* <input
                    type="text"
                    className="col-md-12 vucare-input-value"
                    onChange={(e) => setEditCatagoryName(e.target.value)}
                    defaultValue={
                      editCatagoryName || editSubcategory
                        ? editSubcategory.category
                        : ""
                    }
                  /> */}
                  <Form.Select
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setEditCatagoryName(e.target.value)}
                  >
                    <option>-Select category-</option>
                    {catdata.map((item) => (
                      <option value={item.category}>{item.category}</option>
                    ))}
                  </Form.Select>
                </div>
              </div>
              <div className="col-md-12">
                <div className="vucare-input-label">
                  Subcategory <span className="text-danger"> *</span>
                </div>
                <div className="group pt-1">
                  <Form.Select
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setEditSubcategoryName(e.target.value)}
                  >
                    <option>-Select Subcategory-</option>
                    {categorydata.map((item) => (
                      <option value={item.subcategory}>
                        {item.subcategory}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
              {/* <div className="col-md-12">
                <div className="vucare-input-label">
                  Sub subcategory <span className="text-danger"> *</span>
                </div>
                <div className="group pt-1">
                  <Form.Select
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setEditSubCategoryList(e.target.value)}
                  >
                    <option>-Select Subcategory-</option>
                    {postservicename.map((item) => (
                      <option value={item.sub_subcategory}>
                        {item.sub_subcategory}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div> */}
              <div className="col-md-12">
                <div className="vucare-input-label">
                  Service Name <span className="text-danger"> *</span>
                </div>
                <div className="group pt-1">
                  <input
                    type="text"
                    className="col-md-12 vucare-input-value"
                    onChange={(e) => setEditServiceName(e.target.value)}
                    defaultValue={
                      editServiceName || editSubcategory
                        ? editSubcategory.serviceName
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="vucare-input-label">
                  Service descriptions <span className="text-danger"> *</span>
                </div>
                <div className="group pt-1">
                  <textarea
                    type="text"
                    className="col-md-12 vucare-input-value"
                    onChange={(e) => setEditServiceDescription(e.target.value)}
                    defaultValue={
                      editServiceDescription || editSubcategory
                        ? editSubcategory.text
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="vucare-input-label">
                  Service Hours <span className="text-danger"> *</span>
                </div>
                <div className="group pt-1">
                  <input
                    type="time"
                    className="col-md-12 vucare-input-value"
                    onChange={(e) => setEditServiceHour(e.target.value)}
                    defaultValue={
                      editServiceHour || editSubcategory
                        ? editSubcategory.serviceHour
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="vucare-input-label">
                  Service Image <span className="text-danger"> *</span>
                </div>
                <div className="group pt-1">
                  <input
                    type="file"
                    className="col-md-12 vucare-input-value"
                    onChange={(e) => setEditServiceImage(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="row pt-3">
                <div className="col-md-2">
                  <button className="vu-button" onClick={updateService}>
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Services;
