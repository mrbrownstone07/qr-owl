import { z } from 'zod'

// --- Types and Config ---

export type QRCategory = 'basic' | 'contact' | 'social' | 'business' | 'creative' | 'advanced'

export type QRTypeID =
    | 'url'
    | 'text'
    | 'wifi'
    | 'email'
    | 'sms'
    | 'phone'
    | 'vcard'
    | 'twitter'
    | 'instagram'
    | 'linkedin'
    | 'tiktok'
    | 'bitcoin'
    | 'paypal'
    | 'stripe'
    | 'app_store'
    | 'calendar'
    | 'location'
    | 'pdf'
    | 'spotify'


export interface QRTypeConfig {
    readonly id: QRTypeID
    readonly name: string
    readonly icon: string
    readonly description: string
    readonly category: QRCategory
    readonly isPro?: boolean
    readonly isPopular?: boolean
    readonly gradient?: readonly [string, string]
    readonly features?: readonly string[]
}


// QR Type Configuration (as const for readonly arrays)
export const QR_TYPE_CONFIGS: readonly QRTypeConfig[] = [
    {
        id: 'url',
        name: 'Website URL',
        icon: '🌐',
        description: 'Direct link to any website or landing page',
        category: 'basic',
        isPopular: true,
        gradient: ['#667eea', '#764ba2'],
        features: ['Instant redirect', 'Analytics tracking', 'Mobile optimized']
    },
    {
        id: 'text',
        name: 'Plain Text',
        icon: '📝',
        description: 'Share simple text messages and notes',
        category: 'basic',
        gradient: ['#f093fb', '#f5576c'],
        features: ['Rich text support', 'Multi-language', 'Offline viewing']
    },
    {
        id: 'wifi',
        name: 'Wi-Fi Network',
        icon: '📶',
        description: 'One-tap Wi-Fi connection for guests',
        category: 'basic',
        isPopular: true,
        gradient: ['#4facfe', '#00f2fe'],
        features: ['Auto-connect', 'Password encryption', 'Guest access']
    },
    {
        id: 'email',
        name: 'Email',
        icon: '📧',
        description: 'Pre-filled email with subject and message',
        category: 'contact',
        gradient: ['#fa709a', '#fee140'],
        features: ['Auto-compose', 'Template support', 'Attachment ready']
    },
    {
        id: 'sms',
        name: 'Text Message',
        icon: '💬',
        description: 'Send SMS with pre-written message',
        category: 'contact',
        gradient: ['#a8edea', '#fed6e3'],
        features: ['Cross-platform', 'Character counter', 'Emoji support']
    },
    {
        id: 'phone',
        name: 'Phone Call',
        icon: '📞',
        description: 'Direct dial with single scan',
        category: 'contact',
        gradient: ['#ffecd2', '#fcb69f'],
        features: ['International format', 'Quick dial', 'Contact save']
    },
    {
        id: 'vcard',
        name: 'Digital Business Card',
        icon: '👤',
        description: 'Complete contact information package',
        category: 'contact',
        isPopular: true,
        gradient: ['#667eea', '#764ba2'],
        features: ['Full contact details', 'Photo support', 'Auto-save to contacts']
    },
    {
        id: 'twitter',
        name: 'Twitter Profile',
        icon: '🐦',
        description: 'Link to Twitter profile or specific tweet',
        category: 'social',
        gradient: ['#1da1f2', '#0d8bd9'],
        features: ['Profile linking', 'Tweet sharing', 'Follow prompts']
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: '📷',
        description: 'Share Instagram profile or content',
        category: 'social',
        isPro: true,
        gradient: ['#833ab4', '#fd1d1d'],
        features: ['Story integration', 'Post sharing', 'Bio linking']
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        icon: '💼',
        description: 'Professional networking profile',
        category: 'social',
        isPro: true,
        gradient: ['#0077b5', '#0099d4'],
        features: ['Professional networking', 'Resume sharing', 'Connection requests']
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        icon: '🎵',
        description: 'Share TikTok profile or videos',
        category: 'social',
        isPro: true,
        gradient: ['#ff0050', '#000000'],
        features: ['Video sharing', 'Profile growth', 'Trend participation']
    },
    {
        id: 'bitcoin',
        name: 'Bitcoin Payment',
        icon: '₿',
        description: 'Cryptocurrency payment address',
        category: 'business',
        gradient: ['#f7931e', '#ffb347'],
        features: ['Secure payments', 'Amount specification', 'Transaction tracking']
    },
    {
        id: 'paypal',
        name: 'PayPal Payment',
        icon: '💰',
        description: 'Quick PayPal payment link',
        category: 'business',
        isPro: true,
        gradient: ['#0070ba', '#003087'],
        features: ['Instant payments', 'Currency conversion', 'Receipt generation']
    },
    {
        id: 'stripe',
        name: 'Stripe Checkout',
        icon: '💳',
        description: 'Professional payment processing',
        category: 'business',
        isPro: true,
        gradient: ['#635bff', '#3ecf8e'],
        features: ['Card payments', 'Subscription billing', 'Global currency']
    },
    {
        id: 'app_store',
        name: 'App Download',
        icon: '📱',
        description: 'Smart app store redirects',
        category: 'advanced',
        isPro: true,
        gradient: ['#667eea', '#764ba2'],
        features: ['Platform detection', 'Store redirects', 'Install tracking']
    },
    {
        id: 'calendar',
        name: 'Calendar Event',
        icon: '📅',
        description: 'Add events to calendar instantly',
        category: 'advanced',
        isPro: true,
        gradient: ['#ffecd2', '#fcb69f'],
        features: ['Multi-platform sync', 'Reminder setup', 'Location mapping']
    },
    {
        id: 'location',
        name: 'GPS Location',
        icon: '📍',
        description: 'Share precise location coordinates',
        category: 'advanced',
        gradient: ['#fa709a', '#fee140'],
        features: ['GPS coordinates', 'Map integration', 'Navigation ready']
    },
    {
        id: 'pdf',
        name: 'PDF Document',
        icon: '📄',
        description: 'Share documents and files',
        category: 'creative',
        isPro: true,
        gradient: ['#ff9a9e', '#fad0c4'],
        features: ['Document sharing', 'Cloud storage', 'Version control']
    },
    {
        id: 'spotify',
        name: 'Spotify Track',
        icon: '🎵',
        description: 'Share music and playlists',
        category: 'creative',
        isPro: true,
        gradient: ['#1ed760', '#1db954'],
        features: ['Track sharing', 'Playlist promotion', 'Artist discovery']
    }
] as const


