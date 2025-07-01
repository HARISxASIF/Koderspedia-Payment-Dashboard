import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import RadioLayer from "../components/RadioLayer";

const RadioPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Components / Radio" />

        {/* RadioLayer */}
        <RadioLayer />

      </MasterLayout>

    </>
  );
};

export default RadioPage; 
