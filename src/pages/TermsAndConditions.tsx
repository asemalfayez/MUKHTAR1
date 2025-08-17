import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface TermsAndConditionsProps {
  language: 'ar' | 'en';
  isDark: boolean;
  onLanguageChange: (lang: 'ar' | 'en') => void;
  onThemeToggle: () => void;
}

const TermsAndConditions = ({ language, isDark, onLanguageChange, onThemeToggle }: TermsAndConditionsProps) => {
  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-background`}>
      <div className="container mx-auto px-4 py-12">
        <Card className="shadow-xl rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary to-primary-dark text-white p-8">
            <CardTitle className="text-4xl font-bold">الشروط والأحكام</CardTitle>
            <CardDescription className="text-lg opacity-90 mt-2">
              شروط استخدام خدمات مختار - يرجى القراءة بعناية
            </CardDescription>
          </CardHeader>
          <CardContent className={cn("p-8 space-y-8", isRTL && "text-right")}>
            <section>
              <h2 className="text-2xl font-semibold mb-4">مقدمة</h2>
              <p className="text-muted-foreground leading-relaxed">
                هذه الشروط تحدد العلاقة بينكم وبين مختار. باستخدام خدماتنا، توافقون على هذه الشروط بالكامل.
              </p>
            </section>
            
            <Separator />
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="usage">
                <AccordionTrigger className="text-xl font-semibold">شروط الاستخدام</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    يُسمح باستخدام الخدمات للأغراض الشخصية فقط. يحظر:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>إساءة الاستخدام أو التلاعب بالبيانات.</li>
                    <li>مشاركة حسابكم مع الآخرين دون إذن.</li>
                    <li>انتهاك حقوق الملكية الفكرية.</li>
                  </ul>
                  <Badge variant="secondary" className="mt-2">الحسابات الشخصية غير قابلة للنقل</Badge>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="payments">
                <AccordionTrigger className="text-xl font-semibold">الدفعات والإلغاء</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    جميع الدفعات آمنة وغير قابلة للاسترداد بعد:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>48 ساعة من التأكيد للحجوزات العادية.</li>
                    <li>7 أيام للحجوزات الخاصة.</li>
                    <li>لا يوجد استرداد في حال عدم الحضور.</li>
                  </ul>
                  <p className="text-muted-foreground">
                    قد تُطبق رسوم إلغاء تصل إلى 50% من التكلفة.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="liability">
                <AccordionTrigger className="text-xl font-semibold">المسؤولية</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    نحن غير مسؤولين عن:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>أي أضرار شخصية أو فقدان أثناء الرحلات.</li>
                    <li>تغييرات في الجدول بسبب الطقس أو الظروف الخارجة عن سيطرتنا.</li>
                    <li>محتوى المنظمين أو جودة الخدمات.</li>
                  </ul>
                  <Badge variant="default" className="mt-2">نوصي بتأمين شخصي</Badge>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="changes">
                <AccordionTrigger className="text-xl font-semibold">التعديلات</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    نحتفظ بحق تعديل هذه الشروط في أي وقت. سنقوم بإشعاركم عبر البريد الإلكتروني.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="law">
                <AccordionTrigger className="text-xl font-semibold">القانون الحاكم</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    تُحكم هذه الشروط بقوانين المملكة الأردنية الهاشمية.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator className="my-6" />

            <p className="text-muted-foreground text-center">
              آخر تحديث: 12 أغسطس 2025. للاستفسارات، تواصلوا عبر <a href="mailto:support@mukhtar.com" className="text-primary hover:underline">support@mukhtar.com</a>.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer language={language} />
    </div>
  );
};

export default TermsAndConditions;