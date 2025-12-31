---
name: Micro Tools Web App Architecture
overview: Design and scaffold a production-ready React web application (micro-tools-fe) with Express backend (micro-tools-app), featuring utility tools optimized for ad monetization and high daily usage.
todos:
  - id: setup-fe-repo
    content: Create micro-tools-fe repository, initialize React (Next.js or Vite) project with TypeScript
    status: completed
  - id: setup-backend-repo
    content: Create micro-tools-app repository, initialize Express server with TypeScript
    status: completed
  - id: setup-frontend-deps
    content: Install dependencies (Zustand, Axios) for micro-tools-fe
    status: completed
    dependencies:
      - setup-fe-repo
  - id: setup-zustand-store
    content: Set up Zustand store structure with ads removal status and user preferences state in micro-tools-fe
    status: completed
    dependencies:
      - setup-frontend-deps
  - id: setup-api-client
    content: Configure API client (Axios instance with base URL, interceptors) in micro-tools-fe
    status: completed
    dependencies:
      - setup-frontend-deps
  - id: setup-adsense
    content: Set up Google AdSense integration (script loader, AdBanner component, useInterstitialAd hook) in micro-tools-fe
    status: completed
    dependencies:
      - setup-frontend-deps
  - id: setup-ui-components
    content: Create core UI components (Button, Input, Card) with variants in micro-tools-fe
    status: completed
    dependencies:
      - setup-fe-repo
  - id: setup-project-structure
    content: Create directory structure (components/, hooks/, services/, types/) in micro-tools-fe
    status: completed
    dependencies:
      - setup-fe-repo
  - id: setup-env-config
    content: Configure environment variables (.env.local) for API base URL and AdSense in micro-tools-fe
    status: completed
    dependencies:
      - setup-fe-repo
  - id: setup-backend
    content: Set up Express server with TypeScript, middleware (CORS, rate limiting, file upload), and basic route structure in micro-tools-app
    status: completed
    dependencies:
      - setup-backend-repo
  - id: home-page
    content: Build HomePage in micro-tools-fe with tool grid/list, search functionality, banner ad integration, and "coming soon" banners for non-MVP tools
    status: completed
    dependencies:
      - setup-ui-components
      - setup-project-structure
      - setup-adsense
  - id: json-formatter-deps
    content: Install JSON formatter dependencies (react-syntax-highlighter, @types/react-syntax-highlighter) for micro-tools-fe
    status: completed
    dependencies:
      - setup-frontend-deps
  - id: json-formatter-service
    content: Create JsonFormatterService with format, minify, validate, and parse JSON logic in micro-tools-fe
    status: completed
    dependencies:
      - setup-project-structure
      - json-formatter-deps
  - id: json-editor-component
    content: Create JsonEditor component with syntax highlighting, line numbers, and error highlighting in micro-tools-fe
    status: completed
    dependencies:
      - setup-ui-components
      - json-formatter-deps
  - id: json-formatter-utils
    content: Create utility components (CopyButton, DownloadButton, FileUpload) for JSON formatter in micro-tools-fe
    status: completed
    dependencies:
      - setup-ui-components
  - id: json-formatter-page
    content: Implement JsonFormatterPage with input/output editors, action buttons, and error display in micro-tools-fe
    status: completed
    dependencies:
      - json-formatter-service
      - json-editor-component
      - json-formatter-utils
      - home-page
  - id: json-formatter-features
    content: Add advanced features to JSON formatter (indentation options, theme support, large file handling) in micro-tools-fe
    status: completed
    dependencies:
      - json-formatter-page
  - id: qr-tools
    content: Implement QR code generator and scanner pages in micro-tools-fe with web camera API (getUserMedia) - Next Priority
    status: pending
    dependencies:
      - setup-project-structure
      - setup-ui-components
  - id: text-case-converter
    content: Build TextCaseConverterPage in micro-tools-fe with all case transformation options (client-side) - Phase 2
    status: pending
    dependencies:
      - setup-project-structure
      - setup-ui-components
  - id: unit-converter
    content: Implement UnitConverterPage in micro-tools-fe with currency, fuel, distance, and timezone converters (client-side logic) - Phase 3 (Deprioritized)
    status: pending
    dependencies:
      - setup-project-structure
      - setup-api-client
      - setup-ui-components
  - id: currency-api
    content: Create currency rates endpoint in micro-tools-app with caching and rate limiting - Phase 3 (Deprioritized, required for unit converter)
    status: pending
    dependencies:
      - setup-backend
  - id: pdf-services
    content: Implement PDF ↔ Image conversion services in micro-tools-app with file upload handling - Phase 2
    status: pending
    dependencies:
      - setup-backend
  - id: pdf-pages
    content: Build PdfToImagePage and ImageToPdfPage in micro-tools-fe with file picker, upload, and download functionality - Phase 2
    status: pending
    dependencies:
      - pdf-services
      - setup-project-structure
      - setup-api-client
      - setup-ui-components
  - id: speed-test-backend
    content: Implement speed test file endpoint in micro-tools-app - Phase 2
    status: pending
    dependencies:
      - setup-backend
  - id: speed-test-frontend
    content: Implement SpeedTestPage in micro-tools-fe with speed test UI - Phase 2
    status: pending
    dependencies:
      - setup-project-structure
      - setup-api-client
      - setup-ui-components
      - speed-test-backend
  - id: ad-integration
    content: Integrate Google AdSense banner and interstitial ads in micro-tools-fe with frequency capping and removal logic
    status: pending
    dependencies:
      - setup-adsense
      - setup-zustand-store
  - id: settings-page
    content: Build SettingsPage in micro-tools-fe with ad removal purchase flow, privacy policy, and app info
    status: pending
    dependencies:
      - setup-project-structure
      - setup-ui-components
      - setup-zustand-store
      - ad-integration
  - id: error-handling-fe
    content: Add comprehensive error handling, loading states, and edge case handling for JSON formatter tool in micro-tools-fe
    status: pending
    dependencies:
      - json-formatter-page
      - json-formatter-features
  - id: performance-optimization-fe
    content: Implement lazy loading, code splitting, and performance optimizations in micro-tools-fe
    status: pending
    dependencies:
      - ad-integration
  - id: performance-optimization-backend
    content: Implement file size limits, temp file cleanup, and performance optimizations in micro-tools-app
    status: pending
    dependencies:
      - pdf-services
