import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Phone } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OrganizerBookings = () => {
  const [language] = useState<'ar' | 'en'>('ar');
  const [isDark] = useState(false);
  const [bookings, setBookings] = useState([
    {
      id: "BK001",
      tripTitle: "رحلة استكشاف وادي بن حماد",
      date: "2025-08-18",
      guests: 4,
      total: 560, // 140 * 4
      status: "مؤكد",
      phone: "+962788888888",
      email: "ahmad.nature@mukhtar.jo",
      guestsDetails: [
        { id: "G1", name: "أحمد علي", phone: "+962791234567", email: "ahmed@example.com" },
        { id: "G2", name: "سارة محمد", phone: "+962798765432", email: "sara@example.com" },
        { id: "G3", name: "خالد حسن", phone: "+962781234567", email: "khalid@example.com" },
        { id: "G4", name: "ليلى عبدالله", phone: "+962789012345", email: "laila@example.com" },
      ],
    },
    {
      id: "BK002",
      tripTitle: "مغامرة في وادي نميره",
      date: "2025-08-19",
      guests: 3,
      total: 480, // 160 * 3
      status: "قيد الانتظار",
      phone: "+962777777777",
      email: "sara.adventure@mukhtar.jo",
      guestsDetails: [
        { id: "G5", name: "محمد خالد", phone: "+962799999999", email: "mohamed@example.com" },
        { id: "G6", name: "فاطمة علي", phone: "+962788888888", email: "fatima@example.com" },
        { id: "G7", name: "علي حسن", phone: "+962777777777", email: "ali@example.com" },
      ],
    },
    {
      id: "BK003",
      tripTitle: "جولة في وادي الحسا",
      date: "2025-08-20",
      guests: 5,
      total: 650, // 130 * 5
      status: "مؤكد",
      phone: "+962766666666",
      email: "mohammad.explore@mukhtar.jo",
      guestsDetails: [
        { id: "G8", name: "نورا عبدالله", phone: "+962780000000", email: "nora@example.com" },
        { id: "G9", name: "يوسف محمد", phone: "+962785555555", email: "yousef@example.com" },
        { id: "G10", name: "هدى خالد", phone: "+962782222222", email: "huda@example.com" },
        { id: "G11", name: "عمر حسن", phone: "+962783333333", email: "omar@example.com" },
        { id: "G12", name: "ريم علي", phone: "+962784444444", email: "reem@example.com" },
      ],
    },
  ]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedGuest, setSelectedGuest] = useState<any>(null);
  const currentDate = new Date("2025-08-17T23:22:00+03:00");

  const handleStatusChange = (id: string, newStatus: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "مؤكد":
        return "bg-green-500 text-white";
      case "ملغي":
        return "bg-red-500 text-white";
      case "قيد الانتظار":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setSelectedGuest(null);
  };

  const closeDetails = () => {
    setSelectedBooking(null);
    setSelectedGuest(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">حجوزات العملاء</h1>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{booking.tripTitle}</h3>
                  </div>
                  <div className="space-y-2">
                    <Badge className={getStatusVariant(booking.status)}>{booking.status}</Badge>
                    <Select
                      onValueChange={(value) => handleStatusChange(booking.id, value)}
                      defaultValue={booking.status}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="تغيير الحالة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="مؤكد">مؤكد</SelectItem>
                        <SelectItem value="ملغي">ملغي</SelectItem>
                        <SelectItem value="قيد الانتظار">قيد الانتظار</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-6">
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
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 ml-2 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">الهاتف</p>
                      <p className="font-medium">{booking.phone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">المبلغ الإجمالي</p>
                    <p className="text-xl font-bold text-primary">{booking.total} د.أ</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => handleViewDetails(booking)}>عرض التفاصيل</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* نافذة تفاصيل مخصصة */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">تفاصيل الحجز</h2>
              {selectedGuest ? (
                <div className="space-y-4">
                  <p><strong>الاسم:</strong> {selectedGuest.name}</p>
                  <p><strong>الهاتف:</strong> {selectedGuest.phone}</p>
                  <p><strong>البريد الإلكتروني:</strong> {selectedGuest.email}</p>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedGuest(null)}
                    className="mt-4"
                  >
                    العودة للقائمة
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">قائمة الأشخاص:</h3>
                  <ul className="list-disc pl-5">
                    {selectedBooking.guestsDetails.map((guest: any) => (
                      <li
                        key={guest.id}
                        className="cursor-pointer text-blue-500 hover:underline"
                        onClick={() => setSelectedGuest(guest)}
                      >
                        {guest.name}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" onClick={closeDetails} className="mt-4">
                    إغلاق
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer language={language} />
    </div>
  );
};

export default OrganizerBookings;