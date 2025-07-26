'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown, Upload, X, Palette, Settings, Image, Zap } from 'lucide-react'

interface Customization {
  foregroundColor: string
  backgroundColor: string
  errorCorrectionLevel: string
  margin: number
  logo: File | null
  logoSize: number
  frame: string
  template: string
}

interface QRCustomizationProps {
  customization: Customization
  onChange: (customization: Customization) => void
}

export function QRCustomization({ customization, onChange }: QRCustomizationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    if (imageFile) {
      onChange({ ...customization, logo: imageFile })
    }
  }

  const updateCustomization = (updates: Partial<Customization>) => {
    onChange({ ...customization, ...updates })
  }

  const colorPresets = [
    { name: 'Classic', fg: '#000000', bg: '#ffffff' },
    { name: 'Ocean', fg: '#0f172a', bg: '#e0f2fe' },
    { name: 'Sunset', fg: '#7c2d12', bg: '#fed7aa' },
    { name: 'Forest', fg: '#14532d', bg: '#dcfce7' },
    { name: 'Royal', fg: '#581c87', bg: '#f3e8ff' },
    { name: 'Neon', fg: '#facc15', bg: '#0c0a09' },
  ]

  return (
    <div className="relative">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 bg-mesh opacity-30 rounded-2xl blur-3xl" />
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="relative">
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between h-14 glass hover:glass-dark transition-all duration-500 border-white/20 shadow-glass group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110 transition-transform duration-300">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-lg gradient-text-primary">
                Customization Options
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-all duration-500 ${isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="animate-fade-in-up">
          <Card className="mt-6 glass-dark border-white/10 shadow-glass-lg backdrop-blur-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            
            <CardContent className="p-8 space-y-8 relative z-10">
              
              {/* Color Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold gradient-text-primary">Colors & Style</h3>
                </div>

                {/* Color Presets */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground/80">Quick Presets</Label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {colorPresets.map((preset, index) => (
                      <button
                        key={preset.name}
                        onClick={() => updateCustomization({ 
                          foregroundColor: preset.fg, 
                          backgroundColor: preset.bg 
                        })}
                        className="group relative p-3 rounded-xl glass hover:glass-dark transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/10 to-accent/10" />
                        <div className="flex flex-col items-center gap-2 relative z-10">
                          <div className="w-8 h-8 rounded-lg border-2 border-white/20 shadow-inner relative overflow-hidden">
                            <div 
                              className="w-full h-1/2" 
                              style={{ backgroundColor: preset.bg }}
                            />
                            <div 
                              className="w-full h-1/2" 
                              style={{ backgroundColor: preset.fg }}
                            />
                          </div>
                          <span className="text-xs font-medium text-center">{preset.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Colors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="fg-color" className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: customization.foregroundColor }} />
                      Foreground Color
                    </Label>
                    <div className="flex gap-3">
                      <div className="relative group">
                        <Input
                          id="fg-color"
                          type="color"
                          value={customization.foregroundColor}
                          onChange={(e) => updateCustomization({ foregroundColor: e.target.value })}
                          className="w-16 h-12 p-1 glass border-white/20 cursor-pointer hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 rounded-lg border-2 border-white/0 group-hover:border-white/30 transition-all duration-200 pointer-events-none" />
                      </div>
                      <Input
                        value={customization.foregroundColor}
                        onChange={(e) => updateCustomization({ foregroundColor: e.target.value })}
                        placeholder="#000000"
                        className="flex-1 glass border-white/20 backdrop-blur-sm focus:border-primary/50 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="bg-color" className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: customization.backgroundColor }} />
                      Background Color
                    </Label>
                    <div className="flex gap-3">
                      <div className="relative group">
                        <Input
                          id="bg-color"
                          type="color"
                          value={customization.backgroundColor}
                          onChange={(e) => updateCustomization({ backgroundColor: e.target.value })}
                          className="w-16 h-12 p-1 glass border-white/20 cursor-pointer hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 rounded-lg border-2 border-white/0 group-hover:border-white/30 transition-all duration-200 pointer-events-none" />
                      </div>
                      <Input
                        value={customization.backgroundColor}
                        onChange={(e) => updateCustomization({ backgroundColor: e.target.value })}
                        placeholder="#ffffff"
                        className="flex-1 glass border-white/20 backdrop-blur-sm focus:border-primary/50 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-info/20 to-warning/20">
                    <Zap className="w-5 h-5 text-info" />
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-info to-warning bg-clip-text text-transparent">
                    Advanced Settings
                  </h3>
                </div>

                {/* Error Correction */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-foreground/80">Error Correction Level</Label>
                  <Select
                    value={customization.errorCorrectionLevel}
                    onValueChange={(value) => updateCustomization({ errorCorrectionLevel: value })}
                  >
                    <SelectTrigger className="glass border-white/20 backdrop-blur-sm focus:border-primary/50 transition-all duration-300 h-12">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/20 backdrop-blur-xl">
                      <SelectItem value="L" className="hover:bg-white/10">
                        <div className="flex items-center justify-between w-full">
                          <span>Low</span>
                          <span className="text-xs text-muted-foreground ml-4">7% recovery</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="M" className="hover:bg-white/10">
                        <div className="flex items-center justify-between w-full">
                          <span>Medium</span>
                          <span className="text-xs text-muted-foreground ml-4">15% recovery</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Q" className="hover:bg-white/10">
                        <div className="flex items-center justify-between w-full">
                          <span>Quartile</span>
                          <span className="text-xs text-muted-foreground ml-4">25% recovery</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="H" className="hover:bg-white/10">
                        <div className="flex items-center justify-between w-full">
                          <span>High</span>
                          <span className="text-xs text-muted-foreground ml-4">30% recovery</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Margin Slider */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-foreground/80">Margin</Label>
                    <div className="px-3 py-1 rounded-full glass text-sm font-medium">
                      {customization.margin}px
                    </div>
                  </div>
                  <div className="relative">
                    <Slider
                      className="relative z-10"
                      value={[customization.margin]}
                      onValueChange={([value]) => updateCustomization({ margin: value })}
                      min={0}
                      max={20}
                      step={1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full opacity-30 blur-sm" />
                  </div>
                </div>
              </div>

              {/* Logo Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-accent/20 to-success/20">
                    <Image className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
                    Logo Integration
                  </h3>
                </div>

                {customization.logo ? (
                  <div className="p-6 glass border-white/20 rounded-2xl animate-scale-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success/20 to-accent/20 flex items-center justify-center">
                          <Image className="w-6 h-6 text-success" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{customization.logo.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(customization.logo.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => updateCustomization({ logo: null })}
                        className="hover:bg-destructive/20 hover:text-destructive transition-all duration-200"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragEnter={handleDragEnter}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.accept = 'image/*'
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file) onChange({ ...customization, logo: file })
                      }
                      input.click()
                    }}
                    className={`relative p-8 border-2 border-dashed rounded-2xl text-center transition-all duration-300 cursor-pointer group overflow-hidden ${
                      isDragActive 
                        ? 'border-primary/50 bg-primary/5 scale-102' 
                        : 'border-white/20 hover:border-primary/30 hover:bg-primary/5'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10 space-y-4">
                      <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transition-all duration-300 ${isDragActive ? 'scale-110 rotate-6' : 'group-hover:scale-105'}`}>
                        <Upload className={`w-8 h-8 text-primary transition-all duration-300 ${isDragActive ? 'animate-bounce' : ''}`} />
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-lg font-medium text-foreground">
                          {isDragActive ? 'Drop your logo here' : 'Add Your Logo'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Click to browse or drag & drop
                        </p>
                        <p className="text-xs text-muted-foreground/70 bg-warning/10 text-warning px-3 py-1 rounded-full inline-block">
                          Support coming soon
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}