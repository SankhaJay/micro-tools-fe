// src/services/QrCodeService.ts

import QRCode from 'qrcode';

// QR Code generation constants
const DEFAULT_QR_CODE_WIDTH = 300;
const DEFAULT_QR_CODE_MARGIN = 1;

export interface QrCodeGenerationOptions {
  text: string;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export interface QrCodeGenerationResult {
  success: boolean;
  dataUrl?: string;
  error?: string;
}

/**
 * Generates a QR code from text/URL and returns it as a data URL (base64 image)
 * @param options QR code generation options
 * @returns Promise with the result containing dataUrl or error
 */
export async function generateQrCode(
  options: QrCodeGenerationOptions
): Promise<QrCodeGenerationResult> {
  try {
    if (!options.text || options.text.trim().length === 0) {
      return {
        success: false,
        error: 'Text or URL is required to generate QR code',
      };
    }

    const {
      errorCorrectionLevel = 'M',
      width = DEFAULT_QR_CODE_WIDTH,
      margin = DEFAULT_QR_CODE_MARGIN,
      color = {},
    } = options;

    const dataUrl = await QRCode.toDataURL(options.text, {
      errorCorrectionLevel,
      width,
      margin,
      color: {
        dark: color.dark || '#000000',
        light: color.light || '#FFFFFF',
      },
    });

    return {
      success: true,
      dataUrl,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to generate QR code',
    };
  }
}

/**
 * Generates a QR code and returns it as a canvas element
 * @param options QR code generation options
 * @returns Promise with canvas element or error
 */
export async function generateQrCodeCanvas(
  options: QrCodeGenerationOptions
): Promise<{ success: boolean; canvas?: HTMLCanvasElement; error?: string }> {
  try {
    if (!options.text || options.text.trim().length === 0) {
      return {
        success: false,
        error: 'Text or URL is required to generate QR code',
      };
    }

    const {
      errorCorrectionLevel = 'M',
      width = DEFAULT_QR_CODE_WIDTH,
      margin = DEFAULT_QR_CODE_MARGIN,
      color = {},
    } = options;

    // Create a canvas element first
    const canvas = document.createElement('canvas');

    // Pass canvas as first argument, then text, then options
    await QRCode.toCanvas(canvas, options.text, {
      errorCorrectionLevel,
      width,
      margin,
      color: {
        dark: color.dark || '#000000',
        light: color.light || '#FFFFFF',
      },
    });

    return {
      success: true,
      canvas,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to generate QR code',
    };
  }
}

/**
 * Downloads a QR code image
 * @param dataUrl The data URL of the QR code image
 * @param filename The filename for the download (default: 'qrcode.png')
 */
export function downloadQrCode(dataUrl: string, filename: string = 'qrcode.png'): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  // Hide the link element to prevent DOM interference
  link.style.display = 'none';
  
  try {
    document.body.appendChild(link);
    link.click();
  } finally {
    // Ensure cleanup happens even if click() throws an error
    if (link.parentNode) {
      document.body.removeChild(link);
    }
  }
}

export interface CopyToClipboardResult {
  success: boolean;
  error?: string;
}

/**
 * Copies a QR code image to clipboard
 * @param dataUrl The data URL of the QR code image
 * @returns Promise that resolves with a result object containing success status and error message if failed
 */
export async function copyQrCodeToClipboard(
  dataUrl: string
): Promise<CopyToClipboardResult> {
  try {
    // Check if clipboard API is supported
    if (!navigator.clipboard) {
      return {
        success: false,
        error: 'Clipboard API is not supported in this browser. Please use a modern browser or try downloading the image instead.',
      };
    }

    // Check if ClipboardItem is supported (required for image copying)
    if (!window.ClipboardItem) {
      return {
        success: false,
        error: 'Image clipboard copying is not supported in this browser. Please use a modern browser or try downloading the image instead.',
      };
    }

    // Convert data URL to blob
    const response = await fetch(dataUrl);
    if (!response.ok) {
      return {
        success: false,
        error: 'Failed to convert QR code image. Please try generating a new QR code.',
      };
    }

    const blob = await response.blob();

    // Copy to clipboard
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);

    return { success: true };
  } catch (error: any) {
    // Handle specific error cases
    let errorMessage = 'Failed to copy QR code to clipboard.';

    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      errorMessage =
        'Clipboard permission denied. Please allow clipboard access in your browser settings and try again.';
    } else if (error.name === 'SecurityError') {
      errorMessage =
        'Clipboard access blocked for security reasons. Please ensure you are using HTTPS or localhost.';
    } else if (error.name === 'DataError') {
      errorMessage =
        'The clipboard data format is not supported. Please try downloading the image instead.';
    } else if (error.name === 'TypeError' || error.message) {
      errorMessage = error.message || errorMessage;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