---

# Micro Tools App - Architecture & Implementation Plan

## Todo List

### ✅ Completed Tasks

#### Frontend (micro-tools-fe)
- [x] **setup-fe-repo** - Create micro-tools-fe repository, initialize React (Next.js or Vite) project with TypeScript
- [x] **setup-frontend-deps** - Install dependencies (Zustand, Axios) for micro-tools-fe
- [x] **setup-zustand-store** - Set up Zustand store structure with ads removal status and user preferences state
- [x] **setup-api-client** - Configure API client (Axios instance with base URL, interceptors)
- [x] **setup-adsense** - Set up Google AdSense integration (script loader, AdBanner component, useInterstitialAd hook)
- [x] **setup-ui-components** - Create core UI components (Button, Input, Card) with variants
- [x] **setup-project-structure** - Create directory structure (components/, hooks/, services/, types/)
- [x] **setup-env-config** - Configure environment variables (.env.local) for API base URL and AdSense
- [x] **home-page** - Build HomePage with tool grid/list, search functionality, banner ad integration, and "coming soon" banners
- [x] **json-formatter-deps** - Install JSON formatter dependencies (react-syntax-highlighter, @types/react-syntax-highlighter)
- [x] **json-formatter-service** - Create JsonFormatterService with format, minify, validate, and parse JSON logic
- [x] **json-editor-component** - Create JsonEditor component with syntax highlighting, line numbers, and error highlighting
- [x] **json-formatter-utils** - Create utility components (CopyButton, DownloadButton, FileUpload)
- [x] **json-formatter-page** - Implement JsonFormatterPage with input/output editors, action buttons, and error display
- [x] **json-formatter-features** - Add advanced features (indentation options, theme support, large file handling)
- [x] **seo-optimization** - Implement SEO optimization (metadata, sitemap, robots.txt)
- [x] **qr-code-generator** - Implement QR code generator page - Phase 1.5

#### Backend (micro-tools-app)
- [x] **setup-backend-repo** - Create micro-tools-app repository, initialize Express server with TypeScript
- [x] **setup-backend** - Set up Express server with TypeScript, middleware (CORS, rate limiting, file upload), and basic route structure

### 📋 Pending Tasks


