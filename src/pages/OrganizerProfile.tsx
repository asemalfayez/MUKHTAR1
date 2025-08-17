import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Mail, Star, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

const OrganizerProfile = () => {
  const [language] = useState<'ar' | 'en'>('ar');
  const [isDark] = useState(false);
  const { organizerId } = useParams();
  const { user, isLoading, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: '',
    phone: '',
    email: '',
    avatar: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // لحفظ ملف الصورة المرفوعة

  useEffect(() => {
    document.title = language === 'ar' ? 'ملف المنظم - مختار' : 'Organizer Profile - Mukhtar';
  }, [language]);

  // بيانات افتراضية للمنظم (يمكن ربطها بـ API لاحقًا)
  const organizerData = {
    id: organizerId || "ahmad-mohammad",
    name: user?.name || "أحمد محمد",
    avatar: user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
    phone: user?.phone || "+962791234567",
    email: user?.email || "ahmed@example.com",
    rating: 4.9,
    reviews: 340,
  };

  // تحديث البيانات المعدلة عند فتح نمط التحرير
  useEffect(() => {
    if (isEditing) {
      setEditedData({
        name: organizerData.name,
        phone: organizerData.phone,
        email: organizerData.email,
        avatar: organizerData.avatar,
      });
    }
  }, [isEditing, organizerData.name, organizerData.phone, organizerData.email, organizerData.avatar]);

  // بيانات الرحلات للسياح
  const userTrips = user?.userType === 'tourist' ? [
    { id: "trip1", name: "رحلة البحر الميت", rating: 4.8, date: "2025-07-15" },
    { id: "trip2", name: "رحلة البترا", rating: 4.6, date: "2025-06-20" },
    { id: "trip3", name: "رحلة وادي رم", rating: 4.9, date: "2025-08-01" },
  ] : [];

  // التحقق إذا كان المستخدم هو المالك للملف أو نفسه
  const isCurrentUser = user?.id === organizerId || (user?.userType === 'organizer' && user?.id === organizerId);

  const handleSaveChanges = () => {
    const updatedData = { ...editedData };
    if (avatarFile) {
      // في تطبيق حقيقي، يجب رفع الصورة إلى الخادم واستبدال الـ avatar بـ URL جديد
      // هنا نستخدم URL مؤقتة للمعاينة فقط
      updatedData.avatar = URL.createObjectURL(avatarFile);
    }
    updateUser(updatedData);
    setIsEditing(false);
    setAvatarFile(null); // إعادة تعيين ملف الصورة بعد الحفظ
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      setEditedData({ ...editedData, avatar: URL.createObjectURL(e.target.files[0]) });
    }
  };

  if (isLoading) {
    return <div>{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{language === 'ar' ? 'الملف الشخصي للمنظم' : 'Organizer Profile'}</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={isEditing ? editedData.avatar : organizerData.avatar} alt={organizerData.name} />
                <AvatarFallback>{isEditing ? editedData.name.charAt(0) : organizerData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing ? (
                <Input
                  value={editedData.name}
                  onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                  className="w-1/2"
                />
              ) : (
                organizerData.name
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* عرض التقييم دائمًا */}
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>{language === 'ar' ? `${organizerData.rating} (${organizerData.reviews} تقييمات)` : `${organizerData.rating} (${organizerData.reviews} reviews)`}</span>
            </div>

            {/* عرض معلومات الاتصال للمستخدمين المسجلين الدخول */}
            {user && (
              <>
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{language === 'ar' ? 'رقم الهاتف' : 'Phone'}</Label>
                      <Input
                        id="phone"
                        value={editedData.phone}
                        onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                        placeholder={language === 'ar' ? 'أدخل رقم الهاتف' : 'Enter phone number'}
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                      <Input
                        id="email"
                        value={editedData.email}
                        onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                        placeholder={language === 'ar' ? 'أدخل البريد الإلكتروني' : 'Enter email'}
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar">{language === 'ar' ? 'صورة الملف الشخصي' : 'Profile Picture'}</Label>
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>{organizerData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span>{organizerData.email}</span>
                    </div>
                  </>
                )}
              </>
            )}

            {/* خيار تحرير للمستخدم الحالي */}
            {isCurrentUser && (
              <div className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-muted-foreground" />
                {isEditing ? (
                  <div className="space-x-2">
                    <Button variant="outline" onClick={handleSaveChanges}>
                      {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    {language === 'ar' ? 'تحرير الملف' : 'Edit Profile'}
                  </Button>
                )}
              </div>
            )}

            {/* عرض الرحلات للسياح */}
            {user?.userType === 'tourist' && (
              <>
                <h3 className="text-lg font-semibold">{language === 'ar' ? 'رحلاتي' : 'My Trips'}</h3>
                <ul className="space-y-2">
                  {userTrips.map((trip) => (
                    <li key={trip.id} className="flex justify-between">
                      <span>{trip.name} ({trip.date})</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {trip.rating}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* رسالة إذا لم يكن مسجل الدخول */}
            {!user && (
              <p className="text-muted-foreground">
                {language === 'ar' ? 'يرجى تسجيل الدخول لعرض التفاصيل الكاملة أو رحلاتك.' : 'Please log in to view full details or your trips.'}
              </p>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default OrganizerProfile;