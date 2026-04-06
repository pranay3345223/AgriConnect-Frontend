// Survey Model Interfaces
export interface Location {
    address: string;
    city: string;
    state: string;
    pincode: string;
    latitude?: number;
    longitude?: number;
}

export interface MachineryRequirement {
    machineType: string;
    urgency: string;
    estimatedDuration: number;
    willingToPay: number;
}

export interface Survey {
    id?: string;
    farmerId?: string;
    farmerName: string;
    farmerEmail: string;
    farmerPhone: string;
    location: Location;
    cropType: string;
    farmSize: number;
    farmSizeUnit: string;
    plantingDate: string;
    harvestDate?: string;
    season: string;
    machineryNeeded: MachineryRequirement[];
    soilType?: string;
    irrigationType?: string;
    additionalNotes?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface SurveyStatistics {
    totalSurveys: number;
    activeSurveys: number;
}
