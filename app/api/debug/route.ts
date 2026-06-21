import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const projectRoot = process.cwd();
    const files = fs.readdirSync(projectRoot);
    
    // Find all .db files
    const dbFiles = files.filter(file => file.endsWith('.db'));
    
    // Check if services.db exists
    const servicesDbExists = fs.existsSync(path.join(projectRoot, 'services.db'));
    const careersDbExists = fs.existsSync(path.join(projectRoot, 'careers.db'));
    const testimonialsDbExists = fs.existsSync(path.join(projectRoot, 'testimonials.db'));
    
    return NextResponse.json({
      projectRoot,
      dbFiles,
      servicesDbExists,
      careersDbExists,
      testimonialsDbExists,
      allFiles: files.slice(0, 20) // Show first 20 files
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to read directory',
      message: (error as Error).message
    }, { status: 500 });
  }
}