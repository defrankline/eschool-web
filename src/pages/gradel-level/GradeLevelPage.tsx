import React, {useEffect, useState} from 'react';
import {Fab, InputAdornment, TextField, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {getGradeLevels, GradeLevel} from '../../api/gradeLevel';
import {deleteStream, getStreams, Stream} from '../../api/stream';
import GradeLevelTable from './GradeLevelTable';
import StreamsDialog from './StreamsDialog';
import GradeFormDialog from './GradeFormDialog';
import StreamFormDialog from './StreamFormDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

const GradeLevelPage: React.FC = () => {
    const [gradeLevels, setGradeLevels] = useState<GradeLevel[]>([]);
    const [streams, setStreams] = useState<Stream[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState('');
    const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
    const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
    const [showGradeForm, setShowGradeForm] = useState(false);
    const [showStreamsDialog, setShowStreamsDialog] = useState(false);
    const [showStreamForm, setShowStreamForm] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Load grade levels
    const loadGradeLevels = async () => {
        const response = await getGradeLevels(page, rowsPerPage, filter);
        setGradeLevels(response.data);
        setTotalItems(response.totalItems);
    };

    // Load streams for a grade level
    const loadStreams = async (gradeLevelId: number) => {
        const response = await getStreams(gradeLevelId);
        setStreams(response.data);
    };

    useEffect(() => {
        loadGradeLevels();
    }, [page, rowsPerPage, filter]);

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <Typography variant="h5" component="h1" className="text-gray-400">
                    Grade Levels
                </Typography>
                <Fab color="primary" onClick={() => setShowGradeForm(true)}>
                    <AddIcon/>
                </Fab>
            </div>

            {/* Search Field */}
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

            {/* Grade Levels Table */}
            <GradeLevelTable
                gradeLevels={gradeLevels}
                totalItems={totalItems}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={setPage}
                onRowsPerPageChange={setRowsPerPage}
                onEdit={(grade) => {
                    setSelectedGrade(grade);
                    setShowGradeForm(true);
                }}
                onViewStreams={(grade) => {
                    setSelectedGrade(grade);
                    loadStreams(grade.id);
                    setShowStreamsDialog(true);
                }}
            />

            {/* Modals */}
            <GradeFormDialog
                open={showGradeForm}
                onClose={() => setShowGradeForm(false)}
                selectedGrade={selectedGrade}
                reloadGradeLevels={loadGradeLevels}
            />

            <StreamsDialog
                open={showStreamsDialog}
                onClose={() => setShowStreamsDialog(false)}
                grade={selectedGrade}
                streams={streams}
                onAddStream={() => setShowStreamForm(true)}
                onEditStream={(stream) => {
                    setSelectedStream(stream);
                    setShowStreamForm(true);
                }}
                onDeleteStream={(stream) => {
                    setSelectedStream(stream);
                    setShowDeleteDialog(true);
                }}
            />

            <StreamFormDialog
                open={showStreamForm}
                onClose={() => setShowStreamForm(false)}
                stream={selectedStream}
                gradeLevelId={selectedGrade?.id!}
                reloadStreams={() => selectedGrade && loadStreams(selectedGrade.id)}
            />

            <DeleteConfirmationDialog
                open={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={async () => {
                    if (selectedStream) {
                        await deleteStream(selectedStream.id);
                        if (selectedGrade) await loadStreams(selectedGrade.id);
                        setShowDeleteDialog(false);
                    }
                }}
                entityName={selectedStream?.name || 'Stream'}
            />
        </div>
    );
};

export default GradeLevelPage;
