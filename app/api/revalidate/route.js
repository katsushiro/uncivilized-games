// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

// First, make sure to install the package: npm install @sanity/webhook

const secret = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    // Get the signature from the headers
    const signature = request.headers.get(SIGNATURE_HEADER_NAME);
    
    // Read the raw request body as text
    const rawBody = await request.text();
    
    // Verify signature
    if (!signature || !await isValidSignature(rawBody, signature, secret)) {
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 401 });
    }
    
    // Parse the body to get the document data
    const jsonBody = JSON.parse(rawBody);
    const documentType = jsonBody._type; // Sanity includes document type in the _type field
    
    // Determine which paths to revalidate based on content type
    if (documentType === 'game') {
      revalidatePath('/');
      revalidatePath('/games');
      console.log('Revalidated game pages');
    } else if (documentType === 'post') {
      revalidatePath('/');
      revalidatePath('/blog');
      console.log('Revalidated blog pages');
    } else {
      // Fallback - revalidate everything if type is unknown
      revalidatePath('/', 'layout');
      console.log(`Revalidated all pages for document type: ${documentType}`);
    }
    
    return NextResponse.json({ 
      success: true, 
      revalidated: true, 
      now: Date.now(),
      type: documentType
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}