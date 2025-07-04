import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "./Breadcrumb";
import PaymentHistoryTable from "./PaymentHistoryTable";
import DefaultTopBar from "./DefaultTopBar";
import HomeTopBar from "./HomeTopBar";

const PaymentHistoryPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout> 
        <HomeTopBar
        title="Welcome Back, John Doe!"
         desc="Your recruitment metrics and activities at a glance"
        />
        <DefaultTopBar
            title="Project Overview"
            desc="Status of current project in the system"
            btnText="New Package"
            // btnLink="/add-package" 
        />

        {/* TableDataLayer */}
        <PaymentHistoryTable />

      </MasterLayout>

    </>
  );
};

export default PaymentHistoryPage; 
