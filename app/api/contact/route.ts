import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'messages.db');

function initializeDatabase() {
  try {
    const dbExists = fs.existsSync(DB_PATH);
    const db = new Database(DB_PATH);
    
    if (!dbExists) {
      db.exec(`
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fullName TEXT NOT NULL,
          email TEXT,
          phone TEXT NOT NULL,
          subject TEXT NOT NULL,
          message TEXT NOT NULL,
          status TEXT DEFAULT 'unread',
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ Messages database initialized!');
    }
    db.close();
    return true;
  } catch (error) {
    console.error('❌ Error initializing messages database:', error);
    return false;
  }
}

// POST: Save contact form message
export async function POST(request: NextRequest) {
  try {
    initializeDatabase();
    
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;
    
    if (!fullName || !phone || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare(`
      INSERT INTO messages (fullName, email, phone, subject, message, status)
      VALUES (?, ?, ?, ?, ?, 'unread')
    `);
    
    const info = stmt.run(fullName, email || null, phone, subject, message);
    db.close();
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      id: info.lastInsertRowid,
    });
  } catch (error) {
    console.error('❌ Error saving message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

// GET: Fetch all messages (admin only)
export async function GET(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '100');
    
    if (!fs.existsSync(DB_PATH)) {
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
      });
    }
    
    const db = new Database(DB_PATH);
    let query = 'SELECT * FROM messages';
    const params: any[] = [];
    
    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(limit);
    
    const stmt = db.prepare(query);
    const result = stmt.all(...params);
    db.close();
    
    return NextResponse.json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// PUT: Update message status
export async function PUT(request: NextRequest) {
  try {
    initializeDatabase();
    
    const body = await request.json();
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare('UPDATE messages SET status = ? WHERE id = ?');
    const result = stmt.run(status, id);
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Message status updated successfully',
    });
  } catch (error) {
    console.error('❌ Error updating message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

// DELETE: Delete a message
export async function DELETE(request: NextRequest) {
  try {
    initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Message ID required' },
        { status: 400 }
      );
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare('DELETE FROM messages WHERE id = ?');
    const result = stmt.run(parseInt(id));
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error deleting message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}