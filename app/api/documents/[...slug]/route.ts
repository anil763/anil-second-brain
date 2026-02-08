import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { remark } from 'remark';
import html from 'remark-html';

export async function GET(
  request: Request,
  { params }: { params: { slug: string[] } }
) {
  try {
    const filePath = params.slug.join('/');
    // Try public/documents first (production), then documents (dev)
    let docPath = path.join(process.cwd(), 'public', 'documents', filePath);
    let docsDir = path.join(process.cwd(), 'public', 'documents');
    
    // For development, check if public/documents exists
    try {
      await fs.access(docsDir);
    } catch {
      // Fall back to documents directory for development
      docPath = path.join(process.cwd(), 'documents', filePath);
      docsDir = path.join(process.cwd(), 'documents');
    }

    // Security: Prevent path traversal
    const realPath = await fs.realpath(docPath);
    const realDocsDir = await fs.realpath(docsDir);
    
    if (!realPath.startsWith(realDocsDir)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Read markdown file
    const fileContents = await fs.readFile(docPath, 'utf-8');

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(fileContents);

    const htmlContent = processedContent.toString();

    return NextResponse.json({
      content: htmlContent,
      raw: fileContents,
    });
  } catch (error) {
    console.error('Error reading document:', error);
    return NextResponse.json(
      { error: 'Failed to read document' },
      { status: 500 }
    );
  }
}
