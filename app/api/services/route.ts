import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Use the database file in your project root
const DB_PATH = path.join(process.cwd(), 'services.db');

export async function GET() {
  try {
    // Check if database exists
    if (!fs.existsSync(DB_PATH)) {
      // Initialize with sample data
      const db = new Database(DB_PATH);
      db.exec(`
        CREATE TABLE IF NOT EXISTS services (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          icon TEXT DEFAULT 'Wifi',
          color TEXT DEFAULT 'bg-blue-500',
          image TEXT DEFAULT '/images/services/placeholder.jpg',
          category TEXT DEFAULT 'Connectivity',
          features TEXT DEFAULT '[]',
          status TEXT DEFAULT 'active',
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      const insertStmt = db.prepare(`
        INSERT INTO services (title, description, icon, color, image, category, features, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'active')
      `);
      
      const sampleServices = [
        ['Internet Installation', 'Professional fibre and wireless internet installation for homes and businesses.', 'Wifi', 'bg-blue-500', '/images/services/internet.jpg', 'Connectivity', JSON.stringify(['Fibre to the home', 'Wireless setup', 'Network configuration'])],
        ['CCTV Installation', 'HD surveillance systems with remote viewing access for homes and businesses.', 'Camera', 'bg-slate-700', '/images/services/cctv.jpg', 'Security', JSON.stringify(['HD cameras', 'Remote viewing', 'Night vision'])],
        ['Solar Panels', 'Solar energy solutions with battery backup options for homes and businesses.', 'Sun', 'bg-amber-500', '/images/services/solar.jpg', 'Energy', JSON.stringify(['Solar panel installation', 'Battery backup', 'System design'])],
      ];
      
      const insertMany = db.transaction((services: any[][]) => {
        for (const s of services) {
          insertStmt.run(s);
        }
      });
      
      insertMany(sampleServices);
      db.close();
      console.log('Database created with sample services!');
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare('SELECT * FROM services ORDER BY created_at DESC');
    const result = stmt.all();
    db.close();
    
    // Parse features JSON for each service
    const parsedData = result.map((r: any) => ({
      ...r,
      features: JSON.parse(r.features || '[]')
    }));
    
    return NextResponse.json({
      success: true,
      data: parsedData,
      total: result.length,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch services: ' + (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, features, image, color } = body;
    
    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: 'Title and description are required' },
        { status: 400 }
      );
    }
    
    // Ensure database exists
    if (!fs.existsSync(DB_PATH)) {
      const db = new Database(DB_PATH);
      db.exec(`
        CREATE TABLE IF NOT EXISTS services (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          icon TEXT DEFAULT 'Wifi',
          color TEXT DEFAULT 'bg-blue-500',
          image TEXT DEFAULT '/images/services/placeholder.jpg',
          category TEXT DEFAULT 'Connectivity',
          features TEXT DEFAULT '[]',
          status TEXT DEFAULT 'active',
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `);
      db.close();
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare(`
      INSERT INTO services (title, description, icon, color, image, category, features, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'active')
    `);
    
    const info = stmt.run(
      title,
      description,
      'Wifi',
      color || 'bg-blue-500',
      image || '/images/services/placeholder.jpg',
      category || 'Connectivity',
      JSON.stringify(features || [])
    );
    
    const getStmt = db.prepare('SELECT * FROM services WHERE id = ?');
    const newService = getStmt.get(info.lastInsertRowid) as any;
    db.close();
    
    return NextResponse.json({
      success: true,
      data: {
        ...newService,
        features: JSON.parse(newService.features || '[]')
      },
      message: 'Service added successfully',
    });
  } catch (error) {
    console.error('Error adding service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add service: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Service ID required' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    const { title, description, category, features, image, color, status } = body;
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare(`
      UPDATE services 
      SET title = ?, description = ?, icon = ?, color = ?, image = ?, category = ?, features = ?, status = ?
      WHERE id = ?
    `);
    
    const result = stmt.run(
      title || '',
      description || '',
      'Wifi',
      color || 'bg-blue-500',
      image || '/images/services/placeholder.jpg',
      category || 'Connectivity',
      JSON.stringify(features || []),
      status || 'active',
      parseInt(id)
    );
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Service updated successfully',
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Service ID required' },
        { status: 400 }
      );
    }
    
    const db = new Database(DB_PATH);
    const stmt = db.prepare('DELETE FROM services WHERE id = ?');
    const result = stmt.run(parseInt(id));
    db.close();
    
    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}