import { Button } from '@/components/ui/button';
import { MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface CategoriesSectionProps {
  language: 'ar' | 'en';
}

export function CategoriesSection({ language }: CategoriesSectionProps) {
  const isRTL = language === 'ar';
  const { user } = useAuth();
  const navigate = useNavigate();

  const t = {
    ar: {
      title: 'استكشف الأماكن المخفية في الأردن',
      subtitle: 'غامر في رحلة إلى أسرار الأردن الطبيعية المجهولة',
      viewAll: 'اكتشف الآن',
      description: 'انغمس في جمال الوديان العميقة، الكهوف المظلمة، والقرى النائية التي لم تُكتشف بعد.'
    },
    en: {
      title: 'Discover Hidden Places in Jordan',
      subtitle: 'Embark on a journey to Jordan\'s undiscovered natural secrets',
      viewAll: 'Discover Now',
      description: 'Immerse yourself in the beauty of deep wadis, dark caves, and remote villages yet to be explored.'
    }
  };

  const text = t[language];

  const handleCategoryClick = () => {
    if (!user) {
      navigate('/signin');
    } else {
      navigate('/explore-trips?category=hidden');
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-700 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16",
          isRTL && "text-right"
        )}>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            {text.title}
          </h2>
          <p className="text-xl text-stone-200 leading-relaxed drop-shadow-md">
            {text.subtitle}
          </p>
          <p className="text-md text-stone-300 mt-2 opacity-90">
            {text.description}
          </p>
        </div>

        {/* Hidden Places Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative bg-stone-800/50 backdrop-blur-sm p-8 rounded-3xl border border-stone-700/50 hover:shadow-[0_0_20px_rgba(255,165,0,0.3)] transition-all duration-500">
            <div className="absolute top-4 left-4 w-16 h-16 bg-orange-500/20 rounded-full blur-md animate-pulse" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 rounded-xl bg-stone-700/50">
                  <MapPin className="h-8 w-8 text-orange-400" />
                </div>
                <div className="flex items-center space-x-2 text-sm font-medium text-stone-200">
                  <span>7</span>
                  <span className="opacity-80">{language === 'ar' ? 'رحلة' : 'trips'}</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors">
                {language === 'ar' ? 'الأماكن المخفية' : 'Hidden Places'}
              </h3>
              <p className="text-stone-300 mb-6 leading-relaxed opacity-90">
                {language === 'ar' 
                  ? 'استكشف مواقع نادرة مثل وادي الراجب وكهوف البترا السرية.'
                  : 'Explore rare sites like Wadi Rajeb and the secret caves of Petra.'
                }
              </p>
              <Button
                variant="outline"
                className="bg-orange-500/10 text-orange-400 border-orange-500/30 hover:bg-orange-500/20 transition-all duration-300"
                onClick={handleCategoryClick}
              >
                {text.viewAll} <Clock className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-br from-orange-500/10 to-stone-900/10 rounded-full blur-2xl opacity-50 animate-pulse-slow" />
          </div>

          {/* Decorative Image Placeholder (يمكن استبدالها بصورة من public) */}
          <div className="hidden lg:block relative">
            <div className="w-full h-64 bg-gradient-to-br from-stone-800 to-orange-900/50 rounded-2xl flex items-center justify-center text-white text-2xl font-semibold animate-pulse">
              {language === 'ar' ? 'صورة المغامرة' : 'Adventure Image'}
            </div>
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-green-500/20 rounded-full blur-md" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-orange-500/20 rounded-full blur-md" />
          </div>
        </div>

        {/* How It Works Section */}
        <div className={cn(
          "text-center max-w-4xl mx-auto mt-20",
          isRTL && "text-right"
        )}>
          <h3 className="text-3xl font-bold text-white mb-12 drop-shadow-md">
            {language === 'ar' ? 'كيف نكتشف الأماكن المخفية؟' : 'How We Uncover Hidden Places?'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: language === 'ar' ? 'اختر الموقع' : 'Choose Location',
                description: language === 'ar' ? 'ابحث عن الوجهة المخفية التي تحلم بزيارتها' : 'Search for the hidden destination you dream of visiting'
              },
              {
                step: '2',
                title: language === 'ar' ? 'خطط رحلتك' : 'Plan Your Trip',
                description: language === 'ar' ? 'رتب تفاصيل رحلتك مع مرشدين محليين' : 'Plan your trip with local guides'
              },
              {
                step: '3',
                title: language === 'ar' ? 'عش التجربة' : 'Live the Experience',
                description: language === 'ar' ? 'استمتع باكتشاف أسرار الأردن' : 'Enjoy uncovering Jordan\'s secrets'
              }
            ].map((item, index) => (
              <div 
                key={item.step}
                className={cn(
                  "relative p-6 bg-stone-800/50 backdrop-blur-sm rounded-xl border border-stone-700/50 animate-in fade-in-50 slide-in-from-bottom-4",
                  isRTL && "text-right"
                )}
                style={{ animationDelay: `${index * 200 + 600}ms` }}
              >
                <div className={cn(
                  "w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-stone-600 flex items-center justify-center",
                  "text-2xl font-bold text-white mb-4",
                  isRTL ? "mr-auto" : "mx-auto"
                )}>
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-stone-100 mb-3">
                  {item.title}
                </h4>
                <p className="text-stone-300 leading-relaxed">
                  {item.description}
                </p>
                {index < 2 && (
                  <div className={cn(
                    "hidden md:block absolute top-1/2 w-24 h-0.5 bg-gradient-to-r from-orange-500 to-stone-600",
                    isRTL ? "-left-12" : "-right-12",
                    "transform -translate-y-1/2"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-stone-600/10 rounded-full blur-3xl animate-blob animation-delay-4000 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </section>
  );
}