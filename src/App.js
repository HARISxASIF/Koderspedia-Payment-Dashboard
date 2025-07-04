import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageOne from "./adminPages/HomePageOne";
// import HomePageTwo from "./pages/HomePageTwo";
// import HomePageThree from "./pages/HomePageThree";
// import HomePageFour from "./pages/HomePageFour";
// import HomePageFive from "./pages/HomePageFive";
// import HomePageSix from "./pages/HomePageSix";
// import HomePageSeven from "./pages/HomePageSeven";
// import HomePageEight from "./pages/HomePageEight";
// import HomePageNine from "./pages/HomePageNine";
// import HomePageTen from "./pages/HomePageTen";
// import HomePageEleven from "./pages/HomePageEleven";
import EmailPage from "./adminPages/EmailPage";
import AddUserPage from "./adminPages/AddUserPage";
import AlertPage from "./adminPages/AlertPage";
import AssignRolePage from "./adminPages/AssignRolePage";
import AvatarPage from "./adminPages/AvatarPage";
import BadgesPage from "./adminPages/BadgesPage";
import ButtonPage from "./adminPages/ButtonPage";
import CalendarMainPage from "./adminPages/CalendarMainPage";
import CardPage from "./adminPages/CardPage";
import CarouselPage from "./adminPages/CarouselPage";
import ChatEmptyPage from "./adminPages/ChatEmptyPage";
import ChatMessagePage from "./adminPages/ChatMessagePage";
import ChatProfilePage from "./adminPages/ChatProfilePage";
import CodeGeneratorNewPage from "./adminPages/CodeGeneratorNewPage";
import CodeGeneratorPage from "./adminPages/CodeGeneratorPage";
import ColorsPage from "./adminPages/ColorsPage";
import ColumnChartPage from "./adminPages/ColumnChartPage";
import CompanyPage from "./adminPages/CompanyPage";
import CurrenciesPage from "./adminPages/CurrenciesPage";
import DropdownPage from "./adminPages/DropdownPage";
import ErrorPage from "./adminPages/ErrorPage";
import FaqPage from "./adminPages/FaqPage";
import ForgotPasswordPage from "./adminPages/ForgotPasswordPage";
import FormLayoutPage from "./adminPages/FormLayoutPage";
import FormValidationPage from "./adminPages/FormValidationPage";
import FormPage from "./adminPages/FormPage";
import GalleryPage from "./adminPages/GalleryPage";
import ImageGeneratorPage from "./adminPages/ImageGeneratorPage";
import ImageUploadPage from "./adminPages/ImageUploadPage";
import InvoiceAddPage from "./adminPages/InvoiceAddPage";
import InvoiceEditPage from "./adminPages/InvoiceEditPage";
import InvoiceListPage from "./adminPages/InvoiceListPage";
import InvoicePreviewPage from "./adminPages/InvoicePreviewPage";
import KanbanPage from "./adminPages/KanbanPage";
import LanguagePage from "./adminPages/LanguagePage";
import LineChartPage from "./adminPages/LineChartPage";
import ListPage from "./adminPages/ListPage";
import MarketplaceDetailsPage from "./adminPages/MarketplaceDetailsPage";
import MarketplacePage from "./adminPages/MarketplacePage";
import NotificationAlertPage from "./adminPages/NotificationAlertPage";
import NotificationPage from "./adminPages/NotificationPage";
import PaginationPage from "./adminPages/PaginationPage";
import PaymentGatewayPage from "./adminPages/PaymentGatewayPage";
import PieChartPage from "./adminPages/PieChartPage";
import PortfolioPage from "./adminPages/PortfolioPage";
import PricingPage from "./adminPages/PricingPage";
import ProgressPage from "./adminPages/ProgressPage";
import RadioPage from "./adminPages/RadioPage";
import RoleAccessPage from "./adminPages/RoleAccessPage";
import SignInPage from "./adminPages/SignInPage";
import SignUpPage from "./adminPages/SignUpPage";
import StarRatingPage from "./adminPages/StarRatingPage";
import StarredPage from "./adminPages/StarredPage";
import SwitchPage from "./adminPages/SwitchPage";
import TableBasicPage from "./adminPages/TableBasicPage";
import TableDataPage from "./adminPages/TableDataPage";
import TabsPage from "./adminPages/TabsPage";
import TagsPage from "./adminPages/TagsPage";
import TermsConditionPage from "./adminPages/TermsConditionPage";
import TextGeneratorPage from "./adminPages/TextGeneratorPage";
import ThemePage from "./adminPages/ThemePage";
import TooltipPage from "./adminPages/TooltipPage";
import TypographyPage from "./adminPages/TypographyPage";
import UsersGridPage from "./adminPages/UsersGridPage";
import UsersListPage from "./adminPages/UsersListPage";
import ViewDetailsPage from "./adminPages/ViewDetailsPage";
import VideoGeneratorPage from "./adminPages/VideoGeneratorPage";
import VideosPage from "./adminPages/VideosPage";
import ViewProfilePage from "./adminPages/ViewProfilePage";
import VoiceGeneratorPage from "./adminPages/VoiceGeneratorPage";
import WalletPage from "./adminPages/WalletPage";
import WidgetsPage from "./adminPages/WidgetsPage";
import WizardPage from "./adminPages/WizardPage";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import TextGeneratorNewPage from "./adminPages/TextGeneratorNewPage";
import GalleryGridPage from "./adminPages/GalleryGridPage";
import GalleryMasonryPage from "./adminPages/GalleryMasonryPage";
import GalleryHoverPage from "./adminPages/GalleryHoverPage";
import BlogPage from "./adminPages/BlogPage";
import BlogDetailsPage from "./adminPages/BlogDetailsPage";
import AddBlogPage from "./adminPages/AddBlogPage";
import TestimonialsPage from "./adminPages/TestimonialsPage";
import ComingSoonPage from "./adminPages/ComingSoonPage";
import AccessDeniedPage from "./adminPages/AccessDeniedPage";
import MaintenancePage from "./adminPages/MaintenancePage";
import BlankPagePage from "./adminPages/BlankPagePage";
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
import ProtectedRoute from "./components/ProtectedRoute";
import MyPackagesPage from "./components/MyPackagesPage";
import PaymentHistoryPage from "./components/PaymentHistoryPage";
import EditProfilePage from "./clientPages/EditProfilePage";

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
        <Route path='/edit-package' element={<ProtectedRoute element={EditPackagePage} allowedRole="admin" />} />
        <Route path='/edit-client' element={<ProtectedRoute element={EditClientPage} allowedRole="admin" />} />
        <Route path='/manage-invoice' element={<ProtectedRoute element={ManageInvoices} allowedRole="admin" />} />
        <Route path='/create-invoice' element={<ProtectedRoute element={CreateInvoicePage} allowedRole="admin" />} />
        <Route path='/login-history' element={<ProtectedRoute element={LoginHistoryPage} allowedRole="admin" />} />

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
