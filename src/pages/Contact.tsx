import { useEffect, useState } from "react";

import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Contact = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.title = language === 'ar' ? 'اتصل بنا - مختار' : 'Contact Us - Mukhtar';
  }, [language]);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">{language === 'ar' ? 'اتصل بنا' : 'Contact Us'}</h1>
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'نموذج التواصل' : 'Contact Form'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">{language === 'ar' ? 'الاسم' : 'Name'}</Label>
              <Input id="name" placeholder={language === 'ar' ? 'اكتب اسمك' : 'Enter your name'} />
            </div>
            <div>
              <Label htmlFor="email">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
              <Input id="email" type="email" placeholder="you@example.com" dir="ltr" />
            </div>
            <div>
              <Label htmlFor="message">{language === 'ar' ? 'رسالتك' : 'Message'}</Label>
              <Textarea id="message" className="min-h-32" placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'} />
            </div>
            <Button className="w-full">{language === 'ar' ? 'إرسال' : 'Send'}</Button>
          </CardContent>
        </Card>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default Contact;
