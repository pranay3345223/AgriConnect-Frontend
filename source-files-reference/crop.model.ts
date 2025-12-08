// Crop recommendation models
export interface CropRecommendationRequest {
    location: string;
    soilType: string;
    season: string;
    rainfall?: number;
    temperature?: number;
}

export interface CropRecommendationResponse {
    recommendedCrops: string[];
    confidence: number;
    adviceList: string[];
    soilType: string;
    season: string;
}
