import { NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `tickets/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    const publicUrl = await uploadToR2(buffer, fileName, file.type || 'application/pdf');

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
    });
  } catch (error: any) {
    console.error('❌ R2 upload error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload file to Cloudflare R2' },
      { status: 500 }
    );
  }
}
