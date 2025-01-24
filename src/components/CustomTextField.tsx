import React from 'react';
import {TextField, TextFieldProps} from '@mui/material';
import {useField} from 'formik';

interface CustomTextFieldProps extends TextFieldProps {
    name: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({name, ...props}) => {
    const [field, meta] = useField(name);

    return (
        <TextField
            {...field}
            {...props}
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            fullWidth
            margin="normal"
        />
    );
};

export default CustomTextField;
