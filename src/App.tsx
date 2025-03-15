import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard.tsx';
import { SalesAnalytics } from './pages/SalesAnalytics.tsx';
import { Inventory } from './pages/Inventory.tsx';
import { Employees } from './pages/Employees.tsx';
import { RecentSales } from './pages/RecentSales.tsx';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<SalesAnalytics />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="employees" element={<Employees />} />
            <Route path="sales" element={<RecentSales />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;