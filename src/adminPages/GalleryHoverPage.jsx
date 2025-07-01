import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import GalleryHoverLayer from "../components/GalleryHoverLayer";

const GalleryHoverPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Gallery Hover' />

        {/* GalleryHoverLayer */}
        <GalleryHoverLayer />
      </MasterLayout>
    </>
  );
};

export default GalleryHoverPage;
