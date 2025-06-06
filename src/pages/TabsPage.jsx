import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import TabsLayer from "../components/TabsLayer";

const TabsPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Components / Tab & Accordion" />

        {/* TabsLayer */}
        <TabsLayer />

      </MasterLayout>

    </>
  );
};

export default TabsPage; 
