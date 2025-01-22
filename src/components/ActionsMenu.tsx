import React, {useState} from 'react';
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem,} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {AcademicYear} from "../api/academicYear.ts";

const ActionsMenu: React.FC<{
    year: AcademicYear;
    onEdit: (year: AcademicYear) => void;
    onDelete: (id: number) => void
}> = ({
          year,
          onEdit,
          onDelete,
      }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {/* Trigger Icon */}
            <IconButton onClick={handleOpenMenu}>
                <MoreVertIcon/>
            </IconButton>

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {/* Edit Option */}
                <MenuItem
                    onClick={() => {
                        onEdit(year);
                        handleCloseMenu();
                    }}
                >
                    <ListItemIcon>
                        <EditIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>

                {/* Delete Option */}
                <MenuItem color={'warn'}
                          onClick={() => {
                              onDelete(year.id);
                              handleCloseMenu();
                          }}
                >
                    <ListItemIcon>
                        <DeleteIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default ActionsMenu;
