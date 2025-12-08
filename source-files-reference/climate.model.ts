// Climate and weather related models
export interface ClimateData {
    location: string;
    temperature: number;
    humidity: number;
    rainfall: number;
    weatherCondition: string;
    forecast?: string;
}

export interface ClimateRecommendation {
    location: string;
    soilType: string;
    season: string;
    recommendations: string[];
    crops: string[];
}
