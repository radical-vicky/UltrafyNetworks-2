import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';

function getDb() {
  const dbPath = '/tmp/testimonials.db';
  if (!fs.existsSync(dbPath)) {
    return null;
  }
  return new Database(dbPath);
}

// GET: Fetch all reviews (admin only)
export async function GET() {
  try {
    const db = getDb();
    if (!db) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
      });
    }
    
    const stmt = db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC');
    const result = stmt.all();
    db.close();
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// PUT: Update review status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not found' },
        { status: 404 }
      );
    }
    
    const stmt = db.prepare('UPDATE testimonials SET status = ? WHERE id = ?');
    const result = stmt.run(status, id);
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: `Review ${status} successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a review
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Review ID required' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not found' },
        { status: 404 }
      );
    }
    
    const stmt = db.prepare('DELETE FROM testimonials WHERE id = ?');
    const result = stmt.run(parseInt(id));
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
