import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "تم إرسال رابط إعادة التعيين",
      description: "تحقق من بريدك الإلكتروني واتبع التعليمات",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">تحقق من بريدك الإلكتروني</CardTitle>
            <CardDescription>
              تم إرسال رابط إعادة تعيين كلمة المرور إلى<br />
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              لم تستلم الرسالة؟ تحقق من مجلد الرسائل المزعجة أو{" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => setIsSubmitted(false)}
              >
                أعد المحاولة
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Link to="/signin" className="flex-1">
                <Button variant="outline" className="w-full">
                  العودة لتسجيل الدخول
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button variant="ghost" className="w-full">
                  الصفحة الرئيسية
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">إعادة تعيين كلمة المرور</CardTitle>
          <CardDescription>
            أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
          </CardDescription>
        </CardHeader>
        <CardContent>
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

            <Button type="submit" className="w-full" variant="hero">
              إرسال رابط إعادة التعيين
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/signin" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowRight className="h-4 w-4 ml-1" />
              العودة لتسجيل الدخول
            </Link>
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

export default ForgotPassword;