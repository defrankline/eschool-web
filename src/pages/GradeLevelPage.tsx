import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {createGradeLevel, getGradeLevels, GradeLevel, updateGradeLevel,} from '../api/gradeLevel';
import {createStream, deleteStream, getStreams, Stream, updateStream,} from '../api/stream';
import ActionsMenu from '../components/ActionsMenu';

const GradeLevelPage: React.FC = () => {
    const [gradeLevels, setGradeLevels] = useState<GradeLevel[]>([]);
    const [streams, setStreams] = useState<Stream[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState('');
    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [openStreamsDialog, setOpenStreamsDialog] = useState(false);
    const [openStreamFormDialog, setOpenStreamFormDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedGradeName, setSelectedGradeName] = useState<string | null>(null);
    const [selectedStream, setSelectedStream] = useState<Stream | null>(null);

    // Load Grade Levels
    const loadGradeLevels = async () => {
        const response = await getGradeLevels(page, rowsPerPage, filter);
        setGradeLevels(response.data);
        setTotalItems(response.totalItems);
    };

    // Load Streams for Selected Grade Level
    const loadStreams = async (gradeLevelId: number) => {
        const response = await getStreams(gradeLevelId);
        setStreams(response.data);
    };

    useEffect(() => {
        const fetchGradeLevels = async () => {
            await loadGradeLevels();
        };
        fetchGradeLevels();
    }, [page, rowsPerPage, filter]);

    // Open Streams Dialog
    const handleOpenStreamsDialog = async (grade: GradeLevel) => {
        setSelectedId(grade.id);
        setSelectedGradeName(grade.name);
        await loadStreams(grade.id);
        setOpenStreamsDialog(true);
    };

    // Close Streams Dialog
    const handleCloseStreamsDialog = () => {
        setOpenStreamsDialog(false);
        setSelectedId(null);
        setSelectedGradeName(null);
        setSelectedStream(null);
    };

    // Open Grade Form Dialog
    const handleOpenFormDialog = (grade: GradeLevel | null = null) => {
        if (grade) {
            setSelectedId(grade.id);
            gradeFormik.setValues({name: grade.name});
        } else {
            setSelectedId(null);
            gradeFormik.resetForm();
        }
        setOpenFormDialog(true);
    };

    // Close Grade Form Dialog
    const handleCloseFormDialog = () => {
        setOpenFormDialog(false);
        gradeFormik.resetForm();
        setSelectedId(null);
    };

    // Open Stream Form Dialog
    const handleOpenStreamForm = (stream: Stream | null = null) => {
        setSelectedStream(stream);
        streamFormik.setValues(
            stream
                ? {name: stream.name, gradeLevelId: stream.gradeLevelId}
                : {name: '', gradeLevelId: selectedId!}
        );
        setOpenStreamFormDialog(true);
    };

    // Close Stream Form Dialog
    const handleCloseStreamForm = () => {
        setSelectedStream(null);
        streamFormik.resetForm();
        setOpenStreamFormDialog(false);
    };

    // Formik for Grade Levels
    const gradeFormik = useFormik({
        initialValues: {name: ''},
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
        }),
        onSubmit: async (values) => {
            const payload = {...values, ...(selectedId && {id: selectedId})} as GradeLevel;
            if (selectedId) {
                await updateGradeLevel(selectedId, payload);
            } else {
                await createGradeLevel(payload);
            }
            await loadGradeLevels();
            handleCloseFormDialog();
        },
    });

    // Formik for Streams
    const streamFormik = useFormik({
        initialValues: {name: '', gradeLevelId: 0},
        validationSchema: Yup.object({
            name: Yup.string().required('Stream name is required'),
        }),
        onSubmit: async (values) => {
            const payload = {...values, ...(selectedStream && {id: selectedStream.id})} as Stream;
            if (selectedStream) {
                await updateStream(payload.id, payload);
            } else {
                await createStream(payload);
            }
            if (selectedId) await loadStreams(selectedId);
            handleCloseStreamForm();
        },
    });

    return (
        <div className="p-4">
            {/* Grade Levels */}
            <div className="flex items-center justify-between mb-4">
                <Typography variant="h5" component="h1" className="text-gray-400">
                    Grade Levels
                </Typography>
                <Fab color="primary" aria-label="add" onClick={() => handleOpenFormDialog()}>
                    <AddIcon/>
                </Fab>
            </div>
            <TextField
                label="Search Grade Levels"
                variant="outlined"
                fullWidth
                margin="normal"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
            />
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gradeLevels.map((grade) => (
                            <TableRow key={grade.id}>
                                <TableCell>
                                    <Button onClick={() => handleOpenStreamsDialog(grade)} color="primary">
                                        {grade.name}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <ActionsMenu
                                        entity={grade}
                                        onEdit={(entity) => handleOpenFormDialog(entity)}
                                        onDelete={(entity) => console.log(`Delete ${entity.id}`)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={totalItems}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(_event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />
            </TableContainer>

            {/* Streams Dialog */}
            <Dialog open={openStreamsDialog} onClose={handleCloseStreamsDialog} fullWidth maxWidth="md">
                <DialogTitle>{`Streams for ${selectedGradeName}`}</DialogTitle>
                <DialogContent>
                    <div className="flex justify-between items-center mb-4">
                        <Typography variant="h6">Streams</Typography>
                        <Button onClick={() => handleOpenStreamForm(null)} variant="contained" color="primary">
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
                                                onEdit={(entity) => handleOpenStreamForm(entity)}
                                                onDelete={(entity) => {
                                                    deleteStream(entity.id);
                                                    loadStreams(selectedId!);
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseStreamsDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add/Edit Stream Dialog */}
            <Dialog open={openStreamFormDialog} onClose={handleCloseStreamForm} fullWidth maxWidth="sm">
                <DialogTitle>{selectedStream ? 'Edit Stream' : 'Add Stream'}</DialogTitle>
                <form onSubmit={streamFormik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            label="Stream Name"
                            fullWidth
                            margin="normal"
                            name="name"
                            value={streamFormik.values.name}
                            onChange={streamFormik.handleChange}
                            onBlur={streamFormik.handleBlur}
                            error={streamFormik.touched.name && Boolean(streamFormik.errors.name)}
                            helperText={streamFormik.touched.name && streamFormik.errors.name}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseStreamForm} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            {selectedStream ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Add/Edit Grade Dialog */}
            <Dialog open={openFormDialog} onClose={handleCloseFormDialog} fullWidth maxWidth="sm">
                <DialogTitle>{selectedId ? 'Edit Grade Level' : 'Add Grade Level'}</DialogTitle>
                <form onSubmit={gradeFormik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            label="Grade Name"
                            fullWidth
                            margin="normal"
                            name="name"
                            value={gradeFormik.values.name}
                            onChange={gradeFormik.handleChange}
                            onBlur={gradeFormik.handleBlur}
                            error={gradeFormik.touched.name && Boolean(gradeFormik.errors.name)}
                            helperText={gradeFormik.touched.name && gradeFormik.errors.name}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseFormDialog} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            {selectedId ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default GradeLevelPage;
