import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RateTripTourist = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDark, setIsDark] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const { toast } = useToast();
  const [images, setImages] = useState<File[]>([]); // لتخزين الصور المرفوعة

  const trip = {
    title: "رحلة البتراء الساحرة",
    organizer: "أحمد محمد",
    date: "2024-02-15",
    location: "البتراء، الأردن"
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار تقييم للرحلة",
        variant: "destructive"
      });
      return;
    }

    // تحقق إذا كانت هناك صور مرفوعة
    if (images.length > 0) {
      toast({
        title: "تم إرسال التقييم بنجاح",
        description: "شكراً لك! تم رفع الصور بنجاح مع التقييم"
      });
    } else {
      toast({
        title: "تم إرسال التقييم بنجاح",
        description: "شكراً لك على تقييم الرحلة"
      });
    }

    // إعادة تعيين الحقول بعد الإرسال
    setRating(0);
    setReview("");
    setImages([]);
    // لاحظ: يجب إضافة منطق لرفع الصور إلى سيرفر هنا (مثل استخدام API)
    // مثال: await uploadImages(images);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      // تحديد الحد الأقصى 5 صور
      if (newImages.length + images.length > 5) {
        toast({
          title: "تحذير",
          description: "يمكنك رفع ما يصل إلى 5 صور فقط",
          variant: "destructive"
        });
        return;
      }
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">تقييم الرحلة</h1>
          <p className="text-xl text-muted-foreground">شاركنا تجربتك وساعد الآخرين في اتخاذ قرارهم</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* تفاصيل الرحلة */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">تفاصيل الرحلة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{trip.title}</h3>
                  <p className="text-muted-foreground">منظم الرحلة: {trip.organizer}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">تاريخ الرحلة</p>
                    <p className="font-medium">{trip.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">الوجهة</p>
                    <p className="font-medium">{trip.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* التقييم */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">تقييمك للرحلة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* نظام التقييم بالنجوم */}
                <div className="space-y-2">
                  <p className="text-lg font-medium">تقييم عام للرحلة</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none transition-transform hover:scale-125"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoverRating || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-3 text-lg font-medium text-foreground">
                        {rating}/5
                      </span>
                    )}
                  </div>
                </div>

                {/* كتابة المراجعة */}
                <div className="space-y-2">
                  <p className="text-lg font-medium">اكتب مراجعتك</p>
                  <Textarea
                    placeholder="شاركنا تجربتك في هذه الرحلة..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="min-h-32 resize-y"
                  />
                </div>

                {/* رفع الصور */}
                <div className="space-y-2">
                  <p className="text-lg font-medium">أضف صور من الرحلة (اختياري)</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-all hover:border-primary">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-muted-foreground mb-2">اسحب الصور هنا أو اضغط للاختيار</p>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        اختر الصور
                      </Button>
                    </label>
                    {images.length > 0 && (
                      <div className="mt-4 flex gap-2 flex-wrap">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Uploaded ${index}`}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                              onClick={() => removeImage(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    {images.length >= 5 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        تم الوصول إلى الحد الأقصى (5 صور)
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* نصائح للتقييم */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">نصائح للتقييم</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <ul className="space-y-2 list-disc pl-5">
                  <li>كن صادقاً وموضوعياً في تقييمك</li>
                  <li>اذكر النقاط الإيجابية والسلبية</li>
                  <li>تحدث عن جودة الخدمة والتنظيم</li>
                  <li>اذكر مدى مطابقة الرحلة للوصف</li>
                  <li>تقييمك يساعد الآخرين في اختيار الرحلة المناسبة</li>
                </ul>
                <div className="pt-6">
                  <Button 
                    className="w-full" 
                    onClick={handleSubmitReview}
                    disabled={rating === 0}
                  >
                    إرسال التقييم
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default RateTripTourist;