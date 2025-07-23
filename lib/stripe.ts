import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export const PRICING_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'Unlimited static QR codes',
      '2 dynamic QR codes',
      'Basic customization',
      'PNG/JPG downloads',
      'Basic analytics'
    ]
  },
  pro: {
    name: 'PRO',
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      'Unlimited dynamic QR codes',
      'Advanced customization',
      'SVG/EPS downloads',
      'Detailed analytics',
      'Bulk operations',
      'API access',
      'Team collaboration',
      'Premium support'
    ]
  }
}