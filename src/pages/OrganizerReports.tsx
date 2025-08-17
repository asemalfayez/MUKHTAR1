import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// تعريف الأنواع
interface MonthlyData {
  bookings: Record<string, number>;
  revenue: Record<string, number>;
  customers: Record<string, number>;
  cancellations: Record<string, number>;
}

interface YearlyData {
  bookings: number;
  revenue: number;
  customers: number;
  cancellations: number;
}

const OrganizerReports = ({ language = 'ar', isDark = false }: { language?: 'ar' | 'en'; isDark?: boolean }) => {
  const [filter, setFilter] = useState<'monthly' | 'yearly'>('monthly');

  const bookingChartRef = useRef<HTMLCanvasElement>(null);
  const revenueChartRef = useRef<HTMLCanvasElement>(null);

  // نأخذ مكتبة Chart من window (من الـ CDN)
  const Chart: any = (window as any).Chart;

  useEffect(() => {
    document.title = language === 'ar' ? 'تقارير وتحليلات - مختار' : 'Reports & Analytics - Mukhtar';
  }, [language]);

  // بيانات وهمية
  const reportData = {
    monthly: {
      bookings: { jan: 50, feb: 75, mar: 60, apr: 90, may: 110, jun: 85, jul: 120, aug: 95 },
      revenue: { jan: 1000, feb: 1500, mar: 1200, apr: 1800, may: 2200, jun: 1700, jul: 2400, aug: 1900 },
      customers: { jan: 30, feb: 45, mar: 35, apr: 50, may: 60, jun: 40, jul: 65, aug: 50 },
      cancellations: { jan: 5, feb: 8, mar: 6, apr: 10, may: 12, jun: 9, jul: 15, aug: 10 },
    } as MonthlyData,
    yearly: {
      bookings: 685,
      revenue: 13700,
      customers: 375,
      cancellations: 75,
    } as YearlyData,
  };

  const currentData: MonthlyData | YearlyData = filter === 'monthly' ? reportData.monthly : reportData.yearly;

  const calculateTotal = (data: number | Record<string, number>): number =>
    typeof data === 'number' ? data : Object.values(data).reduce((a, b) => a + b, 0);

  const calculateCancellationRate = (cancellations: number, bookings: number): number =>
    bookings > 0 ? (cancellations / bookings) * 100 : 0;

  const getDataValue = (data: number | Record<string, number>): number =>
    typeof data === 'number' ? data : calculateTotal(data);

  // رسم المخططات
  useEffect(() => {
    const labels =
      filter === 'monthly'
        ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس']
        : ['2025'];

    const bookingData =
      filter === 'monthly'
        ? Object.values(reportData.monthly.bookings)
        : [reportData.yearly.bookings];

    const revenueData =
      filter === 'monthly'
        ? Object.values(reportData.monthly.revenue)
        : [reportData.yearly.revenue];

    if (bookingChartRef.current) {
      new Chart(bookingChartRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: language === 'ar' ? 'عدد الحجوزات' : 'Number of Bookings',
              data: bookingData,
              backgroundColor: 'rgba(255, 215, 0, 0.6)',
              borderColor: 'rgba(255, 215, 0, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } },
      });
    }

    if (revenueChartRef.current) {
      new Chart(revenueChartRef.current, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: language === 'ar' ? 'الإيرادات (د.أ)' : 'Revenue (JOD)',
              data: revenueData,
              borderColor: 'rgba(255, 99, 132, 1)',
              tension: 0.1,
              fill: false,
            },
          ],
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } },
      });
    }
  }, [filter, language]);

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-background`}>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'ar' ? 'تقارير وتحليلات' : 'Reports & Analytics'}
        </h1>

        {/* الفلتر */}
        <div className="mb-6">
          <Select onValueChange={(value) => setFilter(value as 'monthly' | 'yearly')} defaultValue="monthly">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === 'ar' ? 'اختر الفترة' : 'Select Period'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">{language === 'ar' ? 'شهري' : 'Monthly'}</SelectItem>
              <SelectItem value="yearly">{language === 'ar' ? 'سنوي' : 'Yearly'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* الرسم البياني للحجوزات */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'إحصائيات الحجوزات' : 'Booking Statistics'}</CardTitle>
          </CardHeader>
          <CardContent>
            <canvas ref={bookingChartRef} className="w-full h-64"></canvas>
          </CardContent>
        </Card>

        {/* الرسم البياني للإيرادات */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'إحصائيات الإيرادات' : 'Revenue Statistics'}</CardTitle>
          </CardHeader>
          <CardContent>
            <canvas ref={revenueChartRef} className="w-full h-64"></canvas>
          </CardContent>
        </Card>

        {/* ملخص */}
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'نظرة عامة' : 'Overview'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">{language === 'ar' ? 'إجمالي الحجوزات:' : 'Total Bookings:'}</p>
                <p className="text-xl text-primary">{getDataValue(currentData.bookings)}</p>
              </div>
              <div>
                <p className="font-medium">{language === 'ar' ? 'إجمالي الإيرادات (د.أ):' : 'Total Revenue (JOD):'}</p>
                <p className="text-xl text-primary">{getDataValue(currentData.revenue)}</p>
              </div>
              <div>
                <p className="font-medium">{language === 'ar' ? 'عدد العملاء:' : 'Number of Customers:'}</p>
                <p className="text-xl text-primary">{getDataValue(currentData.customers)}</p>
              </div>
              <div>
                <p className="font-medium">{language === 'ar' ? 'نسبة الإلغاء (%):' : 'Cancellation Rate (%):'}</p>
                <p className="text-xl text-primary">
                  {calculateCancellationRate(getDataValue(currentData.cancellations), getDataValue(currentData.bookings)).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/trip-reviews">
              <Button className="bg-yellow-500 text-white hover:bg-yellow-600">
                {language === 'ar' ? 'عرض تقييمات الرحلات' : 'View Trip Reviews'}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
      <Footer language={language} />
    </div>
  );
};

export default OrganizerReports;
