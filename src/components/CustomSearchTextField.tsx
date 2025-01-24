import React from 'react';
import {InputAdornment, TextField, TextFieldProps} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface CustomSearchTextFieldProps extends TextFieldProps {
    onSearchChange: (value: string) => void; // Callback for search input changes
}

const CustomSearchTextField: React.FC<CustomSearchTextFieldProps> = ({
                                                                         onSearchChange,
                                                                         ...props
                                                                     }) => {
    return (
        <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                ),
            }}
            onChange={(e) => onSearchChange(e.target.value)}
            {...props} // Pass additional props like label, value, etc.
        />
    );
};

export default CustomSearchTextField;
