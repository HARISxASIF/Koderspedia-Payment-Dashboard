import React from "react";
import favicon from "../otherImages/favicon.svg";

const InvoicePaymentTable = () => {
    return (
        <div className="invoice-box">
            <div className="invoice-header">
                <img src={favicon} alt="Logo" className="invoice-logo" />
                <h2 className="invoice-title">INVOICE</h2>
            </div>

            <div className="invoice-bill-to">
                <div class="invoice-to">
                    <p><strong>BILLED TO:</strong></p>
                    <p>Imani Oliove</p>
                    <p>+123-456-7890</p>
                    <p>63 Ivy Road, Hawkville, GA, USA 31036</p>
                </div>

                <div className="invoice-meta">
                    <p>Invoice No. 12345</p>
                    <p>16 June 2025</p>
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
                        <td>Eggshell Camisole Top</td>
                        <td>1</td>
                        <td>$123</td>
                        <td>$123</td>
                    </tr>
                </tbody>
            </table>

            <div className="invoice-totals">
                <div><strong>Subtotal</strong><span>$500</span></div>
                <div><strong>Tax (0%)</strong><span>$0</span></div>
                <div className="total"><strong>Total</strong><span>$500</span></div>
            </div>

            <p className="thankyou">Thank you!</p>

            <div className="invoice-payment-info">
                <div>
                    <p><strong>PAYMENT INFORMATION</strong></p>
                    <p>Briard Bank</p>
                    <p>Account Name: Samira Hadid</p>
                    <p>Account No: 123-456-7890</p>
                    <p>Pay by: 5 July 2025</p>
                </div>

                <div className="invoice-sign">
                    <p class="name">Samira Hadid</p>
                    <p>123 Anywhere St., Any City, ST 12345</p>
                </div>
            </div>
        </div>
    );
};

export default InvoicePaymentTable;