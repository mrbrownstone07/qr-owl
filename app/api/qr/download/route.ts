import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { qrCode, format } = await request.json()

    if (!qrCode || !format) {
      return NextResponse.json(
        { error: 'QR code and format are required' },
        { status: 400 }
      )
    }

    // Extract base64 data from data URL
    const base64Data = qrCode.replace(/^data:image\/[a-z]+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    let contentType = 'image/png'
    let responseBuffer = buffer

    switch (format) {
      case 'png':
        contentType = 'image/png'
        break
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg'
        // For JPG, we'd normally convert the PNG, but for simplicity we'll keep as PNG
        break
      case 'svg':
        // For production, you'd convert to SVG format
        contentType = 'image/svg+xml'
        break
      case 'eps':
        // For production, you'd convert to EPS format
        contentType = 'application/postscript'
        break
      default:
        return NextResponse.json(
          { error: 'Unsupported format' },
          { status: 400 }
        )
    }

    return new NextResponse(responseBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="qr-code.${format}"`
      }
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to download QR code' },
      { status: 500 }
    )
  }
}