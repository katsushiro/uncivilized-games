// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, secret } = body;
    
    // Verify webhook secret
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    
    // Determine which paths to revalidate based on content type
    if (type === 'game') {
      revalidatePath('/');
      revalidatePath('/games');
    } else if (type === 'post') {
      revalidatePath('/');
      revalidatePath('/blog');
    }
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}