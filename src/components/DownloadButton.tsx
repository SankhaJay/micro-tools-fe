'use client';

import Button from './Button';

interface DownloadButtonProps {
  data: string;
  filename?: string;
  mimeType?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export default function DownloadButton({
  data,
  filename = 'data.json',
  mimeType = 'application/json',
  className = '',
  variant = 'outline',
  size = 'md',
  disabled = false,
}: DownloadButtonProps) {
  const handleDownload = () => {
    if (!data || disabled) return;

    try {
      const blob = new Blob([data], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={disabled || !data}
      variant={variant}
      size={size}
      className={className}
    >
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      Download
    </Button>
  );
}

