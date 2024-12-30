import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import AdminRoute from '@/components/shared/AdminRoute';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import { useAuth } from '@/hooks/useAuth';

// User Pages
import VPSPage from '@/pages/vps/VPSPage';
import GamesPage from '@/pages/games/GamesPage';
import WebHostingPage from '@/pages/web/WebHostingPage';

// Admin Pages
import AdminServersPage from '@/pages/admin/ServersPage';
import AdminUsersPage from '@/pages/admin/UsersPage';
import AdminTicketsPage from '@/pages/admin/TicketsPage';
import AdminPaymentPage from '@/pages/admin/PaymentPage';
import AdminVPSPage from '@/pages/admin/VPSPage';
import AdminGamesPage from '@/pages/admin/GamesPage';
import AdminWebPage from '@/pages/admin/WebPage';
import AdminSettingsPage from '@/pages/admin/SettingsPage';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Navigate to="/admin/servers" />} />
            <Route path="servers" element={<AdminServersPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="tickets" element={<AdminTicketsPage />} />
            <Route path="payment" element={<AdminPaymentPage />} />
            <Route path="vps" element={<AdminVPSPage />} />
            <Route path="games" element={<AdminGamesPage />} />
            <Route path="web" element={<AdminWebPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* User Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/vps" />} />
            <Route path="vps" element={<VPSPage />} />
            <Route path="games" element={<GamesPage />} />
            <Route path="web" element={<WebHostingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}