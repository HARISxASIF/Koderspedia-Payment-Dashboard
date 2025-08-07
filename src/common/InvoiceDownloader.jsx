import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import InvoiceService from "../services/invoiceService";
import favicon from "../otherImages/favicon.svg";

const InvoiceDownloader = ({ invoiceId }) => {
    const [invoiceData, setInvoiceData] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showInvoice, setShowInvoice] = useState(false);
    const invoiceRef = useRef();

    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await InvoiceService.getInvoice(invoiceId);
                setInvoiceData(response.data.data.invoice);
            } catch (err) {
                console.error("Error fetching invoice:", err);
            }
        };
        fetchInvoice();
    }, [invoiceId]);

    const handleDownload = async () => {
        if (!invoiceData) return;

        setIsDownloading(true);
        setShowInvoice(true); // Show hidden invoice

        // Wait for DOM to render hidden invoice
        setTimeout(async () => {
            const html2pdf = (await import("html2pdf.js")).default;

            html2pdf()
                .set({
                    filename: `invoice_${invoiceData.id}.pdf`,
                    margin: 10,
                    html2canvas: {
                        scale: 1.5, // Reduce for better performance
                        useCORS: true,
                        logging: false,
                    },
                    jsPDF: { unit: "pt", format: "a4" },
                })
                .from(invoiceRef.current)
                .save()
                .finally(() => {
                    setIsDownloading(false);
                    setShowInvoice(false); // Hide it again
                });
        }, 100);
    };

    if (!invoiceData) return null;

    const dueDate = new Date(invoiceData.created_at);
    dueDate.setDate(dueDate.getDate() + 7);

    return (
        <>
            <Icon
                icon={isDownloading ? "eos-icons:loading" : "material-symbols:sim-card-download"}
                onClick={handleDownload}
                width="24"
                height="24"
                className="cursor-pointer"
                title="Download Invoice"
            />

            {showInvoice && (
                <div className="invoice-box" style={{ display: "none" }}>
                    <div
                        ref={invoiceRef}
                        style={{ padding: "30px", width: "800px", fontSize: "14px", fontFamily: "sans-serif" }}
                    >
                        <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                            <img
                                src={favicon}
                                alt="Logo"
                                style={{ height: "60px", width: '60px', objectFit: 'contain' }}
                            />
                            <h4 style={{ fontFamily: "Urbanist", fontSize: '20px', marginRight: "20px" }}>
                                INVOICE #{invoiceData.id}
                                {invoiceData.status === "1" ? (
                                    <span className="rounded-pill bg-success ms-2" style={badgeStyle}>Paid</span>
                                ) : (
                                    <span className="badge rounded-pill bg-warning ms-2" style={badgeStyle}>Unpaid</span>
                                )}
                            </h4>
                        </div>

                        <div style={billToStyle}>
                            <div>
                                <p><strong>BILLED TO:</strong></p>
                                <p>{invoiceData?.client?.name}</p>
                                <p>{invoiceData?.client?.phone}</p>
                            </div>
                            <div>
                                <p>Invoice No. {invoiceData?.id}</p>
                                <p>{formatDate(invoiceData?.created_at)}</p>
                            </div>
                        </div>

                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Item</th>
                                    <th style={thStyle}>Qty</th>
                                    <th style={thStyle}>Unit</th>
                                    <th style={thStyle}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={tdStyle}>{invoiceData?.title}</td>
                                    <td style={tdStyle}>1</td>
                                    <td style={tdStyle}>{formatCurrency(invoiceData?.price)}</td>
                                    <td style={tdStyle}>{formatCurrency(invoiceData?.price)}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            marginTop: "20px",
                            marginRight: "30px"
                        }}>
                            <div style={rightRow}><strong>Subtotal:</strong> <span>{formatCurrency(invoiceData.price)}</span></div>
                            <div style={rightRow}><strong>Tax (0%):</strong> <span>$0.00</span></div>
                            <div style={{ ...rightRow, fontWeight: 700, fontSize: "18px", borderTop: "1px solid #000", paddingTop: "10px" }}>
                                <strong>Total:</strong> <span>{formatCurrency(invoiceData.price)}</span>
                            </div>
                        </div>

                        <p style={{ marginTop: "20px", fontSize: "20px", color: "#000" }}>Thank you!</p>

                        <div style={paymentInfoStyle}>
                            <div>
                                <p><strong>PAYMENT INFORMATION</strong></p>
                                <p>{invoiceData?.brand?.name} Bank</p>
                                <p>Account Name: {invoiceData?.brand?.name}</p>
                                <p>Account No: 123-456-7890</p>
                                <p>Pay by: {formatDate(dueDate)}</p>
                            </div>
                            <div style={{ textAlign: "right", marginRight: "50px", fontWeight: 600 }}>
                                <p style={{ fontSize: '22px' }}>{invoiceData?.brand?.name}</p>
                                <p>{invoiceData?.brand?.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Inline style constants for cleaner JSX
const badgeStyle = {
    fontSize: '1rem',
    display: "inline-flex",
    alignItems: 'center',
    padding: "0.05rem 0.5rem 0.45rem",
    color: '#fff',
    fontWeight: '700'
};

const billToStyle = {
    fontSize: "14px",
    marginBottom: "50px",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between"
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    fontSize: "14px"
};

const thStyle = {
    textAlign: "left",
    paddingBottom: "8px",
    color: "#000"
};

const tdStyle = {
    padding: "10px 0",
    borderTop: "1px solid #000"
};

const flexRow = {
    display: "flex",
    gap: "30px",
    marginTop: "6px",
    color: "#000"
};
const rightRow = {
    display: "flex",
    justifyContent: "space-between",
    width: "250px",
    marginBottom: "6px",
    color: "#000"
};
const totalRow = {
    ...flexRow,
    fontWeight: "700",
    fontSize: "18px",
    marginTop: "20px",
    borderTop: "1px solid #000",
    paddingTop: "10px"
};

const paymentInfoStyle = {
    fontSize: "14px",
    marginTop: "30px",
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between"
};

export default InvoiceDownloader;
