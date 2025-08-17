import { useState } from "react";

import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Star, Download, Eye } from "lucide-react";

const BookingHistoryTourist = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const bookings = [
    {
      id: "BK001",
      tripTitle: "رحلة البتراء الساحرة",
      organizer: "أحمد محمد",
      date: "2024-03-15",
      guests: 4,
      totalCost: 1400,
      status: "مؤكد",
      image: "/nmera.jpg",
      location: "البتراء، الأردن",
      rating: 0
    },
    {
      id: "BK002",
      tripTitle: "مغامرة وادي رم",
      organizer: "سارة أحمد",
      date: "2024-03-22",
      guests: 2,
      totalCost: 560,
      status: "قيد الانتظار",
      image: "/image.jpg",
      location: "وادي رم، الأردن",
      rating: 0
    },
    {
      id: "BK003",
      tripTitle: "استرخاء البحر الميت",
      organizer: "محمد علي",
      date: "2024-02-10",
      guests: 3,
      totalCost: 360,
      status: "مكتمل",
      image: "/hmad.jpg",
      location: "البحر الميت، الأردن",
      rating: 5
    },
    {
      id: "BK004",
      tripTitle: "رحلة عمان التاريخية",
      organizer: "فاطمة خالد",
      date: "2024-01-15",
      guests: 2,
      totalCost: 240,
      status: "مكتمل",
      image: "/nmera.jpg",
      location: "عمان، الأردن",
      rating: 4
    },
    {
      id: "BK005",
      tripTitle: "رحلة العقبة البحرية",
      organizer: "عمر السالم",
      date: "2023-12-20",
      guests: 5,
      totalCost: 850,
      status: "ملغي",
      image: "/image.jpg",
      location: "العقبة، الأردن",
      rating: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مؤكد": return "bg-green-500";
      case "قيد الانتظار": return "bg-yellow-500";
      case "مكتمل": return "bg-blue-500";
      case "ملغي": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const filterBookings = (status: string) => {
    if (status === "all") return bookings;
    return bookings.filter(booking => booking.status === status);
  };

  const getTabCounts = () => {
    return {
      all: bookings.length,
      confirmed: bookings.filter(b => b.status === "مؤكد").length,
      completed: bookings.filter(b => b.status === "مكتمل").length,
      pending: bookings.filter(b => b.status === "قيد الانتظار").length,
      cancelled: bookings.filter(b => b.status === "ملغي").length
    };
  };

  const counts = getTabCounts();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">سجل الحجوزات</h1>
          <p className="text-xl text-muted-foreground">تاريخ جميع حجوزاتك السياحية</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">الكل ({counts.all})</TabsTrigger>
            <TabsTrigger value="مؤكد">المؤكدة ({counts.confirmed})</TabsTrigger>
            <TabsTrigger value="مكتمل">المكتملة ({counts.completed})</TabsTrigger>
            <TabsTrigger value="قيد الانتظار">قيد الانتظار ({counts.pending})</TabsTrigger>
            <TabsTrigger value="ملغي">الملغية ({counts.cancelled})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-6">
              {filterBookings(activeTab).map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* صورة الرحلة */}
                      <div className="lg:w-48 h-32 lg:h-auto">
                        <img 
                          src={booking.image} 
                          alt={booking.tripTitle}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* تفاصيل الحجز */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{booking.tripTitle}</h3>
                            <p className="text-muted-foreground">رقم الحجز: {booking.id}</p>
                            <p className="text-muted-foreground">منظم الرحلة: {booking.organizer}</p>
                          </div>
                          <Badge className={`${getStatusColor(booking.status)} text-white`}>
                            {booking.status}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-6">
                          <div className="flex items-center">
                            <MapPin className="w-5 h-5 ml-2 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">الوجهة</p>
                              <p className="font-medium">{booking.location}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Calendar className="w-5 h-5 ml-2 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">التاريخ</p>
                              <p className="font-medium">{booking.date}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Users className="w-5 h-5 ml-2 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">عدد الأشخاص</p>
                              <p className="font-medium">{booking.guests}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground">التكلفة الإجمالية</p>
                            <p className="text-xl font-bold text-primary">{booking.totalCost} د.أ</p>
                          </div>
                        </div>

                        {/* التقييم */}
                        {booking.status === "مكتمل" && booking.rating > 0 && (
                          <div className="flex items-center mb-4">
                            <span className="text-sm text-muted-foreground ml-2">تقييمك:</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < booking.rating 
                                      ? "fill-yellow-400 text-yellow-400" 
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="mr-2 text-sm">{booking.rating}/5</span>
                            </div>
                          </div>
                        )}

                        {/* الأزرار */}
                        <div className="flex flex-wrap gap-3">
                          <Button variant="default">
                            <Eye className="w-4 h-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          
                          {booking.status === "مكتمل" && (
                            <>
                              <Button variant="outline">
                                <Download className="w-4 h-4 ml-2" />
                                تحميل الفاتورة
                              </Button>
                              {booking.rating === 0 && (
                                <Button variant="outline">
                                  <Star className="w-4 h-4 ml-2" />
                                  تقييم الرحلة
                                </Button>
                              )}
                            </>
                          )}
                          
                          {booking.status === "قيد الانتظار" && (
                            <Button variant="destructive">
                              إلغاء الحجز
                            </Button>
                          )}
                          
                          {booking.status === "مؤكد" && (
                            <Button variant="outline">
                              تعديل الحجز
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filterBookings(activeTab).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    لا توجد حجوزات في هذه الفئة
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default BookingHistoryTourist;