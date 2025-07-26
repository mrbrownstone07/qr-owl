'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { QRCodeList } from '@/components/dashboard/QRCodeList'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Plus, Crown } from 'lucide-react'
import Link from 'next/link'
import { AuthModal } from '@/components/auth/AuthModal'

export default function DashboardPage() {
  const { user, profile, loading } = useAuth()
  const [stats, setStats] = useState({
    totalQRCodes: 0,
    totalScans: 0,
    activeQRCodes: 0,
    conversionRate: 0,
    dynamicQRCodes: 0,
    staticQRCodes: 0
  })

  useEffect(() => {
    if (user) {
      fetchStats()
    }
  }, [user])

  const fetchStats = async () => {
    if (!user) return

    try {
      const { data: qrCodes } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('user_id', user.id)

      const { data: scans, count: totalScans } = await supabase
        .from('qr_scans')
        .select('*', { count: 'exact' })
        .in('qr_code_id', qrCodes?.map(qr => qr.id) || [])

      const dynamicCodes = qrCodes?.filter(qr => qr.type === 'dynamic') || []
      const staticCodes = qrCodes?.filter(qr => qr.type === 'static') || []
      const activeCodes = qrCodes?.filter(qr => qr.is_active) || []

      setStats({
        totalQRCodes: qrCodes?.length || 0,
        totalScans: totalScans || 0,
        activeQRCodes: activeCodes.length,
        conversionRate: qrCodes?.length ? Math.round((totalScans || 0) / qrCodes.length * 100) : 0,
        dynamicQRCodes: dynamicCodes.length,
        staticQRCodes: staticCodes.length
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md glass rounded-2xl p-8 shadow-glass border border-border/30 backdrop-blur-md">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-display font-semibold gradient-text-brand">
              Welcome to QR Pro
            </h1>
            <p className="text-muted-foreground text-base">
              Sign in to access your dashboard and manage your QR codes.
            </p>
            <AuthModal>
              <Button size="lg" className="w-full btn-glow">
                Sign In to Continue
              </Button>
            </AuthModal>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-600">Welcome back, {profile?.email}</p>
                {profile?.subscription_tier === 'pro' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Crown className="w-3 h-3 mr-1" />
                    PRO
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {profile?.subscription_tier === 'free' && (
                <Link href="/pricing">
                  <Button variant="outline" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 hover:from-yellow-500 hover:to-orange-600">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to PRO
                  </Button>
                </Link>
              )}
              <Link href="/generate">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create QR Code
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <DashboardStats stats={stats} />
          <QRCodeList />
        </div>
      </main>
    </div>
  )
}