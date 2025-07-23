import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, customization } = body

    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    // QR code options
    const options = {
      errorCorrectionLevel: customization?.errorCorrectionLevel || 'M',
      type: 'image/png' as const,
      quality: 0.92,
      margin: customization?.margin || 4,
      color: {
        dark: customization?.foregroundColor || '#000000',
        light: customization?.backgroundColor || '#ffffff'
      },
      width: 400
    }

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(content, options)

    return NextResponse.json({ qrCode: qrCodeDataUrl })
  } catch (error) {
    console.error('QR generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    )
  }
}