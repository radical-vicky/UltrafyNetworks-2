import { NextRequest, NextResponse } from 'next/server';

// GET: Fetch all job applications (admin only)
export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd fetch from a database
    // For now, return a sample response
    return NextResponse.json({
      applications: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          position: 'Network Technician',
          status: 'pending'
        }
      ]
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

// POST: Submit a new job application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, position, experience } = body;
    
    if (!name || !email || !position) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, position' },
        { status: 400 }
      );
    }

    // In a real app, you'd save to a database
    // For now, return the submitted data
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      application: {
        id: Date.now(),
        name,
        email,
        position,
        experience: experience || 'Not specified',
        status: 'pending',
        submittedAt: new Date().toISOString()
      }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

// PUT: Update an existing application (admin only)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: id, status' },
        { status: 400 }
      );
    }

    // In a real app, you'd update in database
    return NextResponse.json({
      success: true,
      message: `Application ${id} updated to ${status}`,
      application: { id, status, updatedAt: new Date().toISOString() }
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}

// DELETE: Remove a job application
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID required' },
        { status: 400 }
      );
    }

    // In a real app, you'd delete from database
    return NextResponse.json({
      success: true,
      message: `Application ${id} deleted successfully`
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}
