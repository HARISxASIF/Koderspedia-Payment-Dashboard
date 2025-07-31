import React, { useState, useEffect } from "react";
import InvoicePaymentTable from "../components/InvoicePaymentTable";
import kpLogo from "../otherImages/KP-Logo.svg";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import Swal from "sweetalert2";

const InvoicePaymentPage = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(`/get-invoice/${id}`);
        setInvoiceData(response.data.data.invoice);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load invoice");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceData();
  }, [id]);
  const handlePayment = async (tokenResult) => {
    try {
      const response = await axios.post('/pay-with-square', {
        sourceId: tokenResult.token,
        invoiceId: invoiceData.id,
        amount: invoiceData.price,
        assignedPackageId: invoiceData.assigned_package_id

      });
      if (response.data.success) {
        setPaymentStatus('success');
        Swal.fire({
          icon: 'success',
          title: 'Payment Processed Successfully',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/my-packages')
      }
      // You can redirect or show success message here
    } catch (err) {
      console.error('Payment failed:', err);
      setPaymentStatus('failed');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!invoiceData) return <div>No invoice data found</div>;

  return (
    <div className="invoice-page-wrapper">
      <div className="invoice-page-header">
        <img src={invoiceData.brand.logo_url} alt="Logo" className="invoice-logo" />
        <h1>Invoice from {invoiceData.brand.name}</h1>
      </div>

      <div className="invoice-grid">
        <InvoicePaymentTable invoiceData={invoiceData} />
        {invoiceData.status == 0 &&
          <div className="payment-box">
            {paymentStatus === 'success' ? (
              <div className="alert alert-success">
                Payment successful! Thank you for your purchase.
              </div>
            ) : paymentStatus === 'failed' ? (
              <div className="alert alert-danger">
                Payment failed. Please try again.
              </div>
            ) : (
              <PaymentForm
                applicationId={process.env.REACT_APP_SQUARE_APPLICATION_ID} // Replace with your app ID
                locationId={process.env.REACT_APP_SQUARE_LOCATION_ID} // Replace with your location ID
                cardTokenizeResponseReceived={handlePayment}
                createPaymentRequest={() => ({
                  countryCode: "US",
                  currencyCode: "USD",
                  total: {
                    amount: invoiceData.price,
                    label: "Total"
                  }
                })}
              >
                <CreditCard
                  buttonProps={{
                    css: {
                      backgroundColor: "#1e1b4b",
                      color: "#fff",
                      fontWeight: "600",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "20px",
                      width: "100%",
                      textAlign: "center",
                      "&:hover": {
                        backgroundColor: "#3730a3"
                      }
                    }
                  }}
                />
              </PaymentForm>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default InvoicePaymentPage;