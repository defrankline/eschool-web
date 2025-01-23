import React from 'react';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import {GradeLevel} from '../../api/gradeLevel';
import ActionsMenu from '../../components/ActionsMenu';

interface GradeLevelTableProps {
    gradeLevels: GradeLevel[];
    totalItems: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
    onEdit: (grade: GradeLevel) => void;
    onViewStreams: (grade: GradeLevel) => void;
}

const GradeLevelTable: React.FC<GradeLevelTableProps> = ({
                                                             gradeLevels,
                                                             totalItems,
                                                             page,
                                                             rowsPerPage,
                                                             onPageChange,
                                                             onRowsPerPageChange,
                                                             onEdit,
                                                             onViewStreams,
                                                         }) => (
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
                            <Button color="primary" onClick={() => onViewStreams(grade)}>
                                {grade.name}
                            </Button>
                        </TableCell>
                        <TableCell>
                            <ActionsMenu
                                entity={grade}
                                onEdit={onEdit}
                                onDelete={(entity) => console.log(`Delete Grade ${entity.id}`)}
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
            onPageChange={(_, newPage) => onPageChange(newPage)}
            onRowsPerPageChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))}
        />
    </TableContainer>
);

export default GradeLevelTable;
