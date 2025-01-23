import React from 'react';
import {AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography,} from '@mui/material';
import {Outlet, useNavigate} from 'react-router-dom';

const MainLayout: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // Menu for horizontal menus
    const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null); // Menu for profile
    const [submenu, setSubmenu] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, menu: string) => {
        setAnchorEl(event.currentTarget);
        setSubmenu(menu);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSubmenu(null);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <AppBar position="static" className="bg-blue-600">
                <Toolbar className="flex items-center justify-between">
                    {/* App Title */}
                    <Typography variant="h5" className="font-bold text-white">
                        School Management System
                    </Typography>

                    {/* Horizontal Menus */}
                    <Box className="flex items-center space-x-6">
                        <Button color="inherit" onClick={(e) => handleMenuClick(e, 'students')}>
                            Students
                        </Button>
                        <Button color="inherit" onClick={(e) => handleMenuClick(e, 'teachers')}>
                            Teachers
                        </Button>
                        <Button color="inherit" onClick={(e) => handleMenuClick(e, 'classes')}>
                            Classes
                        </Button>
                        <Button color="inherit" onClick={(e) => handleMenuClick(e, 'exams')}>
                            Exams
                        </Button>
                        <Button color="inherit" onClick={(e) => handleMenuClick(e, 'setup')}>
                            Setup
                        </Button>

                        {/* Profile Avatar */}
                        <IconButton onClick={handleProfileMenuOpen}>
                            <Avatar alt="User Profile" src="/path-to-profile-photo.jpg"/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Submenus */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                transformOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                {submenu === 'students' && (
                    <>
                        <MenuItem onClick={handleMenuClose}>View Students</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Add Student</MenuItem>
                    </>
                )}
                {submenu === 'teachers' && (
                    <>
                        <MenuItem onClick={handleMenuClose}>View Teachers</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Add Teacher</MenuItem>
                    </>
                )}
                {submenu === 'classes' && (
                    <>
                        <MenuItem onClick={handleMenuClose}>Class Schedule</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Assign Classes</MenuItem>
                    </>
                )}
                {submenu === 'exams' && (
                    <>
                        <MenuItem onClick={handleMenuClose}>Exam Schedule</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Results</MenuItem>
                    </>
                )}
                {submenu === 'setup' && (
                    <>
                        <MenuItem onClick={() => navigate('/dashboard/subjects')}>
                            Subjects
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/dashboard/departments')}>
                            Departments
                        </MenuItem>
                        <MenuItem onClick={() => navigate('/dashboard/academic-years')}>
                            Academic Years
                        </MenuItem>
                    </>
                )}
            </Menu>

            {/* Profile Menu */}
            <Menu
                anchorEl={profileAnchorEl}
                open={Boolean(profileAnchorEl)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

            {/* Main Content */}
            <main className="p-6">
                <Outlet/> {/* Renders the child routes */}
            </main>
        </div>
    );
};

export default MainLayout;
