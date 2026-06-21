import { NextRequest, NextResponse } from 'next/server';

// In production, use a real email service like SendGrid, Resend, or Nodemailer
// For now, we'll use a simple implementation

// Store reset tokens in memory (in production, use a database)
const resetTokens = new Map<string, { token: string; expires: Date }>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // In production, check if the email exists in your database
    // For now, we'll accept any email
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ultrafynetworks.co.ke';
    
    // Generate a reset token
    const token = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    
    // Store token with expiration (15 minutes)
    resetTokens.set(email, {
      token,
      expires: new Date(Date.now() + 15 * 60 * 1000),
    });

    // In production, send an email with the reset link
    const resetLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    
    console.log('Password reset link:', resetLink);
    console.log('Reset token:', token);

    // For development, return the token in the response
    // In production, send an email and don't expose the token
    return NextResponse.json({
      success: true,
      message: 'Password reset instructions sent to your email',
      // Remove this in production
      debug: {
        token,
        resetLink,
      },
    });

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json(
        { error: 'Invalid reset link' },
        { status: 400 }
      );
    }

    // Verify token
    const stored = resetTokens.get(email);
    if (!stored || stored.token !== token) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    if (new Date() > stored.expires) {
      resetTokens.delete(email);
      return NextResponse.json(
        { error: 'Reset token has expired' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Token is valid',
      email,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify reset token' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, email, newPassword } = body;

    if (!token || !email || !newPassword) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Verify token
    const stored = resetTokens.get(email);
    if (!stored || stored.token !== token) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    if (new Date() > stored.expires) {
      resetTokens.delete(email);
      return NextResponse.json(
        { error: 'Reset token has expired' },
        { status: 400 }
      );
    }

    // In production, update the password in your database
    // For now, we'll store it in an environment variable or file
    // This is just for demo - in production, use a proper database
    
    // Delete the used token
    resetTokens.delete(email);

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully',
      // In production, you would save the new password to your database
      // For demo, we'll just echo back
      newPassword,
    });

  } catch (error) {
    console.error('Password update error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}