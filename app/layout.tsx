import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'QR Owl – Powerful QR Code Generator',
    template: '%s | QR Owl',
  },
  description:
    'QR Owl is a powerful QR code generator that lets you create, customize, and manage dynamic and static QR codes with real-time analytics and branding control.',
  keywords: [
    'QR code generator',
    'dynamic QR code',
    'trackable QR code',
    'custom QR code',
    'QR code analytics',
    'free QR code generator',
    'editable QR code',
    'QR code with logo',
    'bulk QR codes',
    'QR code for business',
    'vCard QR code',
    'PDF QR code',
    'Wi-Fi QR code',
    'SMS QR code',
    'email QR code',
    'Bitcoin QR code',
    'social media QR codes',
    'QR Owl',
    'QR generator with analytics',
    'QR code API',
    'Mahdi Mohammad Shibli',
  ],
  authors: [{ name: 'Mahdi Mohammad Shibli' }],
  creator: 'Mahdi Mohammad Shibli',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://qrowl.com', // replace with your live domain
    title: 'QR Owl – Trackable & Customizable QR Codes',
    description:
      'Create fully customizable, editable QR codes with scan analytics and branding. Perfect for marketing, payments, vCards, and more.',
    siteName: 'QR Owl',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QR Owl – QR Code Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Owl – QR Code Generator',
    description:
      'Design stunning QR codes with logo, colors, and scan tracking. Made by Mahdi Mohammad Shibli.',
    creator: '@yourhandle', // Replace with your Twitter handle
    images: ['/og-image.png'],
  },
  metadataBase: new URL('https://qrowl.com'), // Replace with your domain
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'min-h-screen bg-background font-sans text-foreground antialiased',
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