#### Frontend (micro-tools-fe) - Phase 2
- [ ] **text-case-converter** - Build TextCaseConverterPage with all case transformation options (client-side)
- [ ] **pdf-pages** - Build PdfToImagePage and ImageToPdfPage with file picker, upload, and download functionality
- [ ] **speed-test-frontend** - Implement SpeedTestPage with speed test UI

#### Frontend (micro-tools-fe) - Phase 3 (Deprioritized)
- [ ] **unit-converter** - Implement UnitConverterPage with currency, fuel, distance, and timezone converters (client-side logic)

#### Frontend (micro-tools-fe) - Other Tasks
- [ ] **ad-integration** - Integrate Google AdSense banner and interstitial ads with frequency capping and removal logic
- [ ] **settings-page** - Build SettingsPage with ad removal purchase flow, privacy policy, and app info
- [ ] **error-handling-fe** - Add comprehensive error handling, loading states, and edge case handling for JSON formatter tool
- [ ] **performance-optimization-fe** - Implement lazy loading, code splitting, and performance optimizations

#### Backend (micro-tools-app) - Phase 2
- [ ] **pdf-services** - Implement PDF ↔ Image conversion services with file upload handling
- [ ] **speed-test-backend** - Implement speed test file endpoint

#### Backend (micro-tools-app) - Phase 3 (Deprioritized)
- [ ] **currency-api** - Create currency rates endpoint with caching and rate limiting (required for unit converter)

#### Backend (micro-tools-app) - Other Tasks
- [ ] **performance-optimization-backend** - Implement file size limits, temp file cleanup, and performance optimizations

---

# Micro Tools App - Architecture & Implementation Plan

## Project Structure

Two separate repositories:

### Repository 1: micro-tools-fe (Frontend)

```
/Users/sankha/Documents/projects/micro-tools/micro-tools-fe/
├── src/
│   ├── pages/                # Page components (or app/ for Next.js)
│   ├── components/           # Reusable UI components
│   ├── services/             # Tool logic & API calls
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Zustand state management
│   ├── utils/                # Helper functions
│   ├── types/                # TypeScript types
│   └── config/               # App configuration
├── public/                   # Static assets
├── styles/                   # Global styles
├── package.json
└── README.md
```

### Repository 2: micro-tools-app (Backend)

```
/Users/sankha/Documents/projects/micro-tools/micro-tools-app/
├── src/
│   ├── routes/               # API route handlers
│   ├── services/             # Business logic
│   ├── middleware/           # Auth, rate limiting, etc.
│   ├── utils/                # Helpers
│   └── types/                # TypeScript types
├── package.json
└── README.md
```

## Repository Communication

### API Integration

**micro-tools-fe** communicates with **micro-tools-app** via HTTP REST API:

- Base URL configured via environment variable
- All API calls use Axios with interceptors
- CORS configured on backend to allow frontend origin
- Error handling and retry logic in frontend API client

### Development Setup

- Frontend runs on `http://localhost:3000` (or configured port)
- Backend runs on `http://localhost:3001` (or configured port)
- Frontend `.env` points to backend URL
- Backend `.env` allows frontend origin in CORS

### Production Deployment

- Frontend deployed to hosting (Vercel, Netlify, etc.)
- Backend deployed to server (Railway, Render, AWS, etc.)
- Frontend production `.env` points to backend production URL
- Backend production `.env` allows frontend production domain in CORS

## Core Architecture Decisions

### Frontend Stack

- **Framework**: React with TypeScript (Next.js or Vite + React Router)
- **Navigation**: React Router (or Next.js App Router)
- **State**: Zustand for global state (ads status, user preferences)
- **HTTP Client**: Axios with interceptors
- **JSON Formatting**: react-syntax-highlighter (for syntax highlighting in JSON editor)
- **PDF/Image**: pdf.js (for PDF viewing), HTML5 File API (for file uploads), sharp/browser-image-compression (client-side image processing) - Phase 2
- **QR Code**: qrcode.js (generator) - **COMPLETED** (scanner removed)
- **Storage**: localStorage for user preferences
- **Ads**: Google AdSense (banner and display ads)
- **Styling**: Tailwind CSS or CSS Modules

### Backend Stack

