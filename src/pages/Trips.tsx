import { useState } from "react";

import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Star, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const mockTrips = [
  {
    id: 1,
    title: "رحلة استكشاف البتراء",
    description: "اكتشف عجائب البتراء مع مرشد محلي خبير",
    price: 150,
    rating: 4.8,
    reviews: 124,
    duration: "يوم كامل",
    image: "/nmera.jpg",
    organizer: "أحمد السياحي",
    category: "ثقافي",
    location: "البتراء"
  },
  {
    id: 2,
    title: "مغامرة في وادي رم",
    description: "تخييم تحت النجوم في الصحراء الساحرة",
    price: 200,
    rating: 4.9,
    reviews: 89,
    duration: "يومين",
    image: "/image.jpg",
    organizer: "سارة المغامرة",
    category: "مغامرة",
    location: "وادي رم"
  },
  {
    id: 3,
    title: "جولة البحر الميت",
    description: "استرخاء وعلاج طبيعي في البحر الميت",
    price: 120,
    rating: 4.7,
    reviews: 156,
    duration: "نصف يوم",
    image: "/hmad.jpg",
    organizer: "محمد الاستجمام",
    category: "استجمام",
    location: "البحر الميت"
  },
  {
    id: 4,
    title: "جولة آثار جرش",
    description: "تعرف على التاريخ الروماني العريق في جرش",
    price: 140,
    rating: 4.6,
    reviews: 98,
    duration: "يوم كامل",
    image: "/nmera.jpg",
    organizer: "ليلى التاريخ",
    category: "تاريخي",
    location: "جرش"
  },
  {
    id: 5,
    title: "مغامرة مغارات عجلون",
    description: "تسلق واستكشاف مغارات عجلون الساحرة",
    price: 180,
    rating: 4.5,
    reviews: 76,
    duration: "يوم",
    image: "/image.jpg",
    organizer: "نادر المغامر",
    category: "مغامرة",
    location: "عجلون"
  },
  {
    id: 6,
    title: "استرخاء في شواطئ العقبة",
    description: "يوم ممتع على البحر الأحمر مع أنشطة بحرية",
    price: 170,
    rating: 4.4,
    reviews: 112,
    duration: "يوم",
    image: "/hmad.jpg",
    organizer: "هدى البحرية",
    category: "طبيعي",
    location: "العقبة"
  },
  {
    id: 7,
    title: "مسار وادي الموجب",
    description: "هايكينغ ومغامرة مائية في وادي الموجب",
    price: 160,
    rating: 4.7,
    reviews: 134,
    duration: "نصف يوم",
    image: "/image.jpg",
    organizer: "رامي أدڤنشر",
    category: "مغامرة",
    location: "وادي الموجب"
  },
  {
    id: 8,
    title: "جولة وسط مدينة عمّان",
    description: "تذوق المأكولات الشعبية وزيارة المواقع التاريخية",
    price: 110,
    rating: 4.3,
    reviews: 67,
    duration: "4 ساعات",
    image: "/nmera.jpg",
    organizer: "أمجد المحلي",
    category: "ثقافي",
    location: "عمّان"
  },
  {
    id: 9,
    title: "سفاري نجوم وادي رم",
    description: "مشاهدة مجرة درب التبانة والتخييم الصحراوي",
    price: 220,
    rating: 4.9,
    reviews: 145,
    duration: "ليلة",
    image: "/image.jpg",
    organizer: "سارة المغامرة",
    category: "طبيعي",
    location: "وادي رم"
  }
];

const Trips = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["ثقافي", "مغامرة", "استجمام", "تاريخي", "طبيعي"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="lg:hidden mb-4">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <Filter className="ml-2 h-4 w-4" />
                الفلاتر
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">البحث</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="search">البحث في الرحلات</Label>
                    <Input id="search" placeholder="ابحث عن رحلة..." />
                  </div>
                  
                  <div>
                    <Label>الوجهة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الوجهة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petra">البتراء</SelectItem>
                        <SelectItem value="image">وادي رم</SelectItem>
                        <SelectItem value="hmad">البحر الميت</SelectItem>
                        <SelectItem value="amman">عمان</SelectItem>
                        <SelectItem value="aqaba">العقبة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>نوع الرحلة</Label>
                    <div className="space-y-2 mt-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => 
                              handleCategoryChange(category, checked as boolean)
                            }
                          />
                          <Label htmlFor={category} className="text-sm">{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>النطاق السعري: {priceRange[0]} - {priceRange[1]} دينار</Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500}
                      step={10}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>تاريخ الرحلة</Label>
                    <Input type="date" className="mt-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Trips Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">الرحلات المتاحة</h1>
              <p className="text-muted-foreground">{mockTrips.length} رحلة متاحة</p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockTrips.map((trip) => (
                <Card key={trip.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={trip.image} 
                        alt={trip.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                        {trip.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{trip.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{trip.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {trip.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {trip.organizer}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {trip.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{trip.rating}</span>
                        <span className="text-muted-foreground text-sm">({trip.reviews})</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{trip.price} د.أ</p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Link to={`/trip/${trip.id}`} className="w-full">
                      <Button className="w-full" variant="hero">
                        عرض التفاصيل
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <Button variant="outline" disabled>السابق</Button>
                <Button variant="hero">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">التالي</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer language="ar" />
    </div>
  );
};

export default Trips;