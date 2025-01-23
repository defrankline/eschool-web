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
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {createSubject, deleteSubject, getSubjects, Subject, updateSubject,} from '../api/subject';
import SearchIcon from '@mui/icons-material/Search';
import ActionsMenu from "../components/ActionsMenu.tsx";

const SubjectPage: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const loadSubjects = async () => {
        const response = await getSubjects(page, rowsPerPage, filter);
        setSubjects(response.data);
        setTotalItems(response.totalItems);
    };

    useEffect(() => {
        const fetchSubjects = async () => {
            await loadSubjects();
        };
        fetchSubjects();
    }, [page, rowsPerPage, filter]);

    const handleOpenDeleteDialog = (year: Subject) => {
        setSelectedId(year.id);
        setOpenDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDialog(false);
        setSelectedId(null);
    };

    const handleDeleteConfirm = async () => {
        if (selectedId !== null) {
            await deleteSubject(selectedId);
            setSubjects((prev) => prev.filter((year) => year.id !== selectedId));
            handleCloseDeleteDialog();
        }
    };

    const handleOpenFormDialog = (year: Subject | null = null) => {
        if (year) {
            setSelectedId(year.id);
            formik.setValues({
                name: year.name,
                shortName: year.shortName,
            });
        } else {
            setSelectedId(null);
            formik.resetForm();
        }
        setOpenFormDialog(true);
    };

    const handleCloseFormDialog = () => {
        setOpenFormDialog(false);
        formik.resetForm();
        setSelectedId(null);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            shortName: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            shortName: Yup.string().required('Short Name is required'),
        }),
        onSubmit: async (values) => {
            const payload = {...values, ...(selectedId && {id: selectedId})} as Subject;
            if (selectedId) {
                await updateSubject(selectedId, payload);
            } else {
                await createSubject(payload);
            }
            await loadSubjects();

            handleCloseFormDialog();
        },
    });


    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <Typography variant="h5" component="h1" className="text-gray-400">
                    Subjects
                </Typography>
                <Fab color="primary" aria-label="add" onClick={() => handleOpenFormDialog()}>
                    <AddIcon/>
                </Fab>
            </div>
            <TextField
                label="Search Subjects"
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
                            <TableCell><strong>Short Name</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subjects.map((year: Subject) => (
                            <TableRow key={year.id}>
                                <TableCell>{year.name}</TableCell>
                                <TableCell>{year.shortName}</TableCell>
                                <TableCell>
                                    <ActionsMenu
                                        entity={year}
                                        onEdit={(entity) => handleOpenFormDialog(entity)}
                                        onDelete={(entity) => handleOpenDeleteDialog(entity)}
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
                    showFirstButton={true}
                    showLastButton={true}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(_event, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />
            </TableContainer>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this subject?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add/Edit Form Dialog */}
            <Dialog open={openFormDialog} onClose={handleCloseFormDialog} fullWidth maxWidth="sm">
                <DialogTitle>{selectedId ? 'Edit Subject' : 'Add Subject'}</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            label="Short Name"
                            fullWidth
                            margin="normal"
                            name="shortName"
                            value={formik.values.shortName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.shortName && Boolean(formik.errors.shortName)}
                            helperText={formik.touched.shortName && formik.errors.shortName}
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

export default SubjectPage;
