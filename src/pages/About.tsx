import { useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutProps {
  language: 'ar' | 'en';
  isDark: boolean;
}

const About = ({ language, isDark }: AboutProps) => {
  useEffect(() => {
    document.title = language === 'ar' ? 'من نحن - مختار' : 'About Us - Mukhtar';
  }, [language]);

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-background`}>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">{language === 'ar' ? 'من نحن' : 'About Us'}</h1>
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'قصتنا' : 'Our Story'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {language === 'ar' 
                ? 'مختار منصة تربط السائحين بمنظمي الرحلات المحليين في الأردن لتجربة سفر أصيلة وآمنة.'
                : 'Mukhtar connects travelers with local trip organizers in Jordan for authentic and safe experiences.'}
            </p>
            <p>
              {language === 'ar' 
                ? 'نهدف إلى تسهيل استكشاف أجمل الوجهات، مع دعم الاقتصاد المحلي.'
                : 'Our goal is to make exploring Jordan easier while supporting the local economy.'}
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default About;