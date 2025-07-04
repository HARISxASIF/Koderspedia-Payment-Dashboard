import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DropdownLayer from "../components/DropdownLayer";


const DropdownPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Components / Dropdown" />

        {/* DropdownLayer */}
        <DropdownLayer />


      </MasterLayout>
    </>
  );
};

export default DropdownPage;
