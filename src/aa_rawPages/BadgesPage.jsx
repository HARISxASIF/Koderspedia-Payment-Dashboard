import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import BadgesLayer from "../components/BadgesLayer";


const BadgesPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Components / Badges" />

        {/* BadgesLayer */}
        <BadgesLayer />


      </MasterLayout>
    </>
  );
};

export default BadgesPage;
