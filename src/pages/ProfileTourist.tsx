import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Camera, Edit, Star, MapPin, Calendar } from "lucide-react";

const ProfileTourist = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [isDark, setIsDark] = useState(false);
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: "أحب السفر واستكشاف الأماكن الجديدة",
    location: "عمان، الأردن",
    birthDate: "1990-05-15"
  });
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null); // لتتبع الإيموجي المختار

  const stats = [
    { label: "الرحلات المكتملة", value: 12 },
    { label: "التقييمات المكتوبة", value: 8 },
    { label: "البلدان المزارة", value: 5 },
    { label: "عضو منذ", value: "2022" }
  ];

  const recentTrips = [
    {
      title: "رحلة البتراء الساحرة",
      date: "2024-02-15",
      rating: 5,
      image: "/nmera.jpg"
    },
    {
      title: "مغامرة وادي رم",
      date: "2024-01-20",
      rating: 4,
      image: "/image.jpg"
    },
    {
      title: "استرخاء البحر الميت",
      date: "2023-12-10",
      rating: 5,
      image: "/hmad.jpg"
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // هنا يمكن إضافة منطق حفظ البيانات
  };

  // قائمة الإيموجي المتاحة (أشكال مختلفة تشبه AvatarFallback)
  const avatarEmojis = ["😄", "🌟", "🏄", "🌍", "🎉", "🚴", "🏞️", "🌙"];
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const handleCameraClick = () => {
    setIsEmojiPickerOpen(true);
  };

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    setIsEmojiPickerOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {/* الملف الشخصي */}
            <Card>
              <CardHeader className="text-center">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={selectedEmoji ? undefined : user?.avatar} alt="Profile" />
                    {selectedEmoji ? (
                      <span className="text-4xl">{selectedEmoji}</span>
                    ) : (
                      <AvatarFallback className="text-4xl">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -left-2 rounded-full p-2 h-8 w-8"
                    onClick={handleCameraClick}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                {isEmojiPickerOpen && (
                  <div className="absolute z-10 bg-background border rounded-lg p-2 mt-2 shadow-lg">
                    <div className="grid grid-cols-4 gap-2">
                      {avatarEmojis.map((emoji) => (
                        <Button
                          key={emoji}
                          variant="ghost"
                          className="h-12 w-12 text-3xl"
                          onClick={() => handleEmojiSelect(emoji)}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                <CardTitle className="mt-4">{profileData.name}</CardTitle>
                <p className="text-muted-foreground flex items-center justify-center">
                  <MapPin className="w-4 h-4 ml-1" />
                  {profileData.location}
                </p>
                <Badge variant="secondary" className="w-fit mx-auto mt-2">
                  مسافر
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* الرحلات الأخيرة */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>الرحلات الأخيرة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTrips.map((trip, index) => (
                  <div key={index} className="flex items-center space-x-3 space-x-reverse">
                    <img 
                      src={trip.image} 
                      alt={trip.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{trip.title}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="w-3 h-3 ml-1" />
                          {trip.date}
                        </p>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 ml-1" />
                          <span className="text-xs">{trip.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {/* معلومات شخصية */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>المعلومات الشخصية</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4 ml-2" />
                  {isEditing ? "إلغاء" : "تعديل"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthDate">تاريخ الميلاد</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={profileData.birthDate}
                      onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">الموقع</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">نبذة شخصية</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    disabled={!isEditing}
                    className="min-h-24"
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-3">
                    <Button onClick={handleSave}>حفظ التغييرات</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      إلغاء
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* إعدادات الأمان */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>إعدادات الأمان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  تغيير كلمة المرور
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  إعدادات الخصوصية
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  إعدادات الإشعارات
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default ProfileTourist;