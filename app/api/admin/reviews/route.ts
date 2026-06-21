import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'testimonials.db');

function initializeDatabase() {
  let db: Database.Database;
  const dbExists = fs.existsSync(DB_PATH);
  
  if (!dbExists) {
    db = new Database(DB_PATH);
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        area TEXT NOT NULL,
        quote TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        status TEXT DEFAULT 'pending',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    const insertStmt = db.prepare(`
      INSERT INTO testimonials (name, area, quote, rating, status) 
      VALUES (?, ?, ?, ?, 'approved')
    `);
    
    const sampleTestimonials = [
      ['Grace Wanjiru', 'Weitethie', 'Switched from mobile data and never looked back. My kids\' online classes run without a single freeze now.', 5],
      ['Peter Mwangi', 'Ngoingwa', 'Installation took less than two hours and support actually picks up the phone when I call.', 5],
      ['Sarah Akinyi', 'Section 9', 'The 30 Mbps plan handles three of us streaming at once with no lag. Best decision for our home this year.', 5],
    ];
    
    const insertMany = db.transaction((testimonials: any[][]) => {
      for (const t of testimonials) {
        insertStmt.run(t);
      }
    });
    
    insertMany(sampleTestimonials);
    db.close();
    console.log('Testimonials database initialized!');
  }
}

// GET: Fetch all reviews
export async function GET() {
  try {
    initializeDatabase();
    const db = new Database(DB_PATH);
    const stmt = db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC');
    const result = stmt.all();
    db.close();
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews: ' + (error as Error).message },
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
    
    initializeDatabase();
    const db = new Database(DB_PATH);
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
    console.error('Error updating review:', error);
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
    
    initializeDatabase();
    const db = new Database(DB_PATH);
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
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}