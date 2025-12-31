'use client';

import { useToast } from '@/contexts/ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getToastStyles = (type: string) => {
    const baseStyles = 'px-4 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-[300px] max-w-md';
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-500 text-white`;
      case 'error':
        return `${baseStyles} bg-red-500 text-white`;
      case 'warning':
        return `${baseStyles} bg-yellow-500 text-white`;
      case 'info':
      default:
        return `${baseStyles} bg-blue-500 text-white`;
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={getToastStyles(toast.type)}
          role="alert"
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close notification"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

