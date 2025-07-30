import React, { useState } from "react";
import { jsPDF } from "jspdf";
import InvoiceService from "../services/invoiceService";
import { Icon } from "@iconify/react";

const InvoiceDownloader = ({ invoiceId }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const response = await InvoiceService.getInvoice(invoiceId);
            const invoice = response.data.data.invoice;

            const doc = new jsPDF();

            doc.setFontSize(16);
            doc.text("Invoice", 20, 20);

            doc.setFontSize(12);
            doc.text(`Invoice ID: ${invoice.id}`, 20, 30);
            doc.text(`Client: ${invoice.client.name}`, 20, 40);
            doc.text(`Username: ${invoice.client.username}`, 20, 50);
            doc.text(`Email: ${invoice.client.email}`, 20, 60);
            doc.text(`Phone: ${invoice.client.phone}`, 20, 70);
            doc.text(`Title: ${invoice.title}`, 20, 80);
            doc.text(`Price: $${invoice.price}`, 20, 90);
            doc.text(`Remaining: $${invoice.remaining_price}`, 20, 100);
            doc.text(`Status: ${invoice.status === "0" ? "Unpaid" : "Paid"}`, 20, 110);
            doc.text(`Sale Type: ${invoice.sale_type}`, 20, 120);

            // Convert HTML description to plain text
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = invoice.description;
            const plainTextDescription = tempDiv.innerText;

            doc.text("Description:", 20, 130);
            doc.text(doc.splitTextToSize(plainTextDescription, 170), 20, 140);

            doc.save(`invoice_${invoice.id}.pdf`);
        } catch (error) {
            console.error("Error fetching invoice or generating PDF:", error);
            alert("Failed to generate invoice PDF.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <>
            {isDownloading ? (
                <Icon 
                    icon="eos-icons:loading" 
                    width="24" 
                    height="24" 
                    className="d-invoice"
                />
            ) : (
                <Icon
                    onClick={handleDownload}
                    className="d-invoice hover:cursor-pointer"
                    icon="material-symbols:sim-card-download"
                    width="24"
                    height="24"
                />
            )}
        </>
    );
};

export default InvoiceDownloader;