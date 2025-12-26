import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import AuthLayout from "../pages/auth/AuthLayout";
import Layout from "../layout/Layout";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Home from "../pages/home/Home";
import Cases from "../pages/cases/Cases";
import CaseDetails from "../pages/cases/CaseDetails";
import Clients from "../pages/clients/Clients";
import ClientDetails from "../pages/clients/ClientDetails";
import Documents from "../pages/Documents/Documents";
import LegalContracts from "../pages/legalContracts/LegalContracts";
import ContractDetails from "../pages/legalContracts/ContractDetails";
import CalendarPage from "../pages/calendar/CalendarPage";
import Chat from "../pages/chat/Chat";
import Settings from "../pages/settings/Settings";
import ProtectedRoute from "./ProtectedRoute";
import DocumentSelection from "../pages/cases/subPagesCases/analysis/DocumentSelection";
import DefenseMemoPage from "../pages/cases/subPagesCases/analysis/defenseMemoPage/DefenseMemoPage";


const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth" element={<AuthLayout />} >
                        <Route index element={<SignUp />} />
                        <Route path="sign-up" element={<SignUp />} />
                        <Route path="login" element={<Login />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/cases" element={<Cases />} />
                            <Route path="/cases/:id" element={<CaseDetails />} />
                            <Route path="/cases/:id/document-selection" element={<DocumentSelection />} />
                            <Route path="/cases/:id/document-selection/defense-memo" element={<DefenseMemoPage />} />

                            <Route path="/clients" element={<Clients />} />
                            <Route path="/clients/:id" element={<ClientDetails />} />

                            <Route path="/documents" element={<Documents />} />

                            <Route path="/legal-contracts" element={<LegalContracts />} />
                            <Route path="/legal-contracts/:id" element={<ContractDetails />} />

                            <Route path="/calendar" element={<CalendarPage />} />

                            <Route path="/chat" element={<Chat />} />

                            <Route path="/settings" element={<Settings />} />

                            <Route path="*" element={<h1>الصفحة غير موجودة</h1>} />
                        </Route>
                    </Route>

                    <Route path="/home" element={<App />} />

                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRouter;