// src/app/api/proxy/route.ts
import { NextRequest } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '') || 'http://api-irelis.us-east-2.elasticbeanstalk.com';

export async function POST(request: NextRequest) {
  const { path, body, headers: clientHeaders } = await request.json();

  // Forward to real backend
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(clientHeaders || {}),
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const authHeader = searchParams.get('auth');

  if (!path) {
    return Response.json({ error: 'Missing path' }, { status: 400 });
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (authHeader) {
    headers['Authorization'] = `Bearer ${authHeader}`;
  }

  const res = await fetch(`${BACKEND_URL}${path}`, { headers });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}