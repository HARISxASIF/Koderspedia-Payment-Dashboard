import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import BlogLayer from "../components/BlogLayer";

const BlogPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Blog' />

        {/* BlogLayer */}
        <BlogLayer />
      </MasterLayout>
    </>
  );
};

export default BlogPage;
