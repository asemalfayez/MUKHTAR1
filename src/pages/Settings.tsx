import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { Moon, Sun, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar'); // يمكن تحديثه ليكون متزامنًا مع السياق العام لاحقًا
  const [isDark, setIsDark] = useState(false); // يمكن تحديثه ليكون متزامنًا مع الثيم العام لاحقًا

  const handleSave = () => {
    updateUser({ email, phone }); // تحديث البريد والهاتف فقط
    toast({
      title: 'تم الحفظ بنجاح',
      description: 'تم تحديث إعداداتك بنجاح',
    });
    navigate(-1); // العودة إلى الصفحة السابقة
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">الإعدادات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* تعديل البريد الإلكتروني */}
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>

            {/* تعديل رقم الهاتف */}
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="أدخل رقم هاتفك"
              />
            </div>

            {/* تغيير اللغة */}
            <div className="space-y-2">
              <Label>اللغة</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant={language === 'ar' ? 'default' : 'outline'}
                  onClick={() => setLanguage('ar')}
                >
                  <Globe className="mr-2 h-4 w-4" /> العربية
                </Button>
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  onClick={() => setLanguage('en')}
                >
                  <Globe className="mr-2 h-4 w-4" /> English
                </Button>
              </div>
            </div>

            {/* تغيير الثيم */}
            <div className="space-y-2">
              <Label>وضع الثيم</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isDark}
                  onCheckedChange={setIsDark}
                />
                {isDark ? (
                  <span className="flex items-center">
                    <Moon className="mr-2 h-4 w-4" /> الوضع المظلم
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Sun className="mr-2 h-4 w-4" /> الوضع الفاتح
                  </span>
                )}
              </div>
            </div>

            {/* زر الحفظ */}
            <Button className="w-full" onClick={handleSave}>
              حفظ التغييرات
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Settings;