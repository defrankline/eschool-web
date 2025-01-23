import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {createStream, Stream, updateStream} from '../../api/stream';

interface StreamFormDialogProps {
    open: boolean;
    onClose: () => void;
    stream: Stream | null;
    gradeLevelId: number; // The grade level ID is mandatory for saving streams
    reloadStreams: () => void;
}

const StreamFormDialog: React.FC<StreamFormDialogProps> = ({
                                                               open,
                                                               onClose,
                                                               stream,
                                                               gradeLevelId,
                                                               reloadStreams,
                                                           }) => {
    const formik = useFormik({
        enableReinitialize: true, // Ensures form values are updated when stream changes
        initialValues: {
            name: stream?.name || '', // Bind the stream name for editing
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Stream name is required'),
        }),
        onSubmit: async (values) => {
            const payload = {
                ...values,
                gradeLevelId, // Append the gradeLevelId
                ...(stream?.id && {id: stream.id}), // Include ID if editing
            };

            if (stream?.id) {
                // Update stream
                await updateStream(stream.id, payload as Stream);
            } else {
                // Create new stream
                await createStream(payload as Stream);
            }

            await reloadStreams(); // Reload the streams after success
            onClose(); // Close the dialog
        },
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{stream ? 'Edit Stream' : 'Add Stream'}</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <TextField
                        label="Stream Name"
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
                        {stream ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default StreamFormDialog;
