// scripts/generate-utils-list.ts
import fs from 'fs';
import path from 'path';
import { FileWriter } from './utils/file-writer';

/**
 * Configuration
 */
const LIB_PATH = path.resolve(process.cwd(), 'src/lib');
const DOCS_OUTPUT = path.resolve(process.cwd(), 'docs/util-lib.md');
const JSON_OUTPUT = path.resolve(process.cwd(), 'docs/util-registry.json');
const SCRIPT_NAME = 'generate-utils-list.ts';

/**
 * Extracts JSDoc metadata and utility names.
 * Supports top-level exports and static class methods.
 */
function parseMetadata(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Regex captures:
  // 1. JSDoc block content
  // 2. The utility name (following 'export' or 'static')
  const regex =
    /\/\*\*([\s\S]*?)\*\/[\r\n]\s*(?:.*?\s+)?(?:export|static)\s+(?:const|function|async\s+function|get|set)?\s*(\w+)/g;

  return [...content.matchAll(regex)].map((match) => {
    const jsDoc = match[1];
    const funcName = match[2];

    const getTag = (tag: string) => {
      const tagMatch = jsDoc.match(new RegExp(`@${tag}\\s+(.*)`));
      return tagMatch ? tagMatch[1].trim() : '';
    };

    return {
      name: funcName,
      type: getTag('utilType'),
      category: getTag('category'),
      description: getTag('description'),
      link: getTag('link'),
    };
  });
}

/**
 * Recursively scans src/lib for TypeScript files and parses them.
 */
function generateRegistry() {
  const files = fs.readdirSync(LIB_PATH, { recursive: true }) as string[];

  return files
    .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
    .reduce(
      (registry, file) => {
        const fullPath = path.join(LIB_PATH, file);
        const meta = parseMetadata(fullPath);

        if (meta.length > 0) {
          registry[file] = meta;
        }

        return registry;
      },
      {} as Record<string, any[]>,
    );
}

/**
 * Converts the registry object into a formatted Markdown string.
 */
function buildMarkdownContent(registry: Record<string, any[]>) {
  let md = '# 🛠️ Utility Registry\n\n';
  md +=
    'Welcome to the internal utility documentation for `@bgskinner2/ts-utils`.\n\n';

  const sortedFiles = Object.keys(registry).sort();

  for (const file of sortedFiles) {
    const utils = registry[file];
    md += `## 📄 ${path.basename(file)}\n`;
    md += `**Location:** \`src/lib/${file}\`\n\n`;

    md += '| Utility | Category | Type | Description |\n';
    md += '| :--- | :--- | :--- | :--- |\n';

    utils
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((util) => {
        const link = util.link || `#${util.name.toLowerCase()}`;
        md += `| [**${util.name}**](${link}) | ${util.category} | \`${util.type}\` | ${util.description} |\n`;
      });

    md += '\n---\n\n';
  }
  return md;
}

/**
 * Main Execution
 */
try {
  console.log('🚀 Starting Registry Generation...');

  const registry = generateRegistry();

  // 1. Generate Markdown Document
  const markdown = buildMarkdownContent(registry);
  FileWriter.writeGeneratedFile(DOCS_OUTPUT, markdown, SCRIPT_NAME);

  // 2. Generate JSON Metadata (useful for external tools)
  FileWriter.writeJson(JSON_OUTPUT, registry);

  console.log('✨ All documentation updated successfully!');
} catch (error) {
  console.error('❌ Failed to generate registry:', error);
  process.exit(1);
}
// const LIB_PATH = path.resolve(process.cwd(), 'src/lib');
// // const REGISTRY_PATH = path.resolve(process.cwd(), 'docs/util-lib.md');

// function parseMetadata(filePath: string) {
//   const content = fs.readFileSync(filePath, 'utf8');

//   /**
//    * Updated Regex:
//    * 1. Captures JSDoc block
//    * 2. Matches EITHER 'export' or 'static'
//    * 3. Handles optional 'prettier-ignore' tags
//    * 4. Captures the name of the utility
//    */
//   const regex =
//     /\/\*\*([\s\S]*?)\*\/[\r\n]\s*(?:.*?\s+)?(?:export|static)\s+(?:const|function|async\s+function|get|set)?\s*(\w+)/g;

//   return [...content.matchAll(regex)].map((match) => {
//     const jsDoc = match[1];
//     const funcName = match[2];

//     const getTag = (tag: string) => {
//       const tagMatch = jsDoc.match(new RegExp(`@${tag}\\s+(.*)`));
//       return tagMatch ? tagMatch[1].trim() : '';
//     };

//     return {
//       name: funcName,
//       type: getTag('utilType'),
//       category: getTag('category'),
//       description: getTag('description'),
//       link: getTag('link'),
//     };
//   });
// }

// function generateRegistry() {
//   const files = fs.readdirSync(LIB_PATH, { recursive: true }) as string[];

//   return files
//     .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
//     .reduce(
//       (registry, file) => {
//         const fullPath = path.join(LIB_PATH, file);
//         const meta = parseMetadata(fullPath);

//         if (meta.length > 0) {
//           registry[file] = meta;
//         }

//         return registry;
//       },
//       {} as Record<string, any[]>,
//     );
// }
// function buildMarkdownContent(registry: Record<string, any[]>) {
//   let md = '# 🛠️ Utility Registry\n\n';

//   const sortedFiles = Object.keys(registry).sort();

//   for (const file of sortedFiles) {
//     const utils = registry[file];
//     md += `## 📄 ${path.basename(file)}\n`;
//     md += `**Location:** \`src/lib/${file}\`\n\n`;

//     md += '| Utility | Category | Type | Description |\n';
//     md += '| :--- | :--- | :--- | :--- |\n';

//     utils.sort((a, b) => a.name.localeCompare(b.name)).forEach(util => {
//       const link = util.link || `#${util.name.toLowerCase()}`;
//       md += `| [**${util.name}**](${link}) | ${util.category} | \`${util.type}\` | ${util.description} |\n`;
//     });

//     md += '\n---\n\n';
//   }
//   return md;
// }
// console.log(JSON.stringify(generateRegistry(), null, 2));
// const registry = generateRegistry();
// const markdown = buildMarkdownContent(registry);

// // Use your service to write the file
// FileWriter.writeGeneratedFile(
//   REGISTRY_PATH,
//   markdown,
//   'generate-registry.ts' // Name of this script for the banner
// );
