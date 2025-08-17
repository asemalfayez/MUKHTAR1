import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface PrivacyProps {
  language: 'ar' | 'en';
  isDark: boolean;
  onLanguageChange: (lang: 'ar' | 'en') => void;
  onThemeToggle: () => void;
}

const Privacy = ({ language, isDark, onLanguageChange, onThemeToggle }: PrivacyProps) => {
  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-background`}>
      <div className="container mx-auto px-4 py-12">
        <Card className="shadow-xl rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary to-primary-dark text-white p-8">
            <CardTitle className="text-4xl font-bold">سياسة الخصوصية</CardTitle>
            <CardDescription className="text-lg opacity-90 mt-2">
              ملتزمون بحماية بياناتكم الشخصية وضمان سريتها
            </CardDescription>
          </CardHeader>
          <CardContent className={cn("p-8 space-y-8", isRTL && "text-right")}>
            <section>
              <h2 className="text-2xl font-semibold mb-4">مقدمة</h2>
              <p className="text-muted-foreground leading-relaxed">
                في مختار، نحن نؤمن بأهمية الخصوصية. هذه السياسة توضح كيفية جمع، استخدام، ومشاركة معلوماتكم عند استخدام خدماتنا. نحن ملتزمون بحماية بياناتكم وفقًا للمعايير الدولية.
              </p>
            </section>
            
            <Separator />
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="collection">
                <AccordionTrigger className="text-xl font-semibold">جمع المعلومات</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    نجمع أنواع مختلفة من البيانات لتحسين خدماتنا:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>معلومات شخصية: الاسم، البريد الإلكتروني، رقم الهاتف، وعنوان الإقامة.</li>
                    <li>معلومات الدفع: تفاصيل البطاقة الائتمانية (مشفرة وآمنة).</li>
                    <li>معلومات الاستخدام: تفاصيل الرحلات، التفضيلات، والتفاعلات مع الموقع.</li>
                    <li>معلومات تلقائية: عنوان IP، نوع المتصفح، وملفات تعريف الارتباط (cookies).</li>
                  </ul>
                  <Badge variant="secondary" className="mt-2">نستخدم ملفات تعريف الارتباط لتحسين التجربة</Badge>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="usage">
                <AccordionTrigger className="text-xl font-semibold">استخدام المعلومات</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    نستخدم بياناتكم للأغراض التالية:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>معالجة الحجوزات وتقديم الخدمات.</li>
                    <li>تحسين الموقع وتخصيص التوصيات.</li>
                    <li>إرسال إشعارات وتحديثات عبر البريد الإلكتروني أو الهاتف.</li>
                    <li>تحليل الإحصاءات لتطوير الخدمات.</li>
                    <li>الامتثال للمتطلبات القانونية.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sharing">
                <AccordionTrigger className="text-xl font-semibold">مشاركة المعلومات</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    قد نشارك بياناتكم مع:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>منظمي الرحلات لتسهيل الحجوزات.</li>
                    <li>مزودي الدفع لمعالجة المعاملات.</li>
                    <li>السلطات القانونية إذا لزم الأمر.</li>
                  </ul>
                  <p className="text-muted-foreground">
                    لا نبيع بياناتكم لأطراف ثالثة لأغراض تسويقية.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="security">
                <AccordionTrigger className="text-xl font-semibold">الحماية والأمان</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    نتبع أفضل الممارسات للحماية:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>تشفير البيانات باستخدام SSL.</li>
                    <li>فحوصات أمنية دورية.</li>
                    <li>وصول محدود للموظفين.</li>
                  </ul>
                  <Badge variant="default" className="mt-2">حماية 24/7</Badge>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rights">
                <AccordionTrigger className="text-xl font-semibold">حقوقكم</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    لديكم الحق في:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>الوصول إلى بياناتكم الشخصية.</li>
                    <li>تصحيح أو حذف البيانات.</li>
                    <li>سحب الموافقة في أي وقت.</li>
                  </ul>
                  <p className="text-muted-foreground">
                    تواصلوا معنا لممارسة حقوقكم.
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

export default Privacy;