- **Framework**: Express.js with TypeScript
- **PDF Processing**: pdf-lib, sharp (for PDF ↔ Image conversion)
- **Currency API**: Integration with free tier APIs (exchangerate-api.io or similar)
- **Rate Limiting**: express-rate-limit
- **File Handling**: multer for uploads, temporary file cleanup
- **CORS**: Configured for web app origin

## Page Architecture

### 1. Home Page (`micro-tools-fe/src/pages/HomePage.tsx` or `micro-tools-fe/src/app/page.tsx` for Next.js)

- Grid/list view of all available tools
- Each tool card shows: icon, name, description
- **"Coming Soon" banner/badge** on non-MVP tools (all tools except JSON Formatter)
- JSON Formatter tool is fully functional and highlighted as the main feature
- Search/filter functionality
- Banner ad at bottom
- Navigation to individual tool pages (JSON Formatter is active, others show "coming soon" message)

### 2. Tool Pages Structure

Each tool follows a consistent pattern:

- Input section (form fields, HTML5 file input, etc.)
- Action button
- Output section (results, download button)
- Banner ad below output
- Interstitial ad trigger logic

**Individual Tool Pages (in micro-tools-fe):**

- `src/pages/JsonFormatterPage.tsx` - **MVP FOCUS**: Format, minify, validate, and beautify JSON
- `app/qr-code-generator/page.tsx` - **COMPLETED**: Generate QR codes
- `src/pages/PdfToImagePage.tsx` - PDF upload → image conversion (Phase 2)
- `src/pages/ImageToPdfPage.tsx` - Image upload → PDF creation (Phase 2)
- `src/pages/TextCaseConverterPage.tsx` - Text transformation (Phase 2)
- `src/pages/SpeedTestPage.tsx` - Internet speed checker (Phase 2)
- `src/pages/UnitConverterPage.tsx` - Currency, fuel, distance, time zones (Phase 3 - Deprioritized)

### 3. Settings Page (`micro-tools-fe/src/pages/SettingsPage.tsx`)

- Remove Ads purchase button (one-time)
- Privacy Policy link
- App version info
- User preferences (theme, default units)

## Tool Implementation Details

### JSON Formatter (`micro-tools-fe/src/services/JsonFormatterService.ts`) - **MVP FOCUS**

- **Client-side**: Fully client-side, no backend needed
- **Service Functions**:
  - `formatJson(json: string, indent: number = 2): string` - Format/beautify JSON
  - `minifyJson(json: string): string` - Remove all whitespace
  - `validateJson(json: string): { valid: boolean; error?: string; line?: number; column?: number }` - Validate and return error details
  - `parseJson(json: string): { success: boolean; data?: any; error?: string }` - Safe JSON parsing
- **Features**:
  - Format/Beautify JSON with customizable indentation (2, 4, or custom spaces)
  - Minify JSON (remove all whitespace)
  - Validate JSON and show error messages with line/column numbers
  - Syntax highlighting (using react-syntax-highlighter)
  - Copy to clipboard functionality
  - Download as .json file
  - Upload JSON file from local system
  - Clear input/output
  - Dark/light theme support for editor
  - Line numbers display
  - Error highlighting in editor
  - Auto-format on paste
  - Keyboard shortcuts (Ctrl/Cmd + Enter to format)
- **UI Components**:
  - `JsonEditor.tsx` - Syntax-highlighted editor with line numbers and error highlighting
  - `CopyButton.tsx` - Copy to clipboard button with success feedback
  - `DownloadButton.tsx` - Download JSON as file button
  - `FileUpload.tsx` - File upload component for JSON files
  - Action buttons: Format, Minify, Validate, Copy, Download, Clear, Upload
  - Error display area with formatted error messages
  - Indentation selector (2, 4 spaces)
  - Theme toggle (light/dark)
- **Edge Cases**: 
  - Handle invalid JSON gracefully with helpful error messages
  - Show error location (line, column) in editor
  - Handle large JSON files (performance optimization with debouncing)
  - Handle empty input
  - Handle malformed JSON (missing quotes, trailing commas, etc.)
  - Handle very deep nesting (prevent stack overflow)
  - Handle circular references (if parsing objects)
- **Performance**: 
  - Debounce validation for large files (>100KB)
  - Virtual scrolling for very large JSON (optional)
  - Lazy loading of syntax highlighter
  - Memoize formatted output
