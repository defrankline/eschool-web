import React, {useEffect, useState} from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormControl,
    FormControlLabel,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Switch,
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
import {
    AcademicYear,
    createAcademicYear,
    deleteAcademicYear,
    getAcademicYears,
    updateAcademicYear,
} from '../api/academicYear';
import SearchIcon from '@mui/icons-material/Search';
import ActionsMenu from "../components/ActionsMenu.tsx";

const AcademicYearList: React.FC = () => {
    const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [previousYears, setPreviousYears] = useState<AcademicYear[]>([]);
    const [toggleDialogOpen, setToggleDialogOpen] = useState(false);
    const [toggleData, setToggleData] = useState<{ id: number; field: 'current' | 'closed'; value: boolean } | null>(
        null
    );

    const loadFinancialYears = async () => {
        const response = await getAcademicYears(page, rowsPerPage, filter);
        setAcademicYears(response.data);
        setTotalItems(response.totalItems);
    };

    const fetchPreviousYears = async () => {
        const response = await getAcademicYears(0, 100, ''); // Fetch all previous years
        setPreviousYears(response.data);
    };

    useEffect(() => {
        const fetchAcademicYears = async () => {
            await loadFinancialYears();
            await fetchPreviousYears();
        };
        fetchAcademicYears();
    }, [page, rowsPerPage, filter]);

    const handleOpenDeleteDialog = (year: AcademicYear) => {
        setSelectedId(year.id);
        setOpenDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDialog(false);
        setSelectedId(null);
    };

    const handleDeleteConfirm = async () => {
        if (selectedId !== null) {
            await deleteAcademicYear(selectedId);
            setAcademicYears((prev) => prev.filter((year) => year.id !== selectedId));
            handleCloseDeleteDialog();
        }
    };

    const handleOpenFormDialog = (year: AcademicYear | null = null) => {
        if (year) {
            setSelectedId(year.id);
            formik.setValues({
                name: year.name,
                startDate: year.startDate,
                endDate: year.endDate,
                current: year.current,
                closed: year.closed,
                previousYearId: year.previousYearId,
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
            startDate: '',
            endDate: '',
            current: false,
            closed: false,
            previousYearId: 0,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            startDate: Yup.date().required('Start date is required'),
            endDate: Yup.date()
                .required('End date is required')
                .min(Yup.ref('startDate'), 'End date cannot be before start date')
        }),
        onSubmit: async (values) => {
            const payload = {...values, ...(selectedId && {id: selectedId})} as AcademicYear;
            if (selectedId) {
                await updateAcademicYear(selectedId, payload);
            } else {
                await createAcademicYear(payload);
            }
            await loadFinancialYears();

            handleCloseFormDialog();
        },
    });

    // Open dialog to confirm toggle action
    const handleOpenToggleDialog = (id: number, field: 'current' | 'closed', value: boolean) => {
        setToggleData({id, field, value});
        setToggleDialogOpen(true);
    };

    // Close the dialog
    const handleCloseToggleDialog = () => {
        setToggleDialogOpen(false);
        setToggleData(null);
    };

    // Confirm toggle and update the state
    const handleConfirmToggle = async () => {
        if (toggleData) {
            const {id, field, value} = toggleData;

            // Update the local state
            const updatedYears = academicYears.map((year) =>
                year.id === id ? {...year, [field]: value} : year
            );
            setAcademicYears(updatedYears);

            // Update the backend
            const yearToUpdate = updatedYears.find((year) => year.id === id);
            if (yearToUpdate) {
                await updateAcademicYear(id, yearToUpdate);
            }

            handleCloseToggleDialog();
        }
    };


    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <Typography variant="h5" component="h1" className="text-gray-400">
                    Academic Years
                </Typography>
                <Fab color="primary" aria-label="add" onClick={() => handleOpenFormDialog()}>
                    <AddIcon/>
                </Fab>
            </div>
            <TextField
                label="Search Academic Years"
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
                            <TableCell><strong>Start Date</strong></TableCell>
                            <TableCell><strong>End Date</strong></TableCell>
                            <TableCell><strong>Current</strong></TableCell>
                            <TableCell><strong>Closed</strong></TableCell>
                            <TableCell><strong>Previous</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {academicYears.map((year) => (
                            <TableRow key={year.id}>
                                <TableCell>{year.name}</TableCell>
                                <TableCell>{year.startDate}</TableCell>
                                <TableCell>{year.endDate}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={year.current}
                                        onChange={() => handleOpenToggleDialog(year.id, 'current', !year.current)}
                                        color="primary"
                                        inputProps={{'aria-label': 'Toggle Current Year'}}
                                    />
                                </TableCell>

                                {/* TableCell for Closed */}
                                <TableCell>
                                    <Switch
                                        checked={year.closed}
                                        onChange={() => handleOpenToggleDialog(year.id, 'closed', !year.closed)}
                                        color="secondary"
                                        inputProps={{'aria-label': 'Toggle Closed Year'}}
                                    />
                                </TableCell>
                                <TableCell>{year.previous?.name}</TableCell>
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

            {/* Confirmation Dialog */}
            <Dialog open={toggleDialogOpen} onClose={handleCloseToggleDialog}>
                <DialogTitle>Confirm Toggle</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to set this academic year as{' '}
                        <strong>{toggleData?.field === 'current' ? (toggleData?.value ? 'Current' : 'Not Current') : toggleData?.value ? 'Closed' : 'Open'}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseToggleDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmToggle} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this academic year?</Typography>
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
                <DialogTitle>{selectedId ? 'Edit Academic Year' : 'Add Academic Year'}</DialogTitle>
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
                            label="Start Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            name="startDate"
                            value={formik.values.startDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                            helperText={formik.touched.startDate && formik.errors.startDate}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            label="End Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            name="endDate"
                            value={formik.values.endDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                            helperText={formik.touched.endDate && formik.errors.endDate}
                            InputLabelProps={{shrink: true}}

                        />
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Previous Financial Year</InputLabel>
                            <Select
                                name="previousYearId"
                                value={formik.values.previousYearId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.previousYearId && Boolean(formik.errors.previousYearId)}
                                label="Previous Financial Year" // Bind the label text here
                            >
                                {previousYears.map((year) => (
                                    <MenuItem key={year.id} value={year.id}>
                                        {year.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.previousYearId && formik.errors.previousYearId && (
                                <Typography color="error" variant="caption">
                                    {formik.errors.previousYearId}
                                </Typography>
                            )}
                        </FormControl>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="current"
                                    checked={formik.values.current}
                                    onChange={formik.handleChange}
                                />
                            }
                            label="Current Academic Year"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="closed"
                                    checked={formik.values.closed}
                                    onChange={formik.handleChange}
                                />
                            }
                            label="Closed Academic Year"
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

export default AcademicYearList;
