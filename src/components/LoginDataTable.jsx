import React, { useState, useMemo, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { fetchloginActivity } from "../store/slices/loginActivitySlice";
import { useDispatch } from "react-redux";

const LoginDataTable = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date("2025-01-01"));
  const [endDate, setEndDate] = useState(new Date("2025-12-10"));
  const [filter, setFilter] = useState("");
  const { loginActivity, loading, error } = useSelector((state) => state.loginActivity);
  useEffect(() => {
    const fetchData = () => dispatch(fetchloginActivity());
    // Initial fetch
    fetchData();
    // Set up polling every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const CustomInput = ({ value, onClick }) => (
    <button
      className="btn btn-outline-secondary d-flex align-items-center gap-2"
      onClick={onClick}
    >
      <Icon icon="uil:calender" width="18" />
      <span>{value}</span>
    </button>
  );

  const filteredData = useMemo(() => {
    return loginActivity.filter((pkg) => {
      const rowDate = new Date(pkg.date);
      const isInDateRange =
        rowDate >= new Date(startDate.setHours(0, 0, 0, 0)) &&
        rowDate <= new Date(endDate.setHours(23, 59, 59, 999));
      const isInTypeFilter = !filter || pkg.clientsName === filter;
      return isInDateRange && isInTypeFilter;
    });
  }, [startDate, endDate, filter]);

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          return (

            <span
              className={`col-client-name val-${rowData.user.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {rowData.user.name}
            </span>
          )
        }
      }
    },
    {
      name: "time",
      label: "Time",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          return (
            <span className={`col-time val-${rowData.time.replace(/:/g, "-")}`}>
              {rowData.time}
            </span>
          )
        }
      }
    },
    {
      name: "externalIP",
      label: "External IP",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          return (
            <span className={`col-external-ip val-${rowData.ip_address.replace(/\./g, "-")}`}>
              {rowData.ip_address}
            </span>
          )
        }
      }
    },
    {
      name: "type",
      label: "Type",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          const colorClass =
            rowData.type === "login"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800";

          return (
            <span
              className={`col-type px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}
            >
              {rowData.type}
            </span>
          )
        }
      }
    },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          return (
            <span
              className={`col-date val-${rowData.date
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {rowData.date}
            </span>
          )
        }
      }
    },
    {
      name: "success",
      label: "Success",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          return <span className={`col-success`}>Success</span>;
        }
      }
    },
  ];

  const options = {
    selectableRows: "none",
    rowsPerPage: 10,
    responsive: "standard",
    elevation: 0,
    print: false,
    download: false,
    viewColumns: false,
    filter: false,
    search: true,
    // searchOpen: true,
  };

  return (
    <div className="card basic-data-table">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div class="tableHeading">
          <h3 className="fs-3 fw-semibold">
            {filter === "all clients" ? "All Invoices" : "Security and Confidentiality Report"}
          </h3>
        </div>
        <div class="filterWrapper">
          <div className="d-flex align-items-center gap-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              customInput={<CustomInput />}
              dateFormat="dd MMM yyyy"
            />
            <span>-</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              customInput={<CustomInput />}
              dateFormat="dd MMM yyyy"
            />
          </div>
          {/* <div className="filter-select">
            <select
              className="form-select"
              value={filter}
              id="packageTypeFilter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Clients</option>
              <option value="Peter Webb">Peter Webb</option>
              <option value="Eric Sanchez">Eric Sanchez</option>
              <option value="Kevin">Kevin</option>
              <option value="Jay Brown">Jay Brown</option>
            </select>
          </div> */}
        </div>
      </div>
      <div className="card-body">
        <MUIDataTable
          data={filteredData}
          columns={columns}
          options={options}
          className="overflow-hidden packageTable"
        />
      </div>
    </div>
  );
};

export default LoginDataTable;
