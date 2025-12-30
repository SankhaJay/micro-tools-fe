// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface CurrencyRatesResponse {
  rates: Record<string, number>;
  base: string;
  timestamp: number;
}

export interface PdfToImageResponse {
  images: string[];
  success: boolean;
}

export interface ImageToPdfResponse {
  pdfUrl: string;
  success: boolean;
}

// Tool Types
export type ConverterType = 'currency' | 'fuel' | 'distance' | 'timezone';

export type TextCaseType =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'pascal'
  | 'kebab'
  | 'snake';

// File Upload Types
export interface FileUploadOptions {
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
}

