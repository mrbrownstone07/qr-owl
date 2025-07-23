'use client'

import { useState } from 'react'
import { QRForm } from '@/components/qr-generator/QRForm'
import { QRCustomization } from '@/components/qr-generator/QRCustomization'
import { QR_TYPE_CONFIGS, QRTypeID } from '@/lib/qrTypes'
import { Navbar } from '@/components/layout/navbar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function GeneratePage() {
  const [qrType, setQrType] = useState<QRTypeID>('url')
  const [qrContent, setQrContent] = useState('')
  const [qrImageDataUrl, setQrImageDataUrl] = useState('')
  const [customization, setCustomization] = useState({
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    errorCorrectionLevel: 'M',
    margin: 4,
    logo: null as File | null,
    logoSize: 30,
    frame: '',
    template: ''
  })

  const generateQRCode = async (content: string) => {
    try {
      const res = await fetch('/api/qr/generate', {
        method: 'POST',
        body: JSON.stringify({ content, customization })
      })
      const data = await res.json()
      if (data.qrCode) {
        setQrImageDataUrl(data.qrCode)
      }
    } catch (error) {
      console.error('QR code generation failed:', error)
    }
  }

  const handleQRContentGenerated = async (content: string) => {
    setQrContent(content)
    await generateQRCode(content)
  }

  const handleDownload = async () => {
    try {
      const res = await fetch('/api/qr/download', {
        method: 'POST',
        body: JSON.stringify({ qrCode: qrImageDataUrl, format: 'png' })
      })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'qr-code.png'
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download QR code:', error)
    }
  }

  const handleCopyLink = () => {
    if (qrImageDataUrl) {
      navigator.clipboard.writeText(qrImageDataUrl)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      {/* <section className="container mx-auto px-4 pt-8 pb-6 text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Create Beautiful QR Codes
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Generate custom QR codes for any purpose with advanced styling options
        </p>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
          ✨ Professional Quality
        </Badge>
      </section> */}

      <main className="container mx-auto px-4 pb-16 max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Controls */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 border shadow-sm backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  QR Code Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={qrType} onValueChange={(val) => setQrType(val as QRTypeID)}>
                  <SelectTrigger className="w-full h-12 bg-white border-gray-300">
                    <SelectValue placeholder="Choose QR Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {QR_TYPE_CONFIGS.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{type.icon}</span>
                          <span>{type.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="bg-white/80 border shadow-sm backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QRForm type={qrType} onContentGenerated={handleQRContentGenerated} />
              </CardContent>
            </Card>

            <Card className="bg-white/80 border shadow-sm backdrop-blur-sm">
              <CardContent className="pt-6">
                <QRCustomization customization={customization} onChange={setCustomization} />
              </CardContent>
            </Card>
          </div>

          {/* Right Preview */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-white/90 border shadow-lg backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    Live Preview
                  </CardTitle>
                </div>
                <p className="text-sm text-gray-500">Your QR code updates in real-time</p>
              </CardHeader>

              <CardContent className="flex flex-col items-center justify-center min-h-[400px] px-8">
                {qrImageDataUrl ? (
                  <div className="flex flex-col items-center space-y-6">
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition" />
                      <div className="relative bg-white p-6 rounded-2xl shadow-lg border">
                        <img
                          src={qrImageDataUrl}
                          alt="QR Code"
                          className="w-[280px] h-[280px] rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                      <Button className="flex-1 bg-blue-600 text-white h-12 rounded-lg" onClick={handleDownload}>
                        💾 Download PNG
                      </Button>
                      <Button variant="outline" className="flex-1 h-12 rounded-lg" onClick={handleCopyLink}>
                        📋 Copy Link
                      </Button>
                    </div>

                    <div className="text-center space-y-2 text-sm text-gray-600">
                      <p className="truncate max-w-md"><strong>Content:</strong> {qrContent}</p>
                      <div className="flex justify-center gap-4 text-xs">
                        <span>📏 Size: 280×280</span>
                        <span>🔒 ECC: {customization.errorCorrectionLevel}</span>
                        <span>🎨 {customization.foregroundColor}/{customization.backgroundColor}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-6 text-center">
                    <div className="w-48 h-48 flex items-center justify-center rounded-2xl border-2 border-dashed text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-400">No QR code yet</p>
                    <p className="text-sm text-gray-500">Fill in the content fields to generate one</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50">
              <CardContent className="p-6 space-y-2 text-sm text-gray-600">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">💡 Pro Tips</h3>
                <p>• Higher error correction makes QR codes more robust</p>
                <p>• Keep content short for better scan performance</p>
                <p>• Test your code with multiple devices before use</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
