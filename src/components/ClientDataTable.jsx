import React, { useState, useMemo, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DefaultAvatar from '../otherImages/default.png';
import { useDispatch, useSelector } from 'react-redux';
import { deleteClient, fetchClients } from '../store/slices/clientSlice';
import DeleteConfirmButton from './DeleteConfirmButton';
import profilePic from "../otherImages/profilePic.png";

const ClientDataTable = () => {
  const [filter, setFilter] = useState('monthly');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.clients);
  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleEditClient = (rowData) => {
    navigate(`/edit-client/${rowData.id}`, { state: { client: rowData } });
  };
  const transformedClients = useMemo(() => {
    console.log("Clients Data:", clients);
    if (!clients) return [];
    return clients.map(client => ({
      ...client,
      date: client.created_at ? new Date(client.created_at).toLocaleDateString() : 'N/A',
    }))
  }, [clients])

  // const filteredData = useMemo(() => {
  //   if (filter === 'monthly') {
  //     const currentMonth = new Date().getMonth();
  //     console.log("Current Month:", currentMonth);
  //     const currentYear = new Date().getFullYear();
  //     return transformedClients.filter(client => {
  //       if (!client.date || client.date === 'N/A') return false;
  //       const rowDate = new Date(client.date);
  //       console.log("Client Date:", rowDate.getMonth());
  //       return rowDate.getMonth() === currentMonth && rowDate.getFullYear() === currentYear;
  //     });
  //   }
  //   return transformedClients;
  // }, [filter, transformedClients]);
  // console.log("Filtered Data:", filteredData);
  const filteredData = transformedClients;
  const columns = [
    {
      name: 'name',
      label: 'Client Name',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          const safeVal = rowData.name?.toLowerCase().replace(/\s+/g, '_');
          return (
            <div className={`col-clientName val-${safeVal} d-flex align-items-center gap-8`}>
              <img
                style={{ height: "35px", width: "35px", borderRadius: "50%" }}
                src={rowData.image_url ?? profilePic}
                alt="package"
              />
              {rowData.name}
            </div>
          );
        }
      }
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          const safeVal = rowData.date?.toLowerCase().replace(/\s+/g, '-');
          return (
            <span className={`col-date val-${safeVal} text-gray-600`}>
              {rowData.date}
            </span>
          );
        }
      }
    },
    {
      name: 'email',
      label: 'Email Address',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          const safeVal = rowData.email?.toLowerCase().replace(/\s+/g, '-');
          return (
            <span className={`col-email val-${safeVal}`}>
              {rowData.email}
            </span>
          );
        }
      }
    },
    {
      name: 'phone',
      label: 'Phone',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          const safeVal = rowData.phone?.toLowerCase().replace(/\s+/g, '-');
          return (
            <span className={`col-phone val-${safeVal} font-bold`}>
              {rowData.phone}
            </span>
          );
        }
      }
    },
    {
      name: 'packages',
      label: 'Assigned Packages',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];

          // Safely get packages array (default to empty array)
          const packagesArray = Array.isArray(rowData.packages) ? rowData.packages : [];

          // Extract package names
          const packageNames = packagesArray.map(pkg => pkg.name || 'Unnamed Package');

          // Join names for display
          const displayText = packageNames.length ? packageNames.join(', ') : 'None';

          // Create safe CSS class
          const safeVal = displayText.toLowerCase().replace(/\s+/g, '-');

          return (
            <span className={`col-packages ${safeVal} px-2 py-1 rounded-full font-medium`}>
              {displayText}
            </span>
          );
        }
      }
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          return (
            <div>
              <Icon
                onClick={() => handleEditClient(rowData)}
                className="editBtn hover: cursor-pointer"
                icon="line-md:edit"
                width="24"
                height="24"
              />
              <DeleteConfirmButton
                item={{ id: rowData.id, name: rowData.name }}
                deleteAction={deleteClient}
                className="deleteBtn hover:cursor-pointer"
                title="Delete Invoice"
              >
                <Icon icon="material-symbols:delete-outline" width="24" height="24" />
              </DeleteConfirmButton>
            </div>
          );
        },
      },
    },
  ];


  const options = {
    selectableRows: 'none',
    rowsPerPage: 10,
    responsive: 'standard',
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
          <h3 className='fs-3 fw-semibold'>
            {filter === "all"
              ? "All Client Overview"
              : "Monthly Client Overview"}
          </h3>
        </div>
        <div className="custom-toggle">
          <div className="toggle-container">
            <div
              className={`toggle-indicator ${filter === "all" ? "right" : "left"
                }`}
            />
            <div
              className={`toggle-option ${filter === "monthly" ? "active" : ""
                }`}
              onClick={() => setFilter("monthly")}
            >
              <Icon icon="mdi:account" width="22" />
              <span>This Month</span>
            </div>
            <div
              className={`toggle-option ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              <Icon icon="mdi:account-group" width="25" />
              <span>All Time</span>
            </div>
          </div>
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

export default ClientDataTable;
