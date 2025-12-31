'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import JsonEditor from '@/components/JsonEditor';
import CopyButton from '@/components/CopyButton';
import DownloadButton from '@/components/DownloadButton';
import FileUpload from '@/components/FileUpload';
import Button from '@/components/Button';
import AdBanner from '@/components/AdBanner';
import {
  formatJson,
  minifyJson,
  validateJson,
  parseJson,
} from '@/services/JsonFormatterService';

const LARGE_FILE_THRESHOLD = 100 * 1024; // 100KB
const DEBOUNCE_DELAY = 500; // 500ms for debounced validation

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<number | undefined>();
  const [errorColumn, setErrorColumn] = useState<number | undefined>();
  const [indent, setIndent] = useState<2 | 4>(2);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(false);
  const [fileSizeWarning, setFileSizeWarning] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to clear all error states
  const clearErrors = useCallback(() => {
    setError(null);
    setErrorLine(undefined);
    setErrorColumn(undefined);
  }, []);

  // Helper function to set validation error from validation result
  const setValidationError = useCallback((validation: ReturnType<typeof validateJson>) => {
    setError(validation.error || 'Invalid JSON');
    setErrorLine(validation.line);
    setErrorColumn(validation.column);
    setOutputJson('');
  }, []);

  // Helper function to check if input is empty and set error if so
  const checkInputEmpty = useCallback((actionName: string): boolean => {
    if (!inputJson.trim()) {
      setError(`Please enter JSON to ${actionName}`);
      return true;
    }
    return false;
  }, [inputJson]);

  // Calculate file size and show warning for large files
  const fileSize = useMemo(() => {
    return new Blob([inputJson]).size;
  }, [inputJson]);

  const isLargeFile = useMemo(() => {
    return fileSize > LARGE_FILE_THRESHOLD;
  }, [fileSize]);

  // Debounced validation for large files
  useEffect(() => {
    if (!inputJson.trim() || !isLargeFile) {
      setFileSizeWarning(null);
      return;
    }

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set warning
    setFileSizeWarning(`Large file detected (${(fileSize / 1024).toFixed(1)}KB). Validation may be slow.`);

    // Debounced validation
    debounceTimerRef.current = setTimeout(() => {
      const validation = validateJson(inputJson);
      if (!validation.valid) {
        setError(validation.error || 'Invalid JSON');
        setErrorLine(validation.line);
        setErrorColumn(validation.column);
      } else {
        clearErrors();
      }
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputJson, isLargeFile, fileSize, clearErrors]);


  const handleFormat = useCallback(() => {
    clearErrors();

    if (checkInputEmpty('format')) {
      return;
    }

    setIsLoading(true);
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      try {
        const formatted = formatJson(inputJson, indent);
        setOutputJson(formatted);
        setError(null);
      } catch {
        // Get detailed validation error with line/column info
        const validation = validateJson(inputJson);
        setValidationError(validation);
      } finally {
        setIsLoading(false);
      }
    }, 0);
  }, [inputJson, indent, clearErrors, checkInputEmpty, setValidationError]);

  const handleMinify = useCallback(() => {
    clearErrors();

    if (checkInputEmpty('minify')) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        const minified = minifyJson(inputJson);
        setOutputJson(minified);
        setError(null);
      } catch {
        // Get detailed validation error with line/column info
        const validation = validateJson(inputJson);
        setValidationError(validation);
      } finally {
        setIsLoading(false);
      }
    }, 0);
  }, [inputJson, clearErrors, checkInputEmpty, setValidationError]);

  const handleValidate = useCallback(() => {
    clearErrors();

    if (checkInputEmpty('validate')) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const validation = validateJson(inputJson);
      if (validation.valid) {
        setError(null);
        setOutputJson('Valid JSON ✓');
      } else {
        setValidationError(validation);
      }
      setIsLoading(false);
    }, 0);
  }, [inputJson, clearErrors, checkInputEmpty, setValidationError]);

  const handleClear = useCallback(() => {
    setInputJson('');
    setOutputJson('');
    clearErrors();
  }, [clearErrors]);

  const handleFileUpload = useCallback((content: string) => {
    setInputJson(content);
    clearErrors();
    // Auto-validate on upload
    const validation = validateJson(content);
    if (!validation.valid) {
      setValidationError(validation);
    }
  }, [clearErrors, setValidationError]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Enter to format
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleFormat();
      }
      // Ctrl/Cmd + Shift + M to minify
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        handleMinify();
      }
      // Ctrl/Cmd + Shift + V to validate
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        handleValidate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFormat, handleMinify, handleValidate]);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'JSON Formatter',
            description: 'Free online JSON formatter, validator, and minifier tool',
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://micro-tools.com'}/json-formatter`,
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Format JSON with syntax highlighting',
              'Minify JSON files',
              'Validate JSON syntax',
              'Beautify JSON with customizable indentation',
            ],
          }),
        }}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            JSON Formatter
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Format, minify, validate, and beautify JSON with syntax highlighting
          </p>
        </header>

        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <Button onClick={handleFormat} variant="primary" isLoading={isLoading} disabled={isLoading}>
              Format
            </Button>
            <Button onClick={handleMinify} variant="secondary" isLoading={isLoading} disabled={isLoading}>
              Minify
            </Button>
            <Button onClick={handleValidate} variant="outline" isLoading={isLoading} disabled={isLoading}>
              Validate
            </Button>
            <Button onClick={handleClear} variant="ghost" disabled={isLoading}>
              Clear
            </Button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
                <label className="text-sm text-gray-900 dark:text-gray-100">
                  Indent:
                </label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value) as 2 | 4)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
                <label className="text-sm text-gray-900 dark:text-gray-100">
                  Theme:
                </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
              className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <FileUpload onFileRead={handleFileUpload} />
        </div>

        {/* File Size Warning */}
        {fileSizeWarning && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              {fileSizeWarning}
            </p>
          </div>
        )}

        {/* Keyboard Shortcuts Hint */}
        <div className="mb-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium">Keyboard shortcuts:</span> Ctrl/Cmd + Enter (Format), Ctrl/Cmd + Shift + M (Minify), Ctrl/Cmd + Shift + V (Validate)
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-200 font-medium">Error:</p>
            <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error}</p>
            {errorLine && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                Line {errorLine}
                {errorColumn && `, Column ${errorColumn}`}
              </p>
            )}
          </div>
        )}

        {/* Editor Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Input Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Input JSON
              </h2>
            </div>
            <JsonEditor
              value={inputJson}
              onChange={setInputJson}
              errorLine={errorLine}
              errorColumn={errorColumn}
              theme={theme}
              placeholder="Paste or type your JSON here..."
            />
          </div>

          {/* Output Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Output JSON
              </h2>
              <div className="flex gap-2">
                {outputJson && (
                  <>
                    <CopyButton text={outputJson} size="sm" />
                    <DownloadButton
                      data={outputJson}
                      filename="formatted.json"
                      size="sm"
                    />
                  </>
                )}
              </div>
            </div>
            <JsonEditor
              value={outputJson}
              readOnly
              theme={theme}
              placeholder="Formatted JSON will appear here..."
            />
          </div>
        </div>

        {/* Ad Banner */}
        <div className="mb-8">
          <AdBanner className="w-full" />
        </div>
      </div>
    </div>
    </>
  );
}

