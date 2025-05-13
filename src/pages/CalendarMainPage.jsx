import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import CalendarMainLayer from "../components/CalendarMainLayer";


const CalendarMainPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Components / Calendar" />

        {/* CalendarMainLayer */}
        <CalendarMainLayer />


      </MasterLayout>
    </>
  );
};

export default CalendarMainPage;
