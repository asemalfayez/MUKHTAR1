import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  language: 'ar' | 'en';
}

export function HeroSection({ language }: HeroSectionProps) {
  const isRTL = language === 'ar';
  
  const t = {
    ar: {
      title: 'استكشف الأردن مع مختار',
      subtitle: 'اكتشف أجمل الوجهات السياحية في الأردن مع منظمي الرحلات المحليين',
      searchPlaceholder: 'ابحث عن وجهتك المفضلة...',
      destination: 'الوجهة',
      date: 'التاريخ',
      travelers: 'المسافرون',
      searchBtn: 'البحث عن رحلة',
      featuredTrips: 'الرحلات المميزة'
    },
    en: {
      title: 'Explore Jordan with Mukhtar',
      subtitle: 'Discover the most beautiful destinations in Jordan with local trip organizers',
      searchPlaceholder: 'Search for your favorite destination...',
      destination: 'Destination',
      date: 'Date',
      travelers: 'Travelers',
      searchBtn: 'Search Trips',
      featuredTrips: 'Featured Trips'
    }
  };

  const text = t[language];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 z-0">
    <img 
      src="/MUKHTAR.png" 
      alt="Mukhtar Logo" 
      className="w-full h-full object-contain scale-125" // Increased width with scale-125
    />
    <div className="absolute inset-0 bg-black/40" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
  </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={cn(
          "max-w-4xl mx-auto",
          isRTL && "text-right"
        )}>
          {/* Hero Title */}
          <h1 className={cn(
            "text-5xl md:text-7xl font-bold text-white mb-6 leading-tight",
            "animate-in fade-in-50 slide-in-from-bottom-6 duration-1000"
          )}>
            {text.title}
          </h1>
          
          {/* Subtitle */}
          <p className={cn(
            "text-xl md:text-2xl text-white/90 mb-12 leading-relaxed",
            "animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-300"
          )}>
            {text.subtitle}
          </p>
          
          {/* Search Form */}
          <div className={cn(
            "bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-hero max-w-4xl mx-auto",
            "animate-in fade-in-50 slide-in-from-bottom-2 duration-1000 delay-500"
          )}>
            <div className={cn(
              "grid grid-cols-1 md:grid-cols-4 gap-4",
              isRTL && "md:grid-flow-col-dense"
            )}>
              {/* Destination Input */}
              <div className="relative">
                <MapPin className={cn(
                  "absolute top-3 h-5 w-5 text-muted-foreground",
                  isRTL ? "right-3" : "left-3"
                )} />
                <Input 
                  placeholder={text.destination}
                  className={cn(
                    "h-12 border-2 border-border/50 focus:border-primary",
                    isRTL ? "pr-12 text-right" : "pl-12"
                  )}
                />
              </div>
              
              {/* Date Input */}
              <div className="relative">
                <Calendar className={cn(
                  "absolute top-3 h-5 w-5 text-muted-foreground",
                  isRTL ? "right-3" : "left-3"
                )} />
                <Input 
                  type="date"
                  className={cn(
                    "h-12 border-2 border-border/50 focus:border-primary",
                    isRTL ? "pr-12 text-right" : "pl-12"
                  )}
                />
              </div>
              
              {/* Travelers Input */}
              <div className="relative">
                <Users className={cn(
                  "absolute top-3 h-5 w-5 text-muted-foreground",
                  isRTL ? "right-3" : "left-3"
                )} />
                <Input 
                  placeholder={text.travelers}
                  className={cn(
                    "h-12 border-2 border-border/50 focus:border-primary",
                    isRTL ? "pr-12 text-right" : "pl-12"
                  )}
                />
              </div>
              
              {/* Search Button */}
              <Button 
                size="lg" 
                className={cn(
                  "h-12 bg-gradient-hero hover:opacity-90 font-semibold",
                  "transform transition-all duration-200 hover:scale-105"
                )}
              >
                <Search className="h-5 w-5 mr-2" />
                {text.searchBtn}
              </Button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className={cn(
            "grid grid-cols-3 gap-8 mt-12 max-w-md mx-auto",
            "animate-in fade-in-50 slide-in-from-bottom duration-1000 delay-700"
          )}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-white/80 text-sm">{language === 'ar' ? 'رحلة' : 'Trips'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-white/80 text-sm">{language === 'ar' ? 'منظم' : 'Organizers'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-white/80 text-sm">{language === 'ar' ? 'مسافر' : 'Travelers'}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}