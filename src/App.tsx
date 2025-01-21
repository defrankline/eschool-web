import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AcademicYearList from './pages/AcademicYearList';
import AcademicYearForm from './pages/AcademicYearForm';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage/>}/>

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <MainLayout/>
                            </ProtectedRoute>
                        }
                    >
                        {/* Child Routes under MainLayout */}
                        <Route index element={<DashboardPage/>}/>
                        <Route path="academic-years" element={<AcademicYearList/>}/>
                        <Route path="academic-years/new" element={<AcademicYearForm
                            onSuccess={() => window.location.href = '/dashboard/academic-years'}/>}/>
                        <Route path="academic-years/:id/edit" element={<AcademicYearForm
                            onSuccess={() => window.location.href = '/dashboard/academic-years'}/>}/>
                    </Route>

                    {/* Fallback Route */}
                    <Route path="*" element={<Navigate to="/login"/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
