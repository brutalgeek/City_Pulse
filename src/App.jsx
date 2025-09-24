import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Layout
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/issue/:id" element={<IssueDetails />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;