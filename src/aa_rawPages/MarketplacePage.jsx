import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import MarketplaceLayer from "../components/MarketplaceLayer";



const MarketplacePage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Marketplace" />

        {/* MarketplaceLayer */}
        <MarketplaceLayer />

      </MasterLayout>

    </>
  );
};

export default MarketplacePage; 
