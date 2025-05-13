import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import WalletLayer from "../components/WalletLayer";


const WalletPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Wallet" />

        {/* WalletLayer */}
        <WalletLayer />

      </MasterLayout>

    </>
  );
};

export default WalletPage; 
