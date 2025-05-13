import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AssignRoleLayer from "../components/AssignRoleLayer";


const AssignRolePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Assign Role" />

        {/* AssignRoleLayer */}
        <AssignRoleLayer />


      </MasterLayout>
    </>
  );
};

export default AssignRolePage;
