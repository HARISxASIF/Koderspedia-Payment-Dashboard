import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { Link } from 'react-router-dom'
import DynamicTable from './DynamicTable';
import DefaultAvatar from '../../otherImages/default.png';
import DP1 from '../../otherImages/dp-1.png';
import DP2 from '../../otherImages/dp-2.png';
import DP3 from '../../otherImages/dp-3.png';
import { useNavigate } from 'react-router-dom';

const ClientInvoiceList = () => {
    const navigate = useNavigate();
    const invoiceColumns = [
        { field: 'clientName', 
          headerName: 'Client Name',
          render: (row) =>  <div className="d-flex align-items-center gap-8"><img style={{height:"35px",width:"35px",borderRadius:"50%",}} src={row.clientImage ? row.clientImage : DefaultAvatar} alt="clientName"/>{row.clientName}</div>
        },
        { field: 'invoiceNumber', headerName: 'Invoice #' },
        { 
          field: 'price', 
          headerName: 'Price',
          render: (row) => <span>${row.price.toFixed(2)} </span>
        },
        { 
          field: 'paymentStatus', 
          headerName: 'Payment Status',
          render: (row) => (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
              ${row.paymentStatus === 'RECEIVED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {row.paymentStatus}
            </span>
          )
        },
        { field: 'dueDate', headerName: 'Due Date' },
        { 
          field: 'manage', 
          headerName: 'Manage',
          render: () => (
            <div className="btnDiv"><Icon onClick={() => handleEditPackage()} className="editBtn hover: cursor-pointer" icon="line-md:edit" width="24" height="24" /><Icon onClick={() => handleDeletePackage()} className="deleteBtn hover: cursor-pointer" icon="material-symbols:delete-outline" width="24" height="24" /></div>          
          )
        }
      ];
    
      // Your data (later can be replaced with API call)
      const invoiceData = [
        {
          id: 'NV-1001',
          clientImage:DP1,
          clientName: 'Juan Neck',
          invoiceNumber: 'NV-1001',
          price: 5750.00,
          paymentStatus: 'RECEIVED',
          dueDate: '12 March'
        },
        {
          id: 'NV-1002',
          clientImage:"",
          clientName: 'Harry Clinton',
          invoiceNumber: 'NV-1002',
          price: 5750.00,
          paymentStatus: 'Cancelled',
          dueDate: '15 March'
        },
        {
          id: 'NV-1003',
          clientImage:DP2,
          clientName: 'Wendor D',
          invoiceNumber: 'NV-1003',
          price: 5720.00,
          paymentStatus: 'PENDING',
          dueDate: '17 March'
        },
        {
          id: 'NV-1004',
          clientImage:DP3,
          clientName: 'Sapphire',
          invoiceNumber: 'NV-1004',
          price: 5750.00,
          paymentStatus: 'RECEIVED',
          dueDate: '12 March'
        }
      ];
    
      const handleEditPackage = () => {
        navigate('/'); 
      };

      const handleDeletePackage = () => {
        alert("Deleted Successfully");
      };


    return (
        <>
        <h2 className='fs-2 mt-40'>Client Invoices List</h2>
        <DynamicTable
        columns={invoiceColumns}
        data={invoiceData}
        keyField="id"
        // onRowClick={handleRowClick}
        className="overflow-hidden "
    />
    </>
    )
}

export default ClientInvoiceList