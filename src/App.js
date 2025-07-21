import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';
import HomePageOne from "./adminPages/HomePageOne";
import ErrorPage from "./adminPages/ErrorPage";
import SignInPage from "./adminPages/SignInPage";
import SignUpPage from "./adminPages/SignUpPage";
import AccessDeniedPage from "./adminPages/AccessDeniedPage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import ManagePackages from "./adminPages/ManagePackages";
import ManageClients from "./adminPages/ManageClients";
import AddClientPage from "./adminPages/AddClientPage";
import AddPackagePage from "./adminPages/AddPackagePage";
import EditPackagePage from "./adminPages/EditPackagePage";
import EditClientPage from "./adminPages/EditClientPage";
import ManageInvoices from "./adminPages/ManageInvoices";
import CreateInvoicePage from "./adminPages/CreateInvoicePage";
import LoginHistoryPage from "./adminPages/LoginHistoryPage";
import ClientPackagesPage from "./clientPages/ClientPackagesPage";
import ProtectedRoute from "./common/ProtectedRoute";
import MyPackagesPage from "./clientPages/MyPackagesPage";
import PaymentHistoryPage from "./clientPages/PaymentHistoryPage";
import EditProfilePage from "./clientPages/EditProfilePage";
import EditInvoicePage from "./adminPages/EditInvoicePage";
import InvoiceDetailPage from "./adminPages/InvoiceDetailPage";

function App() {


  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <Routes>

        {/* Public Routes */}
        <Route path='/' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/access-denied' element={<AccessDeniedPage />} />

        {/* Admin Protected Routes */}
        <Route path='/dashboard' element={<ProtectedRoute element={HomePageOne} allowedRole="admin" />} />
        <Route path='/manage-clients' element={<ProtectedRoute element={ManageClients} allowedRole="admin" />} />
        <Route path='/manage-packages' element={<ProtectedRoute element={ManagePackages} allowedRole="admin" />} />
        <Route path='/add-client' element={<ProtectedRoute element={AddClientPage} allowedRole="admin" />} />
        <Route path='/add-package' element={<ProtectedRoute element={AddPackagePage} allowedRole="admin" />} />
        <Route path='/edit-package/:id' element={<ProtectedRoute element={EditPackagePage} allowedRole="admin" />} />
        <Route path='/edit-client/:id' element={<ProtectedRoute element={EditClientPage} allowedRole="admin" />} />
        <Route path='/edit-invoice/:id' element={<ProtectedRoute element={EditInvoicePage} allowedRole="admin" />} />
        <Route path='/manage-invoice' element={<ProtectedRoute element={ManageInvoices} allowedRole="admin" />} />
        <Route path='/create-invoice' element={<ProtectedRoute element={CreateInvoicePage} allowedRole="admin" />} />
        <Route path='/login-history' element={<ProtectedRoute element={LoginHistoryPage} allowedRole="admin" />} />
        <Route path='/invoice-detail' element={<ProtectedRoute element={InvoiceDetailPage} allowedRole="client" />} />

        {/* Client Protected Routes */}
        <Route path='/all-packages' element={<ProtectedRoute element={ClientPackagesPage} allowedRole="client" />} />
        <Route path='/my-packages' element={<ProtectedRoute element={MyPackagesPage} allowedRole="client" />} />
        <Route path='/payment-history' element={<ProtectedRoute element={PaymentHistoryPage} allowedRole="client" />} />
        <Route path='/edit-profile' element={<ProtectedRoute element={EditProfilePage} allowedRole="client" />} />

        {/* Fallback */}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
