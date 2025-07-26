'use client'

import { Navbar } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  QrCode,
  Zap,
  BarChart3,
  Palette,
  Shield,
  Users,
  ArrowRight,
  Check,
  Star,
  Crown,
  TrendingUp,
  Globe,
  Lock,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 bg-mesh">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-32 text-center relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Badge className="mb-8 glass hover:glass-dark transition-all duration-300 px-6 py-3 shadow-glass animate-fade-in">
            <Star className="w-5 h-5 mr-2 fill-primary animate-pulse" />
            <span className="gradient-text-primary font-semibold">Enterprise-Grade QR Code Platform</span>
          </Badge>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 leading-[0.9] tracking-tight animate-fade-in-up text-shadow-lg">
            Create Beautiful,
            <span className="gradient-text-brand block mt-2 animate-gradient">
              Intelligent
            </span>
            QR Codes
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Transform your marketing with dynamic QR codes featuring real-time analytics, 
            advanced customization, and enterprise security—trusted by Fortune 500 companies.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/generate">
              <Button size="lg" className="btn-glow interactive bg-gradient-to-r from-primary via-primary/90 to-accent hover:shadow-glow text-lg px-12 py-6 rounded-2xl shadow-brand-lg">
                <Zap className="w-6 h-6 mr-3" />
                Start Creating Free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="interactive-subtle glass hover:glass-dark text-lg px-12 py-6 rounded-2xl border-2 border-border/50 backdrop-blur-sm">
                <Crown className="w-6 h-6 mr-3" />
                View Enterprise Plans
              </Button>
            </Link>
          </div>

          {/* Enhanced QR Preview */}
          <div className="relative max-w-sm mx-auto animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-30 animate-glow"></div>
            <div className="card-glass relative rounded-3xl p-12 hover:scale-102 transition-all duration-700 group">
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
              
              <div className="relative z-10">
                <div className="w-56 h-56 mx-auto bg-gradient-to-br from-muted/80 to-muted rounded-2xl flex items-center justify-center shadow-inner mb-8 border border-border/30 group-hover:shadow-lg transition-all duration-500">
                  <QrCode className="w-40 h-40 text-muted-foreground group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse shadow-neon"></div>
                  <p className="text-foreground font-semibold tracking-wide text-shadow">Live QR Preview</p>
                </div>
                <p className="text-muted-foreground text-sm">Updates in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="container mx-auto px-4 py-20 border-b border-border/30">
        <div className="text-center animate-fade-in">
          <p className="text-muted-foreground text-sm uppercase tracking-wider font-semibold mb-10 text-shadow-sm">
            Trusted by industry leaders worldwide
          </p>
          <div className="flex justify-center items-center gap-12 opacity-60">
            <div className="text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default">ACME Corp</div>
            <div className="text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default">TechFlow</div>
            <div className="text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default">GlobalCo</div>
            <div className="text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default">InnovateLab</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-32">
        <div className="text-center mb-24">
          <Badge className="mb-8 glass border-border/50 px-6 py-3 animate-fade-in">
            <TrendingUp className="w-5 h-5 mr-2" />
            Advanced Features
          </Badge>
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-8 leading-tight animate-fade-in-up text-shadow">
            Everything You Need for
            <span className="block gradient-text-brand animate-gradient">
              Professional Success
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            From basic static codes to enterprise-level campaigns with AI-powered insights and advanced security
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[{
            icon: <Palette className="w-16 h-16 text-primary mb-6" />,
            title: 'Brand-First Design',
            desc: 'Advanced customization with brand colors, logos, and templates. White-label options for agencies.',
            color: 'primary',
            delay: '0'
          }, {
            icon: <Zap className="w-16 h-16 text-accent mb-6" />,
            title: 'Dynamic Intelligence',
            desc: 'Smart QR codes that adapt content based on user behavior, location, and device automatically.',
            color: 'accent',
            delay: '0.1s'
          }, {
            icon: <BarChart3 className="w-16 h-16 text-success mb-6" />,
            title: 'Advanced Analytics',
            desc: 'Real-time insights with heatmaps, conversion tracking, and predictive analytics powered by AI.',
            color: 'success',
            delay: '0.2s'
          }, {
            icon: <Shield className="w-16 h-16 text-destructive mb-6" />,
            title: 'Enterprise Security',
            desc: 'SOC 2 compliant with end-to-end encryption, access controls, and audit trails for compliance.',
            color: 'destructive',
            delay: '0.3s'
          }, {
            icon: <Users className="w-16 h-16 text-warning mb-6" />,
            title: 'Team Collaboration',
            desc: 'Advanced role management, approval workflows, and team analytics across all campaigns.',
            color: 'warning',
            delay: '0.4s'
          }, {
            icon: <Globe className="w-16 h-16 text-info mb-6" />,
            title: 'Global Scale',
            desc: 'CDN-powered delivery in 180+ countries with 99.9% uptime SLA and enterprise support.',
            color: 'info',
            delay: '0.5s'
          }].map(({ icon, title, desc, color, delay }) => (
            <div key={title} className="animate-fade-in-up" style={{ animationDelay: delay }}>
              <Card className="card-modern group hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 border-0 overflow-hidden h-full">
                <CardHeader className={`bg-gradient-to-br from-${color}/5 to-${color}/10 relative overflow-hidden p-8`}>
                  <div className="absolute inset-0 glass opacity-50"></div>
                  <div className="relative z-10">
                    <div className="mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground mb-3 text-shadow-sm">{title}</CardTitle>
                  </div>
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl opacity-60 group-hover:scale-150 transition-transform duration-700"></div>
                </CardHeader>
                <CardContent className="p-8 bg-card/80 backdrop-blur-sm">
                  <p className="text-muted-foreground leading-relaxed text-base">{desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section className="container mx-auto px-4 py-32">
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl overflow-hidden shadow-brand-lg">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
            <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-5xl mx-auto px-8 py-24 text-white">
            <Badge className="mb-8 glass-dark border-white/30 px-6 py-3 shadow-glass animate-fade-in">
              <Crown className="w-5 h-5 mr-2" />
              Pricing Plans
            </Badge>
            
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight animate-fade-in-up text-shadow-lg">
              Start Free,
              <span className="block text-white/90">Scale Limitlessly</span>
            </h2>
            
            <p className="text-xl mb-16 opacity-90 leading-relaxed max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Begin with unlimited static QR codes at no cost. Upgrade to unlock dynamic features, 
              advanced analytics, and enterprise-grade security.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="glass-dark rounded-3xl p-8 border border-white/20 hover:glass transition-all duration-500 interactive-subtle">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold">Free Plan</h3>
                  <div className="text-right">
                    <div className="text-4xl font-black text-shadow">$0</div>
                    <div className="text-sm opacity-75">forever</div>
                  </div>
                </div>
                <ul className="space-y-4 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="w-6 h-6 flex-shrink-0 text-success" />
                    <span className="text-white/90">Unlimited static QR codes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-6 h-6 flex-shrink-0 text-success" />
                    <span className="text-white/90">Basic customization options</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-6 h-6 flex-shrink-0 text-success" />
                    <span className="text-white/90">PNG & JPG downloads</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-6 h-6 flex-shrink-0 text-success" />
                    <span className="text-white/90">Community support</span>
                  </li>
                </ul>
              </div>
              
              <div className="glass rounded-3xl p-8 border-2 border-white/40 relative hover:scale-102 transition-all duration-500 shadow-glass">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-white text-primary font-bold px-6 py-2 shadow-lg animate-bounce-gentle">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold flex items-center gap-3">
                    <Crown className="w-8 h-8 text-warning" /> 
                    PRO Plan
                  </h3>
                  <div className="text-right">
                    <div className="text-4xl font-black text-shadow">$29</div>
                    <div className="text-sm opacity-75">per month</div>
                  </div>
                </div>
                
                <ul className="space-y-4 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="w-6 h-6 flex-shrink-0 text-success" />
                    <span className="text-white/90">Unlimited dynamic QR codes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-6 h-6 flex-shrink-0 text-success" />
                    <span className="text-white/90">Advanced analytics & insights</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-6 h-6 flex-shrink-0 text-success" />
                    <span className="text-white/90">SVG, EPS & vector downloads</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-6 h-6 flex-shrink-0 text-success" />
                    <span className="text-white/90">Priority support & training</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Link href="/pricing">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 hover:text-accent font-bold text-lg px-12 py-4 shadow-xl transition-all duration-300 hover:shadow-2xl interactive rounded-2xl">
                  View All Features <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
              <Link href="/generate">
                <Button size="lg" variant="outline" className="border-2 border-white/40 text-white hover:glass font-bold text-lg px-12 py-4 backdrop-blur-sm transition-all duration-300 interactive rounded-2xl">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="container mx-auto px-4 py-20 border-t border-border/30 mt-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
            <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-brand interactive-subtle">
              <QrCode className="w-10 h-10 text-white" />
            </div>
            <span className="text-4xl font-black gradient-text-brand text-shadow">
              QR Pro
            </span>
          </div>
          
          <p className="text-muted-foreground text-lg leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            The enterprise-grade QR code platform trusted by Fortune 500 companies, 
            startups, and creators worldwide.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Lock className="w-4 h-4" />
              SOC 2 Compliant
            </div>
            <div className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Globe className="w-4 h-4" />
              99.9% Uptime SLA
            </div>
            <div className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Shield className="w-4 h-4" />
              Enterprise Security
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}