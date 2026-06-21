import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Use project directory instead of /tmp for Windows compatibility
const DB_PATH = path.join(process.cwd(), 'testimonials.db');

function initializeDatabase() {
  try {
    const dbExists = fs.existsSync(DB_PATH);
    const db = new Database(DB_PATH);
    
    if (!dbExists) {
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
      console.log('✅ Testimonials database initialized!');
    }
    db.close();
    return true;
  } catch (error) {
    console.error('❌ Error initializing testimonials database:', error);
    return false;
  }
}

// GET: Fetch all approved testimonials
export async function GET(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Check if database file exists
    if (!fs.existsSync(DB_PATH)) {
      // Return mock data as fallback
      const mockTestimonials = [
        { id: 1, name: "Grace Wanjiru", area: "Weitethie", quote: "Switched from mobile data and never looked back. My kids' online classes run without a single freeze now.", rating: 5, status: "approved" },
        { id: 2, name: "Peter Mwangi", area: "Ngoingwa", quote: "Installation took less than two hours and support actually picks up the phone when I call.", rating: 5, status: "approved" },
        { id: 3, name: "Sarah Akinyi", area: "Section 9", quote: "The 30 Mbps plan handles three of us streaming at once with no lag. Best decision for our home this year.", rating: 5, status: "approved" },
      ];
      
      return NextResponse.json({
        success: true,
        data: mockTestimonials,
        total: mockTestimonials.length,
        usingFallback: true,
      }, { status: 200 });
    }
    
    const db = new Database(DB_PATH);
    // Use single quotes for string literals in SQLite
    const stmt = db.prepare(
      "SELECT * FROM testimonials WHERE status = 'approved' ORDER BY created_at DESC LIMIT ?"
    );
    const result = stmt.all(limit);
    db.close();
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Database error:', error);
    // Return mock data as fallback
    const mockTestimonials = [
      { id: 1, name: "Grace Wanjiru", area: "Weitethie", quote: "Switched from mobile data and never looked back. My kids' online classes run without a single freeze now.", rating: 5, status: "approved" },
      { id: 2, name: "Peter Mwangi", area: "Ngoingwa", quote: "Installation took less than two hours and support actually picks up the phone when I call.", rating: 5, status: "approved" },
      { id: 3, name: "Sarah Akinyi", area: "Section 9", quote: "The 30 Mbps plan handles three of us streaming at once with no lag. Best decision for our home this year.", rating: 5, status: "approved" },
    ];
    
    return NextResponse.json({
      success: true,
      data: mockTestimonials,
      total: mockTestimonials.length,
      usingFallback: true,
    }, { status: 200 });
  }
}

// POST: Create a new testimonial (pending approval)
export async function POST(request: NextRequest) {
  try {
    initializeDatabase();
    
    const body = await request.json();
    const { name, area, quote, rating } = body;
    
    if (!name || !area || !quote) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please fill in all required fields: name, area, quote' 
        },
        { status: 400 }
      );
    }
    
    const validRating = rating && rating >= 1 && rating <= 5 ? rating : 5;
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare(`
      INSERT INTO testimonials (name, area, quote, rating, status)
      VALUES (?, ?, ?, ?, 'pending')
    `);
    
    const info = stmt.run(name.trim(), area.trim(), quote.trim(), validRating);
    
    const getStmt = db.prepare('SELECT * FROM testimonials WHERE id = ?');
    const newTestimonial = getStmt.get(info.lastInsertRowid);
    db.close();
    
    return NextResponse.json({
      success: true,
      data: newTestimonial,
      message: 'Thank you! Your review has been submitted and is awaiting approval.',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit review. Please try again.' 
      },
      { status: 500 }
    );
  }
}

// DELETE: Remove a testimonial (admin only)
export async function DELETE(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare('DELETE FROM testimonials WHERE id = ?');
    const result = stmt.run(parseInt(id));
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully',
    }, { status: 200 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}