import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, User, MapPin } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "tourist",
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمة المرور غير متطابقة",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      toast({
        title: "خطأ",
        description: "يرجى الموافقة على الشروط والأحكام",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const success = await signup({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        userType: formData.userType as "tourist" | "organizer",
        password: formData.password
      });

      if (success) {
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: `مرحباً بك ${formData.fullName} كـ ${formData.userType === 'tourist' ? 'سائح' : 'منظم رحلات'}`,
        });

        // Redirect based on user type
        if (formData.userType === 'organizer') {
          navigate('/dashboard');
        } else {
          navigate('/trips');
        }
      }
    } catch (error) {
      toast({
        title: "خطأ في إنشاء الحساب",
        description: "حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src="/MUKHTAR.png" 
            alt="Mukhtar Logo" 
            className="mx-auto mb-4 w-32 h-auto" // Adjust width and styling as needed
          />
          <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
          <CardDescription>انضم إلى مختار واستكشف الأردن</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">الاسم الكامل</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                placeholder="أدخل اسمك الكامل"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                required
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                placeholder="أدخل رقم هاتفك"
                required
                dir="ltr"
              />
            </div>

            <div className="space-y-3">
              <Label>نوع الحساب</Label>
              <RadioGroup 
                value={formData.userType} 
                onValueChange={(value) => updateFormData("userType", value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="tourist" id="tourist" />
                  <Label 
                    htmlFor="tourist" 
                    className="flex items-center gap-2 cursor-pointer flex-1 p-3 rounded-lg border hover:bg-accent"
                  >
                    <User className="h-4 w-4" />
                    <span>سائح</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="organizer" id="organizer" />
                  <Label 
                    htmlFor="organizer"
                    className="flex items-center gap-2 cursor-pointer flex-1 p-3 rounded-lg border hover:bg-accent"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>منظم رحلات</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  required
                  dir="ltr"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  placeholder="أعد إدخال كلمة المرور"
                  required
                  dir="ltr"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => updateFormData("acceptTerms", checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                أوافق على{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  الشروط والأحكام
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
              {isLoading ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              لديك حساب بالفعل؟{" "}
              <Link to="/signin" className="text-primary hover:underline font-medium">
                تسجيل الدخول
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;