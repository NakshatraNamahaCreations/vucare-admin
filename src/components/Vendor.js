// import React, { useState, useEffect } from "react";

// import { Link, useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";

// import axios from "axios";
// import DataTable from "react-data-table-component";
// import Multiselect from "multiselect-react-dropdown";
// import Sidenav from "./Sidenav";
// import Header from "./Header";
// const active = {
//   backgroundColor: "rgb(169, 4, 46)",
//   color: "#fff",
//   fontWeight: "bold",
//   border: "none",
// };
// const inactive = { color: "black", backgroundColor: "white" };

// function Vendor() {
//   const [selected, setSelected] = useState(0);
//   const navigate=useNavigate();

//   const admin = JSON.parse(sessionStorage.getItem("admin"));

//   const [isVisible, setIsVisible] = useState(true);
//   const [city, setcity] = useState("");
//   const [category, setcategory] = useState("");
//   const [ vucarename, set vucarename] = useState("");
//   const [smsname, setsmsname] = useState("");
//   const [number, setnumber] = useState("");
//   const [password, setpassword] = useState("");
//   const [experiance, setexperiance] = useState("");
//   const [language, setlanguagesknow] = useState("");
//   const [Type, setType] = useState("");
//   const [data, setdata] = useState([]);

//   const [city1, setcity1] = useState(data.city);
//   const [category1, setcategory1] = useState(data.category);
//   const [vh, setvh] = useState(data. vucarename);
//   const [smsname1, setsmsname1] = useState(data.smsname);
//   const [number1, setnumber1] = useState(data.number);
//   const [password1, setpassword1] = useState(data.password);
//   const [experiance1, setexperiance1] = useState(data.experiance);
//   const [language1, setlanguagesknow1] = useState(data.language);
//   const [Type1, setType1] = useState(data.Type);
//   const [selectedCatagory, setSelectedCatagory] = useState(
//     data?.category || []
//   );
//   const [techniciandata, settechniciandata] = useState([]);
//   const [citydata, setcitydata] = useState([]);
//   const [categorydata, setcategorydata] = useState([]);
//   const [search, setsearch] = useState("");
//   const [filterdata, setfilterdata] = useState([]);

