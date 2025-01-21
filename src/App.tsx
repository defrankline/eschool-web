import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import AcademicYearList from './pages/AcademicYearList';
import AcademicYearForm from './pages/AcademicYearForm';

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
                                <DashboardPage/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/dashboard/academic-years"
                        element={
                            <ProtectedRoute>
                                <AcademicYearList/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard/academic-years/new"
                        element={
                            <ProtectedRoute>
                                <AcademicYearForm onSuccess={() => window.location.href = '/dashboard/academic-years'}/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard/academic-years/:id/edit"
                        element={
                            <ProtectedRoute>
                                <AcademicYearForm onSuccess={() => window.location.href = '/dashboard/academic-years'}/>
                            </ProtectedRoute>
                        }
                    />

                    {/* Fallback Route */}
                    <Route path="*" element={<Navigate to="/login"/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
