import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';

interface SimpleTableProps<T> {
    data: T[];
    columns: Array<{ key: keyof T | string; label: string; render?: (row: T) => React.ReactNode }>;
}

const SimpleTable = <T, >({data, columns}: SimpleTableProps<T>) => (
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
    </TableContainer>
);

export default SimpleTable;
