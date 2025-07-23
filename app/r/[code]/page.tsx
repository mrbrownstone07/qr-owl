import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { headers } from 'next/headers'

interface RedirectPageProps {
  params: {
    code: string
  }
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { code } = params
  
  try {
    // Look up the QR code
    const { data: qrCode, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('short_code', code)
      .eq('is_active', true)
      .single()

    if (error || !qrCode) {
      redirect('/404')
    }

    // Get request headers for analytics
    const headersList = headers()
    const userAgent = headersList.get('user-agent') || ''
    const forwardedFor = headersList.get('x-forwarded-for')
    const ipAddress = forwardedFor?.split(',')[0] || headersList.get('x-real-ip') || ''

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

    // Record the scan (fire and forget)
    supabase.from('qr_scans').insert({
      qr_code_id: qrCode.id,
      ip_address: ipAddress,
      user_agent: userAgent,
      device_type: deviceType,
      browser,
      os
    }).then(() => {
      // Update scan count
      return supabase
        .from('qr_codes')
        .update({ scan_count: qrCode.scan_count + 1 })
        .eq('id', qrCode.id)
    }).catch(console.error)

    // Redirect to destination
    redirect(qrCode.destination_url)
  } catch (error) {
    console.error('Redirect error:', error)
    redirect('/404')
  }
}