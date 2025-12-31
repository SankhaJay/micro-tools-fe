// src/services/QrCodeService.ts

import QRCode from 'qrcode';

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
      width = 300,
      margin = 1,
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
      width = 300,
      margin = 1,
      color = {},
    } = options;

    const canvas = await QRCode.toCanvas(options.text, {
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
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Copies a QR code image to clipboard
 * @param dataUrl The data URL of the QR code image
 * @returns Promise that resolves when the image is copied
 */
export async function copyQrCodeToClipboard(dataUrl: string): Promise<boolean> {
  try {
    // Convert data URL to blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    // Copy to clipboard
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);

    return true;
  } catch (error) {
    console.error('Failed to copy QR code to clipboard:', error);
    return false;
  }
}

