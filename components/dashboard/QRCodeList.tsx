'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Eye, Edit, Trash2, ExternalLink, Search, Sparkles, QrCode } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

type QRCode = Database['public']['Tables']['qr_codes']['Row']

export function QRCodeList() {
  const { user } = useAuth()
  const [qrCodes, setQrCodes] = useState<QRCode[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'static' | 'dynamic'>('all')

  useEffect(() => {
    if (user) {
      fetchQRCodes()
    }
  }, [user])

  const fetchQRCodes = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setQrCodes(data || [])
    } catch (error) {
      console.error('Error fetching QR codes:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteQRCode = async (id: string) => {
    try {
      const { error } = await supabase
        .from('qr_codes')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id)

      if (error) throw error
      
      setQrCodes(prev => prev.filter(qr => qr.id !== id))
    } catch (error) {
      console.error('Error deleting QR code:', error)
    }
  }

  const toggleQRCodeStatus = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('qr_codes')
        .update({ is_active: !isActive })
        .eq('id', id)
        .eq('user_id', user?.id)

      if (error) throw error
      
      setQrCodes(prev => prev.map(qr => 
        qr.id === id ? { ...qr, is_active: !isActive } : qr
      ))
    } catch (error) {
      console.error('Error updating QR code status:', error)
    }
  }

  const filteredQRCodes = qrCodes.filter(qr => {
    const matchesSearch = qr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.destination_url.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || qr.type === filterType
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My QR Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My QR Codes</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search QR codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="static">Static Only</SelectItem>
              <SelectItem value="dynamic">Dynamic Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredQRCodes.length === 0 ? (
          <div className="text-center py-8">
            <QrCode className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No QR codes found</h3>
            <p className="text-gray-500 mb-4">
              {qrCodes.length === 0 
                ? "Create your first QR code to get started" 
                : "Try adjusting your search or filter criteria"
              }
            </p>
            <Link href="/generate">
              <Button>Create QR Code</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQRCodes.map((qr) => (
              <div key={qr.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-gray-900 truncate">{qr.title}</h3>
                    <Badge 
                      variant={qr.type === 'dynamic' ? 'default' : 'secondary'}
                      className={qr.type === 'dynamic' ? 'bg-blue-100 text-blue-700' : ''}
                    >
                      {qr.type === 'dynamic' && <Sparkles className="w-3 h-3 mr-1" />}
                      {qr.type}
                    </Badge>
                    {!qr.is_active && (
                      <Badge variant="destructive">Inactive</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate mb-1">{qr.destination_url}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{qr.scan_count} scans</span>
                    <span>Created {formatDistanceToNow(new Date(qr.created_at), { addSuffix: true })}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Link href={`/analytics/${qr.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  
                  {qr.type === 'dynamic' && (
                    <Link href={`/edit/${qr.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(qr.destination_url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteQRCode(qr.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}