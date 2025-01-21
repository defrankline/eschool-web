import React, {useState} from 'react';
import {AcademicYear, createAcademicYear, updateAcademicYear} from '../api/academicYear';

interface AcademicYearFormProps {
    initialData?: AcademicYear; // Pass initial data for editing
    onSuccess: () => void; // Callback after successful submission
}

const AcademicYearForm: React.FC<AcademicYearFormProps> = ({initialData, onSuccess}) => {
    const [name, setName] = useState(initialData?.name || '');
    const [startDate, setStartDate] = useState(initialData?.startDate || '');
    const [endDate, setEndDate] = useState(initialData?.endDate || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const academicYearData = {name, startDate, endDate};

        try {
            if (initialData) {
                await updateAcademicYear(initialData.id, academicYearData);
            } else {
                await createAcademicYear(academicYearData);
            }
            onSuccess(); // Call the callback after success
        } catch (error) {
            console.error('Failed to save academic year', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                {initialData ? 'Edit Academic Year' : 'Add Academic Year'}
            </h1>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-medium">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                {initialData ? 'Update' : 'Add'}
            </button>
        </form>
    );
};

export default AcademicYearForm;
