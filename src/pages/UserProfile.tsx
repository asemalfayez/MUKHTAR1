import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  MapPin, 
  Star, 
  Download,
  Edit,
  Trash2,
  Clock,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDark, setIsDark] = useState(false);

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      tripTitle: "رحلة استكشاف البتراء",
      organizer: "أحمد السياحي",
      date: "2024-02-15",
      guests: 2,
      total: 300,
      status: "مؤكد",
      image: "/nmera.jpg"
    },
    {
      id: 2,
      tripTitle: "مغامرة في وادي رم",
      organizer: "سارة المغامرة",
      date: "2024-02-20",
      guests: 4,
      total: 800,
      status: "في الانتظار",
      image: "/image.jpg"
    },
    {
      id: 3,
      tripTitle: "جولة البحر الميت",
      organizer: "محمد الاستجمام",
      date: "2024-01-10",
      guests: 1,
      total: 120,
      status: "مكتمل",
      image: "/hmad.jpg"
    }
  ];

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      tripTitle: "رحلة استكشاف البتراء",
      rating: 5,
      comment: "رحلة رائعة! أحمد مرشد ممتاز ويعرف كل تفاصيل البتراء. أنصح بشدة!",
      date: "2024-01-12",
      organizer: "أحمد السياحي"
    },
    {
      id: 2,
      tripTitle: "جولة البحر الميت",
      rating: 4,
      comment: "تجربة جميلة ومريحة، لكن كان الوقت قصير نوعاً ما.",
      date: "2024-01-12",
      organizer: "محمد الاستجمام"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مؤكد":
        return "bg-green-500";
      case "في الانتظار":
        return "bg-yellow-500";
      case "مكتمل":
        return "bg-blue-500";
      case "ملغي":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ملفي الشخصي</h1>
          <p className="text-muted-foreground">إدارة معلوماتك وحجوزاتك</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">المعلومات الشخصية</TabsTrigger>
            <TabsTrigger value="bookings">حجوزاتي</TabsTrigger>
            <TabsTrigger value="reviews">تقييماتي</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Info Card */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>المعلومات الشخصية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        تغيير الصورة
                      </Button>
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG أو JPG بحد أقصى 2MB
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input id="name" defaultValue={user?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input id="email" type="email" defaultValue={user?.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input id="phone" defaultValue={user?.phone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">اللغة المفضلة</Label>
                      <select className="w-full p-2 border rounded-md bg-background">
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">نبذة شخصية</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="اكتب نبذة عن نفسك واهتماماتك السياحية..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button variant="hero">حفظ التغييرات</Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>إحصائياتي</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">الرحلات المكتملة</span>
                      <span className="font-bold">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">التقييمات المكتوبة</span>
                      <span className="font-bold">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">عضو منذ</span>
                      <span className="font-bold">يناير 2024</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>تغيير كلمة المرور</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button variant="outline" className="w-full">
                      تحديث كلمة المرور
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">حجوزاتي</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">الكل</Button>
                <Button variant="outline" size="sm">مؤكد</Button>
                <Button variant="outline" size="sm">في الانتظار</Button>
                <Button variant="outline" size="sm">مكتمل</Button>
              </div>
            </div>

            <div className="grid gap-6">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img 
                        src={booking.image} 
                        alt={booking.tripTitle}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{booking.tripTitle}</h3>
                            <p className="text-muted-foreground">منظم بواسطة {booking.organizer}</p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{booking.guests} أشخاص</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-primary">{booking.total} د.أ</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link to={`/trip/${booking.id}`}>
                            <Button variant="outline" size="sm">
                              عرض التفاصيل
                            </Button>
                          </Link>
                          {booking.status === "مكتمل" && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 ml-1" />
                              تحميل الفاتورة
                            </Button>
                          )}
                          {booking.status === "في الانتظار" && (
                            <Button variant="destructive" size="sm">
                              إلغاء الحجز
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">تقييماتي</h2>
              <p className="text-muted-foreground">{reviews.length} تقييم</p>
            </div>

            <div className="grid gap-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{review.tripTitle}</h3>
                        <p className="text-muted-foreground">منظم بواسطة {review.organizer}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{review.comment}</p>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 ml-1" />
                        تعديل
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 ml-1" />
                        حذف
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;