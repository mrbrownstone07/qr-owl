'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Loader2 } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const handleMagicLink = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession()

      if (error) {
        console.error('Supabase login error:', error.message)
        router.replace('/login?error=auth_failed')
      } else {
        router.replace('/dashboard') // or '/' if you don't have a dashboard
      }
    }

    handleMagicLink()
  }, [supabase, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <Loader2 className="w-6 h-6 mb-2 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Finishing sign-in, please wait...</p>
    </div>
  )
}
