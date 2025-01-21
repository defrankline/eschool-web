import React, {useEffect, useState} from 'react';
import {AcademicYear, deleteAcademicYear, getAcademicYears} from '../api/academicYear';

const AcademicYearList: React.FC = () => {
    const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);

    useEffect(() => {
        const fetchAcademicYears = async () => {
            const data = await getAcademicYears();
            setAcademicYears(data);
        };
        fetchAcademicYears();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this academic year?')) {
            await deleteAcademicYear(id);
            setAcademicYears((prev) => prev.filter((year) => year.id !== id));
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Academic Years</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Start Date</th>
                    <th className="border border-gray-300 px-4 py-2">End Date</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {academicYears.map((year) => (
                    <tr key={year.id}>
                        <td className="border border-gray-300 px-4 py-2">{year.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{year.startDate}</td>
                        <td className="border border-gray-300 px-4 py-2">{year.endDate}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button
                                onClick={() => handleDelete(year.id)}
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AcademicYearList;
