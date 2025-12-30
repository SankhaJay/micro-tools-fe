import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Get API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// Create Axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add any auth tokens or headers here if needed in the future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data as { message?: string; error?: string };
      
      switch (status) {
        case 400:
          console.error('Bad Request:', data.message || data.error || 'Invalid request');
          break;
        case 401:
          console.error('Unauthorized:', data.message || data.error || 'Authentication required');
          break;
        case 403:
          console.error('Forbidden:', data.message || data.error || 'Access denied');
          break;
        case 404:
          console.error('Not Found:', data.message || data.error || 'Resource not found');
          break;
        case 429:
          console.error('Too Many Requests:', data.message || data.error || 'Rate limit exceeded');
          break;
        case 500:
          console.error('Server Error:', data.message || data.error || 'Internal server error');
          break;
        default:
          console.error('Error:', data.message || data.error || 'An error occurred');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', 'No response from server');
    } else {
      // Something else happened
      console.error('Error:', error.message || 'An unexpected error occurred');
    }
    
    return Promise.reject(error);
  }
);

// Export API endpoints as constants
export const API_ENDPOINTS = {
  HEALTH: '/api/health',
  CURRENCY_RATES: '/api/currency-rates',
  PDF_TO_IMAGE: '/api/pdf-to-image',
  IMAGE_TO_PDF: '/api/image-to-pdf',
  SPEED_TEST_FILE: '/api/speed-test-file',
} as const;

