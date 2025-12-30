'use client';

import { useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface JsonEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  errorLine?: number;
  errorColumn?: number;
  theme?: 'light' | 'dark';
  className?: string;
  placeholder?: string;
}

export default function JsonEditor({
  value,
  onChange,
  readOnly = false,
  errorLine,
  errorColumn,
  theme = 'light',
  className = '',
  placeholder = 'Enter JSON here...',
}: JsonEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync scroll between textarea and line numbers
  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;

    if (!textarea || !lineNumbers) return;

    const handleScroll = () => {
      lineNumbers.scrollTop = textarea.scrollTop;
    };

    textarea.addEventListener('scroll', handleScroll);
    return () => textarea.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate line numbers
  const lineCount = value.split('\n').length || 1;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const style = theme === 'dark' ? vscDarkPlus : vs;

  if (readOnly) {
    // Read-only mode with syntax highlighting
    return (
      <div className={`relative ${className}`}>
        <SyntaxHighlighter
          language="json"
          style={style}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            padding: '1rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            minHeight: '300px',
          }}
          lineNumberStyle={{
            minWidth: '3em',
            paddingRight: '1em',
            color: theme === 'dark' ? '#858585' : '#999',
            userSelect: 'none',
          }}
          showLineNumbers
        >
          {value || '{}'}
        </SyntaxHighlighter>
      </div>
    );
  }

  // Editable mode
  return (
    <div className={`relative border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
      {/* Line numbers */}
      <div
        ref={lineNumbersRef}
        className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 overflow-hidden text-right pr-2 pt-4 text-sm text-gray-500 dark:text-gray-400 font-mono z-10 pointer-events-none"
      >
        {lineNumbers.map((num) => (
          <div
            key={num}
            className={`h-6 leading-6 ${
              errorLine === num ? 'text-red-600 dark:text-red-400 font-semibold' : ''
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-14 pr-4 py-4 font-mono text-sm bg-transparent text-gray-900 dark:text-gray-100 resize-none focus:outline-none min-h-[300px]"
        style={{
          lineHeight: '1.5rem',
          tabSize: 2,
        }}
        spellCheck={false}
      />

      {/* Error indicator */}
      {errorLine && (
        <div
          className="absolute left-0 w-1 bg-red-500"
          style={{
            top: `${(errorLine - 1) * 24}px`,
            height: '24px',
          }}
        />
      )}
    </div>
  );
}

