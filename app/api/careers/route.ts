import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'careers.db');

// GET: Fetch all roles
export async function GET(request: NextRequest) {
  try {
    // Check if database exists
    if (!fs.existsSync(DB_PATH)) {
      // Create database with sample data
      const db = new Database(DB_PATH);
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
      
      const insertStmt = db.prepare(`
        INSERT INTO roles (title, department, location, type, icon, desc, status, posted_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const sampleRoles = [
        ['Field Technician', 'Network Operations', 'Thika', 'Full-time', 'Wrench', 'Install and maintain fibre connections for homes and businesses.', 'open', '2026-06-01'],
        ['Customer Support Agent', 'Customer Experience', 'Thika', 'Full-time', 'Headset', 'Be the first voice customers hear — handle billing questions.', 'open', '2026-06-10'],
        ['Sales Representative', 'Sales & Marketing', 'Thika', 'Full-time', 'TrendingUp', 'Help grow our customer base across Thika.', 'open', '2026-06-15']
      ];
      
      const insertMany = db.transaction((roles: any[][]) => {
        for (const role of roles) {
          insertStmt.run(role);
        }
      });
      
      insertMany(sampleRoles);
      db.close();
    }
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    
    const db = new Database(DB_PATH);
    let stmt;
    if (status === 'all') {
      stmt = db.prepare('SELECT * FROM roles ORDER BY posted_date DESC');
    } else {
      stmt = db.prepare('SELECT * FROM roles WHERE status = ? ORDER BY posted_date DESC');
    }
    
    const result = status === 'all' ? stmt.all() : stmt.all(status);
    db.close();
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job openings' },
      { status: 500 }
    );
  }
}

// POST: Create a new job
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
    
    // Ensure database exists
    if (!fs.existsSync(DB_PATH)) {
      const db = new Database(DB_PATH);
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
      db.close();
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare(`
      INSERT INTO roles (title, department, location, type, icon, desc, status, posted_date)
      VALUES (?, ?, ?, ?, ?, ?, 'open', date('now'))
    `);
    
    const info = stmt.run(title, department, location, type, icon || 'Wrench', desc);
    
    const getStmt = db.prepare('SELECT * FROM roles WHERE id = ?');
    const newRole = getStmt.get(info.lastInsertRowid);
    db.close();
    
    return NextResponse.json({
      success: true,
      data: newRole,
      message: 'Job created successfully',
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job' },
      { status: 500 }
    );
  }
}

// PUT: Update a job
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, department, location, type, icon, desc, status } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Job ID is required' },
        { status: 400 }
      );
    }
    
    const db = new Database(DB_PATH);
    
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
      db.close();
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }
    
    values.push(id);
    const query = `UPDATE roles SET ${updates.join(', ')} WHERE id = ? RETURNING *`;
    
    const stmt = db.prepare(query);
    const result = stmt.get(...values);
    db.close();
    
    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Job updated successfully',
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

// DELETE: Remove a job
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Job ID is required' },
        { status: 400 }
      );
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare('DELETE FROM roles WHERE id = ?');
    const result = stmt.run(parseInt(id));
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully',
    });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}