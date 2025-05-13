import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import GalleryLayer from "../components/GalleryLayer";

const GalleryPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Gallery Grid Desc' />

        {/* GalleryLayer */}
        <GalleryLayer />
      </MasterLayout>
    </>
  );
};

export default GalleryPage;
