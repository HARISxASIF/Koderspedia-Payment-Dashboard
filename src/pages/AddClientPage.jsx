import React from "react";
import MasterLayout from "../otherImages/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddClientForm from "../components/AddClientForm";
import DefaultTopBar from "../components/DefaultTopBar";

const AddClientPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        <DefaultTopBar
            title="Add Client"
            desc="Lorem ispum manage client account efficiently."
        />

        {/* TableDataLayer */}
        <AddClientForm />

      </MasterLayout>

    </>
  );
};

export default AddClientPage; 
