// components/layout/navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { QrCode, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
    const pathname = usePathname()
    const isHome = pathname === '/'

    return (
        <header className="container mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <QrCode className="w-8 h-8 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">QR Pro</span>
                </div>

                <div className="flex items-center gap-4">
                    {isHome ? (
                        <>
                            <Link href="/pricing">
                                <Button variant="outline">Pricing</Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button variant="secondary">Dashboard</Button>
                            </Link>
                            <Link href="/generate">
                                <Button variant="default">Create QR</Button>
                            </Link>
                        </>
                    ) : (
                        <Link href="/">
                            <Button variant="ghost" className="text-gray-700">
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Back to Home
                            </Button>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}
