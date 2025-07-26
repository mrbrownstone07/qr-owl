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
import {
  QrCode,
  Download,
  Copy,
  Sparkles,
  Settings,
  Eye,
  Lightbulb,
  Shield,
  Zap,
  Palette,
  Star
} from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 bg-mesh">
      <Navbar />

      {/* Hero Header */}
      <section className="container mx-auto px-4 pt-12 pb-8 text-center relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Badge className="mb-6 glass hover:glass-dark transition-all duration-300 px-6 py-3 shadow-glass animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="gradient-text-primary font-semibold">Professional QR Generator</span>
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight tracking-tight animate-fade-in-up text-shadow">
            Create Beautiful
            <span className="gradient-text-brand block mt-1">
              QR Codes
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Generate custom QR codes for any purpose with advanced styling options and real-time preview
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-20 max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Controls */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            
            {/* QR Type Selection */}
            <Card className="card-modern group hover:shadow-xl transition-all duration-500">
              <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 glass opacity-50"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <QrCode className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground text-shadow-sm">
                    QR Code Type
                  </CardTitle>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl opacity-60"></div>
              </CardHeader>
              <CardContent className="p-6 bg-card/80 backdrop-blur-sm">
                <Select value={qrType} onValueChange={(val) => setQrType(val as QRTypeID)}>
                  <SelectTrigger className="w-full h-12 glass border-border/50 rounded-xl hover:glass-dark transition-all duration-300">
                    <SelectValue placeholder="Choose QR Type" />
                  </SelectTrigger>
                  <SelectContent className="glass border-border/50 backdrop-blur-xl">
                    {QR_TYPE_CONFIGS.map((type) => (
                      <SelectItem key={type.id} value={type.id} className="hover:bg-accent/10 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{type.icon}</span>
                          <span className="font-medium">{type.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Content Input */}
            <Card className="card-modern group hover:shadow-xl transition-all duration-500">
              <CardHeader className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 glass opacity-50"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <Settings className="w-5 h-5 text-accent" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground text-shadow-sm">
                    Content
                  </CardTitle>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-xl opacity-60"></div>
              </CardHeader>
              <CardContent className="p-6 bg-card/80 backdrop-blur-sm">
                <QRForm type={qrType} onContentGenerated={handleQRContentGenerated} />
              </CardContent>
            </Card>

            {/* Customization */}
            <Card className="card-modern group hover:shadow-xl transition-all duration-500">
              <CardHeader className="bg-gradient-to-br from-success/5 to-success/10 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 glass opacity-50"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="p-2 bg-success/20 rounded-lg">
                    <Palette className="w-5 h-5 text-success" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground text-shadow-sm">
                    Customization
                  </CardTitle>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-success/10 to-accent/10 rounded-full blur-xl opacity-60"></div>
              </CardHeader>
              <CardContent className="p-6 bg-card/80 backdrop-blur-sm">
                <QRCustomization customization={customization} onChange={setCustomization} />
              </CardContent>
            </Card>
          </div>

          {/* Right Preview */}
          <div className="lg:col-span-3 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            
            {/* Live Preview Card */}
            <Card className="card-glass border-white/20 shadow-glass hover:shadow-2xl transition-all duration-700">
              <CardHeader className="text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                <div className="relative z-10">
                  <div className="flex justify-center items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse shadow-neon"></div>
                    <CardTitle className="text-2xl font-bold text-foreground text-shadow">
                      Live Preview
                    </CardTitle>
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-muted-foreground">Your QR code updates in real-time</p>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col items-center justify-center min-h-[500px] px-8 py-12">
                {qrImageDataUrl ? (
                  <div className="flex flex-col items-center space-y-8 w-full animate-scale-in">
                    {/* QR Code Display */}
                    <div className="relative group">
                      <div className="absolute -inset-6 bg-gradient-to-r from-primary via-accent to-primary rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700 animate-gradient"></div>
                      <div className="relative glass-dark p-8 rounded-3xl shadow-glass border border-white/20 group-hover:scale-102 transition-all duration-500">
                        <img
                          src={qrImageDataUrl}
                          alt="Generated QR Code"
                          className="w-[300px] h-[300px] rounded-2xl shadow-inner"
                        />
                        <div className="absolute -top-2 -right-2">
                          <Badge className="bg-success text-white px-3 py-1 rounded-full shadow-lg animate-bounce-gentle">
                            <Star className="w-3 h-3 mr-1" />
                            Ready
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-glow text-white h-12 rounded-xl font-semibold interactive transition-all duration-300"
                        onClick={handleDownload}
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download PNG
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 h-12 rounded-xl glass hover:glass-dark border-border/50 font-semibold interactive-subtle transition-all duration-300"
                        onClick={handleCopyLink}
                      >
                        <Copy className="w-5 h-5 mr-2" />
                        Copy Link
                      </Button>
                    </div>

                    {/* QR Info */}
                    <div className="glass rounded-2xl p-6 w-full max-w-md border border-white/20">
                      <div className="text-center space-y-3">
                        <p className="text-sm text-muted-foreground truncate">
                          <span className="font-semibold text-foreground">Content:</span> {qrContent}
                        </p>
                        <div className="flex justify-center gap-6 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            300×300px
                          </span>
                          <span className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            ECC: {customization.errorCorrectionLevel}
                          </span>
                          <span className="flex items-center gap-1">
                            <Palette className="w-3 h-3" />
                            Custom
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-8 text-center animate-fade-in">
                    {/* Empty State */}
                    <div className="w-64 h-64 flex items-center justify-center rounded-3xl border-2 border-dashed border-border glass-dark group-hover:border-primary/50 transition-all duration-500">
                      <div className="flex flex-col items-center space-y-4">
                        <QrCode className="w-20 h-20 text-muted-foreground/50 group-hover:text-primary/50 transition-colors duration-500" />
                        <div className="space-y-2">
                          <p className="text-muted-foreground font-medium">No QR code yet</p>
                          <p className="text-sm text-muted-foreground/70">Fill in the content fields to generate one</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Getting Started */}
                    <div className="glass rounded-2xl p-6 max-w-sm border border-white/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Getting Started</h3>
                      </div>
                      <ol className="text-sm text-muted-foreground space-y-2 text-left">
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                          Select your QR code type
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                          Enter your content
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                          Customize appearance
                        </li>
                      </ol>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pro Tips Card */}
            <Card className="bg-gradient-to-br from-warning/10 via-warning/5 to-accent/10 border border-warning/20 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-warning/20 rounded-lg">
                    <Lightbulb className="w-6 h-6 text-warning" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg text-shadow-sm">Pro Tips</h3>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    <p>Higher error correction makes QR codes more robust and scannable</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-info rounded-full mt-2 flex-shrink-0"></div>
                    <p>Keep content short and simple for better scan performance</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                    <p>Test your QR code with multiple devices and apps before using</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                    <p>Ensure sufficient contrast between foreground and background colors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}