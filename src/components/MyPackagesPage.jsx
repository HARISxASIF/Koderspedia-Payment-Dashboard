import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "./Breadcrumb";
import MyPackageTable from "./MyPackageTable";
import DefaultTopBar from "./DefaultTopBar";
import HomeTopBar from "./HomeTopBar";

const MyPackagesPage = () => {
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
        <MyPackageTable />

      </MasterLayout>

    </>
  );
};

export default MyPackagesPage; 
