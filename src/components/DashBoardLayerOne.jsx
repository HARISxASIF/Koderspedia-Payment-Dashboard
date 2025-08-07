import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import SalesStatisticOne from "../components/SalesStatisticOne";
import CustomerStatistics from "../components/CustomerStatistics";
import UsersOverviewOne from "../components/UsersOverviewOne";
import ClientInvoiceList from "../components/ClientInvoiceList";
import UnitCountOne from "../components/UnitCountOne";
import UsersOverviewTwo from "../components/UsersOverviewTwo";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../store/slices/clientSlice";
import { fetchInvoices } from "../store/slices/invoiceSlice";
import CustomersOverviewOne from "./CustomersOverviewOne";
import CustomersOverviewTwo from "./CustomersOverviewTwo";
import CustomersList from "./CustomersList";

const DashBoardLayerOne = () => {
<<<<<<< HEAD
  const dispatch = useDispatch();
  const { invoices } = useSelector((state) => state.invoices);
  const { clients } = useSelector((state) => state.clients);
=======
    const dispatch = useDispatch();
    const { invoices, loading } = useSelector((state) => state.invoices);
    const { clients } = useSelector((state) => state.clients);
    useEffect(() => {
        dispatch(fetchClients());
    }, []);
>>>>>>> 066b7eb8d3c9a9566e6e08bf60a7c6b5b5041290

  const [filter, setFilter] = useState("monthly"); // 'monthly' | 'all'
  const activeTab = filter === "monthly" ? "tab1" : "tab2";

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  return (
    <>
      {/* UnitCountOne */}
      <UnitCountOne />

      {/* --- Custom Toggle (replaces nav-tabs) --- */}
      <div
        className="custom-toggle mt-5"
        role="tablist"
        aria-label="Dashboard range"
      >
        <div className="toggle-container">
          <div
            className={`toggle-indicator ${
              filter === "all" ? "right" : "left"
            }`}
            aria-hidden="true"
          />
          <button
            type="button"
            className={`toggle-option ${filter === "monthly" ? "active" : ""}`}
            onClick={() => setFilter("monthly")}
            role="tab"
            aria-selected={filter === "monthly"}
            aria-controls="tab1-panel"
            id="tab1"
          >
            <Icon icon="mdi:account-group" width="22" />
            <span>Customers</span>
          </button>

          <button
            type="button"
            className={`toggle-option ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
            role="tab"
            aria-selected={filter === "all"}
            aria-controls="tab2-panel"
            id="tab2"
          >
            <Icon icon="akar-icons:clipboard" width="25" />
            <span>Invoices</span>
          </button>
        </div>
      </div>

      {/* --- Panels (same content in both) --- */}
      <div className="tab-content">
        <div
          id="tab1-panel"
          role="tabpanel"
          aria-labelledby="tab1"
          className={`tab-pane ${
            activeTab === "tab1" ? "show active" : "d-none"
          }`}
        >
          <section className="row gy-4 mt-1">
            <CustomerStatistics />
            <CustomersOverviewOne />
            <CustomersOverviewTwo />
            <CustomersList />
          </section>
        </div>

        <div
          id="tab2-panel"
          role="tabpanel"
          aria-labelledby="tab2"
          className={`tab-pane ${
            activeTab === "tab2" ? "show active" : "d-none"
          }`}
        >
          <section className="row gy-4 mt-1">
            <SalesStatisticOne />
            <UsersOverviewOne />
            <UsersOverviewTwo />
            <ClientInvoiceList />
          </section>
        </div>
      </div>
    </>
  );
};

export default DashBoardLayerOne;
