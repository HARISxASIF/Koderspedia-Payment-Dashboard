import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import InvoiceService from "../services/invoiceService";
import { Icon } from "@iconify/react";
import favicon from "../otherImages/favicon.svg";

const InvoiceDownloader = ({ invoiceId }) => {
    const [invoiceData, setInvoiceData] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [logoDataUrl, setLogoDataUrl] = useState("");
    const invoiceRef = useRef();

    // Simple helpers
    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);

    // Fetch invoice data and convert logo to data URL
    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await InvoiceService.getInvoice(invoiceId);
                const data = response.data.data.invoice;
                setInvoiceData(data);

                // Convert logo to data URL
                if (data?.brand?.logo_mini_url) {
                    try {
                        const response = await fetch(data.brand.logo_mini_url);
                        const blob = await response.blob();
                        const reader = new FileReader();
                        reader.onloadend = () => setLogoDataUrl(reader.result);
                        reader.readAsDataURL(blob);
                    } catch (error) {
                        console.error("Error converting logo:", error);
                        setLogoDataUrl(favicon); // Fallback to favicon
                    }
                }
            } catch (err) {
                console.error("Error fetching invoice:", err);
            }
        };
        fetchInvoice();
    }, [invoiceId]);

    const handleDownload = () => {
        if (!invoiceRef.current) return;

        setIsDownloading(true);

        // Ensure logo is loaded before generating PDF
        const generatePDF = () => {
            html2pdf()
                .set({
                    filename: `invoice_${invoiceData.id}.pdf`,
                    margin: 10,
                    html2canvas: {
                        scale: 2,
                        useCORS: true,
                        logging: true,
                    },
                    jsPDF: { unit: "pt", format: "a4" },
                })
                .from(invoiceRef.current)
                .save()
                .finally(() => setIsDownloading(false));
        };

        // If we have a data URL or after 2s timeout
        if (logoDataUrl) {
            generatePDF();
        } else {
            const timeout = setTimeout(() => {
                generatePDF();
            }, 2000);
            return () => clearTimeout(timeout);
        }
    };

    if (!invoiceData) return null;

    // Calculate due date (7 days from invoice date)
    const dueDate = new Date(invoiceData.created_at);
    dueDate.setDate(dueDate.getDate() + 7);
    console.log(logoDataUrl);
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

            {/* Hidden Invoice Component */}
            <div className="invoice-box" style={{ display: "none" }}>
                <div ref={invoiceRef} style={{ padding: "30px", width: "800px", fontSize: "14px", fontFamily: "sans-serif" }}>
                    <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                        <img
                            src={logoDataUrl || invoiceData.brand.logo_mini_url || favicon}
                            alt="Logo"
                            style={{
                                height: "60px",
                                width: '60px',
                                objectFit: 'contain',
                                border: logoDataUrl ? 'none' : '1px solid #eee' // Visual fallback
                            }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = favicon;
                            }}
                        />
                        <h4 style={{ fontFamily: "Urbanist", fontSize: '20px', marginRight: "20px" }}>
                            INVOICE #{invoiceData.id}
                            {invoiceData.status === "1" ? (
                                <span className="rounded-pill bg-success ms-2" style={{ fontSize: '1rem', display: "inline-flex", alignItems: 'center', padding: "0.05rem 0.5rem 0.45rem", color: '#fff', fontWeight: '700' }}>
                                    Paid
                                </span>
                            ) : (
                                <span className="badge rounded-pill bg-warning ms-2" style={{ fontSize: '1rem', display: "inline-flex", alignItems: 'center', padding: "0.05rem 0.5rem 0.45rem", color: '#fff', fontWeight: '700' }}>
                                    Unpaid
                                </span>
                            )}
                        </h4>
                    </div>

                    <div className="invoice-bill-to" style={{ "fontSize": "14px", "marginBottom": "50px", "display": "flex", "alignItems": "baseline", "justifyContent": "space-between" }}>
                        <div className="invoice-to">
                            <p style={{ margin: "2px 0", }}><strong style={{ color: "#000", }}>BILLED TO:</strong></p>
                            <p style={{ margin: "2px 0", }}>{invoiceData.client.name}</p>
                            <p style={{ margin: "2px 0", }}>{invoiceData.client.phone}</p>
                        </div>

                        <div className="invoice-meta">
                            <p style={{ margin: "2px 20px 2px 0px", }}>Invoice No. {invoiceData.id}</p>
                            <p style={{ margin: "2px 20px 2px 0px", }}>{formatDate(invoiceData.created_at)}</p>
                        </div>
                    </div>

                    <table className="invoice-table" style={{ "width": "100%", "borderCollapse": "collapse", "marginBottom": "20px", "fontSize": "14px" }}>
                        <thead>
                            <tr>
                                <th style={{ "textAlign": "left", "paddingBottom": "8px", "color": "#000" }}>Item</th>
                                <th style={{ "textAlign": "left", "paddingBottom": "8px", "color": "#000" }}>Qty</th>
                                <th style={{ "textAlign": "left", "paddingBottom": "8px", "color": "#000" }}>Unit</th>
                                <th style={{ "textAlign": "left", "paddingBottom": "8px", "color": "#000" }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ "padding": "10px 0", "borderTop": "1px solid #000" }}>{invoiceData.title}</td>
                                <td style={{ "padding": "10px 0", "borderTop": "1px solid #000" }}>1</td>
                                <td style={{ "padding": "10px 0", "borderTop": "1px solid #000" }}>{formatCurrency(invoiceData.price)}</td>
                                <td style={{ "padding": "10px 0", "borderTop": "1px solid #000" }}>{formatCurrency(invoiceData.price)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="invoice-totals" style={{ marginRight: "50px" }}>
                        <div style={{ "display": "flex", "gap": "30px", "marginTop": "6px" }}><strong style={{ color: "#000", }}>Subtotal</strong><span>{formatCurrency(invoiceData.price)}</span></div>
                        <div style={{ "display": "flex", "gap": "30px", "marginTop": "6px" }}><strong style={{ color: "#000", }}>Tax (0%)</strong><span>$0.00</span></div>
                        <div style={{ "display": "flex", "gap": "30px", "marginTop": "6px", "fontWeight": "700", "fontSize": "18px", "marginTop": "20px", "borderTop": "1px solid #000", "paddingTop": "10px", "color": "#000" }} className="total"><strong style={{ color: "#000", }}>Total</strong><span>{formatCurrency(invoiceData.price)}</span></div>
                    </div>

                    <p className="thankyou" style={{ "marginTop": "20px", "fontSize": "20px", "color": "#000", "fontWeight": "400" }}>Thank you!</p>

                    <div className="invoice-payment-info" style={{ "fontSize": "14px", "marginTop": "30px", "display": "flex", "alignItems": "end", "justifyContent": "space-between" }}>
                        <div>
                            <p style={{ "marginBottom": "5px !important", "color": "#000" }}><strong style={{ "color": "#000", "fontWeight": "700" }}>PAYMENT INFORMATION</strong></p>
                            <p style={{ "marginBottom": "5px !important", "color": "#000" }}>{invoiceData.brand.name} Bank</p>
                            <p style={{ "marginBottom": "5px !important", "color": "#000" }}>Account Name: {invoiceData.brand.name}</p>
                            <p style={{ "marginBottom": "5px !important", "color": "#000" }}>Account No: 123-456-7890</p>
                            <p style={{ "marginBottom": "5px !important", "color": "#000" }}>Pay by: {formatDate(dueDate)}</p>
                        </div>

                        <div className="invoice-sign" style={{ "textAlign": "right", "marginTop": "20px", "fontWeight": "600", marginRight: "50px" }}>
                            <p style={{ "marginBottom": "5px !important", "color": "#000", fontSize: '22px', }} className="name">{invoiceData.brand.name}</p>
                            <p style={{ "marginBottom": "5px !important", "color": "#000" }}>{invoiceData.brand.address}</p>
                        </div>
                    </div>



                </div>
            </div>
        </>
    );
};

export default InvoiceDownloader;
