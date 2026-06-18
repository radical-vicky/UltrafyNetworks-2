import { NextRequest, NextResponse } from 'next/server';

// This would typically come from your database
// For now, we'll use a mock data source
const rolesData = [
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

// GET: Fetch all open roles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let roles = rolesData;
    
    // Filter by status if provided
    if (status) {
      roles = rolesData.filter(role => role.status === status);
    }
    
    return NextResponse.json({
      success: true,
      data: roles,
      total: roles.length,
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch job openings' 
      },
      { status: 500 }
    );
  }
}

// POST: Create a new job opening (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, department, location, type, desc } = body;
    
    if (!title || !department || !location || !type || !desc) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: title, department, location, type, desc' 
        },
        { status: 400 }
      );
    }
    
    // In a real app, you would save to database
    const newRole = {
      id: rolesData.length + 1,
      ...body,
      status: 'open',
      postedDate: new Date().toISOString().split('T')[0],
    };
    
    rolesData.push(newRole);
    
    return NextResponse.json({
      success: true,
      data: newRole,
      message: 'Job opening created successfully',
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create job opening' 
      },
      { status: 500 }
    );
  }
}

// PUT: Update a job opening (admin only)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Role ID is required' 
        },
        { status: 400 }
      );
    }
    
    const index = rolesData.findIndex(role => role.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Role not found' 
        },
        { status: 404 }
      );
    }
    
    rolesData[index] = { ...rolesData[index], ...updates };
    
    return NextResponse.json({
      success: true,
      data: rolesData[index],
      message: 'Job opening updated successfully',
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update job opening' 
      },
      { status: 500 }
    );
  }
}

// DELETE: Remove a job opening (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Role ID is required' 
        },
        { status: 400 }
      );
    }
    
    const index = rolesData.findIndex(role => role.id === parseInt(id));
    
    if (index === -1) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Role not found' 
        },
        { status: 404 }
      );
    }
    
    rolesData.splice(index, 1);
    
    return NextResponse.json({
      success: true,
      message: 'Job opening deleted successfully',
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete job opening' 
      },
      { status: 500 }
    );
  }
}
