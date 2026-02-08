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
    const docPath = path.join(process.cwd(), 'documents', filePath);

    // Security: Prevent path traversal
    const realPath = await fs.realpath(docPath);
    const docsDir = await fs.realpath(path.join(process.cwd(), 'documents'));
    
    if (!realPath.startsWith(docsDir)) {
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
