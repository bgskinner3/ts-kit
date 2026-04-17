// scripts/generate-utils-list.ts
import path from 'path';
import { FileWriter } from './utils/file-writer';
import { DocsService } from './services/docs-service';
// const JSON_OUTPUT = path.resolve(process.cwd(), 'docs/util-registry.json');
const run = async () => {
  try {
    console.log('🚀 Starting documentation generation...');

    // Traverse
    const registry = DocsService.generateRegistry();

    //  Transform
    const markdown = DocsService.buildMarkdownContent(registry);

    const outputPath = path.resolve(process.cwd(), 'docs/util-lib.md');

    FileWriter.writeGeneratedFile(outputPath, markdown, 'generate-docs.ts');
    // FileWriter.writeJson(JSON_OUTPUT, registry);
    console.log('✨ Documentation successfully generated!');
  } catch (error) {
    console.error('❌ Documentation generation failed:', error);
    process.exit(1);
  }
};

run();
