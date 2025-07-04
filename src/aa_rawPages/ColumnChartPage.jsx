import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ColumnChartLayer from "../components/ColumnChartLayer";


const ColumnChartPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Chart / Column Chart" />

        {/* ColumnChartLayer */}
        <ColumnChartLayer />


      </MasterLayout>
    </>
  );
};

export default ColumnChartPage;
