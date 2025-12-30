export interface JsonValidationResult {
  valid: boolean;
  error?: string;
  line?: number;
  column?: number;
}

export interface JsonParseResult {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Format/beautify JSON with customizable indentation
 */
export function formatJson(json: string, indent: number = 2): string {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed, null, indent);
  } catch (error) {
    throw new Error(`Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Minify JSON by removing all whitespace
 */
export function minifyJson(json: string): string {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed);
  } catch (error) {
    throw new Error(`Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validate JSON and return detailed error information
 */
export function validateJson(json: string): JsonValidationResult {
  if (!json || json.trim().length === 0) {
    return {
      valid: false,
      error: 'JSON is empty',
    };
  }

  try {
    JSON.parse(json);
    return { valid: true };
  } catch (error) {
    if (error instanceof SyntaxError) {
      // Try to extract line and column from error message
      const message = error.message;
      const lineMatch = message.match(/position (\d+)/);
      const position = lineMatch ? parseInt(lineMatch[1], 10) : null;

      let line: number | undefined;
      let column: number | undefined;

      if (position !== null) {
        // Calculate line and column from position
        const lines = json.substring(0, position).split('\n');
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }

      return {
        valid: false,
        error: message,
        line,
        column,
      };
    }

    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Safely parse JSON with error handling
 */
export function parseJson(json: string): JsonParseResult {
  if (!json || json.trim().length === 0) {
    return {
      success: false,
      error: 'JSON is empty',
    };
  }

  try {
    const data = JSON.parse(json);
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check if a string is valid JSON
 */
export function isValidJson(json: string): boolean {
  return validateJson(json).valid;
}

