'use client';

import { useState, useCallback } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import AdBanner from '@/components/AdBanner';
import {
  generateQrCode,
  downloadQrCode,
  copyQrCodeToClipboard,
  QrCodeGenerationOptions,
} from '@/services/QrCodeService';

export default function QrCodeGeneratorPage() {
  const [inputText, setInputText] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [qrSize, setQrSize] = useState(300);

  const handleGenerate = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter text or URL to generate QR code');
      return;
    }

    setIsGenerating(true);
    setError(null);

    const options: QrCodeGenerationOptions = {
      text: inputText.trim(),
      errorCorrectionLevel,
      width: qrSize,
      margin: 1,
    };

    const result = await generateQrCode(options);

    if (result.success && result.dataUrl) {
      setQrCodeDataUrl(result.dataUrl);
      setError(null);
    } else {
      setError(result.error || 'Failed to generate QR code');
      setQrCodeDataUrl(null);
    }

    setIsGenerating(false);
  }, [inputText, errorCorrectionLevel, qrSize]);

  const handleDownload = useCallback(() => {
    if (qrCodeDataUrl) {
      downloadQrCode(qrCodeDataUrl, 'qrcode.png');
    }
  }, [qrCodeDataUrl]);

  const handleCopy = useCallback(async () => {
    if (qrCodeDataUrl) {
      const success = await copyQrCodeToClipboard(qrCodeDataUrl);
      if (success) {
        // Show temporary success message (you could use a toast library here)
        alert('QR code copied to clipboard!');
      } else {
        alert('Failed to copy QR code to clipboard');
      }
    }
  }, [qrCodeDataUrl]);

  const handleClear = useCallback(() => {
    setInputText('');
    setQrCodeDataUrl(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            QR Code Generator
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Generate QR codes from text, URLs, or any string of characters
          </p>
        </header>

        {/* Input Section */}
        <Card className="mb-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="qr-input"
                className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Enter Text or URL
              </label>
              <Input
                id="qr-input"
                type="text"
                placeholder="Enter text, URL, or any string..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="error-correction"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
                >
                  Error Correction Level
                </label>
                <select
                  id="error-correction"
                  value={errorCorrectionLevel}
                  onChange={(e) =>
                    setErrorCorrectionLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isGenerating}
                >
                  <option value="L">L - Low (~7% recovery)</option>
                  <option value="M">M - Medium (~15% recovery)</option>
                  <option value="Q">Q - Quartile (~25% recovery)</option>
                  <option value="H">H - High (~30% recovery)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="qr-size"
                  className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
                >
                  QR Code Size (pixels)
                </label>
                <Input
                  id="qr-size"
                  type="number"
                  min="100"
                  max="1000"
                  step="50"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full"
                  disabled={isGenerating}
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={handleGenerate}
                variant="primary"
                isLoading={isGenerating}
                disabled={isGenerating || !inputText.trim()}
              >
                Generate QR Code
              </Button>
              <Button onClick={handleClear} variant="ghost" disabled={isGenerating}>
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-200 font-medium">Error:</p>
            <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* QR Code Output Section */}
        {qrCodeDataUrl && (
          <Card className="mb-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Generated QR Code
              </h2>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <img
                    src={qrCodeDataUrl}
                    alt="Generated QR Code"
                    className="max-w-full h-auto"
                  />
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  <Button onClick={handleDownload} variant="primary">
                    Download PNG
                  </Button>
                  <Button onClick={handleCopy} variant="secondary">
                    Copy to Clipboard
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Info Section */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            How to Use
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
            <li>Enter any text, URL, or string in the input field</li>
            <li>Choose error correction level (higher = more damage tolerance)</li>
            <li>Adjust QR code size (100-1000 pixels)</li>
            <li>Click "Generate QR Code" to create your QR code</li>
            <li>Download as PNG or copy to clipboard</li>
          </ul>
        </Card>

        {/* Ad Banner */}
        <div className="mb-8">
          <AdBanner className="w-full" />
        </div>
      </div>
    </div>
  );
}

