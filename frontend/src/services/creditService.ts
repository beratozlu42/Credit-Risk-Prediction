import { api } from './api';
import type { CreditPredictRequest, CreditPredictResponse } from './types';

export const creditService = {
    /**
     * Predicts credit risk based on user data
     * @param data The credit information to analyze
     * @returns Prediction (0 or 1) and risk probability
     */
    predict: async (data: CreditPredictRequest): Promise<CreditPredictResponse> => {
        return api.post<CreditPredictResponse, CreditPredictRequest>('/predict', data);
    },

    /**
     * Checks if the API is running
     */
    checkStatus: async (): Promise<string> => {
        // Note: The root endpoint returns a plain string, so we might need a custom fetch 
        // if the generic api.get expects JSON. 
        const response = await fetch(import.meta.env.VITE_API_URL);
        return response.text();
    }
};
