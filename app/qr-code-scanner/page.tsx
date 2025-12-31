'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import AdBanner from '@/components/AdBanner';

// Type for Html5Qrcode (will be dynamically imported)
type Html5Qrcode = any;

// Suppress html5-qrcode DOM errors and media AbortErrors globally (runs immediately on module load)
if (typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const errorString = String(args.join(' ')).toLowerCase();
    // Suppress DOM removal errors
    if (
      (errorString.includes('removechild') || errorString.includes('remove child')) &&
      (errorString.includes('notfounderror') || 
       errorString.includes('not a child') || 
       errorString.includes('not found') ||
       errorString.includes('node to be removed'))
    ) {
      return; // Suppress this error silently
    }
    // Suppress media AbortErrors (expected when stopping camera)
    if (
      (errorString.includes('aborterror') || errorString.includes('abort error')) &&
      (errorString.includes('media resource') || 
       errorString.includes('fetching process') ||
       errorString.includes('user agent') ||
       errorString.includes('user\'s request'))
    ) {
      return; // Suppress this error silently - it's expected when stopping camera
    }
    originalConsoleError.apply(console, args);
  };
}

export default function QrCodeScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraPermissionError, setCameraPermissionError] = useState(false);
  const [cameraId, setCameraId] = useState<string | null>(null);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scanAreaRef = useRef<HTMLDivElement>(null);

  // Suppress html5-qrcode DOM errors
  useEffect(() => {
    // Store original console.error
    const originalConsoleError = console.error;
    
    // Override console.error to filter out the specific error
    console.error = (...args: any[]) => {
      const errorString = String(args.join(' ')).toLowerCase();
      // Suppress the specific DOM removal error - check multiple patterns
      if (
        (errorString.includes('removechild') || errorString.includes('remove child')) &&
        (errorString.includes('notfounderror') || 
         errorString.includes('not a child') || 
         errorString.includes('not found') ||
         errorString.includes('node to be removed'))
      ) {
        // Silently ignore this specific error
        return;
      }
      // Suppress media AbortErrors (expected when stopping camera)
      if (
        (errorString.includes('aborterror') || errorString.includes('abort error')) &&
        (errorString.includes('media resource') || 
         errorString.includes('fetching process') ||
         errorString.includes('user agent') ||
         errorString.includes('user\'s request'))
      ) {
        // Silently ignore this error - it's expected when stopping camera
        return;
      }
      // Call original console.error for other errors
      originalConsoleError.apply(console, args);
    };

    const handleError = (event: ErrorEvent) => {
      // Suppress the specific DOM removal error from html5-qrcode
      const errorMessage = (event.message || event.error?.message || '').toLowerCase();
      const errorName = event.error?.name || '';
      
      // Suppress DOM removal errors
      if (
        (errorName === 'NotFoundError' || errorMessage.includes('notfounderror')) &&
        (errorMessage.includes('removechild') || 
         errorMessage.includes('remove child') ||
         errorMessage.includes('not a child') ||
         errorMessage.includes('node to be removed'))
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      
      // Suppress media AbortErrors (expected when stopping camera)
      if (
        (errorName === 'AbortError' || errorMessage.includes('aborterror')) &&
        (errorMessage.includes('media resource') || 
         errorMessage.includes('fetching process') ||
         errorMessage.includes('user agent') ||
         errorMessage.includes('user\'s request'))
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Suppress unhandled promise rejections related to DOM removal and media AbortErrors
      const reason = event.reason;
      const reasonStr = String(reason || '').toLowerCase();
      const reasonMessage = (reason?.message || '').toLowerCase();
      const reasonName = reason?.name || '';
      
      // Suppress DOM removal errors
      if (
        (reasonName === 'NotFoundError' || 
         reasonStr.includes('notfounderror') ||
         reasonMessage.includes('notfounderror')) &&
        (reasonMessage.includes('removechild') || 
         reasonMessage.includes('remove child') ||
         reasonStr.includes('removechild') ||
         reasonStr.includes('not a child') ||
         reasonStr.includes('node to be removed'))
      ) {
        event.preventDefault();
        return;
      }
      
      // Suppress media AbortErrors (expected when stopping camera)
      if (
        (reasonName === 'AbortError' || 
         reasonStr.includes('aborterror') ||
         reasonMessage.includes('aborterror')) &&
        (reasonMessage.includes('media resource') || 
         reasonMessage.includes('fetching process') ||
         reasonStr.includes('media resource') ||
         reasonStr.includes('user agent') ||
         reasonStr.includes('user\'s request'))
      ) {
        event.preventDefault();
        return;
      }
    };

    window.addEventListener('error', handleError, true); // Use capture phase
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      // Restore original console.error
      console.error = originalConsoleError;
      window.removeEventListener('error', handleError, true);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Get available cameras on mount (try to get devices, but don't require permissions)
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined' || !navigator.mediaDevices) {
      return;
    }

    const getCameras = async () => {
      try {
        // Try to enumerate devices - might not have labels until permissions are granted
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        setAvailableCameras(videoDevices);
        if (videoDevices.length > 0 && !cameraId) {
          setCameraId(videoDevices[0].deviceId);
        }
      } catch (err) {
        console.error('Error getting cameras:', err);
      }
    };

    getCameras();
  }, [cameraId]);

  const startScanning = useCallback(async () => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') {
      setError('Camera access is only available in the browser');
      return;
    }

    const scanAreaElement = document.getElementById('qr-reader');
    if (!scanAreaElement) {
      setError('Scan area not found');
      return;
    }

    try {
      setError(null);
      setCameraPermissionError(false);
      setScannedResult(null);

      // Dynamically import html5-qrcode to avoid SSR issues
      const { Html5Qrcode } = await import('html5-qrcode');
      
      const scanAreaId = 'qr-reader';
      
      // Create a new instance - this will handle the container
      const html5QrCode = new Html5Qrcode(scanAreaId, {
        verbose: false, // Set to false to reduce console noise
      });
      scannerRef.current = html5QrCode;

      // Use cameraId if available, otherwise let html5-qrcode use default camera
      // html5-qrcode will request permissions automatically
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      };

      await html5QrCode.start(
        cameraId || { facingMode: 'environment' }, // Use selected camera or default to environment (back camera)
        config,
        async (decodedText) => {
          // Success callback - stop scanning and set result
          setScannedResult(decodedText);
          try {
            if (scannerRef.current) {
              await Promise.race([
                scannerRef.current.stop(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
              ]).catch(() => {
                // Silently ignore stop errors
              });
              scannerRef.current = null;
            }
          } catch (stopErr: any) {
            // Silently handle errors - especially DOM removal errors and AbortErrors
            if (stopErr.message && 
                !stopErr.message.includes('removeChild') && 
                stopErr.name !== 'AbortError' &&
                !stopErr.message?.includes('media resource')) {
              console.error('Error stopping scanner:', stopErr);
            }
          } finally {
            setIsScanning(false);
          }
        },
        (errorMessage) => {
          // Error callback (ignore, as it's called frequently during scanning)
        }
      );

      setIsScanning(true);

      // After successful start, update camera list with labels
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        setAvailableCameras(videoDevices);
      } catch (enumErr) {
        console.error('Error enumerating devices:', enumErr);
      }
    } catch (err: any) {
      console.error('Error starting scanner:', err);
      
      // Provide more helpful error messages
      let errorMessage = 'Failed to start camera';
      if (err.message) {
        errorMessage = err.message;
      } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage = 'Camera permission denied. Please allow camera access and try again.';
        setCameraPermissionError(true);
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'No camera found. Please connect a camera and try again.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage = 'Camera is already in use by another application.';
      }
      
      setError(errorMessage);
      setIsScanning(false);
      if (scannerRef.current) {
        try {
          // Try to stop if it was started, but don't call clear()
          await scannerRef.current.stop().catch(() => {
            // Ignore stop errors
          });
        } catch (stopErr) {
          // Ignore stop errors
        }
        scannerRef.current = null;
      }
    }
  }, [cameraId]);

  const stopScanning = useCallback(async () => {
    if (scannerRef.current) {
      try {
        // Check if scanner is actually running before stopping
        if (isScanning) {
          // Use a timeout to ensure stop completes
          await Promise.race([
            scannerRef.current.stop(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
          ]).catch((err) => {
            // Silently ignore stop errors - might already be stopped or DOM issues
            if (err.message !== 'Timeout') {
              // Only log non-timeout errors
            }
          });
        }
        scannerRef.current = null;
      } catch (err: any) {
        // Silently handle errors - the library might have cleanup issues
        if (err.message && !err.message.includes('removeChild')) {
          console.error('Error stopping scanner:', err);
        }
      }
    }
    setIsScanning(false);
  }, [isScanning]);

  const handleCopy = useCallback(async () => {
    if (scannedResult) {
      try {
        await navigator.clipboard.writeText(scannedResult);
        alert('Copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
      }
    }
  }, [scannedResult]);

  const handleClear = useCallback(() => {
    setScannedResult(null);
    setError(null);
    setCameraPermissionError(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        // Use a timeout to prevent hanging
        Promise.race([
          scannerRef.current.stop(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 1000))
        ]).catch((err: any) => {
          // Silently ignore all cleanup errors on unmount
          // AbortError is expected when stopping media streams during unmount
          // DOM errors are expected from html5-qrcode cleanup
        });
        scannerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            QR Code Scanner
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Scan QR codes using your device camera
          </p>
        </header>

        {/* Camera Selection */}
        {availableCameras.length > 1 && !isScanning && (
          <Card className="mb-6">
            <div>
              <label
                htmlFor="camera-select"
                className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
              >
                Select Camera
              </label>
              <select
                id="camera-select"
                value={cameraId || ''}
                onChange={(e) => setCameraId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableCameras.map((camera) => (
                  <option key={camera.deviceId} value={camera.deviceId}>
                    {camera.label || `Camera ${camera.deviceId.substring(0, 8)}`}
                  </option>
                ))}
              </select>
            </div>
          </Card>
        )}

        {/* Controls */}
        <Card className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {!isScanning ? (
              <Button onClick={startScanning} variant="primary">
                Start Scanning
              </Button>
            ) : (
              <Button onClick={stopScanning} variant="secondary">
                Stop Scanning
              </Button>
            )}
            {scannedResult && (
              <>
                <Button onClick={handleCopy} variant="outline">
                  Copy Result
                </Button>
                <Button onClick={handleClear} variant="ghost">
                  Clear
                </Button>
              </>
            )}
          </div>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 dark:border-red-800">
            <div className="p-4">
              <p className="text-red-800 dark:text-red-200 font-medium">Error:</p>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error}</p>
              {cameraPermissionError && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-2">
                  Please allow camera access in your browser settings and try again.
                </p>
              )}
            </div>
          </Card>
        )}

        {/* Scanner Area */}
        <Card className="mb-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isScanning ? 'Scanning...' : 'Camera Preview'}
            </h2>
            <div className="w-full min-h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
              {/* Stable container that won't be recreated by React */}
              <div
                id="qr-reader"
                ref={scanAreaRef}
                key="qr-scanner-container"
                style={{ minHeight: '300px' }}
                className={`w-full h-full ${
                  !isScanning ? 'flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700' : ''
                }`}
              >
                {!isScanning && (
                  <p className="text-gray-600 dark:text-gray-400 text-center pointer-events-none">
                    Click "Start Scanning" to begin
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Scanned Result */}
        {scannedResult && (
          <Card className="mb-6 border-green-200 dark:border-green-800">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Scanned Result
              </h2>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-green-800 dark:text-green-200 font-medium mb-2">
                  QR Code Content:
                </p>
                <p className="text-green-700 dark:text-green-300 break-all">{scannedResult}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCopy} variant="primary">
                  Copy to Clipboard
                </Button>
                {scannedResult.startsWith('http://') || scannedResult.startsWith('https://') ? (
                  <Button
                    onClick={() => window.open(scannedResult, '_blank')}
                    variant="outline"
                  >
                    Open URL
                  </Button>
                ) : null}
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
            <li>Click "Start Scanning" to activate your camera</li>
            <li>Allow camera access when prompted by your browser</li>
            <li>Point your camera at a QR code</li>
            <li>The scanner will automatically detect and decode the QR code</li>
            <li>Copy the result or open the URL if it's a web link</li>
            <li>Click "Stop Scanning" to stop the camera</li>
          </ul>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium mb-1">
              Note:
            </p>
            <p className="text-yellow-700 dark:text-yellow-300 text-xs">
              This feature requires camera access. Make sure your browser supports camera access
              and that you grant the necessary permissions.
            </p>
          </div>
        </Card>

        {/* Ad Banner */}
        <div className="mb-8">
          <AdBanner className="w-full" />
        </div>
      </div>
    </div>
  );
}