//   const apiURL = process.env.REACT_APP_API_URL;
//   const handleclick = () => {
//     setIsVisible(!isVisible);
//   };
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleClick = (divNum) => () => {
//     setSelected(divNum);
//   };
//   const addtechnician = async (e) => {
//     e.preventDefault();

//     if (
//       !city ||
//       !selectedCatagory ||
//       ! vucarename ||
//       !number ||
//       !password ||
//       !experiance ||
//       !language
//     ) {
//       alert("Please fill all fields");
//     } else {
//       try {
//         const config = {
//           url: "/addtechnician",
//           method: "post",
//           baseURL: "https://api.thevucare.com/api",
//           // data: formdata,
//           headers: { "content-type": "application/json" },
//           data: {
//             Type: "Vendor",
//             category: selectedCatagory,
//              vucarename:  vucarename,
//             smsname: smsname,
//             number: number,
//             password: password,
//             experiance: experiance,
//             languagesknow: language,
//             city: city,
//           },
//         };
//         await axios(config).then(function (response) {
//           if (response.status === 200) {
//             console.log("success");
//             alert(" Added");
//             window.location.assign("/vendor");
//           }
//         });
//       } catch (error) {
//         console.error(error); // Log the error to the browser console
//         alert("An error occurred: " + error.message);
//       }
//     }
//   };
//   useEffect(() => {
//     gettechnician();
//     getcity();
//     getcategory();
//   }, []);

//   const gettechnician = async () => {
//     let res = await axios.get("https://api.thevucare.com/api/getalltechnician");
//     if ((res.status = 200)) {
//       settechniciandata(res.data?.technician.filter((i)=>i.Type === "Vendor"));
//       setfilterdata(res.data?.technician.filter((i)=>i.Type === "Vendor"));
//     }
//   };

//   const getcity = async () => {
//     let res = await axios.get("https://api.thevucare.com/api/master/getcity");
//     if ((res.status = 200)) {
//       setcitydata(res.data?.mastercity);
//     }
//   };
//   const getcategory = async () => {
//     let res = await axios.get("https://api.thevucare.com/api/getcategory");
//     if ((res.status = 200)) {
//       setcategorydata(res.data?.category);
//     }
//   };
//   let i = 0;
//   const deletetechnician = async (id) => {
//     axios({
//       method: "post",
//       url: "https://api.thevucare.com/api/deletetechnician/" + id,
//     })
//       .then(function (response) {
//         //handle success
//         console.log(response);
//         alert("Deleted successfully");
//         window.location.reload();
//       })
//       .catch(function (error) {
//         //handle error
//         console.log(error.response.data);
//       });
//   };

//   const columns = [
//     {
//       name: "Sl  No",
//       selector: (row, index) => index + 1,
//     },
//     {
//       name: "Type",
//       selector: (row) => row.Type,
//     },
//     {
//       name: " vucare Name",
//       selector: (row) => row. vucarename,
//     },
//     {
//       name: "SMS Name",
//       selector: (row) => row.smsname,
//     },
//     {
//       name: "City",
//       selector: (row) => row.city,
//     },
//     {
//       name: "Mobile no",
//       selector: (row) => row.number,
//     },
//     {
//       name: "category",
//       cell: (row) => (
//         <div>
//           {row.category.map((i) => (
//             <div> {i.name},</div>
//           ))}
//         </div>
//       ),
//     },
//     {
//       name: "Password",
//       selector: (row) => row.password,
//     },
//     {
//       name: "experiance",
//       selector: (row) => row.experiance,
//     },
//     {
//       name: "Languages",
//       selector: (row) => row.languagesknow,
//     },
//     {
//       name: "Wallet balance",
//       selector: (row) => row.walletbalance,
//     },
//     {
//       name: "Action",
//       cell: (row) => (
//         <div>
//           <a className="hyperlink" onClick={() => edit(row)}>
//             Edit |
//           </a>

//           <a
//             onClick={() => deletetechnician(row._id)}
//             className="hyperlink mx-1"
//           >
//             Delete
//           </a>
//         </div>
//       ),
//     },
//   ];
//   const edit = (data) => {
//     setdata(data);
//     handleShow(true);
//   };
//   useEffect(() => {
//     const result = techniciandata.filter((item) => {
//       return item. vucarename.toLowerCase().match(search.toLowerCase());
//     });
//     setfilterdata(result);
//   }, [search]);

//   const edittechnician = async (e) => {
//     e.preventDefault();
//     try {
//       const config = {
//         url: `/edittechnician/${data._id}`,
//         method: "post",
//         baseURL: "https://api.thevucare.com/api",
//         headers: { "content-type": "application/json" },
//         data: {
//           Type: Type1,
//           category: category1,
//            vucarename: vh,
//           smsname: smsname1,
//           number: number1,
//           password: password1,
//           experiance: experiance1,
//           languagesknow: language1,
//           city: city1,
//         },
//       };
//       await axios(config).then(function (response) {
//         if (response.status === 200) {
//           alert("Successfully Added");
//           window.location.reload("");
//         }
//       });
//     } catch (error) {
//       console.error(error);
//       alert("category  Not Added");
//     }
//   };

//   const onSelectCatagory = (selectedList, selectedItem) => {
//     // Handle select event
//     setSelectedCatagory(selectedList);
//     console.log(selectedList);
//     console.log(selectedItem);
//   };

//   const onRemoveCatagory = (selectedList, removedItem) => {
//     // Handle remove event
//     setSelectedCatagory(selectedList);
//     console.log(selectedList);
//     console.log(removedItem);
//   };

//   const handleRowClick = (row) => {
//     navigate(`/vendordetails/${row._id}`);
//   };

//   return (
//     <div div className="row">
//       <div className="col-md-2">
//         <Sidenav />
//       </div>
//       <div className="col-md-10">
//         <Header />

//         <div className="d-flex float-end mt-3 mb-3">
//           <button
//             className="btn-primary-button mx-2"
//             style={selected == 1 ? active : inactive}
//             onClick={handleClick(1)}
//           >
//             Vendor Add
//           </button>

//           <button
//             style={selected == 0 ? active : inactive}
//             onClick={handleClick(0)}
//             className="btn-secondary-button vucare_btn" 
//           >
//             All Vendors
//           </button>
//         </div>

//         <div className="row w-100" >
//           {selected == 0 ? (
//             <>
//               {" "}
//               <div className="mt-5 p-3">
//             <input
//               type="text"
//               placeholder="Search here.."
//               className="w-25 form-control"
//               value={search}
//               onChange={(e) => setsearch(e.target.value)}
//             />
//           </div>
//           <div className="mt-1 border">
//             <DataTable
//               columns={columns}
//               data={filterdata}
//               pagination
//               fixedHeader
//               selectableRowsHighlight
//               subHeaderAlign="left"
//               highlightOnHover
//               onRowClicked={handleRowClick}
//             />
//           </div>
//             </>
//           ) : (
//             <>
//               {" "}
//               <div className="row m-auto">
//         <div className="col-md-12">
//           <div className="row justify-content-end pt-3">
//             <div className="col-md-1 p-0">
//               {/* <button className="btn-primary-technician-button1">
//                 Technician
//               </button> */}
//             </div>
//           </div>
//           <div className="card" style={{ marginTop: "30px" }}>
//             <div className="card-body p-3">
//               <form>
//                 <div className="row pt-2">
//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       Type <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <select
//                         className="col-md-12  vucare-input-value"
//                         onChange={(e) => setType(e.target.value)}
//                       >
                       
//                         {/* <option value="executive">Executive</option>
//                         <option value="technician">Technician</option>
//                         <option value="pm">Project Manager</option> */}
//                         <option value="Vendor">Vendor</option>

//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       City <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <select
//                         className="col-md-12  vucare-input-value"
//                         onChange={(e) => setcity(e.target.value)}
//                       >
//                         <option>--select--</option>
//                         {citydata.map((item) => (
//                           <option value={item.city}>{item.city}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                        vucare Name <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <input
//                         type="text"
//                         className="col-md-12  vucare-input-value"
//                         onChange={(e) => set vucarename(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row pt-3">
//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">SMS Name</div>
//                     <div className="group pt-1">
//                       <input
//                         type="text"
//                         className="col-md-12  vucare-input-value"
//                         onChange={(e) => setsmsname(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       Mobile Number <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <input
//                         type="text"
//                         className="col-md-12  vucare-input-value"
//                         onChange={(e) => setnumber(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       Password <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <input
//                         onChange={(e) => setpassword(e.target.value)}
//                         type="text"
//                         className="col-md-12  vucare-input-value"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row pt-3">
//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       Experiance <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <input
//                         type="text"
//                         className="col-md-12  vucare-input-value"
//                         onChange={(e) => setexperiance(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       Languages Known <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <input
//                         type="text"
//                         className="col-md-12  vucare-input-value"
//                         onChange={(e) => setlanguagesknow(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       Category<span className="text-danger"> *</span>
//                     </div>
                   
//                     <Multiselect
//                       className="mt-3"
//                       options={categorydata.map((category) => ({
//                         name: category.category,
//                         // id: category._id,
//                       }))}
//                       placeholder="Select Catagory"
//                       selectedValues={selectedCatagory}
//                       onSelect={onSelectCatagory}
//                       onRemove={onRemoveCatagory}
//                       displayValue="name"
//                       // disablePreSelectedValues={true}
//                       showCheckbox={true}
//                     />{" "}
//                   </div>

//                   <div className="col-md-4"></div>
//                 </div>

//                 <div className="row pt-2">
//                   <div className=" vucare-sub-heading">
//                     Note: One Mobile Number Will Register Only Once For
//                     Technician
//                   </div>
//                 </div>

//                 <div className="row pt-3">
//                   <div className="col-md-2">
//                     <button className=" vu-button" onClick={addtechnician}>
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>

         
//         </div>
//       </div>

//             </>
//           )}
//         </div>
//       </div>
//         <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Technician</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="card" style={{ marginTop: "30px" }}>
//             <div className="card-body p-3">
//               <form>
//                 <div className="row pt-2">
//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       Type <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <select
//                         className="col-md-12  vucare-input-value"
//                         onChange={(e) => setType1(e.target.value)}
//                       >
//                         <option>--select--</option>
//                         <option value="exicutive">Exicutive</option>
//                         <option value="technician">Technician</option>
//                         <option value="pm">Project Manager</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       City <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <select
//                         className="col-md-12  vucare-input-value"
//                         onChange={(e) => setcity1(e.target.value)}
//                       >
//                         <option value={data.city}>{data.city}</option>
//                         {citydata.map((item) => (
//                           <option value={item.city}>{item.city}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

                
//                 </div>

//                 <div className="row pt-3">
//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                        vucare Name <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <input
//                         type="text"
//                         className="col-md-12  vucare-input-value"
//                         onChange={(e) => setvh(e.target.value)}
//                         placeholder={data. vucarename}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       SMS Name <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <input
//                         type="text"
//                         className="col-md-12  vucare-input-value"
//                         onChange={(e) => setsmsname1(e.target.value)}
//                         placeholder={data.smsname}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       Mobile Number <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <input
//                         type="text"
//                         className="col-md-12  vucare-input-value"
//                         onChange={(e) => setnumber1(e.target.value)}
//                         placeholder={data.number}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row pt-3">
//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       Password <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <input
//                         type="text"
//                         className="col-md-12  vucare-input-value"
//                         onChange={(e) => setpassword1(e.target.value)}
//                         placeholder={data.password}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       Experiance <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <input
//                         type="text"
//                         className="col-md-12  vucare-input-value"
//                         placeholder={data.experiance}
//                         onChange={(e) => setexperiance1(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-4">
//                     <div className=" vucare-input-label">
//                       Languages Known <span className="text-danger"> *</span>
//                     </div>
//                     <div className="group pt-1">
//                       <input
//                         type="text"
//                         className="col-md-12  vucare-input-value"
//                         placeholder={data.languagesknow}
//                         onChange={(e) => setlanguagesknow1(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-4"></div>
//                 </div>

//                 <div className="row pt-2">
//                   <div className=" vucare-sub-heading">
//                     Note: One Mobile Number Will Register Only Once For
//                     Technician
//                   </div>
//                 </div>

//                 <div className="row pt-3">
//                   <div className="col-md-2">
//                     <button className=" vu-button" onClick={edittechnician}>
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </Modal.Body>
       
//       </Modal>
//     </div>
//   );
// }

// export default Vendor;

