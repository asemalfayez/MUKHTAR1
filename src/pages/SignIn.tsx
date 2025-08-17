import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, User, Briefcase } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'tourist' | 'organizer'>('tourist');
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password, userType);
      if (success) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في مختار",
        });
        
        // Redirect based on user type
        if (userType === 'organizer') {
          navigate('/dashboard');
        } else {
          navigate('/explore-trips');
        }
      }
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "يرجى التحقق من البيانات المدخلة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
          <CardDescription>اختر نوع حسابك وادخل بياناتك</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={userType} onValueChange={(value) => setUserType(value as 'tourist' | 'organizer')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="tourist" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                سائح
              </TabsTrigger>
              <TabsTrigger value="organizer" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                منظم رحلات
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tourist" className="space-y-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg mb-4">
                <h3 className="font-semibold text-primary">مرحباً بك كسائح!</h3>
                <p className="text-sm text-muted-foreground">استكشف واحجز أفضل الرحلات السياحية</p>
              </div>
            </TabsContent>
            
            <TabsContent value="organizer" className="space-y-4">
              <div className="text-center p-4 bg-secondary/5 rounded-lg mb-4">
                <h3 className="font-semibold text-secondary">مرحباً بك كمنظم رحلات!</h3>
                <p className="text-sm text-muted-foreground">أنشئ وأدر رحلاتك بسهولة</p>
              </div>
            </TabsContent>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني"
                required
                dir="ltr"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm">تذكرني</Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
              {isLoading ? `جارٍ تسجيل دخول ${userType === 'tourist' ? 'السائح' : 'المنظم'}...` : `تسجيل دخول ${userType === 'tourist' ? 'السائح' : 'المنظم'}`}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ليس لديك حساب؟{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                إنشاء حساب جديد
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

export default SignIn;