// --- Validation schemas ---
export const createQRSchemas = () => ({
    url: z.object({
        url: z
            .string()
            .url('Please enter a valid URL starting with http:// or https://')
            .min(1, 'URL is required')
            .max(2048, 'URL is too long'),
    }),

    text: z.object({
        text: z.string().min(1, 'Text content is required').max(4000, 'Text is too long (max 4000 characters)').trim(),
    }),

    email: z.object({
        email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
        subject: z.string().max(200, 'Subject is too long').optional(),
        body: z.string().max(2000, 'Email body is too long').optional(),
    }),

    sms: z.object({
        phone: z.string().min(1, 'Phone number is required').regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
        message: z.string().max(160, 'SMS message is too long (max 160 characters)').optional(),
    }),

    phone: z.object({
        phone: z.string().min(1, 'Phone number is required').regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
    }),

    wifi: z.object({
        ssid: z.string().min(1, 'Network name (SSID) is required').max(32, 'Network name is too long'),
        password: z.string().max(63, 'Password is too long').optional(),
        encryption: z.enum(['WPA', 'WPA2', 'WEP', 'nopass']).default('WPA2'),
        hidden: z.boolean().default(false),
    }),

    vcard: z.object({
        firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
        lastName: z.string().max(50, 'Last name is too long').optional(),
        organization: z.string().max(100, 'Organization name is too long').optional(),
        title: z.string().max(100, 'Job title is too long').optional(),
        phone: z
            .string()
            .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number')
            .optional()
            .or(z.literal('')),
        email: z.string().email('Invalid email address').optional().or(z.literal('')),
        website: z.string().url('Invalid website URL').optional().or(z.literal('')),
        address: z.string().max(200, 'Address is too long').optional(),
        note: z.string().max(500, 'Note is too long').optional(),
    }),

    twitter: z.object({
        username: z
            .string()
            .min(1, 'Twitter username is required')
            .max(15, 'Twitter username is too long')
            .regex(/^@?[A-Za-z0-9_]+$/, 'Invalid Twitter username format')
            .transform((val) => (val.startsWith('@') ? val.slice(1) : val)),
    }),

    instagram: z.object({
        username: z
            .string()
            .min(1, 'Instagram username is required')
            .max(30, 'Instagram username is too long')
            .regex(/^@?[A-Za-z0-9_.]+$/, 'Invalid Instagram username format')
            .transform((val) => (val.startsWith('@') ? val.slice(1) : val)),
    }),

    linkedin: z.object({
        profile: z
            .string()
            .min(1, 'LinkedIn profile URL is required')
            .url('Please enter a valid LinkedIn URL')
            .refine((url) => url.includes('linkedin.com'), 'Must be a LinkedIn URL'),
    }),

    bitcoin: z.object({
        address: z
            .string()
            .min(26, 'Bitcoin address is too short')
            .max(62, 'Bitcoin address is too long')
            .regex(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/, 'Invalid Bitcoin address format'),
        amount: z.string().regex(/^\d*\.?\d*$/, 'Invalid amount format').optional(),
        label: z.string().max(100, 'Label is too long').optional(),
        message: z.string().max(200, 'Message is too long').optional(),
    }),

    paypal: z.object({
        username: z.string().min(1, 'PayPal username is required'),
        amount: z.string().regex(/^\d*\.?\d{0,2}$/, 'Invalid amount format').optional(),
        currency: z.string().length(3, 'Currency code must be 3 letters').optional().default('USD'), // Not used in URL but validated
        item: z.string().max(100, 'Item description is too long').optional(),
    }),
})

