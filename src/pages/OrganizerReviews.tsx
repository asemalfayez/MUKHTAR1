import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const OrganizerReviews = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.title = language === 'ar' ? 'تقييمات الرحلات - مختار' : 'Trip Reviews - Mukhtar';
  }, [language]);

  // بيانات وهمية للتقييمات
  const reviews = [
    { id: 1, name: "أحمد علي", trip: "رحلة البتراء الساحرة", rating: 4, comment: "تجربة رائعة، التنظيم ممتاز!" },
    { id: 2, name: "سارة محمد", trip: "رحلة وادي رم المغامرة", rating: 5, comment: "كانت مذهلة، سأعود مجدداً." },
    { id: 3, name: "خالد حسن", trip: "رحلة البتراء الساحرة", rating: 3, comment: "جيد، لكن يمكن تحسين الخدمات." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{language === 'ar' ? 'تقييمات الرحلات' : 'Trip Reviews'}</h1>
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'تقييمات العملاء' : 'Customer Reviews'}</CardTitle>
          </CardHeader>
          <CardContent>
            {reviews.map((review) => (
              <div key={review.id} className="mb-6 p-4 border rounded-lg bg-card">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        size={16}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{language === 'ar' ? 'الرحلة:' : 'Trip:'} {review.trip}</p>
                <p className="mt-2 text-foreground">{review.comment}</p>
              </div>
            ))}
            {reviews.length === 0 && (
              <p className="text-muted-foreground">
                {language === 'ar' ? 'لا توجد تقييمات حالياً.' : 'No reviews available yet.'}
              </p>
            )}
          </CardContent>
        </Card>
        <div className="mt-6">
          <Link to="/reports">
            <Button className="bg-yellow-500 text-white hover:bg-yellow-600">
              {language === 'ar' ? 'العودة للتقارير' : 'Back to Reports'}
            </Button>
          </Link>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default OrganizerReviews;