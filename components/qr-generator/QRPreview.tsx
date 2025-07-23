'use client'

import { useEffect, useRef } from 'react'

interface QRPreviewProps {
  qrCode: string | null
}

export function QRPreview({ qrCode }: QRPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (qrCode && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
      }
      img.src = qrCode
    }
  }, [qrCode])

  return (
    <div className="flex items-center justify-center min-h-[300px] rounded-xl border border-dashed border-border bg-muted/40 p-6">
      {qrCode ? (
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-[300px] rounded shadow border"
        />
      ) : (
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
            </svg>
          </div>
          <p className="font-medium">QR Code Preview</p>
          <p className="text-sm">Generate a QR code to see the preview</p>
        </div>
      )}
    </div>
  )
}
