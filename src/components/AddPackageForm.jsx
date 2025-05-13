import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import Swal from 'sweetalert2';
// import axios from 'axios';

const AddPackageForm = () => {
  const [formData, setFormData] = useState({
    packageName: '',
    desc: '',
    price: '',
    packageType: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleQuillChange = (value) => {
    setFormData((formData) => ({
      ...formData,
      desc: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      // Adjust the API URL to your Laravel endpoint
    //   await axios.post('http://localhost:8000/api/clients', data, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Package Created Successfully!',
        showConfirmButton: false,
        timer: 2000,
      });

      // Reset form
      setFormData({
        packageName: '',
        desc: '',
        price: '',
        packageType: '',
      });

      console.log(formData, ">> Formdata")

    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while adding the package!',
      });

      console.error('Submit error:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mt-4 mainForm"
      encType="multipart/form-data"
    >
      <div className="mb-3">
        <label htmlFor="packageName" className="form-label">
          Package Name <span>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="packageName"
          name="packageName"
          value={formData.packageName}
          required
          onChange={handleChange}
          placeholder='e.g., "Website Development - Basic'
        />
      </div>

        <div className=" mb-3">
          <label htmlFor="desc" className="form-label">
            Description <span>*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={formData.desc}
            onChange={handleQuillChange}
            placeholder="Details about what the package includes"
            id="desc"
            name="desc"
          />
        </div>
      <div className="row">
      <div className="mb-3 col-md-6">
          <label htmlFor="price" className="form-label">
            Price ($USD) <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            required
            onChange={handleChange}
            placeholder='e.g., $500'
          />
        </div>
      <div className="mb-4 col-md-6">
        <label htmlFor="packageType" className="form-label">
        Package Type <span>*</span>
        </label>
        <select
            name="packageType"
            id="packageType"
            className="form-control"
            required
            onChange={handleChange}
            value={formData.packageType}
            >
            <option value="">Select a package type</option>
            <option value="Website">Website</option>
            <option value="App">App</option>
            <option value="Social Media">Social Media</option>
            <option value="SEO">SEO</option>
        </select>
      </div>
</div>
      <button type="submit" className="btn btn-primary">
      Create Package
      </button>
    </form>
  );
};

export default AddPackageForm;