export type QRFormData = {
    [K in keyof ReturnType<typeof createQRSchemas>]: z.infer<ReturnType<typeof createQRSchemas>[K]>
}

// --- QR Content Generator class ---

export class QRContentGenerator {
    private static schemas = createQRSchemas()

    static getTypeConfig(id: string): QRTypeConfig | undefined {
        return QR_TYPE_CONFIGS.find((config) => config.id === id)
    }

    static getTypesByCategory(category: QRCategory): readonly QRTypeConfig[] {
        return QR_TYPE_CONFIGS.filter((config) => config.category === category)
    }

    static getPopularTypes(): readonly QRTypeConfig[] {
        return QR_TYPE_CONFIGS.filter((config) => config.isPopular)
    }

    static getProTypes(): readonly QRTypeConfig[] {
        return QR_TYPE_CONFIGS.filter((config) => config.isPro)
    }

    static getSchemaByType(type: keyof QRFormData): z.ZodSchema {
        return this.schemas[type] || this.schemas.text
    }

    static validateFormData<T extends keyof QRFormData>(
        type: T,
        data: unknown,
    ): { success: true; data: QRFormData[T] } | { success: false; errors: string[] } {
        try {
            const schema = this.getSchemaByType(type)
            const validatedData = schema.parse(data)
            return { success: true, data: validatedData }
        } catch (error) {
            if (error instanceof z.ZodError) {
                return {
                    success: false,
                    errors: error.errors.map((err) => err.message),
                }
            }
            return { success: false, errors: ['Validation failed'] }
        }
    }

