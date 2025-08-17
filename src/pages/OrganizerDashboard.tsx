import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

interface OrganizerDashboardProps {
  language: 'ar' | 'en';
  isDark: boolean;
}

const OrganizerDashboard = ({ language, isDark }: OrganizerDashboardProps) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { value: "overview", label: language === 'ar' ? "نظرة عامة" : "Overview" },
    { value: "my-trips", label: language === 'ar' ? "رحلاتي" : "My Trips" },
    { value: "bookings", label: language === 'ar' ? "الحجوزات" : "Bookings" },
    { value: "profile", label: language === 'ar' ? "الملف الشخصي" : "Profile" },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-background`}>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? "لوحة تحكم المنظم" : "Organizer Dashboard"}
          </h1>
          <Link to="/create-trip">
            <Button variant="hero">
              {language === 'ar' ? "إضافة رحلة جديدة" : "Add New Trip"}
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? "نظرة عامة" : "Overview"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  {user && user.name ? (
                    <Avatar>
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar>
                      <AvatarFallback>O</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {language === 'ar' ? "مرحباً" : "Welcome"}{" "}
                      {user?.name || "Organizer"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? "إدارة رحلاتك بسهولة" : "Manage your trips easily"}
                    </p>
                  </div>
                </div>
                <p>
                  {language === 'ar' ? "مرحباً بك في لوحة التحكم، يمكنك هنا متابعة أداء رحلاتك." : "Welcome to your dashboard, track your trips' performance here."}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-trips" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? "رحلاتي" : "My Trips"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{language === 'ar' ? "قائمة رحلاتك النشطة والمسودات." : "List of your active and draft trips."}</p>
                <Link to="/my-trips">
                  <Button variant="outline" className="mt-4">
                    {language === 'ar' ? "عرض الرحلات" : "View Trips"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? "الحجوزات" : "Bookings"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{language === 'ar' ? "إدارة الحجوزات الواردة." : "Manage incoming bookings."}</p>
                <Link to="/organizer-bookings">
                  <Button variant="outline" className="mt-4">
                    {language === 'ar' ? "عرض الحجوزات" : "View Bookings"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? "الملف الشخصي" : "Profile"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{language === 'ar' ? "تحرير بياناتك الشخصية." : "Edit your personal information."}</p>
                <Link to={`/organizer-profile/${user?.id || ''}`}>
                  <Button variant="outline" className="mt-4">
                    {language === 'ar' ? "عرض الملف" : "View Profile"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default OrganizerDashboard;