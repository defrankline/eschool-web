import React, {useEffect} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {createGradeLevel, GradeLevel, updateGradeLevel} from '../../api/gradeLevel';

interface GradeFormDialogProps {
    open: boolean;
    onClose: () => void;
    selectedGrade: GradeLevel | null;
    reloadGradeLevels: () => void;
}

const GradeFormDialog: React.FC<GradeFormDialogProps> = ({
                                                             open,
                                                             onClose,
                                                             selectedGrade,
                                                             reloadGradeLevels,
                                                         }) => {
    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Grade name is required'),
        }),
        onSubmit: async (values) => {
            try {
                if (selectedGrade?.id) {
                    // Update grade level
                    await updateGradeLevel(selectedGrade.id, {...values, id: selectedGrade.id});
                } else {
                    // Create grade level
                    await createGradeLevel(values as GradeLevel);
                }
                await reloadGradeLevels(); // Reload grade levels after success
                onClose(); // Close the dialog
            } catch (error) {
                console.error('Error saving grade level:', error);
            }
        },
    });

    // Update form values when `selectedGrade` changes
    useEffect(() => {
        if (selectedGrade) {
            formik.setValues({name: selectedGrade.name});
        } else {
            formik.resetForm();
        }
    }, [selectedGrade]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{selectedGrade ? 'Edit Grade Level' : 'Add Grade Level'}</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <TextField
                        label="Grade Name"
                        fullWidth
                        margin="normal"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        {selectedGrade ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default GradeFormDialog;
