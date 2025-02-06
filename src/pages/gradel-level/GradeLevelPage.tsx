import React, {useEffect, useState} from 'react';
import {Fab, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {deleteGradeLevel, getGradeLevels, GradeLevel} from '../../api/gradeLevel';
import {deleteStream, getStreams, Stream} from '../../api/stream';
import PaginatedTable from '../../components/PaginatedTable';
import GradeFormDialog from './GradeFormDialog';
import StreamsDialog from './StreamsDialog';
import StreamFormDialog from './StreamFormDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import CustomSearchTextField from '../../components/CustomSearchTextField';
import ActionsMenu from '../../components/ActionsMenu';

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
    const [showGradeDeleteDialog, setShowGradeDeleteDialog] = useState(false);
    const [showStreamDeleteDialog, setShowStreamDeleteDialog] = useState(false);

    // Load grade levels
    const loadGradeLevels = async () => {
        const response = await getGradeLevels(page, rowsPerPage, filter);
        setGradeLevels(response.data);
        setSelectedGrade(null);
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
            <CustomSearchTextField
                label="Search Grade Levels"
                value={filter}
                onSearchChange={(value) => setFilter(value)}
            />

            {/* Grade Levels Table */}
            <PaginatedTable
                data={gradeLevels}
                totalItems={totalItems}
                columns={[
                    {
                        key: 'name',
                        label: 'Name',
                        render: (grade: GradeLevel) => (
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={() => {
                                    setSelectedGrade(grade);
                                    loadStreams(grade.id);
                                    setShowStreamsDialog(true);
                                }}
                            >
                                {grade.name}
                            </button>
                        ),
                    },
                    {
                        key: 'actions',
                        label: 'Actions',
                        render: (grade: GradeLevel) => (
                            <ActionsMenu
                                entity={grade}
                                onEdit={(entity) => {
                                    setSelectedGrade(entity);
                                    setShowGradeForm(true);
                                }}
                                onDelete={(entity) => {
                                    setSelectedGrade(entity);
                                    setShowGradeDeleteDialog(true);
                                }}
                            />
                        ),
                    },
                ]}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={setPage}
                onRowsPerPageChange={setRowsPerPage}
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
                    setShowStreamDeleteDialog(true);
                }}
            />

            <StreamFormDialog
                open={showStreamForm}
                onClose={() => setShowStreamForm(false)}
                stream={selectedStream}
                gradeLevelId={selectedGrade?.id!}
                reloadStreams={() => selectedGrade && loadStreams(selectedGrade.id)}
            />

            {/* Delete Confirmation Dialog for Grade Levels */}
            <DeleteConfirmationDialog
                open={showGradeDeleteDialog}
                onClose={() => setShowGradeDeleteDialog(false)}
                onConfirm={async () => {
                    if (selectedGrade) {
                        await deleteGradeLevel(selectedGrade.id); // Call delete API for Grade Level
                        await loadGradeLevels(); // Reload grade levels after deletion
                        setShowGradeDeleteDialog(false);
                    }
                }}
                entityName={selectedGrade?.name || 'Grade Level'}
            />

            {/* Delete Confirmation Dialog for Streams */}
            <DeleteConfirmationDialog
                open={showStreamDeleteDialog}
                onClose={() => setShowStreamDeleteDialog(false)}
                onConfirm={async () => {
                    if (selectedStream) {
                        await deleteStream(selectedStream.id); // Call delete API for Stream
                        if (selectedGrade) await loadStreams(selectedGrade.id); // Reload streams after deletion
                        setShowStreamDeleteDialog(false);
                    }
                }}
                entityName={selectedStream?.name || 'Stream'}
            />
        </div>
    );
};

export default GradeLevelPage;
