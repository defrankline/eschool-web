import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import {GradeLevel} from '../../api/gradeLevel';
import {Stream} from '../../api/stream';
import ActionsMenu from '../../components/ActionsMenu';

interface StreamsDialogProps {
    open: boolean;
    onClose: () => void;
    grade: GradeLevel | null;
    streams: Stream[];
    onAddStream: () => void;
    onEditStream: (stream: Stream) => void;
    onDeleteStream: (stream: Stream) => void;
}

const StreamsDialog: React.FC<StreamsDialogProps> = ({
                                                         open,
                                                         onClose,
                                                         grade,
                                                         streams,
                                                         onAddStream,
                                                         onEditStream,
                                                         onDeleteStream,
                                                     }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>{`Streams for ${grade?.name}`}</DialogTitle>
        <DialogContent>
            <div className="flex items-center justify-between mb-4">
                <Typography variant="h6" className="text-gray-700">
                    Streams
                </Typography>
                <Button onClick={onAddStream} variant="contained" color="primary">
                    Add Stream
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {streams.map((stream) => (
                            <TableRow key={stream.id}>
                                <TableCell>{stream.name}</TableCell>
                                <TableCell>
                                    <ActionsMenu
                                        entity={stream}
                                        onEdit={onEditStream}
                                        onDelete={onDeleteStream}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
);

export default StreamsDialog;
