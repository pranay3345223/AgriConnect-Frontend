// Machine model matching backend Machine entity
export interface Machine {
    id?: number;
    name: string;
    description: string;
    category: string;
    pricePerDay: number;
    location: string;
    available: boolean;
    ownerId?: number;
    ownerName?: string;
    ownerPhone?: string;
    imageUrl?: string;
    specifications?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MachineSearchParams {
    category?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    available?: boolean;
    search?: string;
}
