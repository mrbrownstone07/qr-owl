'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import { Mail, LogIn } from 'lucide-react'

interface AuthModalProps {
  children: React.ReactNode
}

export function AuthModal({ children }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { signIn } = useAuth()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error('Please enter your email address')
      return
    }

    setLoading(true)
    const { error } = await signIn(email)

    if (error) {
      toast.error(error.message)
    } else {
      setEmailSent(true)
      toast.success('Check your email for the magic link!')
    }

    setLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md glass rounded-2xl border border-border/30 shadow-glass backdrop-blur-md px-6 py-8">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-2xl font-display font-semibold gradient-text-brand flex items-center justify-center gap-2">
            <LogIn className="w-5 h-5" />
            Sign In to Continue
          </DialogTitle>
        </DialogHeader>

        {emailSent ? (
          <div className="text-center space-y-4">
            <Mail className="w-12 h-12 mx-auto text-success animate-float" />
            <h3 className="text-lg font-medium">Check Your Email</h3>
            <p className="text-muted-foreground">
              We’ve sent a magic link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Click the link in your inbox to log in. You may close this window.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setEmailSent(false)
                setEmail('')
              }}
              className="mt-4 interactive-subtle"
            >
              Use a Different Email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="focus:ring-2 focus:ring-ring focus:outline-none transition-all"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full btn-glow interactive"
            >
              {loading ? 'Sending Magic Link...' : 'Send Magic Link'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We'll email you a secure sign-in link — no password needed.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
