import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    if (!code) {
      return NextResponse.json(
        { error: 'Code parameter is required' },
        { status: 400 }
      )
    }

    // Look up the QR code
    const { data: qrCode, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('short_code', code)
      .eq('is_active', true)
      .single()

    if (error || !qrCode) {
      return NextResponse.redirect(new URL('/404', request.url))
    }

    // Record the scan
    const userAgent = request.headers.get('user-agent') || ''
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ipAddress = forwardedFor?.split(',')[0] || request.headers.get('x-real-ip') || ''

    // Parse user agent for device info (simplified)
    const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent)
    const deviceType = isMobile ? 'mobile' : 'desktop'

    const browser = userAgent.includes('Chrome') ? 'Chrome' :
      userAgent.includes('Firefox') ? 'Firefox' :
        userAgent.includes('Safari') ? 'Safari' : 'Other'

    const os = userAgent.includes('Windows') ? 'Windows' :
      userAgent.includes('Mac') ? 'macOS' :
        userAgent.includes('Linux') ? 'Linux' :
          userAgent.includes('Android') ? 'Android' :
            userAgent.includes('iOS') ? 'iOS' : 'Other'

    // Insert scan record
    await supabase.from('qr_scans').insert({
      qr_code_id: qrCode.id,
      ip_address: ipAddress,
      user_agent: userAgent,
      device_type: deviceType,
      browser,
      os
    })

    // Update scan count
    await supabase
      .from('qr_codes')
      .update({ scan_count: qrCode.scan_count + 1 })
      .eq('id', qrCode.id)

    // Redirect to destination
    return NextResponse.redirect(qrCode.destination_url)
  } catch (error) {
    console.error('Redirect error:', error)
    return NextResponse.redirect(new URL('/404', request.url))
  }
}