import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Optional: Add SSL configuration if needed
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// GET: Fetch all open roles
export async function GET(request: NextRequest) {
  let client;
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'open';
    
    client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM roles WHERE status = $1 ORDER BY posted_date DESC',
      [status]
    );
    
    return NextResponse.json({
      success: true,
      data: result.rows,
      total: result.rowCount,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job openings' },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}

// POST: Create a new job opening
export async function POST(request: NextRequest) {
  let client;
  try {
    const body = await request.json();
    const { title, department, location, type, icon, desc } = body;
    
    // Validate required fields
    if (!title || !department || !location || !type || !desc) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    client = await pool.connect();
    const result = await client.query(
      `INSERT INTO roles (title, department, location, type, icon, desc, status, posted_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, department, location, type, icon || 'Wrench', desc, 'open', new Date().toISOString().split('T')[0]]
    );
    
    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Job opening created successfully',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job opening' },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}

// PUT: Update an existing job opening
export async function PUT(request: NextRequest) {
  let client;
  try {
    const body = await request.json();
    const { id, title, department, location, type, icon, desc, status } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Role ID is required' },
        { status: 400 }
      );
    }
    
    client = await pool.connect();
    
    // Build dynamic update query
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    if (title) { updates.push(`title = $${paramIndex++}`); values.push(title); }
    if (department) { updates.push(`department = $${paramIndex++}`); values.push(department); }
    if (location) { updates.push(`location = $${paramIndex++}`); values.push(location); }
    if (type) { updates.push(`type = $${paramIndex++}`); values.push(type); }
    if (icon) { updates.push(`icon = $${paramIndex++}`); values.push(icon); }
    if (desc) { updates.push(`desc = $${paramIndex++}`); values.push(desc); }
    if (status) { updates.push(`status = $${paramIndex++}`); values.push(status); }
    
    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }
    
    values.push(id);
    const query = `
      UPDATE roles 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;
    
    const result = await client.query(query, values);
    
    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Role not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Job opening updated successfully',
    }, { status: 200 });
    
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update job opening' },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}

// DELETE: Remove a job opening
export async function DELETE(request: NextRequest) {
  let client;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Role ID is required' },
        { status: 400 }
      );
    }
    
    client = await pool.connect();
    const result = await client.query(
      'DELETE FROM roles WHERE id = $1 RETURNING id',
      [parseInt(id)]
    );
    
    if (result.rowCount === 0) {
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
  } finally {
    if (client) client.release();
  }
      }
