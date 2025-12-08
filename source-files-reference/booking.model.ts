// Booking model matching backend Booking entity
export interface Booking {
    id?: number;
    machineId: number;
    machineName?: string;
    farmerId: number;
    farmerName?: string;
    farmerPhone?: string;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    totalPrice: number;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateBookingRequest {
    machineId: number;
    startDate: string;
    endDate: string;
    notes?: string;
}
