import React, {useState} from 'react';
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface EntityWithId {
    id: number | string; // Define that entities must have an `id`
}

interface ActionsMenuProps<T extends EntityWithId> {
    entity: T; // Generic entity
    onEdit: (entity: T) => void; // Edit callback with the full entity
    onDelete: (entity: T) => void; // Delete callback with the entity ID
}

const ActionsMenu = <T extends EntityWithId>({
                                                 entity,
                                                 onEdit,
                                                 onDelete,
                                             }: ActionsMenuProps<T>): JSX.Element => {
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
                        onEdit(entity);
                        handleCloseMenu();
                    }}
                >
                    <ListItemIcon>
                        <EditIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>

                {/* Delete Option */}
                <MenuItem
                    onClick={() => {
                        onDelete(entity);
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
