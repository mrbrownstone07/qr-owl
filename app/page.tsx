'use client'

import { Navbar } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  QrCode,
  Zap,
  BarChart3,
  Palette,
  Shield,
  Users,
  ArrowRight,
  Check,
  Star,
  Crown
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">
            <Star className="w-4 h-4 mr-1" />
            Professional QR Code Platform
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Create Beautiful,
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Trackable
            </span>
            <br />QR Codes
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate professional QR codes with advanced customization, real-time analytics,
            and dynamic editing capabilities. Perfect for businesses and creators.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/generate">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8">
                <Zap className="w-5 h-5 mr-2" />
                Create Free QR Code
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Crown className="w-5 h-5 mr-2" />
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Preview QR Code */}
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-auto">
            <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="w-32 h-32 text-gray-400" />
            </div>
            <p className="text-gray-600">Live QR Code Preview</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Professional QR Codes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From basic static codes to advanced dynamic campaigns with detailed analytics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Cards */}
          {[{
            icon: <Palette className="w-12 h-12 text-blue-600 mb-4" />,
            title: 'Advanced Customization',
            desc: 'Customize colors, add logos, choose from multiple frames and templates. Create QR codes that match your brand perfectly.',
          }, {
            icon: <Zap className="w-12 h-12 text-purple-600 mb-4" />,
            title: 'Dynamic QR Codes',
            desc: 'Edit destinations after printing. Perfect for campaigns, menus, and any content that needs regular updates.',
          }, {
            icon: <BarChart3 className="w-12 h-12 text-green-600 mb-4" />,
            title: 'Detailed Analytics',
            desc: 'Track scans, locations, devices, and more. Understand your audience and measure campaign performance.',
          }, {
            icon: <Shield className="w-12 h-12 text-red-600 mb-4" />,
            title: 'Bulk Operations',
            desc: 'Upload CSV files to create hundreds of QR codes at once. Perfect for large campaigns and inventory management.',
          }, {
            icon: <Users className="w-12 h-12 text-orange-600 mb-4" />,
            title: 'Team Collaboration',
            desc: 'Share QR codes with team members, manage permissions, and collaborate on campaigns seamlessly.',
          }, {
            icon: <QrCode className="w-12 h-12 text-indigo-600 mb-4" />,
            title: 'Multiple Formats',
            desc: 'Download in PNG, JPG, SVG, and EPS formats. Perfect for both digital and print applications.',
          }].map(({ icon, title, desc }) => (
            <Card key={title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                {icon}
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mx-4 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Start Free, Upgrade When You Grow
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Create unlimited static QR codes for free. Upgrade to PRO for dynamic codes,
            analytics, and advanced features with a 14-day free trial.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4">Free Plan</h3>
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2"><Check className="w-5 h-5" />Unlimited static QR codes</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5" />Basic customization</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5" />PNG/JPG downloads</li>
              </ul>
            </div>

            <div className="bg-white/20 backdrop-blur rounded-xl p-6 border-2 border-white/30">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Crown className="w-6 h-6" /> PRO Plan
              </h3>
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2"><Check className="w-5 h-5" />Unlimited dynamic QR codes</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5" />Advanced analytics</li>
                <li className="flex items-center gap-2"><Check className="w-5 h-5" />SVG/EPS downloads</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/pricing">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                View All Features <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCode className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">QR Pro</span>
          </div>
          <p className="text-gray-500">
            Professional QR code generation platform for businesses and creators
          </p>
        </div>
      </footer>
    </div>
  )
}
