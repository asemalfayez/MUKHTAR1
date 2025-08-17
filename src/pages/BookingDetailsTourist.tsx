import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Phone, Mail } from "lucide-react";

const MyBookingsTourist = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDark, setIsDark] = useState(false);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      tripTitle: "رحلة استكشاف وادي بن حماد",
      organizer: "أحمد الطبيعي",
      date: "2025-08-18",
      guests: 4,
      totalCost: 560, // 140 * 4
      status: "مؤكد",
      organizerPhone: "+962 7 8888 8888",
      organizerEmail: "ahmad.nature@mukhtar.jo"
    },
    {
      id: 2,
      tripTitle: "مغامرة في وادي نميره",
      organizer: "سارة المغامرة",
      date: "2025-08-19",
      guests: 2,
      totalCost: 320, // 160 * 2
      status: "قيد الانتظار",
      organizerPhone: "+962 7 7777 7777",
      organizerEmail: "sara.adventure@mukhtar.jo"
    },
    {
      id: 3,
      tripTitle: "جولة في وادي الحسا",
      organizer: "محمد الاستكشاف",
      date: "2025-08-20",
      guests: 3,
      totalCost: 390, // 130 * 3
      status: "مكتمل",
      organizerPhone: "+962 7 6666 6666",
      organizerEmail: "mohammad.explore@mukhtar.jo"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مؤكد": return "bg-green-500";
      case "قيد الانتظار": return "bg-yellow-500";
      case "مكتمل": return "bg-blue-500";
      case "ملغي": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleCancelBooking = (id: number) => {
    setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">حجوزاتي</h1>
          <p className="text-xl text-muted-foreground">إدارة جميع حجوزاتك السياحية</p>
        </div>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{booking.tripTitle}</CardTitle>
                    <p className="text-muted-foreground">منظم الرحلة: {booking.organizer}</p>
                  </div>
                  <Badge className={`${getStatusColor(booking.status)} text-white`}>
                    {booking.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ الرحلة</p>
                      <p className="font-medium">{booking.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">عدد الأشخاص</p>
                      <p className="font-medium">{booking.guests} أشخاص</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">هاتف المنظم</p>
                      <p className="font-medium">{booking.organizerPhone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">التكلفة الإجمالية</p>
                    <p className="text-2xl font-bold text-primary">{booking.totalCost} د.أ</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link to={`/trip/${booking.id}`}>
                    <Button variant="default">عرض التفاصيل</Button>
                  </Link>
                  {booking.status === "مكتمل" && (
                    <Button variant="outline">تحميل الفاتورة</Button>
                  )}
                  {booking.status === "قيد الانتظار" && (
                    <Button variant="destructive" onClick={() => handleCancelBooking(booking.id)}>
                      إلغاء الحجز
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default MyBookingsTourist;