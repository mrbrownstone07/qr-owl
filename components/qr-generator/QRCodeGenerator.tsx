'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ColorPicker } from './ColorPicker'
import { QRPreview } from './QRPreview'
import { QRCustomization } from './QRCustomization'
import { Download, Save, Sparkles } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { nanoid } from 'nanoid'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

const QR_TYPES = {
  static: {
    url: 'Website URL',
    text: 'Plain Text',
    email: 'Email',
    sms: 'SMS',
    phone: 'Phone',
    wifi: 'Wi-Fi',
    vcard: 'vCard Contact',
    twitter: 'Twitter',
    bitcoin: 'Bitcoin'
  },
  dynamic: {
    url: 'Dynamic URL',
    vcard_plus: 'vCard Plus',
    app_links: 'App Store Links',
    coupon: 'Coupon',
    event: 'Event',
    pdf: 'PDF',
    gallery: 'Image Gallery',
    social: 'Social Media',
    mp3: 'Audio',
    form: 'Google Form',
    feedback: 'Feedback Form',
    rating: 'Rating'
  }
}

export function QRCodeGenerator() {
  const { user, profile } = useAuth()
  const [qrData, setQrData] = useState({
    type: 'static' as 'static' | 'dynamic',
    qrType: 'url',
    content: '',
    title: '',
    customization: {
      foregroundColor: '#000000',
      backgroundColor: '#ffffff',
      errorCorrectionLevel: 'M',
      margin: 4,
      logo: null as File | null,
      logoSize: 0.2,
      frame: '',
      template: ''
    }
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [generatedQR, setGeneratedQR] = useState<string | null>(null)

  const canCreateDynamic = profile?.subscription_tier === 'pro' ||
    (profile?.subscription_tier === 'free' && user)

  const handleTypeChange = (value: string) => {
    if (value !== 'static' && value !== 'dynamic') {
      console.error('Invalid tab value:', value)
      return
    }

    const type: 'static' | 'dynamic' = value

    if (type === 'dynamic' && !canCreateDynamic) {
      toast.error('Dynamic QR codes require a PRO subscription')
      return
    }
    setQrData(prev => ({ ...prev, type, qrType: 'url' }))
  }

  const generateQR = async () => {
    if (!qrData.content.trim()) {
      toast.error('Please enter content for your QR code')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/qr/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(qrData)
      })

      if (!response.ok) throw new Error('Failed to generate QR code')

      const { qrCode } = await response.json()
      setGeneratedQR(qrCode)
      toast.success('QR code generated successfully!')
    } catch (error) {
      toast.error('Failed to generate QR code')
    } finally {
      setIsGenerating(false)
    }
  }

  const saveQR = async () => {
    if (!user) {
      toast.error('Please sign in to save QR codes')
      return
    }

    if (!generatedQR || !qrData.title.trim()) {
      toast.error('Please generate a QR code and add a title')
      return
    }

    setIsSaving(true)
    try {
      const shortCode = nanoid(8)
      const destinationUrl = qrData.type === 'dynamic'
        ? `${window.location.origin}/r/${shortCode}`
        : qrData.content

      const { error } = await supabase
        .from('qr_codes')
        .insert({
          user_id: user.id,
          title: qrData.title,
          type: qrData.type,
          qr_type: qrData.qrType,
          short_code: shortCode,
          destination_url: destinationUrl,
          original_data: qrData,
          customization: qrData.customization
        })

      if (error) throw error

      toast.success('QR code saved successfully!')
      setQrData(prev => ({ ...prev, title: '', content: '' }))
      setGeneratedQR(null)
    } catch (error) {
      toast.error('Failed to save QR code')
    } finally {
      setIsSaving(false)
    }
  }

  const downloadQR = async (format: 'png' | 'jpg' | 'svg' | 'eps') => {
    if (!generatedQR) return

    const isPremiumFormat = format === 'svg' || format === 'eps'
    if (isPremiumFormat && profile?.subscription_tier !== 'pro') {
      toast.error('SVG and EPS downloads require a PRO subscription')
      return
    }

    try {
      const response = await fetch('/api/qr/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrCode: generatedQR, format })
      })

      if (!response.ok) throw new Error('Download failed')

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `qr-code.${format}`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      toast.error('Failed to download QR code')
    }
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Create QR Code
              {qrData.type === 'dynamic' && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  <Sparkles className="w-3 h-3 mr-1" /> Dynamic
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={qrData.type} onValueChange={handleTypeChange}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="static">Static</TabsTrigger>
                <TabsTrigger value="dynamic" disabled={!canCreateDynamic}>
                  Dynamic {!canCreateDynamic && '(PRO)'}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="static" className="space-y-4">
                <div>
                  <Label htmlFor="qr-type">QR Code Type</Label>
                  <Select value={qrData.qrType} onValueChange={(value) => setQrData(prev => ({ ...prev, qrType: value }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(QR_TYPES.static).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent value="dynamic" className="space-y-4">
                <div>
                  <Label htmlFor="qr-type">QR Code Type</Label>
                  <Select value={qrData.qrType} onValueChange={(value) => setQrData(prev => ({ ...prev, qrType: value }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(QR_TYPES.dynamic).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
            <div>
              <Label htmlFor="content">Content</Label>
              <Input id="content" value={qrData.content} onChange={(e) => setQrData(prev => ({ ...prev, content: e.target.value }))} placeholder={qrData.qrType === 'url' ? 'https://example.com' : 'Enter content...'} />
            </div>
            <div>
              <Label htmlFor="title">Title (for saving)</Label>
              <Input id="title" value={qrData.title} onChange={(e) => setQrData(prev => ({ ...prev, title: e.target.value }))} placeholder="My QR Code" />
            </div>
            <QRCustomization customization={qrData.customization} onChange={(customization) => setQrData(prev => ({ ...prev, customization }))} />
            <div className="flex gap-2">
              <Button onClick={generateQR} disabled={isGenerating} className="flex-1">
                {isGenerating ? 'Generating...' : 'Generate QR Code'}
              </Button>
              {generatedQR && user && (
                <Button variant="outline" onClick={saveQR} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Preview & Download</CardTitle>
          </CardHeader>
          <CardContent>
            <QRPreview qrCode={generatedQR} />
            {generatedQR && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => downloadQR('png')} className="flex items-center gap-2">
                    <Download className="w-4 h-4" /> PNG
                  </Button>
                  <Button variant="outline" onClick={() => downloadQR('jpg')} className="flex items-center gap-2">
                    <Download className="w-4 h-4" /> JPG
                  </Button>
                  <Button variant="outline" onClick={() => downloadQR('svg')} disabled={profile?.subscription_tier !== 'pro'} className="flex items-center gap-2">
                    <Download className="w-4 h-4" /> SVG {profile?.subscription_tier !== 'pro' && '(PRO)'}
                  </Button>
                  <Button variant="outline" onClick={() => downloadQR('eps')} disabled={profile?.subscription_tier !== 'pro'} className="flex items-center gap-2">
                    <Download className="w-4 h-4" /> EPS {profile?.subscription_tier !== 'pro' && '(PRO)'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}