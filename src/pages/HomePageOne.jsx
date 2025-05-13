import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DashBoardLayerOne from "../components/DashBoardLayerOne";
import HomeTopBar from "../components/HomeTopBar";

const HomePageOne = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <HomeTopBar  />


        {/* DashBoardLayerOne */}
        <DashBoardLayerOne />

      </MasterLayout>
    </>
  );
};

export default HomePageOne;
