import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

// Initialize SQLite database with proper path for Vercel
let db: Database.Database | null = null;

function getDb() {
  if (!db) {
    // Use a temporary directory that works on Vercel
    const dbPath = process.env.NODE_ENV === 'production' 
      ? '/tmp/careers.db'  // Vercel's writable temp directory
      : 'careers.db';
    
    db = new Database(dbPath);
    
    // Create table if it doesn't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        department TEXT NOT NULL,
        location TEXT NOT NULL,
        type TEXT NOT NULL,
        icon TEXT DEFAULT 'Wrench',
        desc TEXT NOT NULL,
        status TEXT DEFAULT 'open',
        posted_date TEXT DEFAULT CURRENT_DATE
      )
    `);
    
    // Check if table is empty and insert sample data
    const count = db.prepare('SELECT COUNT(*) as count FROM roles').get() as { count: number };
    
    if (count.count === 0) {
      const insertStmt = db.prepare(`
        INSERT INTO roles (title, department, location, type, icon, desc, status, posted_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const sampleRoles = [
        ['Field Technician', 'Network Operations', 'Thika', 'Full-time', 'Wrench', 'Install and maintain fibre connections for homes and businesses, troubleshoot on-site issues, and keep our network running reliably across Thika.', 'open', '2026-06-01'],
        ['Customer Support Agent', 'Customer Experience', 'Thika', 'Full-time', 'Headset', 'Be the first voice customers hear — handle billing questions, technical support calls, and walk-in inquiries with patience and clarity.', 'open', '2026-06-10'],
        ['Sales Representative', 'Sales & Marketing', 'Thika', 'Full-time', 'TrendingUp', 'Help grow our customer base across Thika. Engage with potential clients, explain our packages, and drive adoption of fibre internet in new areas.', 'open', '2026-06-15']
      ];
      
      const insertMany = db.transaction((roles: any[][]) => {
        for (const role of roles) {
          insertStmt.run(role);
        }
      });
      
      insertMany(sampleRoles);
    }
  }
  return db;
}

// GET: Fetch all open roles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'open';
    
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM roles WHERE status = ? ORDER BY posted_date DESC');
    const result = stmt.all(status);
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Database error:', error);
    // Return mock data as fallback
    const mockRoles = [
      {
        id: 1,
        title: "Field Technician",
        department: "Network Operations",
        location: "Thika",
        type: "Full-time",
        icon: "Wrench",
        desc: "Install and maintain fibre connections for homes and businesses, troubleshoot on-site issues, and keep our network running reliably across Thika.",
        status: "open",
        postedDate: "2026-06-01",
      },
      {
        id: 2,
        title: "Customer Support Agent",
        department: "Customer Experience",
        location: "Thika",
        type: "Full-time",
        icon: "Headset",
        desc: "Be the first voice customers hear — handle billing questions, technical support calls, and walk-in inquiries with patience and clarity.",
        status: "open",
        postedDate: "2026-06-10",
      },
      {
        id: 3,
        title: "Sales Representative",
        department: "Sales & Marketing",
        location: "Thika",
        type: "Full-time",
        icon: "TrendingUp",
        desc: "Help grow our customer base across Thika. Engage with potential clients, explain our packages, and drive adoption of fibre internet in new areas.",
        status: "open",
        postedDate: "2026-06-15",
      },
    ];
    
    return NextResponse.json({
      success: true,
      data: mockRoles,
      total: mockRoles.length,
      usingFallback: true,
    }, { status: 200 });
  }
}

// POST: Create a new job opening
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, department, location, type, icon, desc } = body;
    
    if (!title || !department || !location || !type || !desc) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO roles (title, department, location, type, icon, desc, status, posted_date)
      VALUES (?, ?, ?, ?, ?, ?, 'open', date('now'))
    `);
    
    const info = stmt.run(title, department, location, type, icon || 'Wrench', desc);
    
    const getStmt = db.prepare('SELECT * FROM roles WHERE id = ?');
    const newRole = getStmt.get(info.lastInsertRowid);
    
    return NextResponse.json({
      success: true,
      data: newRole,
      message: 'Job opening created successfully',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job opening' },
      { status: 500 }
    );
  }
}

// PUT: Update an existing job opening
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, department, location, type, icon, desc, status } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Role ID is required' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    
    // Build dynamic update query
    const updates: string[] = [];
    const values: any[] = [];
    
    if (title) { updates.push('title = ?'); values.push(title); }
    if (department) { updates.push('department = ?'); values.push(department); }
    if (location) { updates.push('location = ?'); values.push(location); }
    if (type) { updates.push('type = ?'); values.push(type); }
    if (icon) { updates.push('icon = ?'); values.push(icon); }
    if (desc) { updates.push('desc = ?'); values.push(desc); }
    if (status) { updates.push('status = ?'); values.push(status); }
    
    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }
    
    values.push(id);
    const query = `UPDATE roles SET ${updates.join(', ')} WHERE id = ? RETURNING *`;
    
    const stmt = db.prepare(query);
    const result = stmt.get(...values);
    
    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Role not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Job opening updated successfully',
    }, { status: 200 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update job opening' },
      { status: 500 }
    );
  }
}

// DELETE: Remove a job opening
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Role ID is required' },
        { status: 400 }
      );
    }
    
    const db = getDb();
    const stmt = db.prepare('DELETE FROM roles WHERE id = ?');
    const result = stmt.run(parseInt(id));
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Role not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Job opening deleted successfully',
    }, { status: 200 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete job opening' },
      { status: 500 }
    );
  }
      }