- **Accessibility**:
  - Keyboard navigation
  - Screen reader support
  - ARIA labels for buttons
  - Focus management

### QR Code Generator (`micro-tools-fe/src/services/QrCodeService.ts`) - **COMPLETED**

- **Generator**: Client-side QR code generation using qrcode.js
- **Status**: ✅ Implemented and available
- **Features**: Generate QR codes from text/URL, customizable error correction levels, size options, download/copy functionality
- **Edge Cases**: Handle invalid input, large text input

**Note**: QR code scanner functionality was removed due to production deployment issues with camera API. Only QR code generator remains available.

### Unit Converter (`micro-tools-fe/src/services/UnitConverterService.ts`) - Phase 3 (Deprioritized)

- **Client-side**: All conversions run in browser
- **Currency**: Fetches rates from micro-tools-app backend (cached), converts locally
- **Fuel/Distance**: Pure math, no backend needed
- **Time Zones**: Uses date-fns-tz library
- **Edge Cases**: Handle invalid inputs, overflow, division by zero

### PDF → Image (`micro-tools-app/src/routes/pdfToImage.ts`)

- **Backend Required**: Yes (heavy processing)
- **Flow**: Upload PDF via HTML5 file input → micro-tools-app converts → Return images array → Download
- **API**: `POST https://micro-tools-app/api/pdf-to-image` with multipart/form-data
- **Response**: Array of base64 images or file URLs
- **Cleanup**: Auto-delete temp files after 5 minutes

### Image → PDF (`micro-tools-app/src/routes/imageToPdf.ts`)

- **Backend Required**: Yes
- **Flow**: Upload images via HTML5 file input → micro-tools-app combines → Return PDF → Download
- **API**: `POST https://micro-tools-app/api/image-to-pdf` with multipart/form-data
- **Response**: PDF file URL or base64
- **Options**: Page size, orientation, margins

### Text Case Converter (`micro-tools-fe/src/services/TextCaseConverterService.ts`)

- **Client-side**: Pure string manipulation
- **Cases**: UPPER, lower, Title Case, Sentence case, camelCase, PascalCase, kebab-case, snake_case
- **Performance**: Instant, no backend needed

### Internet Speed Test (`micro-tools-fe/src/services/SpeedTestService.ts`)

- **Client-side**: Download/upload test using fetch API
- **Method**: Download test file from micro-tools-app backend, measure time
- **Backend Endpoint**: `GET https://micro-tools-app/api/speed-test-file` (returns small test file)
- **Metrics**: Download speed, upload speed, latency

### QR Code Generator (`micro-tools-fe/src/services/QrCodeService.ts`)

- **Client-side**: Generate QR codes locally using qrcode.js
- **Input**: Text, URL, contact info, WiFi credentials
- **Output**: Image (PNG/SVG) that can be downloaded/shared
- **Customization**: Size, error correction level, colors


## Ad Monetization Strategy

### Ad Placement (`micro-tools-fe/src/services/AdService.ts`)

**Banner Ads:**

- Home page: Bottom banner (always visible)
- Tool pages: Below output section
- Settings page: Bottom banner
- Frequency: Always shown

**Interstitial Ads:**

- Trigger points:
- After completing PDF conversion (heavy action)
- When navigating between tools (max once per 2 minutes)
- After 3 tool uses (session-based counter)
- Frequency cap: Max 1 interstitial per 2 minutes
- UX rules: Never show during typing, never block critical actions

### Ad Implementation (`micro-tools-fe/src/components/AdBanner.tsx`, `micro-tools-fe/src/hooks/useInterstitialAd.ts`)

- Banner component: Wrapper around Google AdSense ad units
- Interstitial hook: Manages loading, showing, frequency capping
- Error handling: Graceful fallback if ad fails to load
- AdSense script: Loaded via Next.js Script component

## Backend API Design

### API Routes (`micro-tools-app/src/routes/`)

**PDF Conversion:**

- `POST /api/pdf-to-image`
- Body: `multipart/form-data` with PDF file
- Response: `{ images: string[], success: boolean }`
- Rate limit: 10 requests/hour per IP
- `POST /api/image-to-pdf`
- Body: `multipart/form-data` with image files
- Query params: `pageSize`, `orientation`
- Response: `{ pdfUrl: string, success: boolean }`
- Rate limit: 10 requests/hour per IP

