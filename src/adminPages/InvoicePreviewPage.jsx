import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import InvoicePreviewLayer from "../components/InvoicePreviewLayer";




const InvoicePreviewPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Invoice - Preview" />

        {/* InvoicePreviewLayer */}
        <InvoicePreviewLayer />

      </MasterLayout>

    </>
  );
};

export default InvoicePreviewPage;
