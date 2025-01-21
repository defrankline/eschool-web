import React from 'react';
import {AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import {Outlet, useNavigate} from 'react-router-dom';

const MainLayout: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

    const handleSubmenuClick = (path: string) => {
        navigate(path);
        handleMenuClose();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <AppBar position="static" className="bg-blue-600">
                <Toolbar className="flex items-center justify-between">
                    <Typography variant="h6" className="font-bold">
                        School Management System
                    </Typography>

                    {/* Horizontal Menus */}
                    <Box className="flex space-x-6">
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
                        <MenuItem onClick={() => handleSubmenuClick('/dashboard/academic-years')}>
                            Academic Years
                        </MenuItem>
                    </>
                )}
            </Menu>

            {/* Main Content */}
            <main className="p-6">
                <Outlet/> {/* Renders the child routes */}
            </main>
        </div>
    );
};

export default MainLayout;
