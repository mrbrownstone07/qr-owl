'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Crown, Search } from 'lucide-react'
import { QRTypeConfig, QR_TYPE_CONFIGS } from '@/lib/qrTypes'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface QRTypeSelectorProps {
    selectedType: string
    onTypeChange: (type: string) => void
    isPro?: boolean
}

export function QRTypeSelector({ selectedType, onTypeChange, isPro = false }: QRTypeSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const selectedQRType = QR_TYPE_CONFIGS.find(type => type.id === selectedType)

    const filteredTypes = QR_TYPE_CONFIGS.filter(type =>
        type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const groupedTypes = filteredTypes.reduce((acc, type) => {
        if (!acc[type.category]) acc[type.category] = []
        acc[type.category].push(type)
        return acc
    }, {} as Record<string, QRTypeConfig[]>)

    const categoryLabels = {
        basic: 'Basic',
        contact: 'Contact',
        social: 'Social Media',
        business: 'Business'
    }

    const handleTypeSelect = (type: QRTypeConfig) => {
        if (type.isPro && !isPro) return
        onTypeChange(type.id)
        setIsOpen(false)
        setSearchTerm('')
    }

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-background border border-border rounded-xl text-foreground hover:border-accent transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedQRType?.icon}</span>
                    <div className="text-left">
                        <div className="font-medium">{selectedQRType?.name}</div>
                        <div className="text-sm text-muted-foreground">{selectedQRType?.description}</div>
                    </div>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-2xl z-50 max-h-96 overflow-hidden"
                        >
                            <div className="p-4 border-b border-border">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search QR types..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 text-foreground placeholder:text-muted-foreground"
                                    />
                                </div>
                            </div>

                            <div className="max-h-80 overflow-y-auto">
                                {Object.entries(groupedTypes).map(([category, types]) => (
                                    <div key={category} className="p-2">
                                        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            {categoryLabels[category as keyof typeof categoryLabels]}
                                        </div>
                                        {types.map((type) => (
                                            <motion.button
                                                key={type.id}
                                                onClick={() => handleTypeSelect(type)}
                                                disabled={type.isPro && !isPro}
                                                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${type.id === selectedType
                                                        ? 'bg-accent/20 border border-accent'
                                                        : 'hover:bg-muted'
                                                    } ${type.isPro && !isPro
                                                        ? 'opacity-60 cursor-not-allowed'
                                                        : 'cursor-pointer'
                                                    }`}
                                                whileHover={type.isPro && !isPro ? {} : { x: 4 }}
                                                whileTap={type.isPro && !isPro ? {} : { scale: 0.98 }}
                                            >
                                                <span className="text-xl">{type.icon}</span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-foreground">{type.name}</span>
                                                        {type.isPro && (
                                                            <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                                                                <Crown className="w-3 h-3 mr-1" />
                                                                PRO
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground truncate">{type.description}</div>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
