export interface ApiListResponse<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    message: string;
}

export interface ApiObjectResponse<T> {
    data: T;
    message: string;
}

