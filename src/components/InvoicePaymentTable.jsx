import React from "react";
import favicon from "../otherImages/favicon.svg";

const InvoicePaymentTable = ({ invoiceData }) => {
  console.log("Invoice Data:", invoiceData);
  // Format currency
  const formatCurrency = (amount) => {
    return parseFloat(amount).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate due date (7 days from invoice date)
  const dueDate = new Date(invoiceData.created_at);
  dueDate.setDate(dueDate.getDate() + 7);
  console.log(invoiceData.status);
  return (
    <div className="invoice-box">
      <div className="invoice-header">
        <img src={favicon} alt="Logo" className="invoice-logo" />
        <h2 className="invoice-title d-flex align-items-center gap-2">
          INVOICE #{invoiceData.id}
          {invoiceData.status == 1 && (
            <span className="badge rounded-pill bg-success ms-2" style={{
              fontSize: '1rem',
              padding: '0.25rem 0.5rem'
            }}>
              Paid
            </span>
          )}
        </h2>
      </div>

      <div className="invoice-bill-to">
        <div className="invoice-to">
          <p><strong>BILLED TO:</strong></p>
          <p>{invoiceData.client.name}</p>
          <p>{invoiceData.client.phone}</p>
          <p>{invoiceData.client.address || "Address not specified"}</p>
        </div>

        <div className="invoice-meta">
          <p>Invoice No. {invoiceData.id}</p>
          <p>{formatDate(invoiceData.created_at)}</p>
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{invoiceData.title}</td>
            <td>1</td>
            <td>{formatCurrency(invoiceData.price)}</td>
            <td>{formatCurrency(invoiceData.price)}</td>
          </tr>
        </tbody>
      </table>

      <div className="invoice-totals">
        <div><strong>Subtotal</strong><span>{formatCurrency(invoiceData.price)}</span></div>
        <div><strong>Tax (0%)</strong><span>$0.00</span></div>
        <div className="total"><strong>Total</strong><span>{formatCurrency(invoiceData.price)}</span></div>
      </div>

      <p className="thankyou">Thank you!</p>

      <div className="invoice-payment-info">
        <div>
          <p><strong>PAYMENT INFORMATION</strong></p>
          <p>{invoiceData.brand.name} Bank</p>
          <p>Account Name: {invoiceData.brand.name}</p>
          <p>{invoiceData.brand.email}</p>
          <p>Account No: 123-456-7890</p>
          <p>Pay by: {formatDate(dueDate)}</p>
        </div>

        <div className="invoice-sign">
          <p className="name">{invoiceData.brand.name}</p>
          <p>{invoiceData.brand.address}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePaymentTable;