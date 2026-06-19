
import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';

function getDb(dbPath: string) {
  if (!fs.existsSync(dbPath)) {
    return null;
  }
  return new Database(dbPath);
}

export async function GET() {
  try {
    // Fetch all data from different databases
    const servicesDb = getDb('/tmp/services.db');
    const careersDb = getDb('/tmp/careers.db');
    const testimonialsDb = getDb('/tmp/testimonials.db');

    let services = [];
    let careers = [];
    let reviews = [];

    if (servicesDb) {
      services = servicesDb.prepare('SELECT * FROM services ORDER BY created_at DESC').all();
      servicesDb.close();
    }

    if (careersDb) {
      careers = careersDb.prepare('SELECT * FROM roles ORDER BY posted_date DESC').all();
      careersDb.close();
    }

    if (testimonialsDb) {
      reviews = testimonialsDb.prepare('SELECT * FROM testimonials ORDER BY created_at DESC').all();
      testimonialsDb.close();
    }

    return NextResponse.json({
      success: true,
      data: {
        services,
        careers,
        reviews,
      },
      totals: {
        services: services.length,
        careers: careers.length,
        reviews: reviews.length,
        pendingReviews: reviews.filter(r => r.status === 'pending').length,
        openJobs: careers.filter(c => c.status === 'open').length,
      }
    });
  } catch (error) {
    console.error('Error fetching all data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