**Currency Exchange:**

- `GET /api/currency-rates`
- Response: `{ rates: Record<string, number>, base: string, timestamp: number }`
- Caching: 1 hour (rates update daily)
- Rate limit: 100 requests/hour per IP

**Speed Test:**

- `GET /api/speed-test-file`
- Response: Small test file (1MB)
- No rate limit (lightweight)

**Health Check:**

- `GET /api/health`
- Response: `{ status: 'ok', timestamp: number }`

### Middleware (`micro-tools-app/src/middleware/`)

- Rate limiting: `rateLimiter.ts`
- File upload: `uploadMiddleware.ts` (multer config)
- Error handling: `errorHandler.ts`
- CORS: Configured for micro-tools-fe origin

### Services (`micro-tools-app/src/services/`)

- `PdfService.ts`: PDF processing logic
- `ImageService.ts`: Image processing logic
- `CurrencyService.ts`: Fetch and cache exchange rates
- `FileCleanupService.ts`: Clean temp files periodically

## Performance Optimizations

### Web App

- Lazy load tool pages (React.lazy or Next.js dynamic imports)
- Image optimization: Compress before upload (browser-image-compression)
- PDF size limits: Max 10MB per file
- Debounce search input
- Memoize expensive calculations
- Code splitting: Separate bundles for each tool
- Service Worker: Cache static assets and enable offline-first for client-side tools (unit converter, text case)
- Progressive Web App (PWA): Optional installable app experience

### Backend

- File size limits: 10MB per file
- Temp file cleanup: Cron job every 5 minutes
- Response compression: gzip middleware
- Connection pooling for external APIs
- Cache currency rates in memory + Redis (optional)

## Security & Privacy

### Permissions

- Storage: Browser localStorage for preferences, no file system access needed
- Network: Required for backend calls

### Data Handling

- No user data stored on backend (stateless)
- Temp files auto-deleted
- No tracking without consent
- GDPR: Ad consent flow (if EU users)

### Abuse Protection

- Rate limiting on all endpoints
- File type validation
- File size limits
- IP-based throttling

## MVP Roadmap

### Phase 1: Core MVP - JSON Formatter Focus (1-2 weeks)

**micro-tools-fe:**

- [x] Repository setup (React web app)
- [x] Frontend dependencies and setup
- [x] Home page with tool grid and "coming soon" banners for non-MVP tools
- [x] **JSON Formatter tool (MVP focus)**:
  - [x] Install JSON formatter dependencies (react-syntax-highlighter)
  - [x] Create JsonFormatterService (format, minify, validate logic)
  - [x] Create JsonEditor component (syntax highlighting, line numbers)
  - [x] Create utility components (CopyButton, DownloadButton, FileUpload)
  - [x] Implement JsonFormatterPage with full functionality
  - [x] Add advanced features (indentation options, theme support)
  - [x] Error handling and edge cases
  - Features:
    - Format/beautify JSON with customizable indentation
    - Minify JSON
    - Validate JSON with error location
    - Copy to clipboard
    - Download as file
    - Upload JSON file
    - Syntax highlighting with theme support
    - Line numbers and error highlighting
- [x] Basic ad integration (banner only)
- [ ] Settings page (basic)
- [x] SEO optimization

**micro-tools-app:**

- [x] Repository setup (Express backend)
- [x] Health check endpoint
- [x] (No backend needed for JSON formatter - fully client-side)

### Phase 1.5: QR Code Generator - **COMPLETED** (1 week)

**micro-tools-fe:**

- [x] QR code generator page
  - [x] Install qrcode.js dependency
  - [x] Create QrCodeService for generation logic
  - [x] Build QrCodeGeneratorPage with input options (text, URL, etc.)
  - [x] Add download/copy functionality for generated QR codes
  - [x] SEO metadata for QR code generator page

**Note**: QR code scanner functionality was removed due to production deployment issues with camera API and html5-qrcode library. Only QR code generator remains available.

### Phase 2: Additional Tools (2-3 weeks)

**micro-tools-fe:**

- [ ] Text case converter
- [ ] PDF → Image page
- [ ] Image → PDF page
- [ ] Internet speed test page
- [ ] Interstitial ads
- [ ] Ad removal purchase flow
- [ ] Performance optimizations
- [ ] Error handling & edge cases

