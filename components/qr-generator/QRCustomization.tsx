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
import { ChevronDown, Upload, X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.svg'] },
    maxFiles: 1,
    onDrop: ([file]) => onChange({ ...customization, logo: file })
  })

  const updateCustomization = (updates: Partial<Customization>) => {
    onChange({ ...customization, ...updates })
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Customization Options
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-6 mt-4 bg-white p-6 rounded-lg shadow border">
        {/* Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fg-color">Foreground Color</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="fg-color"
                type="color"
                value={customization.foregroundColor}
                onChange={(e) => updateCustomization({ foregroundColor: e.target.value })}
                className="w-16 h-10 p-1"
              />
              <Input
                value={customization.foregroundColor}
                onChange={(e) => updateCustomization({ foregroundColor: e.target.value })}
                placeholder="#000000"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bg-color">Background Color</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="bg-color"
                type="color"
                value={customization.backgroundColor}
                onChange={(e) => updateCustomization({ backgroundColor: e.target.value })}
                className="w-16 h-10 p-1"
              />
              <Input
                value={customization.backgroundColor}
                onChange={(e) => updateCustomization({ backgroundColor: e.target.value })}
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>

        {/* Error Correction */}
        <div>
          <Label>Error Correction Level</Label>
          <Select
            value={customization.errorCorrectionLevel}
            onValueChange={(value) => updateCustomization({ errorCorrectionLevel: value })}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">Low (7%)</SelectItem>
              <SelectItem value="M">Medium (15%)</SelectItem>
              <SelectItem value="Q">Quartile (25%)</SelectItem>
              <SelectItem value="H">High (30%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Margin Slider */}
        <div>
          <Label>Margin: {customization.margin}px</Label>
          <Slider
            className="mt-2"
            value={[customization.margin]}
            onValueChange={([value]) => updateCustomization({ margin: value })}
            min={0}
            max={20}
            step={1}
          />
        </div>

        {/* Logo Upload */}
        <div>
          <Label>Logo Upload</Label>
          {customization.logo ? (
            <div className="mt-2 p-4 border rounded-lg bg-gray-50 flex items-center justify-between">
              <span className="text-sm text-gray-700">{customization.logo.name}</span>
              <Button variant="ghost" size="sm" onClick={() => updateCustomization({ logo: null })}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`mt-2 p-6 border-2 border-dashed rounded-lg text-center transition-colors cursor-pointer ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                {isDragActive ? 'Drop the image here' : 'Click or drag to upload logo'}
              </p>
              <p className="text-xs text-muted-foreground mt-1 italic">Logo upload support coming soon</p>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
