import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateTripOrganizer = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    duration: "",
    groupSize: "",
    location: "",
    status: "draft",
    startDate: "",
    mainImage: null as File | null,
    stops: [] as { name: string; location: string; image: File | null }[],
  });
  const [language] = useState<'ar' | 'en'>('ar');
  const [isDark] = useState(false);
  const [error, setError] = useState("");
  const maxStops = 15;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const handleStopChange = (index: number, field: string, value: string | File) => {
    setFormData((prev) => {
      const newStops = [...prev.stops];
      newStops[index] = { ...newStops[index], [field]: value };
      return { ...prev, stops: newStops };
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addStop = () => {
    if (formData.stops.length < maxStops) {
      setFormData((prev) => ({
        ...prev,
        stops: [...prev.stops, { name: "", location: "", image: null }],
      }));
    }
  };

  const removeStop = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent, saveAsDraft: boolean) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.location) {
      setError("يرجى ملء جميع الحقول الإلزامية (العنوان، السعر، الموقع).");
      return;
    }
    setError("");
    console.log("Trip saved:", { ...formData, status: saveAsDraft ? "draft" : "active" });
    // هنا يمكنك إضافة منطق الحفظ (مثل إرسال البيانات إلى API)
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">إنشاء رحلة جديدة</h1>

        <Card>
          <CardHeader>
            <CardTitle>تفاصيل الرحلة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">عنوان الرحلة *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="أدخل عنوان الرحلة"
                  />
                </div>
                <div>
                  <Label htmlFor="price">السعر (د.أ) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="350"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">وصف الرحلة</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="اكتب وصفاً تفصيلياً للرحلة..."
                  className="min-h-32"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="duration">المدة</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="3 أيام"
                  />
                </div>
                <div>
                  <Label htmlFor="groupSize">حجم المجموعة</Label>
                  <Input
                    id="groupSize"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleChange}
                    placeholder="8-12 شخص"
                  />
                </div>
                <div>
                  <Label htmlFor="location">الموقع الرئيسي *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="البتراء، الأردن"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">تاريخ البدء</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="status">الحالة</Label>
                  <Select onValueChange={(value) => handleSelectChange("status", value)} defaultValue={formData.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">مسودة</SelectItem>
                      <SelectItem value="active">نشط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="mainImage">صورة الرحلة الرئيسية</Label>
                <Input
                  id="mainImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "mainImage")}
                />
              </div>

              <div>
                <Label>المواقف (حتى 15 موقفًا)</Label>
                {formData.stops.map((stop, index) => (
                  <div key={index} className="border rounded-md p-4 mb-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`stopName-${index}`}>اسم الموقف</Label>
                        <Input
                          id={`stopName-${index}`}
                          value={stop.name}
                          onChange={(e) => handleStopChange(index, "name", e.target.value)}
                          placeholder="موقف 1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`stopLocation-${index}`}>موقع الموقف</Label>
                        <Input
                          id={`stopLocation-${index}`}
                          value={stop.location}
                          onChange={(e) => handleStopChange(index, "location", e.target.value)}
                          placeholder="وادي رم"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`stopImage-${index}`}>صورة الموقف</Label>
                        <Input
                          id={`stopImage-${index}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleStopChange(index, "image", e.target.files ? e.target.files[0] : null)
                          }
                        />
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => removeStop(index)}
                      disabled={formData.stops.length === 1}
                    >
                      حذف الموقف
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addStop}
                  disabled={formData.stops.length >= maxStops}
                >
                  إضافة موقف جديد
                </Button>
              </div>

              <div className="flex gap-3">
                <Button type="submit">حفظ الرحلة</Button>
                <Button variant="outline" onClick={(e) => handleSubmit(e, true)}>حفظ كمسودة</Button>
                <Button variant="ghost" type="button">إلغاء</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default CreateTripOrganizer;