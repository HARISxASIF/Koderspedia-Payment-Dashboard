import React from "react";
import InvoicePaymentTable from "../components/InvoicePaymentTable";
import kpLogo from "../otherImages/KP-Logo.svg";

const InvoicePaymentPage = () => {
  return (
    <div className="invoice-page-wrapper">
      <div className="invoice-page-header">
        <img src={kpLogo} alt="Logo" className="invoice-logo" />
        <h1>Invoice from Koderspedia</h1>
      </div>

      <div className="invoice-grid">
        <InvoicePaymentTable />

        <div className="payment-box">
          <div className="card-input">
            <span>💳</span>
            <input type="text" id="card" placeholder="Card Number"/>
            <input type="text" placeholder="MM/YY CW" />
          </div>
          <button className="pay-button">Pay</button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePaymentPage;