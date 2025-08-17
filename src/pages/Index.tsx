import { useState, useEffect } from 'react';

import { HeroSection } from '@/components/HeroSection';
import { CategoriesSection } from '@/components/CategoriesSection';
import { FeaturedTrips } from '@/components/FeaturedTrips';
import { Footer } from '@/components/Footer';
import { cn } from '@/lib/utils';

const Index = () => {
  // Language and theme state
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDark, setIsDark] = useState(false);
  
  const isRTL = language === 'ar';
  
  // Apply RTL/LTR and theme classes to document
  useEffect(() => {
    const html = document.documentElement;
    
    // Set direction
    html.dir = isRTL ? 'rtl' : 'ltr';
    html.lang = language;
    
    // Apply theme
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    // Update title based on language
    document.title = language === 'ar' ? 'مختار - استكشف الأردن' : 'Mukhtar - Explore Jordan';
    
  }, [language, isDark, isRTL]);
  
  const handleLanguageChange = (lang: 'ar' | 'en') => {
    setLanguage(lang);
  };
  
  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={cn(
      "min-h-screen bg-background transition-all duration-300",
      isRTL && "font-arabic"
    )}>
      {/* Header */}
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection language={language} />
        
        {/* Categories Section */}
        <CategoriesSection language={language} />
        
      
      </main>
      
      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default Index;
