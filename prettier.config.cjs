/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 80,         // Max line length before wrapping
  semi: true,             // Always use semicolons
  singleQuote: true,      // Use single quotes for strings
  tabWidth: 2,            // Indentation size
  endOfLine: 'auto',      // Use OS-specific line endings (avoids LF/CRLF conflicts)
  trailingComma: 'all',   // Include trailing commas where valid in ES5
  bracketSpacing: true,   // Add spaces inside object literals { foo: bar }
  arrowParens: 'always',  // Always include parentheses around arrow function params
};
// module.exports = {
//   printWidth: 80,
//   semi: true,
//   singleQuote: true,
//   tabWidth: 2,
//   endOfLine: 'lf',
//   trailingComma: 'all',
// };
