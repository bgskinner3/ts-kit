// scripts/generate-utils-list.ts
import fs from 'fs';
import path from 'path';


const LIB_PATH = path.resolve(process.cwd(), 'src/lib');

function parseMetadata(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');

  /**
   * Updated Regex:
   * 1. Captures JSDoc block
   * 2. Matches EITHER 'export' or 'static'
   * 3. Handles optional 'prettier-ignore' tags
   * 4. Captures the name of the utility
   */
  const regex = /\/\*\*([\s\S]*?)\*\/[\r\n]\s*(?:.*?\s+)?(?:export|static)\s+(?:const|function|async\s+function|get|set)?\s*(\w+)/g;

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

function generateRegistry() {
  const files = fs.readdirSync(LIB_PATH, { recursive: true }) as string[];

  return files
    .filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts'))
    .reduce((registry, file) => {
      const fullPath = path.join(LIB_PATH, file);
      const meta = parseMetadata(fullPath);
      
      if (meta.length > 0) {
        registry[file] = meta;
      }
      
      return registry;
    }, {} as Record<string, any[]>);
}

console.log(JSON.stringify(generateRegistry(), null, 2));