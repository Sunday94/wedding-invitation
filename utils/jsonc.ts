/**
 * Simple JSONC parser
 * This utility function strips comments (// and \/* *\/) from a JSONC string
 * and parses it using JSON.parse.
 */
export function parseJsonc<T>(jsonc: string): T {
    // Regex explanation:
    // 1. ("(?:\\.|[^"\\])*"): Matches double-quoted strings, handling escaped quotes.
    // 2. (\/\*[\s\S]*?\*\/): Matches block comments.
    // 3. (\/\/.*$): Matches line comments.

    const commentRegex = /("(?:\\.|[^"\\])*")|(\/\*[\s\S]*?\*\/|\/\/.*$)/gm;

    const clean = jsonc.replace(commentRegex, (match, str, comment) => {
        if (str) {
            return str; // Keep the string as is
        }
        return ''; // Remove the comment
    });

    return JSON.parse(clean);
}
