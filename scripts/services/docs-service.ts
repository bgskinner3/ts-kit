import fs from 'fs';
import path from 'path';
import type { UtilMetadata, UtilityRegistry } from '../models/types';

export class DocsService {
  private static REPO_URL = 'https://github.com/bgskinner3/ts-kit/blob/main';
  private static LIB_PATH = path.resolve(process.cwd(), 'src/lib');
  private static META_DATA_REGEX =
    /\/\*\*([\s\S]*?)\*\/[\r\n]\s*(?:.*?\s+)?(?:export|static)\s+(?:const|function|async|type\s+function|get|set|type)?\s*(\w+)/g;
  static buildMarkdownContent(registry: UtilityRegistry): string {
    let md = '# 🛠️ Utility Registry\n\n';
    md += '> This file is auto-generated. Do not edit manually.\n\n';

    const sortedFiles = Object.keys(registry).sort();

    for (const file of sortedFiles) {
      const utils = registry[file];
      md += `## 📄 ${path.basename(file)}\n\n`;

      md += '| Utility | Category | Type | Description | Source |\n';
      md += '| :--- | :--- | :--- | :--- | :--- |\n';

      utils
        .sort((a, b) => a.name.localeCompare(b.name))
        .forEach((util) => {
          md += `| **${util.name}** | ${util.category} | \`${util.type}\` | ${util.description} | [View Code](${util.githubLink}) |\n`;
        });

      md += '\n---\n\n';
    }
    return md;
  }
  static parseMetadata(filePath: string): UtilMetadata[] {
    const content = fs.readFileSync(filePath, 'utf8');

    return [...content.matchAll(this.META_DATA_REGEX)].map((match) => {
      const jsDoc = match[1];
      const funcName = match[2];

      const offset = match.index || 0;
      const preContent = content.substring(0, offset);
      const jsDocLines = jsDoc.split('\n').length;

      // Calculate the exact line of the code
      const codeStartLine = preContent.split('\n').length + jsDocLines;

      const relativePath = path
        .relative(process.cwd(), filePath)
        .replace(/\\/g, '/');

      // Use DocsService.REPO_URL because it is static
      const githubLink = `${DocsService.REPO_URL}/${relativePath}#L${codeStartLine}`;

      const getTag = (tag: string) => {
        const tagMatch = jsDoc.match(new RegExp(`@${tag}\\s+(.*)`));
        return tagMatch ? tagMatch[1].trim() : '';
      };

      return {
        name: funcName,
        type: getTag('utilType'),
        category: getTag('category'),
        description: getTag('description'),
        githubLink,
      };
    });
  }

  static generateRegistry(): UtilityRegistry {
    // Specifying 'utf8' encoding forces the return type to string[]
    const files = fs.readdirSync(this.LIB_PATH, {
      recursive: true,
      encoding: 'utf8',
    });

    return files
      .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts'))
      .reduce<UtilityRegistry>((registry, file) => {
        const fullPath = path.join(this.LIB_PATH, file);
        const meta = this.parseMetadata(fullPath);

        if (meta.length > 0) {
          registry[file] = meta;
        }

        return registry;
      }, {});
  }
}
