import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import PricingLayer from "../components/PricingLayer";

const PricingPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Pricing" />

        {/* PricingLayer */}
        <PricingLayer />

      </MasterLayout>

    </>
  );
};

export default PricingPage; 
