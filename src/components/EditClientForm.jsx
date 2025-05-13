import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dp1 from "../otherImages/dp-1.png";

const EditClientForm = () => {
  const { state } = useLocation();
  const clientData = state?.client;

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    assignedPackages: '',
    paymentStatus: '',
    packageDeliverables: '',
    clientImage: null, 
  });

  useEffect(() => {
    if (clientData) {
      setFormData({
        clientName: clientData.clientName || '',
        email: clientData.email || '',
        phone: clientData.phone || '',
        assignedPackages: clientData.assignedPackages?.charAt(0).toUpperCase() + clientData.assignedPackages?.slice(1).toLowerCase() || '',
        clientImage: clientData.clientImage,
      });
    }
  }, [clientData]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

//   const handleQuillChange = (value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       desc: value,
//     }));
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    Swal.fire({
      icon: 'success',
      title: 'Client Updated Successfully!',
      showConfirmButton: false,
      timer: 2000,
    });

    // Reset form
    // setFormData({
    //   packageName: '',
    //   desc: '',
    //   price: '',
    //   packageType: '',
    // });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 mainForm">
        <div className="imageEdit text-center mb-4">
    <img
        src={
            formData.clientImage instanceof File
      ? URL.createObjectURL(formData.clientImage)
      : formData.clientImage || dp1
        }
        alt="clientImage"
        className="rounded-circle"
        style={{ width: '100px', height: '100px', objectFit: 'cover',boxShadow: '1px 1px 10px #00000036', }}
    />
    <input
        type="file"
        id="clientImageInput"
        name="clientImage"
        accept="image/*"
        onChange={handleChange}
        hidden
    />
    <label
        htmlFor="clientImageInput"
        className="position-absolute"
        style={{
            bottom: "0px",
            right: 'calc(0% - 0px)', 
            background: '#1d1d4e',
            borderRadius: '50%',
            padding: '10px',
            cursor: 'pointer',
            boxShadow: '0 0 0 4px white',
            fontSize: '0px',
        }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l9.5-9.5zM11.207 2L3 10.207V11h.793L13 2.793 11.207 2zM14 3.5 12.5 2 13 1.5 14.5 3 14 3.5z"/>
        </svg>
    </label>
    </div>

         <div className="mb-3">
        <label htmlFor="clientName" className="form-label">
          Client Name <span>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="clientName"
          name="clientName"
          value={formData.clientName}
          required
          onChange={handleChange}
          placeholder='e.g., "John Doe'
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="email" className="form-label">
            Email Address <span>*</span>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
            placeholder='e.g., "johndoe@gmail.com'
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            required
            onChange={handleChange}
            placeholder='e.g., "33304442'
          />
        </div>
      </div>
      <div className="mb-4">
          <label htmlFor="assignedPackages" className="form-label">
            Assigned Package <span>*</span>
          </label>
          <select
            name="assignedPackages"
            id="assignedPackages"
            className="form-control"
            value={formData.assignedPackages}
            required
            onChange={handleChange}
          >
            <option value="">Select a package</option>
            <option value="Website development - basic">Website Development - Basic</option>
            <option value="Mobile application">Mobile Application</option>
            <option value="Social media management">Social Media Management</option>
            <option value="Website development">Website Development</option>
          </select>
        </div>
        <div className="row mt-20">
        <div className="mb-4 col-md-6">
          <label htmlFor="paymentStatus" className="form-label">
            Payment Status <span>*</span>
          </label>
          <select
            name="paymentStatus"
            id="paymentStatus"
            className="form-control"
            value={formData.paymentStatus}
            required
            onChange={handleChange}
          >
            <option value="">Select payment status</option>
            <option value="Recieved">Recieved</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="mb-4 col-md-6">
          <label htmlFor="packageDeliverables" className="form-label">
            Package Deliverables <span>*</span>
          </label>
          <select
            name="packageDeliverables"
            id="packageDeliverables"
            className="form-control"
            value={formData.packageDeliverables}
            required
            onChange={handleChange}
          >
            <option value="">Select package deliverables</option>
            <option value="Logo">Logo</option>
            <option value="Home page">Home Page</option>
            <option value="Inner pages">Inner Pages</option>
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
    </form>
  );
};

export default EditClientForm;
