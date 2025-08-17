import { TripCard } from './TripCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';



interface FeaturedTripsProps {
  language: 'ar' | 'en';
}

export function FeaturedTrips({ language }: FeaturedTripsProps) {
  const isRTL = language === 'ar';
  
  const t = {
    ar: {
      title: 'الرحلات المميزة',
      subtitle: 'اكتشف أفضل الرحلات التي ينصح بها المسافرون',
      viewAll: 'عرض جميع الرحلات'
    },
    en: {
      title: 'Featured Trips',
      subtitle: 'Discover the best trips recommended by travelers',
      viewAll: 'View All Trips'
    }
  };

  const trips = [
    {
      id: '1',
      image: '/nmera.jpg',
      title: language === 'ar' ? 'رحلة البتراء الساحرة' : 'Magical Petra Journey',
      description: language === 'ar' ? 'استكشف عجائب البتراء الوردية مع دليل محلي خبير' : 'Explore the wonders of Rose Red Petra with an expert local guide',
      price: 85,
      currency: language === 'ar' ? 'دينار' : 'JOD',
      rating: 4.9,
      reviewCount: 127,
      duration: language === 'ar' ? 'يوم كامل' : 'Full Day',
      groupSize: language === 'ar' ? '٢-١٥ شخص' : '2-15 people',
      location: language === 'ar' ? 'البتراء' : 'Petra',
      category: language === 'ar' ? 'ثقافة' : 'Culture'
    },
    {
      id: '2',
      image: '/image.jpg',
      title: language === 'ar' ? 'مغامرة وادي رم الصحراوية' : 'Wadi Rum Desert Adventure',
      description: language === 'ar' ? 'ليلة تحت النجوم في قلب الصحراء الأردنية' : 'A night under the stars in the heart of the Jordanian desert',
      price: 120,
      currency: language === 'ar' ? 'دينار' : 'JOD',
      rating: 4.8,
      reviewCount: 89,
      duration: language === 'ar' ? 'يومين' : '2 Days',
      groupSize: language === 'ar' ? '٤-١٢ شخص' : '4-12 people',
      location: language === 'ar' ? 'وادي رم' : 'Wadi Rum',
      category: language === 'ar' ? 'مغامرة' : 'Adventure'
    },
    {
      id: '3',
      image: '/hmad.jpg',
      title: language === 'ar' ? 'تجربة البحر الميت المميزة' : 'Premium Dead Sea Experience',
      description: language === 'ar' ? 'استرخ واستمتع بالعلاج الطبيعي في البحر الميت' : 'Relax and enjoy natural therapy at the Dead Sea',
      price: 65,
      currency: language === 'ar' ? 'دينار' : 'JOD',
      rating: 4.7,
      reviewCount: 156,
      duration: language === 'ar' ? 'نصف يوم' : 'Half Day',
      groupSize: language === 'ar' ? '٢-٢٠ شخص' : '2-20 people',
      location: language === 'ar' ? 'البحر الميت' : 'Dead Sea',
      category: language === 'ar' ? 'مميز' : 'Premium'
    }
  ];

  const text = t[language];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={cn(
          "flex items-center justify-between mb-12",
          isRTL && "flex-row-reverse"
        )}>
          <div className={cn(
            "max-w-2xl",
            isRTL && "text-right"
          )}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {text.title}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {text.subtitle}
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="lg"
            className={cn(
              "hidden md:flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground",
              isRTL && "space-x-reverse"
            )}
          >
            <span>{text.viewAll}</span>
            {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>

        {/* Trip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {trips.map((trip, index) => (
            <div 
              key={trip.id}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <TripCard
                {...trip}
                isRTL={isRTL}
                onViewDetails={(id) => console.log('View trip:', id)}
              />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden text-center">
          <Button 
            size="lg"
            className={cn(
              "bg-gradient-hero hover:opacity-90 font-medium",
              "flex items-center space-x-2",
              isRTL && "space-x-reverse"
            )}
          >
            <span>{text.viewAll}</span>
            {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </section>
  );
}