    static generateQRContent(type: keyof QRFormData, data: QRFormData[keyof QRFormData]): string {
        const config = this.getTypeConfig(type)
        if (!config) {
            throw new Error(`Unknown QR type: ${type}`)
        }

        switch (type) {
            case 'url':
                return this.ensureProtocol((data as QRFormData['url']).url)

            case 'text':
                return (data as QRFormData['text']).text

            case 'email':
                return this.buildEmailUri(data as QRFormData['email'])

            case 'sms':
                return this.buildSmsUri(data as QRFormData['sms'])

            case 'phone':
                return `tel:${this.formatPhoneNumber((data as QRFormData['phone']).phone)}`

            case 'wifi':
                return this.buildWifiString(data as QRFormData['wifi'])

            case 'vcard':
                return this.buildVCard(data as QRFormData['vcard'])

            case 'twitter':
                return `https://twitter.com/${(data as QRFormData['twitter']).username}`

            case 'instagram':
                return `https://instagram.com/${(data as QRFormData['instagram']).username}`

            case 'linkedin':
                return (data as QRFormData['linkedin']).profile

            case 'bitcoin':
                return this.buildBitcoinUri(data as QRFormData['bitcoin'])

            case 'paypal':
                return this.buildPayPalUri(data as QRFormData['paypal'])

            default:
                return (data as any).text || (data as any).url || ''
        }
    }

    // --- Private helper methods ---

    private static ensureProtocol(url: string): string {
        return /^https?:\/\//i.test(url) ? url : `https://${url}`
    }

    private static buildEmailUri(data: QRFormData['email']): string {
        const params = new URLSearchParams()
        if (data.subject) params.append('subject', data.subject)
        if (data.body) params.append('body', data.body)

        const queryString = params.toString()
        return `mailto:${data.email}${queryString ? `?${queryString}` : ''}`
    }

    private static buildSmsUri(data: QRFormData['sms']): string {
        const phone = this.formatPhoneNumber(data.phone)
        if (data.message) {
            return `sms:${phone}?body=${encodeURIComponent(data.message)}`
        }
        return `sms:${phone}`
    }

    private static formatPhoneNumber(phone: string): string {
        return phone.replace(/[^\d+]/g, '')
    }

    private static buildWifiString(data: QRFormData['wifi']): string {
        const { ssid, password = '', encryption = 'WPA2', hidden = false } = data
        return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`
    }

    private static buildVCard(data: QRFormData['vcard']): string {
        const { firstName, lastName = '', organization, title, phone, email, website, address, note } = data

        const lines = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${firstName}${lastName ? ' ' + lastName : ''}`,
            lastName ? `N:${lastName};${firstName};;;` : `N:${firstName};;;;`,
        ]

        if (organization) lines.push(`ORG:${organization}`)
        if (title) lines.push(`TITLE:${title}`)
        if (phone) lines.push(`TEL:${phone}`)
        if (email) lines.push(`EMAIL:${email}`)
        if (website) lines.push(`URL:${website}`)
        if (address) lines.push(`ADR:;;${address};;;;`)
        if (note) lines.push(`NOTE:${note}`)

        lines.push('END:VCARD')
        return lines.join('\n')
    }

    private static buildBitcoinUri(data: QRFormData['bitcoin']): string {
        const params = new URLSearchParams()
        if (data.amount) params.append('amount', data.amount)
        if (data.label) params.append('label', data.label)
        if (data.message) params.append('message', data.message)

        const queryString = params.toString()
        return `bitcoin:${data.address}${queryString ? `?${queryString}` : ''}`
    }

    /**
     * Builds PayPal.me URL from explicit username, NOT from email local part.
     * Please provide PayPal username here, never derive from email.
     */
    private static buildPayPalUri(data: QRFormData['paypal']): string {
        // Note: currency is typically ignored in PayPal.me links and handled in account settings.
        const amountSegment = data.amount ? `/${data.amount}` : ''
        return `https://paypal.me/${data.username}${amountSegment}`
    }
}

// --- Exported for usage in forms or API ---

export const getSchemaByType = QRContentGenerator.getSchemaByType.bind(QRContentGenerator)
export const formDataToQRContent = QRContentGenerator.generateQRContent.bind(QRContentGenerator)
export const validateQRFormData = QRContentGenerator.validateFormData.bind(QRContentGenerator)
