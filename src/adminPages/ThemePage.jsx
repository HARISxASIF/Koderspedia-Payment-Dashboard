import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ThemeLayer from "../components/ThemeLayer";

const ThemePage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Settings - Theme" />

        {/* ThemeLayer */}
        <ThemeLayer />

      </MasterLayout>

    </>
  );
};

export default ThemePage; 
