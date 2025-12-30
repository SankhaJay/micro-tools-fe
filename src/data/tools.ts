export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or icon name
  href: string;
  available: boolean; // true for MVP tools, false for coming soon
  category?: string;
}

export const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, minify, validate, and beautify JSON with syntax highlighting',
    icon: '📄',
    href: '/json-formatter',
    available: true,
    category: 'formatter',
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert currency, fuel, distance, and time zones',
    icon: '🔄',
    href: '/unit-converter',
    available: false,
    category: 'converter',
  },
  {
    id: 'text-case',
    name: 'Text Case Converter',
    description: 'Transform text between different case styles',
    icon: '🔤',
    href: '/text-case',
    available: false,
    category: 'formatter',
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes for text, URLs, and more',
    icon: '📱',
    href: '/qr-generator',
    available: false,
    category: 'generator',
  },
  {
    id: 'qr-scanner',
    name: 'QR Code Scanner',
    description: 'Scan QR codes using your camera',
    icon: '📷',
    href: '/qr-scanner',
    available: false,
    category: 'scanner',
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'Convert PDF files to images',
    icon: '🖼️',
    href: '/pdf-to-image',
    available: false,
    category: 'converter',
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Combine images into a PDF document',
    icon: '📑',
    href: '/image-to-pdf',
    available: false,
    category: 'converter',
  },
  {
    id: 'speed-test',
    name: 'Internet Speed Test',
    description: 'Test your internet connection speed',
    icon: '⚡',
    href: '/speed-test',
    available: false,
    category: 'utility',
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getAvailableTools(): Tool[] {
  return tools.filter((tool) => tool.available);
}

export function getComingSoonTools(): Tool[] {
  return tools.filter((tool) => !tool.available);
}

