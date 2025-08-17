import { useEffect, useState } from "react";

import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrganizerPortfolios = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.title = language === 'ar' ? 'محفظات الرحلات - مختار' : 'Trip Portfolios - Mukhtar';
  }, [language]);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{language === 'ar' ? 'محفظات الرحلات' : 'Trip Portfolios'}</h1>
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'قريباً' : 'Coming Soon'}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {language === 'ar' ? 'سيمكنك هنا إدارة ألبومات وصور الرحلات.' : 'Manage trip albums and media here.'}
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default OrganizerPortfolios;
