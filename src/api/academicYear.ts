import axiosInstance from './axiosInstance';

export interface AcademicYear {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
}

export const getAcademicYears = async (): Promise<AcademicYear[]> => {
    const response = await axiosInstance.get('/academic-years');
    return response.data;
};

export const createAcademicYear = async (academicYear: Omit<AcademicYear, 'id'>): Promise<AcademicYear> => {
    const response = await axiosInstance.post('/academic-years', academicYear);
    return response.data;
};

export const updateAcademicYear = async (id: number, academicYear: Omit<AcademicYear, 'id'>): Promise<AcademicYear> => {
    const response = await axiosInstance.put(`/academic-years/${id}`, academicYear);
    return response.data;
};

export const deleteAcademicYear = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/academic-years/${id}`);
};
