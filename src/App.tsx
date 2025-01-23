import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AcademicYearPage from './pages/AcademicYearPage.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import DepartmentPage from "./pages/DepartmentPage.tsx";
import SubjectPage from "./pages/SubjectPage.tsx";
import GradeLevelPage from "./pages/gradel-level/GradeLevelPage.tsx";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <MainLayout/>
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<DashboardPage/>}/>
                        <Route path="academic-years" element={<AcademicYearPage/>}/>
                        <Route path="departments" element={<DepartmentPage/>}/>
                        <Route path="subjects" element={<SubjectPage/>}/>
                        <Route path="grade-levels" element={<GradeLevelPage/>}/>
                    </Route>

                    {/* Fallback Route */}
                    <Route path="*" element={<Navigate to="/login"/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