**micro-tools-app:**

- [ ] PDF → Image conversion endpoint
- [ ] Image → PDF conversion endpoint
- [ ] Speed test file endpoint

### Phase 3: Unit Converter & Polish (1-2 weeks)

**micro-tools-fe:**

- [ ] Unit converter (all types) - Deprioritized
- [ ] Additional polish and optimizations

**micro-tools-app:**

- [ ] Currency rates API (required for unit converter)

### Phase 3: Polish & Launch (1 week)

**micro-tools-fe:**

- [ ] Analytics integration (Google Analytics)
- [ ] Privacy policy page
- [ ] Favicon & app icons
- [ ] Testing on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Responsive design testing (mobile, tablet, desktop)
- [ ] PWA setup (optional)

**micro-tools-app:**

- [ ] Monitoring & logging
- [ ] Production deployment configuration

## Key Files to Create

**micro-tools-fe (Frontend) - MVP:**

- `src/app/page.tsx` (or `src/pages/HomePage.tsx`) - Home page with tool grid and "coming soon" banners
- `src/app/json-formatter/page.tsx` (or `src/pages/JsonFormatterPage.tsx`) - **MVP FOCUS**: JSON formatter tool page
- `src/services/JsonFormatterService.ts` - JSON formatting, minifying, validation, and parsing logic
- `src/components/JsonEditor.tsx` - Syntax-highlighted JSON editor component with line numbers
- `src/components/CopyButton.tsx` - Copy to clipboard button component
- `src/components/DownloadButton.tsx` - Download JSON file button component
- `src/components/FileUpload.tsx` - File upload component for JSON files
- `src/components/ComingSoonBadge.tsx` - Badge component for "coming soon" tools
- `src/pages/SettingsPage.tsx` - Settings page (basic)
- `src/services/AdService.ts` - Ad management utilities (already created)
- `src/components/AdBanner.tsx` - Ad banner component (already created)
- `src/store/useAppStore.ts` - Zustand store (already created)
- `src/config/api.ts` - API configuration (already created)

**micro-tools-fe (Frontend) - Phase 1.5 (COMPLETED):**

- `app/qr-code-generator/page.tsx` - QR code generator page ✅
- `app/qr-code-generator/layout.tsx` - SEO metadata ✅
- `src/services/QrCodeService.ts` - QR code generation logic ✅

**micro-tools-fe (Frontend) - Phase 2:**

- `src/pages/PdfToImagePage.tsx`
- `src/pages/ImageToPdfPage.tsx`
- `src/pages/TextCaseConverterPage.tsx`
- `src/pages/SpeedTestPage.tsx`

**micro-tools-app (Backend):**

- `src/routes/pdfToImage.ts`
- `src/routes/imageToPdf.ts`
- `src/routes/currency.ts`
- `src/routes/speedTest.ts`
- `src/routes/health.ts`
- `src/services/PdfService.ts`
- `src/services/ImageService.ts`
- `src/services/CurrencyService.ts`
- `src/middleware/rateLimiter.ts`
- `src/middleware/uploadMiddleware.ts`
- `src/middleware/cors.ts`

## Environment Configuration

**micro-tools-fe (.env.local or .env):**

- `NEXT_PUBLIC_SITE_URL` - Site URL for SEO (e.g., `http://localhost:3000` or `https://micro-tools.com`)
- `NEXT_PUBLIC_API_BASE_URL` (dev/prod) - Backend URL (e.g., `http://localhost:3001` or `https://api.micro-tools.com`) - if using Next.js
- `REACT_APP_API_BASE_URL` (dev/prod) - if using Create React App
- `VITE_API_BASE_URL` (dev/prod) - if using Vite
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` - Google AdSense client ID
- `NEXT_PUBLIC_ADSENSE_SLOT_ID` - AdSense ad unit slot ID

**micro-tools-app (.env):**

- `PORT` - Server port (default: 3001)
- `CORS_ORIGIN` - micro-tools-fe URL (e.g., `http://localhost:3000` or `https://micro-tools.com`)
- `CURRENCY_API_KEY` - API key for currency exchange service
- `MAX_FILE_SIZE` - Max file size in bytes (default: 10485760 = 10MB)
- `TEMP_FILE_DIR` - Directory for temporary file storage
- `NODE_ENV` - Environment (development/production)

