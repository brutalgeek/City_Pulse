import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import MapView from "./pages/MapView";
import Dashboard from "./pages/Dashboard";
import IssueDetails from "./pages/IssueDetails";
import AboutUs from "./pages/AboutUs";
import Updates from "./pages/Updates";
import FAQ from "./pages/FAQ";
import HelpCenter from "./pages/HelpCenter";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import MapTest from "./pages/MapTest";
import AdminDemo from "./pages/AdminDemo";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              
              <Route path="/home" element={
                <ProtectedRoute>
                  <Layout><Home /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/report-issue" element={
                <ProtectedRoute>
                  <Layout><ReportIssue /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/map" element={
                <ProtectedRoute>
                  <Layout><MapView /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/map-test" element={<MapTest />} />
              <Route path="/admin-demo" element={
                <ProtectedRoute>
                  <Layout><AdminDemo /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout><Dashboard /></Layout>
                </ProtectedRoute>
              } />
              <Route path="*" element={
                <ProtectedRoute>
                  <Layout><NotFound /></Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;