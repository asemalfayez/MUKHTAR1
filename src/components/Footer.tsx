import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  language: 'ar' | 'en';
}

export function Footer({ language }: FooterProps) {
  const isRTL = language === 'ar';
  
  const t = {
    ar: {
      logo: 'مختار',
      description: 'منصتك المفضلة لاستكشاف الأردن مع منظمي الرحلات المحليين',
      quickLinks: 'روابط سريعة',
      home: 'الرئيسية',
      trips: 'الرحلات',
      organizers: 'المنظمون',
      about: 'من نحن',
      contact: 'اتصل بنا',
      contactInfo: 'معلومات التواصل',
      newsletter: 'النشرة الإخبارية',
      newsletterDesc: 'اشترك للحصول على أحدث العروض والرحلات',
      emailPlaceholder: 'البريد الإلكتروني',
      subscribe: 'اشتراك',
      followUs: 'تابعنا',
      rights: 'جميع الحقوق محفوظة',
      madeWith: 'صُنع بـ',
      inJordan: 'في الأردن',
      terms: 'الشروط والأحكام',
      privacy: 'سياسة الخصوصية'
    },
    en: {
      logo: 'Mukhtar',
      description: 'Your favorite platform to explore Jordan with local trip organizers',
      quickLinks: 'Quick Links',
      home: 'Home',
      trips: 'Trips',
      organizers: 'Organizers',
      about: 'About',
      contact: 'Contact',
      contactInfo: 'Contact Info',
      newsletter: 'Newsletter',
      newsletterDesc: 'Subscribe to get the latest offers and trips',
      emailPlaceholder: 'Email Address',
      subscribe: 'Subscribe',
      followUs: 'Follow Us',
      rights: 'All rights reserved',
      madeWith: 'Made with',
      inJordan: 'in Jordan',
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy'
    }
  };

  const text = t[language];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div className={cn(
            "md:col-span-1",
            isRTL && "text-right"
          )}>
            <div className="mb-6">
              <div className="bg-gradient-hero bg-clip-text text-transparent">
                <h3 className="text-3xl font-bold tracking-tight">{text.logo}</h3>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {text.description}
            </p>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">{text.followUs}</h4>
              <div className={cn(
                "flex space-x-4",
                isRTL && "space-x-reverse"
              )}>
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Twitter, href: '#', label: 'Twitter' }
                ].map((social) => (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="sm"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className={cn(
            isRTL && "text-right"
          )}>
            <h4 className="font-semibold text-foreground mb-6">{text.quickLinks}</h4>
            <nav className="space-y-3">
              {[
                { key: 'home', href: '/' },
                { key: 'about', href: '/about' },
                { key: 'contact', href: '/contact' }
              ].map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {text[link.key as keyof typeof text]}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Newsletter & Contact */}
          <div className={cn(
            isRTL && "text-right"
          )}>
            {/* Newsletter */}
            <div className="mb-8">
              <h4 className="font-semibold text-foreground mb-4">{text.newsletter}</h4>
              <p className="text-muted-foreground text-sm mb-4">
                {text.newsletterDesc}
              </p>
              <div className="space-y-3">
                <Input 
                  placeholder={text.emailPlaceholder}
                  className={cn(
                    "border-2 border-border/50 focus:border-primary",
                    isRTL && "text-right"
                  )}
                />
                <Button 
                  size="sm" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {text.subscribe}
                </Button>
              </div>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">{text.contactInfo}</h4>
              <div className="space-y-3">
                <div className={cn(
                  "flex items-center space-x-3 text-sm text-muted-foreground",
                  isRTL && "space-x-reverse flex-row-reverse"
                )}>
                  <Phone className="h-4 w-4 text-primary" />
                  <span dir="ltr">+962 7 9999 9999</span>
                </div>
                <div className={cn(
                  "flex items-center space-x-3 text-sm text-muted-foreground",
                  isRTL && "space-x-reverse flex-row-reverse"
                )}>
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{language === 'ar' ? 'عمان، الأردن' : 'Amman, Jordan'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t pt-6 mt-8">
          <div className={cn(
            "flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0",
            isRTL && "md:flex-row-reverse"
          )}>
            {/* Copyright */}
            <div className={cn(
              "flex items-center space-x-2 text-sm text-muted-foreground",
              isRTL && "space-x-reverse"
            )}>
              <span>© 2025 {text.logo}.</span>
              <span>{text.rights}</span>
            </div>
            
            {/* Made with Love */}
            <div className={cn(
              "flex items-center space-x-2 text-sm text-muted-foreground",
              isRTL && "space-x-reverse"
            )}>
              <span>{text.madeWith}</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>{text.inJordan}</span>
            </div>
            
            {/* Legal Links */}
            <div className={cn(
              "flex items-center space-x-6 text-sm",
              isRTL && "space-x-reverse"
            )}>
              <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                {text.terms}
              </a>
              <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                {text.privacy}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}