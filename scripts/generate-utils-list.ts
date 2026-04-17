// scripts/generate-utils-list.ts
import path from 'path';
import { FileWriter } from './utils/file-writer';
import { DocsService } from './services/docs-service';
const JSON_OUTPUT = path.resolve(process.cwd(), 'docs/util-registry.json');
const run = async () => {
  try {
    console.log('🚀 Starting documentation generation...');

    // Traverse
    const registry = DocsService.generateRegistry();

    //  Transform
    const markdown = DocsService.buildMarkdownContent(registry);

    const outputPath = path.resolve(process.cwd(), 'docs/util-lib.md');

    FileWriter.writeGeneratedFile(outputPath, markdown, 'generate-docs.ts');
    FileWriter.writeJson(JSON_OUTPUT, registry);
    console.log('✨ Documentation successfully generated!');
  } catch (error) {
    console.error('❌ Documentation generation failed:', error);
    process.exit(1);
  }
};

run();

// import fs from 'fs';
// import path from 'path';
// import { FileWriter } from './utils/file-writer';

// /**
//  * Configuration
//  */
// const REPO_URL = 'https://github.com/bgskinner3/ts-kit/blob/main';
// const LIB_PATH = path.resolve(process.cwd(), 'src/lib');
// const DOCS_OUTPUT = path.resolve(process.cwd(), 'docs/util-lib.md');
// const JSON_OUTPUT = path.resolve(process.cwd(), 'docs/util-registry.json');
// const SCRIPT_NAME = 'generate-utils-list.ts';

// /**
//  * Extracts JSDoc metadata and utility names.
//  * Supports top-level exports and static class methods.
//  */

// function parseMetadata(filePath: string) {
//   const content = fs.readFileSync(filePath, 'utf8');

//   // This regex finds the JSDoc and the following 'export' or 'static' line
//   const regex = /\/\*\*([\s\S]*?)\*\/[\r\n]\s*(?:.*?\s+)?(?:export|static)\s+(?:const|function|async\s+function|get|set)?\s*(\w+)/g;

//   return [...content.matchAll(regex)].map((match) => {
//     const jsDoc = match[1];
//     const funcName = match[2];

//     /**
//      * 💡 LINE CALCULATION
//      * We calculate the start line by finding the index of the match,
//      * then adding the number of lines in the JSDoc to point exactly
//      * to the code (the export/static line).
//      */
//     const offset = match.index || 0;
//     const preContent = content.substring(0, offset);
//     const jsDocLines = jsDoc.split('\n').length;

//     // We add 1 because GitHub line numbers start at 1
//     const codeStartLine = preContent.split('\n').length + jsDocLines;

//     // 💡 PATH NORMALIZATION
//     const relativePath = path
//       .relative(process.cwd(), filePath)
//       .replace(/\\/g, '/'); // Force forward slashes for URLs

//     const githubLink = `${REPO_URL}/${relativePath}#L${codeStartLine}`;

//     const getTag = (tag: string) => {
//       const tagMatch = jsDoc.match(new RegExp(`@${tag}\\s+(.*)`));
//       return tagMatch ? tagMatch[1].trim() : '';
//     };

//     return {
//       name: funcName,
//       type: getTag('utilType'),
//       category: getTag('category'),
//       description: getTag('description'),
//       githubLink,
//     };
//   });
// }

// function buildMarkdownContent(registry: Record<string, any[]>) {
//   let md = '# 🛠️ Utility Registry\n\n';

//   const sortedFiles = Object.keys(registry).sort();

//   for (const file of sortedFiles) {
//     const utils = registry[file];
//     md += `## 📄 ${path.basename(file)}\n\n`;

//     md += '| Utility | Category | Type | Description | Source |\n';
//     md += '| :--- | :--- | :--- | :--- | :--- |\n';

//     utils
//       .sort((a, b) => a.name.localeCompare(b.name))
//       .forEach((util) => {
//         // The Utility name now links to the deep GitHub source line
//         md += `| **${util.name}** | ${util.category} | \`${util.type}\` | ${util.description} | [View Code](${util.githubLink}) |\n`;
//       });

//     md += '\n---\n\n';
//   }
//   return md;
// }

// /**
//  * Recursively scans src/lib for TypeScript files and parses them.
//  */
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

// /**
//  * Main Execution
//  */
// try {
//   console.log('🚀 Starting Registry Generation...');

//   const registry = generateRegistry();

//   // 1. Generate Markdown Document
//   const markdown = buildMarkdownContent(registry);
//   FileWriter.writeGeneratedFile(DOCS_OUTPUT, markdown, SCRIPT_NAME);

//   // 2. Generate JSON Metadata (useful for external tools)
//   FileWriter.writeJson(JSON_OUTPUT, registry);

//   console.log('✨ All documentation updated successfully!');
// } catch (error) {
//   console.error('❌ Failed to generate registry:', error);
//   process.exit(1);
// }
