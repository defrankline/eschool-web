import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,} from '@mui/material';

interface PaginatedTableProps<T> {
    data: T[];
    totalItems: number;
    columns: Array<{ key: keyof T | string; label: string; render?: (row: T) => React.ReactNode }>;
    page: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
}

const PaginatedTable = <T, >({
                                 data,
                                 totalItems,
                                 columns,
                                 page,
                                 rowsPerPage,
                                 onPageChange,
                                 onRowsPerPageChange,
                             }: PaginatedTableProps<T>) => (
    <TableContainer component={Paper}>
        <Table size="small">
            <TableHead>
                <TableRow>
                    {columns.map((col, index) => (
                        <TableCell key={index}>
                            <strong>{col.label}</strong>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <TableCell key={colIndex}>
                                {col.render ? col.render(row) : (row[col.key as keyof T] as React.ReactNode)}
                            </TableCell>
                        ))}
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

export default PaginatedTable;
