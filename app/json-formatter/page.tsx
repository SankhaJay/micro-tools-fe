'use client';

import { useState, useCallback } from 'react';
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

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<number | undefined>();
  const [errorColumn, setErrorColumn] = useState<number | undefined>();
  const [indent, setIndent] = useState<2 | 4>(2);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleFormat = useCallback(() => {
    setError(null);
    setErrorLine(undefined);
    setErrorColumn(undefined);

    if (!inputJson.trim()) {
      setError('Please enter JSON to format');
      return;
    }

    try {
      const formatted = formatJson(inputJson, indent);
      setOutputJson(formatted);
      setError(null);
    } catch (err) {
      const validation = validateJson(inputJson);
      setError(validation.error || 'Invalid JSON');
      setErrorLine(validation.line);
      setErrorColumn(validation.column);
      setOutputJson('');
    }
  }, [inputJson, indent]);

  const handleMinify = useCallback(() => {
    setError(null);
    setErrorLine(undefined);
    setErrorColumn(undefined);

    if (!inputJson.trim()) {
      setError('Please enter JSON to minify');
      return;
    }

    try {
      const minified = minifyJson(inputJson);
      setOutputJson(minified);
      setError(null);
    } catch (err) {
      const validation = validateJson(inputJson);
      setError(validation.error || 'Invalid JSON');
      setErrorLine(validation.line);
      setErrorColumn(validation.column);
      setOutputJson('');
    }
  }, [inputJson]);

  const handleValidate = useCallback(() => {
    setError(null);
    setErrorLine(undefined);
    setErrorColumn(undefined);

    if (!inputJson.trim()) {
      setError('Please enter JSON to validate');
      return;
    }

    const validation = validateJson(inputJson);
    if (validation.valid) {
      setError(null);
      setOutputJson('Valid JSON ✓');
    } else {
      setError(validation.error || 'Invalid JSON');
      setErrorLine(validation.line);
      setErrorColumn(validation.column);
      setOutputJson('');
    }
  }, [inputJson]);

  const handleClear = useCallback(() => {
    setInputJson('');
    setOutputJson('');
    setError(null);
    setErrorLine(undefined);
    setErrorColumn(undefined);
  }, []);

  const handleFileUpload = useCallback((content: string) => {
    setInputJson(content);
    setError(null);
    setErrorLine(undefined);
    setErrorColumn(undefined);
    // Auto-validate on upload
    const validation = validateJson(content);
    if (!validation.valid) {
      setError(validation.error || 'Invalid JSON');
      setErrorLine(validation.line);
      setErrorColumn(validation.column);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            JSON Formatter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Format, minify, validate, and beautify JSON with syntax highlighting
          </p>
        </header>

        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <Button onClick={handleFormat} variant="primary">
              Format
            </Button>
            <Button onClick={handleMinify} variant="secondary">
              Minify
            </Button>
            <Button onClick={handleValidate} variant="outline">
              Validate
            </Button>
            <Button onClick={handleClear} variant="ghost">
              Clear
            </Button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm text-gray-600 dark:text-gray-400">
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
            <label className="text-sm text-gray-600 dark:text-gray-400">
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
  );
}

