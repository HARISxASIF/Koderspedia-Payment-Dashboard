import React, { useState, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DefaultAvatar from '../otherImages/default.png';
import DP1 from '../otherImages/dp-1.png';
import DP2 from '../otherImages/dp-2.png';
import DP3 from '../otherImages/dp-3.png';
import DP4 from '../otherImages/dp-4.png';
import DP5 from '../otherImages/dp-5.png';
import DP6 from '../otherImages/dp-6.png';

const InvoiceDataTable = () => {
  const [filter, setFilter] = useState('monthly');
  const navigate = useNavigate();

  const handleEditPackage = (rowData) => {
        navigate('#', { state: { client: rowData } });
      };

  const handleDeletePackage = () => {
    alert("Deleted Successfully");
  };

  const invoiceData = [
    { id: 'I-001', clientName: 'Pristia Candra', clientImage: DP1, created_at: '26 May 2025',created_by: 'Peter Webb',assignedPackages:'Website Development - Basic',price:750.00,remaining_price:450.00 },
    { id: 'I-002', clientName: 'Hanna Baptista', clientImage: DP2, created_at: '20 May 2025',created_by: 'Peter Webb', assignedPackages:'Website Development',price:750.00,remaining_price:450.00},
    { id: 'I-003', clientName: 'Miracle Geidt', clientImage: DP3, created_at: '06 Jun 2025',created_by: 'Peter Webb',assignedPackages:'Mobile Application',price:750.00,remaining_price:450.00 },
    { id: 'I-004', clientName: 'Rayna Torff', clientImage: DP4, created_at: '16 July 2025',created_by: 'Peter Webb',assignedPackages:'Social Media Management' ,price:750.00,remaining_price:450.00},
    { id: 'I-005', clientName: 'Giana Lipshutz', clientImage: DP5, created_at: '12 Oct 2025',created_by: 'Peter Webb',assignedPackages:'Website Development' ,price:750.00,remaining_price:450.00},
    { id: 'I-006', clientName: 'James George', clientImage: DP6, created_at: '28 Nov 2025',created_by: 'Peter Webb',assignedPackages:'Website Development - Basic' ,price:750.00,remaining_price:450.00},
    { id: 'I-007', clientName: 'Jordyn George', clientImage: DP1, created_at: '02 Sep 2025',created_by: 'Peter Webb',assignedPackages:'Website Development ' ,price:750.00,remaining_price:450.00},
    { id: 'I-008', clientName: 'Giana Lipshutz', clientImage: DP2, created_at: '10 July 2025',created_by: 'Peter Webb',assignedPackages:'Social Media Management',price:750.00,remaining_price:450.00 },
    { id: 'I-009', clientName: 'Pristia Candra', clientImage: DP3, created_at: '18 Dec 2025',created_by: 'Peter Webb',assignedPackages:'Mobile Application' ,price:750.00,remaining_price:450.00},
    { id: 'I-010', clientName: 'Giana Lipshutz', clientImage: DP4, created_at: '21 July 2025',created_by: 'Peter Webb',assignedPackages:'Website Development - Basic' ,price:750.00,remaining_price:450.00},
    { id: 'I-011', clientName: 'Rayna Torff', clientImage: DP5, created_at: '17 May 2025',created_by: 'Peter Webb', assignedPackages:'Social Media Management',price:750.00,remaining_price:450.00},   
    { id: 'I-012', clientName: 'Jordyn George', clientImage: DP6, created_at: '08 May 2025',created_by: 'Peter Webb',assignedPackages:'Website Development' ,price:750.00,remaining_price:450.00},
  ];


  const filteredData = useMemo(() => {
    if (filter === 'monthly') {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return invoiceData.filter(pkg => {
        const rowDate = new Date(pkg.created_at);
        return rowDate.getMonth() === currentMonth && rowDate.getFullYear() === currentYear;
      });
    }
    return invoiceData;
  }, [filter]);

const columns = [
    {
  name: 'clientName',
  label: 'Client Name',
  options: {
    customBodyRender: (value, tableMeta) => {
      const safeVal = value.toLowerCase().replace(/\s+/g, '_');
      return (
        <div className={`col-clientName val-${safeVal} d-flex align-items-center gap-8`}>
          <img
            style={{ height: "35px", width: "35px", borderRadius: "50%" }}
            src={filteredData[tableMeta.rowIndex].clientImage || DefaultAvatar}
            alt="package"
          />
          {value}
        </div>
      );
    }
  }
},
  {
      name: 'price',
      label: 'Price',
      options: {
      customBodyRender: (value) => {
          const safeVal = value.toFixed(2).replace('.', '-');
          return (
          <span className={`col-price val-${safeVal} font-bold`}>
              ${value.toFixed(2)}
          </span>
          );
      }
      }
  },
  {
      name: 'remaining_price',
      label: 'Remaining($)',
      options: {
      customBodyRender: (value) => {
          const safeVal = value.toFixed(2).replace('.', '-');
          return (
          <span className={`col-price val-${safeVal} font-bold`}>
              ${value.toFixed(2)}
          </span>
          );
      }
      }
  },
  {
  name: 'assignedPackages',
  label: 'Assigned Packages',
  options: {
    customBodyRender: (value) => {
      const safeVal = value.toLowerCase().replace(/\s+/g, '-');
      return (
        <span className={`col-assigned ${safeVal} px-2 py-1 rounded-full font-medium`}>
          {value}
        </span>
      );
    }
  }
},
  
  {
  name: 'created_at',
  label: 'Created At',
  options: {
    customBodyRender: (value) => {
      const safeVal = value.toLowerCase().replace(/\s+/g, '-');
      return (
        <span className={`col-date val-${safeVal} text-gray-600`}>
          {value}
        </span>
      );
    }
  }
},
  {
  name: 'created_by',
  label: 'Created By',
  options: {
    customBodyRender: (value) => {
      const safeVal = value.toLowerCase().replace(/\s+/g, '-');
      return (
        <span className={`col-date val-${safeVal} text-gray-600`}>
          {value}
        </span>
      );
    }
  }
},
  // {
  //   name: "links",
  //   label: "Links",
  //   options: {
  //     customBodyRender: () => (
  //       <Stack direction="row" spacing={1}>
  //         <DownloadIcon fontSize="small" />
  //         <FileCopyIcon fontSize="small" />
  //       </Stack>
  //     )
  //   }
  // },
  {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex]; 
          return (
            <div>
            <Icon
              onClick={() => handleEditPackage(rowData)}
              className="editBtn hover: cursor-pointer"
              icon="line-md:edit"
              width="24"
              height="24"
            />
            <Icon onClick={handleDeletePackage} className="deleteBtn hover: cursor-pointer" icon="material-symbols:delete-outline" width="24" height="24" />
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
                ? "All Invoices"
                : "Monthly Invoices"}
            </h3>
          </div>
          <div className="custom-toggle">
            <div className="toggle-container">
              <div
                className={`toggle-indicator ${
                  filter === "all" ? "right" : "left"
                }`}
              />
              <div
                className={`toggle-option ${
                  filter === "monthly" ? "active" : ""
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

export default InvoiceDataTable;
