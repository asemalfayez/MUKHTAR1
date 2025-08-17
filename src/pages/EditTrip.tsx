import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/Footer";

interface EditTripProps {
  language?: 'ar' | 'en';
  isDark?: boolean;
}

const EditTrip = ({ language = 'ar', isDark = false }: EditTripProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: 0,
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
  const [error, setError] = useState("");
  const maxStops = 15;

  const t = {
    ar: {
      title: "تعديل الرحلة",
      save: "حفظ التغييرات",
      cancel: "إلغاء",
      tripTitle: "عنوان الرحلة",
      price: "السعر (د.أ)",
      description: "وصف الرحلة",
      duration: "المدة",
      groupSize: "حجم المجموعة",
      location: "الموقع الرئيسي",
      startDate: "تاريخ البدء",
      status: "الحالة",
      mainImage: "صورة الرحلة الرئيسية",
      stops: "المواقف (حتى 15 موقفًا)",
      addStop: "إضافة موقف جديد",
      removeStop: "حذف الموقف",
    },
    en: {
      title: "Edit Trip",
      save: "Save Changes",
      cancel: "Cancel",
      tripTitle: "Trip Title",
      price: "Price (JD)",
      description: "Trip Description",
      duration: "Duration",
      groupSize: "Group Size",
      location: "Main Location",
      startDate: "Start Date",
      status: "Status",
      mainImage: "Main Trip Image",
      stops: "Stops (up to 15 stops)",
      addStop: "Add New Stop",
      removeStop: "Remove Stop",
    },
  };

  const text = t[language];

  // تحميل بيانات الرحلة بناءً على ID
  useEffect(() => {
    // هنا نفترض البحث عن الرحلة من بيانات حالة موجودة (مثل Context أو API)
    const initialTrip = {
      id: parseInt(id || "0"),
      title: "",
      price: "",
      description: "",
      duration: "",
      groupSize: "",
      location: "",
      status: "draft",
      startDate: "",
      mainImage: null,
      stops: [
        { name: "", location: "", image: null },
        { name: "", location: "", image: null },
      ],
    };

    switch (parseInt(id || "0")) {
      case 1:
        initialTrip.title = "رحلة استكشاف وادي بن حماد";
        initialTrip.price = "140";
        initialTrip.description = "استمتع بالشلالات المتدفقة، الممرات الصخرية الضيقة، والطبيعة الخضراء مع ينابيع مياه باردة";
        initialTrip.duration = "يوم كامل";
        initialTrip.groupSize = "2-12 شخص";
        initialTrip.location = "وادي بن حماد، الأردن";
        initialTrip.status = "نشط";
        initialTrip.startDate = "2025-08-18";
        initialTrip.stops = [
          { name: "مدخل الوادي", location: "وادي بن حماد", image: null },
          { name: "الشلالات", location: "وادي بن حماد", image: null },
        ];
        break;
      case 2:
        initialTrip.title = "مغامرة في وادي نميره";
        initialTrip.price = "160";
        initialTrip.description = "استكشف القطاع الصخري الضيق (السيق) المحفور في الحجر الرملي مع نهير يلتقي بالبحر الميت";
        initialTrip.duration = "نصف يوم";
        initialTrip.groupSize = "2-10 شخص";
        initialTrip.location = "وادي نميره، الأردن";
        initialTrip.status = "مسودة";
        initialTrip.startDate = "2025-08-19";
        initialTrip.stops = [
          { name: "مدخل السيق", location: "وادي نميره", image: null },
          { name: "النهير", location: "وادي نميره", image: null },
        ];
        break;
      case 3:
        initialTrip.title = "جولة في وادي الحسا";
        initialTrip.price = "130";
        initialTrip.description = "استمتع بالمنحدرات الصخرية والشلالات الخلابة في وادي صحراوي يمتد 40 كم";
        initialTrip.duration = "يوم";
        initialTrip.groupSize = "2-15 شخص";
        initialTrip.location = "وادي الحسا، الأردن";
        initialTrip.status = "نشط";
        initialTrip.startDate = "2025-08-20";
        initialTrip.stops = [
          { name: "مدخل الوادي", location: "وادي الحسا", image: null },
          { name: "الشلالات", location: "وادي الحسا", image: null },
        ];
        break;
      default:
        initialTrip.title = "رحلة غير موجودة";
        initialTrip.price = "";
        initialTrip.description = "";
        initialTrip.duration = "";
        initialTrip.groupSize = "";
        initialTrip.location = "";
        initialTrip.status = "draft";
        initialTrip.startDate = "";
        initialTrip.stops = [];
    }

    setFormData(initialTrip);
  }, [id]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.location) {
      setError("يرجى ملء جميع الحقول الإلزامية (العنوان، السعر، الموقع).");
      return;
    }
    setError("");
    console.log("Trip updated:", formData);
    // هنا يمكنك إضافة منطق التحديث (مثل إرسال البيانات إلى API)
    navigate("/my-trips");
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-background`}>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">{text.title}</h1>

        <Card>
          <CardHeader>
            <CardTitle>{text.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">{text.tripTitle} *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder={text.tripTitle}
                  />
                </div>
                <div>
                  <Label htmlFor="price">{text.price} *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder={text.price}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">{text.description}</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={text.description}
                  className="min-h-32"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="duration">{text.duration}</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder={text.duration}
                  />
                </div>
                <div>
                  <Label htmlFor="groupSize">{text.groupSize}</Label>
                  <Input
                    id="groupSize"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleChange}
                    placeholder={text.groupSize}
                  />
                </div>
                <div>
                  <Label htmlFor="location">{text.location} *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder={text.location}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">{text.startDate}</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="status">{text.status}</Label>
                  <Select onValueChange={(value) => handleSelectChange("status", value)} defaultValue={formData.status}>
                    <SelectTrigger>
                      <SelectValue placeholder={text.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">مسودة</SelectItem>
                      <SelectItem value="active">نشط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="mainImage">{text.mainImage}</Label>
                <Input
                  id="mainImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "mainImage")}
                />
              </div>

              <div>
                <Label>{text.stops}</Label>
                {formData.stops.map((stop, index) => (
                  <div key={index} className="border rounded-md p-4 mb-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`stopName-${index}`}>{text.tripTitle}</Label>
                        <Input
                          id={`stopName-${index}`}
                          value={stop.name}
                          onChange={(e) => handleStopChange(index, "name", e.target.value)}
                          placeholder={text.tripTitle}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`stopLocation-${index}`}>{text.location}</Label>
                        <Input
                          id={`stopLocation-${index}`}
                          value={stop.location}
                          onChange={(e) => handleStopChange(index, "location", e.target.value)}
                          placeholder={text.location}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`stopImage-${index}`}>{text.mainImage}</Label>
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
                      {text.removeStop}
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addStop}
                  disabled={formData.stops.length >= maxStops}
                >
                  {text.addStop}
                </Button>
              </div>

              <div className="flex gap-3">
                <Button type="submit">{text.save}</Button>
                <Button variant="outline" onClick={() => navigate("/my-trips")}>
                  {text.cancel}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default EditTrip;