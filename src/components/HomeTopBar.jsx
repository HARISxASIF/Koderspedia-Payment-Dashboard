import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const HomeTopBar = ({ title }) => {
  return (
    <div className='d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24'>
      <div>
        <h2 className='fw-semibold mb-10 fs-1 primaryColor'>Welcome Back, John Doe!</h2>
        <p>Your recruitment metrics and activities at a glance</p>
      </div>    
      <div className="buttonDiv d-flex gap-10">
        <Link to="/add-client" className="btn bg-primary text-white d-flex gap-10">
          <Icon
              icon="akar-icons:plus"
              className="text-white fs-4 mb-0"
          />Create Client</Link>
          <button className="btn bg-secondary d-flex gap-10">
          <Icon
              icon="akar-icons:plus"
              className=" fs-4 mb-0"
          />Create Invoice</button>
      </div>
    </div>
  );
};

export default HomeTopBar;
