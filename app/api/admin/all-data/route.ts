import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  image: string;
  category: string;
  features: string;
  status: string;
  created_at: string;
}

interface Career {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  icon: string;
  desc: string;
  status: string;
  posted_date: string;
}

interface Review {
  id: number;
  name: string;
  area: string;
  quote: string;
  rating: number;
  status: string;
  created_at: string;
}

function getDb(dbName: string): Database.Database | null {
  const dbPath = path.join(process.cwd(), dbName);
  if (!fs.existsSync(dbPath)) {
    console.log(`Database not found: ${dbPath}`);
    return null;
  }
  console.log(`Found database: ${dbPath}`);
  return new Database(dbPath);
}

export async function GET() {
  try {
    const projectRoot = process.cwd();
    console.log('Project root:', projectRoot);
    
    // Fetch all data from different databases
    const servicesDb = getDb('services.db');
    const careersDb = getDb('careers.db');
    const testimonialsDb = getDb('testimonials.db');

    let services: Service[] = [];
    let careers: Career[] = [];
    let reviews: Review[] = [];

    if (servicesDb) {
      try {
        services = servicesDb.prepare('SELECT * FROM services ORDER BY created_at DESC').all() as Service[];
        console.log(`Found ${services.length} services`);
      } catch (e) {
        console.error('Error reading services:', e);
      }
      servicesDb.close();
    }

    if (careersDb) {
      try {
        careers = careersDb.prepare('SELECT * FROM roles ORDER BY posted_date DESC').all() as Career[];
        console.log(`Found ${careers.length} careers`);
      } catch (e) {
        console.error('Error reading careers:', e);
      }
      careersDb.close();
    }

    if (testimonialsDb) {
      try {
        reviews = testimonialsDb.prepare('SELECT * FROM testimonials ORDER BY created_at DESC').all() as Review[];
        console.log(`Found ${reviews.length} reviews`);
      } catch (e) {
        console.error('Error reading reviews:', e);
      }
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
      { 
        success: false, 
        error: 'Failed to fetch data: ' + (error as Error).message,
        stack: (error as Error).stack,
      },
      { status: 500 }
    );
  }
}