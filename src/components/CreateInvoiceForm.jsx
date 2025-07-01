import { useState } from "react";
import ReactQuill from "react-quill-new";
import Swal from "sweetalert2";

const CreateInvoiceForm = () => {
  const [formData, setFormData] = useState({
    invoiceTitle: "",
    orderAmount: "",
    remainingAmount: "",
    customer: "",
    description: "",
    category: "",
    paymentType: "",
    saleType: "",
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
      description: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Invoice Created Successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      // Reset form
      setFormData({
        invoiceTitle: "",
        orderAmount: "",
        remainingAmount: "",
        customer: "",
        description: "",
        category: "",
        paymentType: "",
        saleType: "",
      });

      console.log(formData, ">> Formdata");
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while creating the invoice!",
      });

      console.error("Submit error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mt-4 mainForm"
      encType="multipart/form-data"
    >
      <div className="mb-3">
        <label htmlFor="invoiceTitle" className="form-label">
          Invoice Title <span>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="invoiceTitle"
          name="invoiceTitle"
          value={formData.invoiceTitle}
          required
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <div className="mb-3 col-md-6">
          <label htmlFor="orderAmount" className="form-label">
            Order Amount ($) <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="orderAmount"
            name="orderAmount"
            value={formData.orderAmount}
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 col-md-6">
          <label htmlFor="remainingAmount" className="form-label">
            Remaining Amount ($) <span>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="remainingAmount"
            name="remainingAmount"
            value={formData.remainingAmount}
            required
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-20">
        <label htmlFor="customer" className="form-label">
          Customer <span>*</span>
        </label>
        <select
          name="customer"
          id="customer"
          className="form-control"
          required
          onChange={handleChange}
          value={formData.customer}
        >
          <option value="">Choose</option>
          <option value="Tim Bertin">Tim Bertin</option>
          <option value="Zale Crave">Zale Crave</option>
          <option value="Martin Grape">Martin Grape</option>
          <option value="Callison">Callison</option>
        </select>
      </div>

      <div className=" mb-3">
        <label htmlFor="description" className="form-label">
          Description <span>*</span>
        </label>
        <ReactQuill
          theme="snow"
          value={formData.description}
          onChange={handleQuillChange}
          placeholder="Details about what the package includes"
          id="description"
          name="description"
        />
      </div>
      <div className="mb-20">
        <label htmlFor="category" className="form-label">
          Category <span>*</span>
        </label>
        <select
          name="category"
          id="category"
          className="form-control"
          required
          onChange={handleChange}
          value={formData.category}
        >
          <option value="">Choose</option>
          <option value="Platinum">Platinum</option>
          <option value="Diamond">Diamond</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="paymentType" className="form-label">
          Payment Type <span>*</span>
        </label>
        <select
          name="paymentType"
          id="paymentType"
          className="form-control"
          required
          onChange={handleChange}
          value={formData.paymentType}
        >
          <option value="">Select a payment type</option>
          <option value="Stripe">Stripe</option>
          <option value="Paypal">Paypal</option>
          <option value="Zelle">Zelle</option>
          <option value="Sqaure">Sqaure</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">
          Sale Type <span>*</span>
        </label>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="saleType"
              id="freshSale"
              value="Fresh Sale"
              checked={formData.saleType === "Fresh Sale"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="freshSale">
              Fresh Sale
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="saleType"
              id="upsell"
              value="Upsell"
              checked={formData.saleType === "Upsell"}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="upsell">
              Upsell
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="saleType"
              id="followUp"
              value="Follow Up"
              checked={formData.saleType === "Follow Up"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="followUp">
              Follow Up
            </label>
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};

export default CreateInvoiceForm;
