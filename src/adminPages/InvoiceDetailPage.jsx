import React, { useState, useEffect } from "react";
import InvoicePaymentTable from "../components/InvoicePaymentTable";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';

const InvoicePaymentPage = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { user } = useSelector((state) => state.auth);
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

  // Common success handler
  const handlePaymentSuccess = () => {
    setPaymentStatus('success');
    Swal.fire({
      icon: 'success',
      title: 'Payment Processed Successfully',
      showConfirmButton: false,
      timer: 2000,
    });
    if (user.role == 'admin') {
      navigate('/manage-invoice');
    } else if (user.role == 'client') {
      navigate('/my-packages');
    } else {
      navigate('/');
    }
  };

  // Square payment handler
  const handleSquarePayment = async (tokenResult) => {
    try {
      const response = await axios.post('/pay-with-square', {
        sourceId: tokenResult.token,
        invoiceId: invoiceData.id,
        amount: invoiceData.price,
        assignedPackageId: invoiceData.assigned_package_id
      });
      if (response.data.success) {
        handlePaymentSuccess();
      }
    } catch (err) {
      console.error('Payment failed:', err);
      setPaymentStatus('failed');
    }
  };

  // PayPal payment handlers
  const handlePayPalPayment = async (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: invoiceData.price,
            currency_code: "USD"
          },
          description: `Payment for Invoice #${invoiceData.id}`,
          custom_id: invoiceData.id
        }
      ]
    });
  };

  const handlePayPalSuccess = async (data , actions) => {
    try {
      console.log(data.orderID);
      const response = await axios.post('/pay-with-paypal', {
        orderId: data.orderID,
        invoiceId: invoiceData.id,
        amount: invoiceData.price,
        details: data
      });
      if (response.data.success) {
        handlePaymentSuccess();
      }
    } catch (err) {
      console.error('Payment verification failed:', err);
      setPaymentStatus('failed');
    }
  };

  const handlePaymentError = (err) => {
    console.error('Payment error:', err);
    setPaymentStatus('failed');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!invoiceData) return <div>No invoice data found</div>;
  const paypalClientId = process.env.REACT_APP_PAYPAL_SANDBOX_CLIENT_ID;
  console.log(paypalClientId);
  return (
    <div className="invoice-page-wrapper">
      <div className="invoice-page-header">
        <img src={invoiceData.brand.logo_url} alt="Logo" className="invoice-logo" />
        <h1>Invoice from {invoiceData.brand.name}</h1>
      </div>

      <div className="invoice-grid">
        <InvoicePaymentTable invoiceData={invoiceData} />
        {invoiceData.status == 0 && (
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
              <>
                {/* Check payment method from invoice data */}
                {invoiceData.payment_type_id == 2 ? (
                  <PayPalScriptProvider
                    options={{
                      "client-id": paypalClientId,
                      currency: "USD",
                      "disable-funding": "credit" // This matches your script tag
                    }}
                  >
                    <PayPalButtons
                      style={{
                        layout: "vertical",
                        color: "gold",
                        shape: "rect",
                        label: "pay"
                      }}
                      createOrder={handlePayPalPayment}
                      onApprove={handlePayPalSuccess}
                      onError={handlePaymentError}
                    />
                  </PayPalScriptProvider>
                ) : invoiceData.payment_type_id == 3 ? (
                  <PaymentForm
                    applicationId={process.env.REACT_APP_SQUARE_APPLICATION_ID}
                    locationId={process.env.REACT_APP_SQUARE_LOCATION_ID}
                    cardTokenizeResponseReceived={handleSquarePayment}
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
                ) : (
                  <div className="alert alert-warning">
                    No payment method specified for this invoice
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicePaymentPage;