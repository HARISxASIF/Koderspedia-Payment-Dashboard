import React, { useState, useMemo, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DefaultAvatar from '../otherImages/default.png';
import { useSelector, useDispatch } from 'react-redux';
import { deleteInvoice, fetchInvoices } from '../store/slices/invoiceSlice';
import DeleteConfirmButton from './DeleteConfirmButton';

const InvoiceDataTable = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('monthly');
  const navigate = useNavigate();
  const { invoices, loading, error } = useSelector((state) => state.invoices);
  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch])

  const handleEditPackage = (rowData) => {
    navigate(`/edit-invoice/${rowData.id}`, { state: { invoice: rowData } });
  };
  const transformedInvoices = useMemo(() => {
    if (!invoices) return [];
    return invoices.map(invoice => ({
      ...invoice,
      date: invoice.created_at ? new Date(invoice.created_at).toLocaleDateString() : 'N/A',
    }))
  }, [invoices])

  const filteredData = useMemo(() => {
    if (filter === 'monthly') {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return transformedInvoices.filter(pkg => {
        const rowDate = new Date(pkg.created_at);
        return rowDate.getMonth() === currentMonth && rowDate.getFullYear() === currentYear;
      });
    }
    return transformedInvoices;
  }, [filter, transformedInvoices]);

  const columns = [
    {
      name: 'title',
      label: 'Title',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          // Safely access nested properties
          const title = rowData.title;
          const safeVal = title.toLowerCase().replace(/\s+/g, '_');

          return (
            <div className={`col-name val-${safeVal} d-flex align-items-center gap-8`}>
             
              {title}
            </div>
          );
        }
      }
    },
    {
      name: 'name',
      label: 'Client',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          // Safely access nested properties
          const clientName = rowData.client?.name || 'No Name';
          const clientImage = rowData.client?.image_url || DefaultAvatar;
          const safeVal = (clientName || '').toLowerCase().replace(/\s+/g, '_');

          return (
            <div className={`col-name val-${safeVal} d-flex align-items-center gap-8`}>
              <img
                style={{ height: "35px", width: "35px", borderRadius: "50%" }}
                src={clientImage}
                alt="client"
              />
              {clientName}
            </div>
          );
        }
      }
    },
    {
      name: 'price',
      label: 'Price',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          const price = parseFloat(rowData.price) || 0; // Convert string to number
          const safeVal = price.toFixed(2).replace('.', '-');
          return (
            <span className={`col-price val-${safeVal} font-bold`}>
              ${price.toFixed(2)}
            </span>
          );
        }
      }
    },
    {
      name: 'remaining_price',
      label: 'Remaining($)',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          const remainingPrice = parseFloat(rowData.remaining_price) || 0;
          const safeVal = remainingPrice.toFixed(2).replace('.', '-');

          return (
            <span className={`col-price val-${safeVal} font-bold`}>
              ${remainingPrice.toFixed(2)}
            </span>
          );
        }
      }
    },
    // {
    //   name: 'assignedPackages',
    //   label: 'Assigned Packages',
    //   options: {
    //     customBodyRenderLite: (dataIndex) => {
    //       const rowData = filteredData[dataIndex];
    //       const packages = rowData.client?.packages || [];

    //       return (
    //         <div className="flex flex-wrap gap-2">
    //           {packages.map((pkg) => (
    //             <span
    //               key={pkg.id}
    //               className="px-2 py-1 bg-gray-100 rounded-full text-sm font-medium"
    //             >
    //               {pkg.name} (${parseFloat(pkg.price).toFixed(2)})
    //             </span>
    //           ))}
    //         </div>
    //       );
    //     }
    //   }
    // },

    {
      name: 'created_at',
      label: 'Created At',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          const safeVal = rowData.date.toLowerCase().replace(/\s+/g, '-');

          return (
            <span className={`col-date val-${safeVal} text-gray-600`}>
              {rowData.date}
            </span>
          );
        }
      }
    },
    {
      name: 'created_by',
      label: 'Created By',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          const userId = rowData.created_by?.name || "N/A"; // Fallback if null
          const safeVal = String(userId).toLowerCase().replace(/\s+/g, '-');

          return (
            <span className={`col-date val-${safeVal} text-gray-600`}>
              {userId}
            </span>
          );
        }
      }
    },
    {
      name: 'links',
      label: 'Links',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];

          // Function: Download Invoice PDF
          const handleDownloadInvoice = () => {
            const link = document.createElement('a');
            link.href = rowData.download_invoice; // e.g. '/assets/invoices/invoice.pdf'
            link.download = 'invoice.pdf'; // optional custom file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          };

          // Function: Copy Invoice Link
          const handleInvoiceLink = () => {
            if (rowData.invoice_link) {
              navigator.clipboard.writeText(rowData.invoice_link)
                .then(() => {
                  alert("Invoice link copied to clipboard!");
                })
                .catch(err => {
                  console.error("Clipboard copy failed:", err);
                });
            }
          };

          return (
            <div className="flex gap-2 invoice-link">
              <Icon
                onClick={handleDownloadInvoice}
                className="d-invoice hover:cursor-pointer"
                icon="material-symbols:sim-card-download"
                width="24"
                height="24"
              />
              <Icon
                onClick={handleInvoiceLink}
                className="copy-invoice hover:cursor-pointer"
                icon="material-symbols-light:content-copy-rounded"
                width="24"
                height="24"
              />
            </div>
          );
        },
      },
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const rowData = filteredData[dataIndex];
          return (
            <div className='d-flex'>
              <Icon
                onClick={() => handleEditPackage(rowData)}
                className="editBtn hover: cursor-pointer"
                icon="line-md:edit"
                width="24"
                height="24"
              />
              <DeleteConfirmButton
                item={{ id: rowData.id, name: rowData.title }}
                deleteAction={deleteInvoice}
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
              ? "All Invoices"
              : "Monthly Invoices"}
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

export default InvoiceDataTable;
